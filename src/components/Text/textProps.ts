import {type DOMAttributes, type ReactNode} from 'react';

export type TextProps<Variant> = Omit<
  DOMAttributes<
    // Note: add more html elements as needed
    | HTMLDivElement
    | HTMLHeadingElement
    | HTMLSpanElement
    | HTMLParagraphElement
    | HTMLLabelElement
  >,
  'children'
> & {
  variant: Variant;
  className?: string;
  // Note: add more html elements as needed
  htmlElement?:
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'span'
    | 'p'
    | 'label';
  children: ReactNode;
  dataWalkthroughId?: string;
};
