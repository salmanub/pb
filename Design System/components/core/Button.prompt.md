Primary call-to-action button; use `primary` (oxide) for the main action on a view, `secondary` (ink outline) for alternatives, `ghost` for quiet/tertiary actions.

```jsx
<Button variant="primary" size="lg">Solicitar dictamen</Button>
<Button variant="secondary">Ver casos ratificados</Button>
```

Variants: `primary` (oxide fill), `secondary` (ink outline, fills ink on hover), `ghost`, `on-dark` (for dark sections). Sizes `sm | md | lg`. Press darkens — never scales. Pass `as="a"` with `href` for link buttons.
