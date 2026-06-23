import React from 'react';
import { Button } from '../core/Button.jsx';
import { Field } from './Field.jsx';
import { Input } from './Input.jsx';

/**
 * StepForm — a guided, one-question-at-a-time intake. Conversational in
 * structure, documentary in form: a "§ NN / NN" progress rule, sober fades,
 * choice steps that advance on selection, and a final contact step.
 *
 * Each step: { key, eyebrow?, question, helper?, type: 'choice' | 'fields',
 *   options?: string[], fields?: [{ name, label, type?, placeholder?, optional?, multiline? }] }
 */
export function StepForm({
  steps = [],
  title = 'Cuéntanos tu caso',
  onComplete = null,
  onClose = null,
  confirmTitle = 'Solicitud recibida',
  confirmText = 'Hemos registrado tu caso. Te responderemos en 24 h laborables con los siguientes pasos.',
  style = {},
  ...rest
}) {
  const [i, setI] = React.useState(0);
  const [answers, setAnswers] = React.useState({});
  const [done, setDone] = React.useState(false);
  const total = steps.length;
  const step = steps[i];

  const setAnswer = (key, val) => setAnswers((a) => ({ ...a, [key]: val }));

  const goNext = () => {
    if (i < total - 1) setI(i + 1);
    else { setDone(true); onComplete && onComplete(answers); }
  };
  const goBack = () => i > 0 && setI(i - 1);

  const chooseAndAdvance = (key, val) => {
    setAnswer(key, val);
    window.setTimeout(() => setI((cur) => (cur < total - 1 ? cur + 1 : cur)), 240);
  };

  const fieldsValid = (s) =>
    !s.fields || s.fields.every((f) => f.optional || (answers[s.key]?.[f.name] || '').trim().length > 0);

  const pct = done ? 100 : Math.round(((i + 1) / total) * 100);

  return (
    <div style={{
      background: 'var(--surface-card)', border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-md)', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      maxWidth: '560px', width: '100%', ...style,
    }} {...rest}>
      {/* Header: progress + close */}
      <div style={{ padding: '18px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-label)', letterSpacing: 'var(--tracking-label)',
            textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>
            {title}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--text-faint)' }}>
              § {String(done ? total : i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
            {onClose && (
              <button onClick={onClose} aria-label="Cerrar" style={{
                width: 30, height: 30, borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-hairline)',
                background: 'transparent', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>×</button>
            )}
          </div>
        </div>
        <div style={{ height: '2px', background: 'var(--stone-250)', marginTop: '14px', borderRadius: '1px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: pct + '%', background: 'var(--accent)', transition: 'width var(--dur-slow) var(--ease-out)' }} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '28px 24px 8px', minHeight: '200px' }}>
        {done ? (
          <StepFade key="done">
            <div style={{ textAlign: 'center', padding: '14px 0 24px' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', margin: '0 auto', display: 'flex',
                alignItems: 'center', justifyContent: 'center', background: 'var(--positive-tint)', color: 'var(--positive)',
                fontSize: '22px', fontWeight: 600,
              }}>✓</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', fontWeight: 400, margin: '20px 0 0', color: 'var(--text-strong)' }}>{confirmTitle}</h3>
              <p style={{ margin: '12px auto 0', maxWidth: '40ch', color: 'var(--text-muted)', lineHeight: 1.55 }}>{confirmText}</p>
            </div>
          </StepFade>
        ) : (
          <StepFade key={i}>
            {step.eyebrow && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-mono-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--text-accent)', marginBottom: '12px' }}>
                {step.eyebrow}
              </div>
            )}
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--fs-h2)', fontWeight: 400, lineHeight: 1.2, color: 'var(--text-strong)', margin: 0 }}>
              {step.question}
            </h3>
            {step.helper && (
              <p style={{ margin: '12px 0 0', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.55 }}>{step.helper}</p>
            )}

            {step.type === 'choice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '22px' }}>
                {step.options.map((opt, k) => {
                  const selected = answers[step.key] === opt;
                  return (
                    <Choice key={opt} index={k} label={opt} selected={selected} onClick={() => chooseAndAdvance(step.key, opt)} />
                  );
                })}
              </div>
            )}

            {step.type === 'fields' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '22px' }}>
                {step.fields.map((f) => (
                  <Field key={f.name} label={f.label} htmlFor={f.name} optional={f.optional}>
                    <Input
                      id={f.name}
                      type={f.type || 'text'}
                      multiline={f.multiline}
                      rows={f.rows || 3}
                      placeholder={f.placeholder}
                      value={answers[step.key]?.[f.name] || ''}
                      onChange={(e) => setAnswer(step.key, { ...(answers[step.key] || {}), [f.name]: e.target.value })}
                    />
                  </Field>
                ))}
              </div>
            )}
          </StepFade>
        )}
      </div>

      {/* Footer */}
      {!done && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
          padding: '14px 24px 22px', borderTop: '1px solid var(--border-subtle)', marginTop: '8px',
        }}>
          <Button variant="ghost" size="sm" onClick={goBack} style={{ visibility: i === 0 ? 'hidden' : 'visible' }}>Atrás</Button>
          {step.type === 'fields' ? (
            <Button variant="primary" onClick={goNext} disabled={!fieldsValid(step)}>
              {i === total - 1 ? 'Enviar solicitud' : 'Continuar'}
            </Button>
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
              Selecciona una opción
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function Choice({ label, index, selected, onClick }) {
  const [hover, setHover] = React.useState(false);
  const letter = String.fromCharCode(65 + index);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '14px', width: '100%', textAlign: 'left',
        padding: '14px 16px', cursor: 'pointer', font: 'inherit',
        background: selected ? 'var(--accent-tint)' : hover ? 'var(--surface-muted)' : 'var(--surface-raised)',
        border: '1.5px solid', borderColor: selected ? 'var(--accent)' : 'var(--border-hairline)',
        borderRadius: 'var(--radius-sm)',
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
      }}
    >
      <span style={{
        width: 24, height: 24, flexShrink: 0, borderRadius: 'var(--radius-xs)',
        border: '1px solid', borderColor: selected ? 'var(--accent)' : 'var(--border-hairline)',
        background: selected ? 'var(--accent)' : 'transparent', color: selected ? 'var(--bone-100)' : 'var(--text-muted)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'var(--font-mono)', fontSize: '0.7rem', fontWeight: 600,
      }}>{letter}</span>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.975rem', color: 'var(--text-strong)' }}>{label}</span>
    </button>
  );
}

function StepFade({ children }) {
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  return (
    <div style={{
      opacity: shown ? 1 : 0, transform: shown ? 'none' : 'translateY(8px)',
      transition: 'opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
    }}>{children}</div>
  );
}
