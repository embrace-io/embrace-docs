import React, {type FC} from 'react';

import {type TextProps} from '../textProps';
import classes from "@site/src/helpers/classes";

import styles from './Caption.module.css';

type CaptionProp = TextProps<'caption1' | 'caption2' | 'caption3' | 'caption4'>;

const Caption: FC<CaptionProp> = ({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  htmlElement: HtmlElement = 'div',
  variant = 'caption1',
  dataWalkthroughId,
  ...elementProps
}) => {
  return (
    <HtmlElement
      // eslint-disable-next-line react/jsx-props-no-spreading,@typescript-eslint/naming-convention
      {...(dataWalkthroughId ? {'data-walkthrough-id': dataWalkthroughId} : {})}
      className={classes(className, styles[variant])}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...elementProps}>
      {children}
    </HtmlElement>
  );
};

export default Caption;
