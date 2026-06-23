import * as React from 'react';

export interface AccordionItem {
  q: React.ReactNode;
  a: React.ReactNode;
}

/**
 * Quiet FAQ disclosure list.
 * @startingPoint section="Disclosure" subtitle="FAQ accordion" viewport="700x320"
 */
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** Index open on mount; -1 for all closed. */
  defaultOpen?: number;
}

export function Accordion(props: AccordionProps): JSX.Element;
