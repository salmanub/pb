import * as React from 'react';

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  optional?: boolean;
  htmlFor?: string;
  children?: React.ReactNode;
}

/** Label + control wrapper with mono uppercase label. */
export function Field(props: FieldProps): JSX.Element;
