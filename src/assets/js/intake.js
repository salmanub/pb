/**
 * intake.js — Typeform-style guided intake modal.
 * Port of DS StepForm.jsx + Intake() from index.html.
 * Vanilla JS, no dependencies. Uses DS CSS custom properties.
 *
 * API:
 *   window.openIntake(perfil?)  — opens the overlay
 *   window.closeIntake()        — closes the overlay
 *
 * Perfil values: 'pro', 'particular', 'abogados' (passed as hidden field)
 */
;(function () {
  'use strict';

  /* ── Turnstile (anti-bot) ──────────────────────────────────
     El asistente postea JSON hecho a mano (sin <form>), así que renderizamos un
     widget "managed" oculto al ABRIR el intake y capturamos el token; se incluye
     en el payload y la Function lo valida server-side. Fail-open sin secreto. */
  var TURNSTILE_SITEKEY = '0x4AAAAAAD06XsyzFHZ1bBxZ';
  var turnstileToken = '';
  var turnstileWidgetId = null;
  function ensureTurnstile() {
    if (turnstileWidgetId !== null) return; // ya renderizado
    if (!document.querySelector('script[data-turnstile]')) {
      var s = document.createElement('script');
      s.src = 'https://challenges.cloudflare.com/turnstile/api.js?render=explicit';
      s.async = true; s.defer = true; s.setAttribute('data-turnstile', '1');
      document.head.appendChild(s);
    }
    (function tryRender() {
      if (window.turnstile && turnstileWidgetId === null) {
        var box = document.getElementById('intake-turnstile');
        if (!box) {
          box = document.createElement('div');
          box.id = 'intake-turnstile';
          box.style.position = 'fixed'; box.style.left = '-9999px'; box.style.top = '0';
          document.body.appendChild(box);
        }
        try {
          turnstileWidgetId = window.turnstile.render(box, {
            sitekey: TURNSTILE_SITEKEY,
            callback: function (t) { turnstileToken = t || ''; },
            'error-callback': function () { turnstileToken = ''; }
          });
        } catch (_) { /* noop */ }
      } else if (turnstileWidgetId === null) {
        setTimeout(tryRender, 300);
      }
    })();
  }

  /* ── Steps (from DS INTAKE_STEPS) ──────────────────────── */
  var STEPS = [
    { key: 'problema', eyebrow: '§ 01 · Tu situación', type: 'choice',
      question: '¿Qué está pasando en tu inmueble?',
      helper: 'Elige lo que más se acerque. Después podrás detallarlo.',
      options: ['Humedades o filtraciones', 'Grietas, fisuras o movimientos', 'Vicios ocultos tras comprar', 'Reforma u obra mal ejecutada', 'Otro problema constructivo'] },
    { key: 'inmueble', eyebrow: '§ 02 · El inmueble', type: 'choice',
      question: '¿De qué tipo de inmueble hablamos?',
      options: ['Vivienda particular', 'Comunidad de propietarios', 'Local o nave', 'Edificio u obra pública'] },
    { key: 'antiguedad', eyebrow: '§ 03 · Desde cuándo', type: 'choice',
      question: '¿Desde cuándo aparece el problema?',
      helper: 'Nos ayuda a valorar plazos de garantía y responsabilidad.',
      options: ['Menos de 6 meses', 'Entre 6 meses y 2 años', 'Más de 2 años', 'No lo sé con certeza'] },
    { key: 'contacto', eyebrow: '§ 04 · Contacto', type: 'fields',
      question: '¿Cómo te contactamos?',
      helper: 'Una primera consulta sin coste. Respondemos en 24 h laborables.',
      fields: [
        { name: 'nombre', label: 'Nombre y apellidos', placeholder: 'Tu nombre', required: true },
        { name: 'poblacion', label: 'Población del inmueble', placeholder: 'Ej. Barcelona', required: true },
        { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'nombre@correo.com', required: true },
        { name: 'telefono', label: 'Teléfono', type: 'tel', placeholder: '+34 ___ ___ ___', required: false },
        { name: 'detalle', label: 'Cuéntanoslo en una línea', multiline: true, rows: 3, placeholder: 'Lo que creas relevante…', required: false },
      ] },
  ];

  var TOTAL = STEPS.length;
  var current = 0;
  var answers = {};
  var done = false;
  var doneHTML = '';
  var perfil = '';
  var overlay = null;

  /* ── Helpers ──────────────────────────────────────────── */
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'style' && typeof attrs[k] === 'object') {
        Object.keys(attrs[k]).forEach(function (p) { e.style[p] = attrs[k][p]; });
      } else if (k.indexOf('on') === 0) {
        e.addEventListener(k.slice(2).toLowerCase(), attrs[k]);
      } else { e.setAttribute(k, attrs[k]); }
    });
    if (children) {
      if (typeof children === 'string') e.textContent = children;
      else if (Array.isArray(children)) children.forEach(function (c) { if (c) e.appendChild(c); });
      else e.appendChild(children);
    }
    return e;
  }
  function pad(n) { return String(n).length < 2 ? '0' + n : String(n); }

  /* ── Render ──────────────────────────────────────────── */
  function render() {
    if (!overlay) return;
    var card = overlay.querySelector('.intake-card');
    if (!card) return;
    card.innerHTML = '';

    var step = STEPS[current];
    var pct = done ? 100 : Math.round(((current + 1) / TOTAL) * 100);

    /* Header */
    var header = el('div', { style: { padding: '18px 24px 0' } });

    var headerRow = el('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' } });
    headerRow.appendChild(el('span', { style: { fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-label, 0.6875rem)', letterSpacing: 'var(--tracking-label, 0.14em)', textTransform: 'uppercase', color: 'var(--text-muted)' } }, 'Cuéntanos tu caso'));

    var headerRight = el('div', { style: { display: 'flex', alignItems: 'center', gap: '14px' } });
    headerRight.appendChild(el('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-faint)' } }, '§ ' + pad(done ? TOTAL : current + 1) + ' / ' + pad(TOTAL)));

    var closeBtn = el('button', { 'aria-label': 'Cerrar', style: { width: '30px', height: '30px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-hairline)', background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1', display: 'flex', alignItems: 'center', justifyContent: 'center' }, onClick: window.closeIntake }, '×');
    headerRight.appendChild(closeBtn);
    headerRow.appendChild(headerRight);
    header.appendChild(headerRow);

    /* Progress bar */
    var barOuter = el('div', { style: { height: '2px', background: 'var(--stone-250, #d6d3cd)', marginTop: '14px', borderRadius: '1px', overflow: 'hidden' } });
    barOuter.appendChild(el('div', { style: { height: '100%', width: pct + '%', background: 'var(--accent)', transition: 'width 0.4s ease' } }));
    header.appendChild(barOuter);
    card.appendChild(header);

    /* Body */
    var body = el('div', { style: { padding: '28px 24px 8px', minHeight: '200px' } });

    if (done) {
      /* Options screen */
      body.innerHTML = doneHTML;
      card.appendChild(body);
      wrapper.appendChild(card);
      return wrapper;
    } else {
      /* Step content */
      var content = el('div', { class: 'intake-step-content' });

      if (step.eyebrow) {
        content.appendChild(el('div', { style: { fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-label, 0.6875rem)', letterSpacing: 'var(--tracking-label, 0.14em)', textTransform: 'uppercase', color: 'var(--text-accent)', marginBottom: '12px' } }, step.eyebrow));
      }
      content.appendChild(el('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2, 1.75rem)', fontWeight: '400', lineHeight: '1.2', color: 'var(--text-strong)', margin: '0' } }, step.question));

      if (step.helper) {
        content.appendChild(el('p', { style: { margin: '12px 0 0', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.55' } }, step.helper));
      }

      /* Choice options */
      if (step.type === 'choice') {
        var choiceList = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '22px' } });
        step.options.forEach(function (opt, k) {
          var letter = String.fromCharCode(65 + k);
          var selected = answers[step.key] === opt;
          var btn = el('button', {
            style: {
              display: 'flex', alignItems: 'center', gap: '14px', width: '100%', textAlign: 'left',
              padding: '14px 16px', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit',
              background: selected ? 'var(--accent-tint)' : 'var(--surface-raised, #fff)',
              border: '1.5px solid', borderColor: selected ? 'var(--accent)' : 'var(--border-hairline)',
              borderRadius: 'var(--radius-sm)', transition: 'background 0.15s ease, border-color 0.15s ease'
            },
            onClick: function () { chooseAndAdvance(step.key, opt); }
          });
          btn.onmouseenter = function () { if (!selected) btn.style.background = 'var(--surface-muted, #f5f4f0)'; };
          btn.onmouseleave = function () { if (!selected) btn.style.background = 'var(--surface-raised, #fff)'; };

          var letterSpan = el('span', { style: {
            width: '24px', height: '24px', flexShrink: '0', borderRadius: 'var(--radius-xs)',
            border: '1px solid', borderColor: selected ? 'var(--accent)' : 'var(--border-hairline)',
            background: selected ? 'var(--accent)' : 'transparent', color: selected ? 'var(--bone-100)' : 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: '600'
          } }, letter);
          btn.appendChild(letterSpan);
          btn.appendChild(el('span', { style: { fontFamily: 'var(--font-sans)', fontSize: '0.975rem', color: 'var(--text-strong)' } }, opt));
          choiceList.appendChild(btn);
        });
        content.appendChild(choiceList);
      }

      /* Fields */
      if (step.type === 'fields') {
        var fieldList = el('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '22px' } });
        step.fields.forEach(function (f) {
          var fieldWrap = el('div');
          var labelEl = el('label', { for: 'intake-' + f.name, style: { display: 'block', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-strong)', marginBottom: '6px' } });
          labelEl.textContent = f.label;
          if (!f.required) {
            labelEl.appendChild(el('span', { style: { color: 'var(--text-faint)', fontWeight: '400', marginLeft: '6px' } }, '(opcional)'));
          }
          fieldWrap.appendChild(labelEl);

          var inputStyle = {
            width: '100%', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', fontSize: '0.95rem',
            padding: '12px 14px', border: '1.5px solid var(--border-hairline)', borderRadius: 'var(--radius-sm)',
            background: 'var(--surface-raised, #fff)', color: 'var(--text-strong)',
            transition: 'border-color 0.15s ease', outline: 'none'
          };

          var input;
          if (f.multiline) {
            input = el('textarea', { id: 'intake-' + f.name, placeholder: f.placeholder || '', rows: f.rows || 3, style: Object.assign({ resize: 'vertical' }, inputStyle) });
          } else {
            input = el('input', { id: 'intake-' + f.name, type: f.type || 'text', placeholder: f.placeholder || '', style: inputStyle });
          }
          if (f.required) input.setAttribute('required', '');
          input.value = (answers[step.key] && answers[step.key][f.name]) || '';
          input.addEventListener('input', function (e) {
            if (!answers[step.key]) answers[step.key] = {};
            answers[step.key][f.name] = e.target.value;
          });
          input.addEventListener('focus', function () { input.style.borderColor = 'var(--accent)'; });
          input.addEventListener('blur', function () { input.style.borderColor = 'var(--border-hairline)'; });
          fieldWrap.appendChild(input);
          fieldList.appendChild(fieldWrap);
        });
        content.appendChild(fieldList);
      }
      body.appendChild(content);
    }
    card.appendChild(body);

    /* Footer */
    if (!done) {
      var footer = el('div', { style: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
        padding: '14px 24px 22px', borderTop: '1px solid var(--border-subtle)', marginTop: '8px'
      } });

      var backBtn = el('button', {
        style: {
          fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: '500', color: 'var(--text-muted)',
          background: 'transparent', border: 'none', cursor: 'pointer', padding: '8px 12px',
          visibility: current === 0 ? 'hidden' : 'visible'
        },
        onClick: goBack
      }, 'Atrás');
      footer.appendChild(backBtn);

      if (step.type === 'fields') {
        var submitBtn = el('button', {
          style: {
            fontFamily: 'var(--font-sans)', fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent-on, #fff)',
            background: 'var(--accent)', border: '1.5px solid transparent', borderRadius: 'var(--radius-sm)',
            padding: '10px 20px', cursor: 'pointer', lineHeight: '1', letterSpacing: '0.005em'
          },
          onClick: function () { if (fieldsValid(step)) submitForm(); }
        }, current === TOTAL - 1 ? 'Enviar solicitud' : 'Continuar');
        footer.appendChild(submitBtn);
      } else {
        footer.appendChild(el('span', { style: { fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' } }, 'Selecciona una opción'));
      }
      card.appendChild(footer);
    }
  }

  /* ── Navigation ──────────────────────────────────────── */
  function chooseAndAdvance(key, val) {
    answers[key] = val;
    setTimeout(function () {
      if (current < TOTAL - 1) { current++; render(); }
    }, 240);
    render(); // immediate re-render to show selected state
  }

  function goBack() {
    if (current > 0) { current--; render(); }
  }

  function fieldsValid(step) {
    if (!step.fields) return true;
    return step.fields.every(function (f) {
      if (!f.required) return true;
      var val = answers[step.key] && answers[step.key][f.name];
      return val && val.trim().length > 0;
    });
  }

  /* ── Submit ──────────────────────────────────────────── */
  function detectLang() {
    var p = (window.location && window.location.pathname) || '';
    if (p.indexOf('/ca/') !== -1) return 'ca';
    if (p.indexOf('/en/') !== -1) return 'en';
    return 'es';
  }

  function buildPayload() {
    var c = answers.contacto || {};
    var descripcion = [
      answers.problema || '',
      answers.inmueble ? 'Inmueble: ' + answers.inmueble : '',
      answers.antiguedad ? 'Antigüedad: ' + answers.antiguedad : '',
      c.detalle || ''
    ].filter(Boolean).join('. ');
    return {
      origen: 'perito.barcelona',
      perfil: perfil || 'particular',
      nombre: c.nombre || '',
      poblacion: c.poblacion || '',
      email: c.email || '',
      telefono: c.telefono || '',
      descripcion: descripcion,
      lang: detectLang(),
      'cf-turnstile-response': turnstileToken,
      source: 'perito.barcelona (intake modal)'
    };
  }

  function submitForm() {
    var contactData = answers.contacto || {};
    var payload = buildPayload();

    /* Pantalla de "enviando" mientras se hace el POST */
    doneHTML = buildSendingHTML();
    done = true;
    render();

    var handled = false;
    var timeout = setTimeout(function () { if (!handled) { handled = true; showFallback(contactData); } }, 9000);

    try {
      fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (res) {
        return res.json().catch(function () { return { ok: res.ok }; });
      }).then(function (data) {
        if (handled) return; handled = true; clearTimeout(timeout);
        if (data && data.ok) { doneHTML = buildSuccessHTML(); render(); }
        else { showFallback(contactData); }
      }).catch(function () {
        if (handled) return; handled = true; clearTimeout(timeout);
        showFallback(contactData);
      });
    } catch (e) {
      if (!handled) { handled = true; clearTimeout(timeout); showFallback(contactData); }
    }
  }

  function buildSendingHTML() {
    return '<div style="padding:40px 0;text-align:center;">' +
      '<div style="width:40px;height:40px;margin:0 auto 18px;border:3px solid var(--border-hairline);border-top-color:var(--accent);border-radius:50%;animation:intake-spin 0.8s linear infinite;"></div>' +
      '<p style="color:var(--text-muted);font-size:0.95rem;">Enviando tu consulta…</p>' +
      '<style>@keyframes intake-spin{to{transform:rotate(360deg)}}</style>' +
      '</div>';
  }

  function buildSuccessHTML() {
    return '<div style="padding:20px 0;text-align:center;">' +
      '<div style="width:52px;height:52px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;background:rgba(28,122,74,0.1);">' +
        '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1C7A4A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
      '</div>' +
      '<h3 style="font-family:var(--font-serif);font-size:var(--fs-h2,1.75rem);font-weight:400;margin:16px 0 0;color:var(--text-strong);">Consulta recibida</h3>' +
      '<p style="margin:10px auto 0;max-width:40ch;color:var(--text-muted);font-size:0.95rem;line-height:1.55;">Gracias. Hemos recibido tu caso y te responderemos en un plazo de <strong>24 horas laborables</strong>.</p>' +
      '<button type="button" onclick="window.closeIntake()" style="margin-top:24px;padding:11px 28px;font-family:var(--font-sans);font-size:0.9rem;font-weight:600;color:var(--accent-on,#fff);background:var(--accent);border:none;border-radius:var(--radius-sm);cursor:pointer;">Cerrar</button>' +
      '</div>';
  }

  function showFallback(contactData) {
    var subject = encodeURIComponent('Consulta web — ' + (perfil === 'pro' ? 'Profesional' : 'Particular') + ' — ' + (contactData.nombre || ''));
    var bodyParts = 'CONSULTA WEB (perito.barcelona)\n========================================\n\n' +
      'Nombre: ' + (contactData.nombre || '') + '\n' +
      'Población: ' + (contactData.poblacion || '') + '\n' +
      'Email: ' + (contactData.email || '') + '\n' +
      'Teléfono: ' + (contactData.telefono || '') + '\n' +
      'Problema: ' + (answers.problema || '') + '\n' +
      'Inmueble: ' + (answers.inmueble || '') + '\n' +
      'Antigüedad: ' + (answers.antiguedad || '') + '\n' +
      'Perfil: ' + (perfil || '') + '\n\n' +
      'Detalle:\n' + (contactData.detalle || '') + '\n\n' +
      'Fecha: ' + new Date().toLocaleString('es-ES') + '\n' +
      'Origen: perito.barcelona (intake modal)';
    var mailto = 'mailto:info@perito.barcelona?subject=' + subject + '&body=' + encodeURIComponent(bodyParts);

    doneHTML =
      '<div style="padding:20px 0;">' +
        '<div style="text-align:center;margin-bottom:24px;">' +
          '<div style="width:52px;height:52px;border-radius:50%;margin:0 auto;display:flex;align-items:center;justify-content:center;background:rgba(220,160,40,0.1);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a017" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>' +
          '<h3 style="font-family:var(--font-serif);font-size:var(--fs-h2,1.75rem);font-weight:400;margin:16px 0 0;color:var(--text-strong);">No se ha podido enviar automáticamente</h3>' +
          '<p style="margin:8px auto 0;max-width:38ch;color:var(--text-muted);font-size:0.9rem;line-height:1.55;">Tus datos están guardados. Escoge una de estas opciones para contactarnos:</p>' +
        '</div>' +
        '<div style="display:flex;flex-direction:column;gap:10px;">' +
          '<a href="' + mailto + '" style="display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:var(--radius-sm);border:1.5px solid var(--accent);background:var(--accent);text-decoration:none;transition:opacity 0.2s;">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-on,#fff)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>' +
            '<span style="flex:1;"><span style="display:block;font-family:var(--font-sans);font-size:0.9rem;font-weight:600;color:var(--accent-on,#fff);">Abrir email con tus datos</span><span style="display:block;font-family:var(--font-mono);font-size:0.7rem;color:rgba(255,255,255,0.7);margin-top:2px;">info@perito.barcelona</span></span>' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
          '</a>' +
          '<a href="tel:+34614194985" style="display:flex;align-items:center;gap:12px;padding:14px 18px;border-radius:var(--radius-sm);border:1.5px solid var(--border-hairline);background:var(--surface-raised,#fff);text-decoration:none;transition:border-color 0.2s;">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>' +
            '<span style="flex:1;"><span style="display:block;font-family:var(--font-sans);font-size:0.9rem;font-weight:600;color:var(--text-strong);">Llamar ahora</span><span style="display:block;font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);margin-top:2px;">614 194 985</span></span>' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>' +
          '</a>' +
        '</div>' +
        '<button type="button" onclick="location.reload()" style="display:block;width:100%;margin-top:16px;padding:10px;font-family:var(--font-sans);font-size:0.8rem;font-weight:500;color:var(--text-muted);background:transparent;border:none;cursor:pointer;text-decoration:underline;text-underline-offset:3px;">Reintentar</button>' +
      '</div>';

    done = true;
    render();
  }

  /* ── Overlay ─────────────────────────────────────────── */
  function createOverlay() {
    if (overlay) return;

    overlay = el('div', {
      id: 'intake-overlay',
      style: {
        position: 'fixed', top: '0', left: '0', right: '0', bottom: '0', zIndex: '100',
        background: 'rgba(28,26,23,0.55)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: '6vh 20px 48px', overflowY: 'auto',
        opacity: '0', transition: 'opacity 0.25s ease'
      },
      onClick: function (e) { if (e.target === overlay) window.closeIntake(); }
    });

    var cardEl = el('div', {
      class: 'intake-card',
      style: {
        width: '100%', maxWidth: '560px', background: 'var(--surface-card, #fff)',
        border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-md)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-overlay, 0 20px 60px rgba(0,0,0,.18))',
        transform: 'translateY(14px)', transition: 'transform 0.3s ease, opacity 0.3s ease', opacity: '0'
      }
    });
    cardEl.addEventListener('click', function (e) { e.stopPropagation(); });
    overlay.appendChild(cardEl);
    document.body.appendChild(overlay);

    /* Animate in */
    requestAnimationFrame(function () {
      overlay.style.opacity = '1';
      cardEl.style.opacity = '1';
      cardEl.style.transform = 'none';
    });
  }

  /* ── Public API ──────────────────────────────────────── */
  window.openIntake = function (p) {
    perfil = p || '';
    current = 0;
    answers = {};
    done = false;
    ensureTurnstile(); // prepara el token anti-bot mientras el usuario rellena
    createOverlay();
    render();
    document.body.style.overflow = 'hidden';
  };

  window.closeIntake = function () {
    if (!overlay) return;
    overlay.style.opacity = '0';
    var cardEl = overlay.querySelector('.intake-card');
    if (cardEl) { cardEl.style.opacity = '0'; cardEl.style.transform = 'translateY(14px)'; }
    setTimeout(function () {
      if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
      overlay = null;
      document.body.style.overflow = '';
    }, 300);
  };

  /* Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay) window.closeIntake();
  });

  /* Auto-open if ?perfil= in URL */
  var params = new URLSearchParams(window.location.search);
  if (params.has('perfil')) {
    window.addEventListener('DOMContentLoaded', function () {
      window.openIntake(params.get('perfil'));
    });
  }
})();
