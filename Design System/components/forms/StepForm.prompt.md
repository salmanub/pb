Guided, one-question-at-a-time intake — conversational in structure, sober in form. Built for the worried-homeowner door, where breaking "describe your problem" into small steps lowers anxiety and qualifies the lead. Choice steps advance on selection; the last step collects contact details. Drop it into an overlay or inline.

```jsx
<StepForm
  title="Cuéntanos tu caso"
  onClose={() => setOpen(false)}
  steps={[
    { key: 'tipo', eyebrow: '§ 01 · Tu situación', type: 'choice',
      question: '¿Qué está pasando?', options: ['Humedades', 'Grietas o fisuras', 'Vicios ocultos', 'Reforma mal ejecutada'] },
    { key: 'contacto', eyebrow: '§ 04 · Contacto', type: 'fields',
      question: '¿Cómo te contactamos?',
      fields: [ { name: 'nombre', label: 'Nombre' }, { name: 'email', label: 'Correo', type: 'email' } ] },
  ]}
/>
```

Not a bouncy Typeform — fades only, `§ NN / NN` progress rule. Pair with the short professional form rather than replacing it.
