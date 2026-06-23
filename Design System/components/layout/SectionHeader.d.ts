import * as React from 'react';

/**
 * Section eyebrow + serif title + lede (the dossier marginalia).
 * @startingPoint section="Layout" subtitle="Section heading block" viewport="700x220"
 */
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Mono reference eyebrow, e.g. "§ 02 · Servicios". */
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  align?: 'left' | 'center';
  size?: 'sm' | 'md' | 'lg';
  /** For use over the ink section. */
  onDark?: boolean;
}

export function SectionHeader(props: SectionHeaderProps): JSX.Element;
