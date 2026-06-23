import * as React from 'react';

/**
 * Text input / textarea with oxide focus ring.
 * @startingPoint section="Forms" subtitle="Text input & textarea" viewport="700x160"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Render a textarea instead. */
  multiline?: boolean;
  invalid?: boolean;
  rows?: number;
}

export function Input(props: InputProps): JSX.Element;
