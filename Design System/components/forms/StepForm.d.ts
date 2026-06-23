import * as React from 'react';

export interface StepFormField {
  name: string;
  label: React.ReactNode;
  type?: string;
  placeholder?: string;
  optional?: boolean;
  multiline?: boolean;
  rows?: number;
}

export interface StepFormStep {
  key: string;
  eyebrow?: React.ReactNode;
  question: React.ReactNode;
  helper?: React.ReactNode;
  /** `choice` advances on selection; `fields` collects inputs. */
  type: 'choice' | 'fields';
  options?: string[];
  fields?: StepFormField[];
}

export interface StepFormProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepFormStep[];
  title?: React.ReactNode;
  onComplete?: (answers: Record<string, any>) => void;
  onClose?: () => void;
  confirmTitle?: React.ReactNode;
  confirmText?: React.ReactNode;
}

/**
 * Guided multi-step intake (conversational structure, documentary form).
 * @startingPoint section="Forms" subtitle="Guided multi-step intake" viewport="700x460"
 */
export function StepForm(props: StepFormProps): JSX.Element;
