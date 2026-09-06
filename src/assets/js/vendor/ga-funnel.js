/*!
 * ga-funnel.js — instrumentación GA4 del funnel de formularios y de los
 * eventos de intención (tel / WhatsApp / email / CTA / scroll profundo).
 *
 * Vive aquí y no en un partial .njk por una razón medible: no usa ni una
 * variable de plantilla, así que en línea eran 7,6 KB repetidos en cada una de
 * las ~400 páginas del build. Como fichero suelto es UNA petición diferida,
 * cacheada un año y compartida por todo el sitio.
 *
 * Se carga con URL ABSOLUTA y defer desde base.njk:
 *   · absoluta, porque desde la caché de Google (webpkgcache.com) una ruta
 *     relativa apuntaría al host de la caché;
 *   · defer, así que se ejecuta tras el parseo y DESPUÉS de los scripts en
 *     línea del final del body — que es donde analytics.njk define pbTrack,
 *     del que esto depende.
 *
 * Documentación de eventos y parámetros: docs/GA4-FUNNEL.md
 */
  (function () {
    'use strict';
    var SEL = 'form,[data-form-id]';
    var SEL_POS = '[data-position],header,footer,nav,[role="banner"],[role="contentinfo"],[data-hero],.hero,.mobile-bottom-bar';
    var estado = {};
    var arrancado = 0;
    var leadHecho = 0;

    function track(nombre, params) {
      if (window.pbTrack) window.pbTrack(nombre, params);
    }

    function est(id) {
      return estado[id] || (estado[id] = { view: 0, start: 0, submit: 0, fin: 0, campos: {}, last: '' });
    }

    function idDe(f) {
      if (!f) return '';
      var id = f.getAttribute('data-form-id') || f.id, todos, i;
      if (!id) {
        todos = document.querySelectorAll(SEL);
        for (i = 0; i < todos.length; i++) { if (todos[i] === f) { id = 'form-' + i; break; } }
        id = id || 'form-0';
      }
      f.setAttribute('data-form-id', id);
      return id;
    }

    function formDe(n) {
      return (n && n.closest) ? n.closest(SEL) : null;
    }

    function esCampo(n) {
      var t = n && n.tagName;
      return t === 'INPUT' || t === 'SELECT' || t === 'TEXTAREA';
    }

    function campoDe(c) {
      return String(c.name || c.id || c.type || 'campo').slice(0, 60);
    }

    function valorDe(c) {
      if (c.type === 'checkbox' || c.type === 'radio') return c.checked ? 'x' : '';
      return String(c.value == null ? '' : c.value);
    }

    function tipoError(v) {
      if (!v) return 'invalid';
      if (v.valueMissing) return 'required';
      if (v.typeMismatch) return 'type';
      if (v.patternMismatch) return 'pattern';
      if (v.tooShort || v.tooLong) return 'length';
      return 'invalid';
    }

    function abandono() {
      var id, e;
      for (id in estado) {
        e = estado[id];
        if (e.start && !e.submit && !e.fin) {
          e.fin = 1;
          track('form_abandon', { form_id: id, last_field: e.last || '(sin campo)' });
        }
      }
    }

    addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'hidden') abandono();
    }, { capture: true });
    addEventListener('pagehide', abandono, { capture: true });

    window.pbFormSubmit = function (formId) {
      var id = formId || 'desconocido', e = est(id);
      if (e.submit) return;
      e.submit = 1;
      try { sessionStorage.setItem('pb_form', id); } catch (x) { /* almacén restringido */ }
      track('form_submit', { form_id: id });
      track('generate_lead', { form_id: id });
    };

    window.pbLeadConfirmed = function (formId) {
      var id = formId || '';
      if (!id) { try { id = sessionStorage.getItem('pb_form') || ''; } catch (x) { id = ''; } }
      if (id) est(id).submit = 1;
      if (leadHecho) return;
      leadHecho = 1;
      track('lead_confirmed', { form_id: id || 'desconocido' });
    };

    function posicion(el) {
      var a = el.closest(SEL_POS), tag, rol;
      if (!a) return 'body';
      if (a.getAttribute('data-position')) return a.getAttribute('data-position');
      if (a.classList && a.classList.contains('mobile-bottom-bar')) return 'sticky-bar';
      tag = a.tagName;
      rol = a.getAttribute('role');
      if (tag === 'FOOTER' || rol === 'contentinfo') return 'footer';
      if (tag === 'HEADER' || tag === 'NAV' || rol === 'banner') return 'header';
      return 'hero';
    }

    function enInicio(ev) {
      var c = ev.target, f, id, e;
      if (!esCampo(c)) return;
      f = formDe(c);
      if (!f) return;
      id = idDe(f);
      e = est(id);
      e.last = campoDe(c);
      if (e.start) return;
      e.start = 1;
      track('form_start', { form_id: id });
    }

    function enSalida(ev) {
      var c = ev.target, f, id, e, n;
      if (!esCampo(c) || typeof c.checkValidity !== 'function') return;
      f = formDe(c);
      if (!f) return;
      id = idDe(f);
      e = est(id);
      n = campoDe(c);
      e.last = n;
      if (!valorDe(c).trim()) return;
      if (!c.checkValidity()) return;
      if (e.campos[n]) return;
      e.campos[n] = 1;
      track('form_field_complete', { form_id: id, field_name: n });
    }

    function enInvalido(ev) {
      var c = ev.target, f;
      if (!esCampo(c)) return;
      f = formDe(c);
      if (!f) return;
      track('form_error', {
        form_id: idDe(f),
        field_name: campoDe(c),
        error_type: tipoError(c.validity)
      });
    }

    function enEnvio(ev) {
      var f = ev.target;
      if (!f || f.tagName !== 'FORM') return;
      window.pbFormSubmit(idDe(f));
    }

    function enClic(ev) {
      var t = ev.target, cta, a, href, nombre;
      if (!t || !t.closest) return;
      cta = t.closest('[data-cta-id]');
      if (cta) {
        track('cta_click', {
          cta_id: String(cta.getAttribute('data-cta-id') || '').slice(0, 80),
          position: posicion(cta)
        });
      }
      a = t.closest('a[href]');
      if (!a) return;
      href = a.getAttribute('href') || '';
      nombre = '';
      if (/^tel:/i.test(href)) nombre = 'click_tel';
      else if (/^mailto:/i.test(href)) nombre = 'click_email';
      else if (/(^|\.)wa\.me$|(^|\.)api\.whatsapp\.com$/i.test(a.hostname || '')) nombre = 'click_whatsapp';
      if (nombre) track(nombre, { position: posicion(a) });
    }

    function scrollServicio() {
      var b = document.body;
      var esServicio = !!b && (b.dataset.pageType === 'servicio' ||
        !!document.querySelector('[itemtype$="/Service"]'));
      if (!esServicio) return;
      var pendiente = 0, hecho = 0;
      var medir = function () {
        pendiente = 0;
        var alto = document.documentElement.scrollHeight - innerHeight;
        if (hecho || alto <= 0 || (pageYOffset / alto) < 0.75) return;
        hecho = 1;
        removeEventListener('scroll', enScroll);
        track('scroll_deep', { percent_scrolled: 75 });
      };
      var enScroll = function () {
        if (pendiente || hecho) return;
        pendiente = 1;
        requestAnimationFrame(medir);
      };
      addEventListener('scroll', enScroll, { passive: true });
    }

    function inicio() {
      var forms = document.querySelectorAll(SEL), i, io, id;

      for (i = 0; i < forms.length; i++) idDe(forms[i]);

      if (window.IntersectionObserver) {
        io = new IntersectionObserver(function (entradas) {
          for (var j = 0; j < entradas.length; j++) {
            if (!entradas[j].isIntersecting) continue;
            var el = entradas[j].target, fid = idDe(el), e = est(fid);
            io.unobserve(el);
            if (e.view) continue;
            e.view = 1;
            track('form_view', { form_id: fid });
          }
        }, { threshold: 0.2 });
        for (i = 0; i < forms.length; i++) io.observe(forms[i]);
      } else {
        for (i = 0; i < forms.length; i++) {
          id = idDe(forms[i]);
          if (est(id).view) continue;
          est(id).view = 1;
          track('form_view', { form_id: id });
        }
      }

      document.addEventListener('focusin', enInicio, { passive: true });
      document.addEventListener('input', enInicio, { passive: true });
      document.addEventListener('focusout', enSalida, { passive: true });
      document.addEventListener('invalid', enInvalido, { capture: true, passive: true });
      document.addEventListener('submit', enEnvio, { capture: true });
      document.addEventListener('click', enClic, { passive: true });

      scrollServicio();
    }

    function arranca() {
      if (arrancado) return;
      arrancado = 1;
      inicio();
    }

    if (typeof window.requestIdleCallback === 'function') requestIdleCallback(arranca, { timeout: 3000 });
    setTimeout(arranca, 1500);
  })();
