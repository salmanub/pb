import * as React from 'react';

/**
 * Verifiable figure presented as evidence.
 * @startingPoint section="Data" subtitle="Cited KPI figure" viewport="700x180"
 */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The figure, e.g. "€2,8 M" or "340". */
  value: React.ReactNode;
  /** What it measures. */
  label: React.ReactNode;
  /** Mono source / footnote — what makes it verifiable. */
  source?: React.ReactNode;
  align?: 'left' | 'center';
  /** Render the figure in oxide. */
  accent?: boolean;
  /** Switch label/source colours for placement on the ink surface. */
  onDark?: boolean;
}

export function Stat(props: StatProps): JSX.Element;
