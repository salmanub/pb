import * as React from 'react';

/**
 * Monospace evidence label / reference code.
 * @startingPoint section="Core" subtitle="Mono reference & status labels" viewport="700x140"
 */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** `accent` = oxide tint, `ink` = solid, `positive`/`caution` = status. */
  variant?: 'default' | 'outline' | 'accent' | 'ink' | 'positive' | 'caution';
  size?: 'sm' | 'md';
  /** Leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
