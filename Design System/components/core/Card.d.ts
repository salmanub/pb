import * as React from 'react';

/**
 * Documentary surface — hairline border, near-square corners.
 * @startingPoint section="Core" subtitle="Hairline document surface" viewport="700x240"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional monospace reference header (string or node). */
  refCode?: React.ReactNode;
  /** Lift + accent border on hover. */
  interactive?: boolean;
  tone?: 'paper' | 'raised' | 'ink' | 'tint';
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
