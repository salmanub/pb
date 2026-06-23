import * as React from 'react';

/**
 * Primary call to action.
 * @startingPoint section="Core" subtitle="Oxide / outline / ghost actions" viewport="700x160"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` = oxide fill, `secondary` = ink outline, `ghost` = quiet. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'on-dark';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  /** Render as another element, e.g. 'a' for links. */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
