import * as React from 'react';

/**
 * Registration stamp / credibility seal.
 * @startingPoint section="Brand" subtitle="Registration seal device" viewport="700x200"
 */
export interface SealProps extends React.SVGAttributes<SVGElement> {
  /** Centre monogram, e.g. "VS". */
  monogram?: string;
  /** Curved top text. */
  top?: string;
  /** Curved bottom text. */
  bottom?: string;
  /** Diameter in px. */
  size?: number;
  tone?: 'oxide' | 'ink' | 'light';
}

export function Seal(props: SealProps): JSX.Element;
