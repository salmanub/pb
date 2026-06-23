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
      /* Confirmation */
      var confirm = el('div', { style: { textAlign: 'center', padding: '14px 0 24px' } });
      var checkCircle = el('div', { style: { width: '48px', height: '48px', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--positive-tint, #e8f5e9)', color: 'var(--positive, #2e7d32)', fontSize: '22px', fontWeight: '600' } }, '✓');
      confirm.appendChild(checkCircle);
      var h3 = el('h3', { style: { fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2, 1.75rem)', fontWeight: '400', margin: '20px 0 0', color: 'var(--text-strong)' } }, 'Solicitud recibida');
      confirm.appendChild(h3);
      confirm.appendChild(el('p', { style: { margin: '12px auto 0', maxWidth: '40ch', color: 'var(--text-muted)', lineHeight: '1.55' } }, 'Hemos registrado tu caso. Te responderemos en 24 h laborables con los siguientes pasos.'));
      body.appendChild(confirm);
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
  function submitForm() {
    var contactData = answers.contacto || {};
    var payload = {
      nombre: contactData.nombre || '',
      poblacion: contactData.poblacion || '',
      email: contactData.email || '',
      telefono: contactData.telefono || '',
      detalle: contactData.detalle || '',
      problema: answers.problema || '',
      inmueble: answers.inmueble || '',
      antiguedad: answers.antiguedad || '',
      perfil: perfil || '',
      lang: document.documentElement.lang || 'es',
      timestamp: new Date().toISOString(),
      source: 'perito.barcelona'
    };

    done = true;
    render();

    fetch('/api/contacto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (res.redirected) {
        setTimeout(function () { window.location.href = res.url; }, 2000);
      } else if (res.ok) {
        setTimeout(function () { window.location.href = '/gracias/'; }, 2000);
      }
    }).catch(function () {
      /* Silently stay on confirmation screen */
    });
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
