import * as React from 'react';

/**
 * The perito.barcelona denominative logo.
 * @startingPoint section="Brand" subtitle="Logo lockups" viewport="700x180"
 */
export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `lockup` (default), `stacked` (with descriptor), `mono` (compact badge). */
  variant?: 'lockup' | 'stacked' | 'mono';
  tone?: 'ink' | 'light';
  /** Cap height in px. */
  size?: number;
}

export function Wordmark(props: WordmarkProps): JSX.Element;
