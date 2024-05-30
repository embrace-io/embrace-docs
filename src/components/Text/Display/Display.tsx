import React, {type FC} from 'react';

import {type TextProps} from '../textProps';
import classes from "@site/src/helpers/classes";

import styles from './Display.module.css';

type DisplayProp = TextProps<'display1' | 'display2' | 'display3'>;
const Display: FC<DisplayProp> = ({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  htmlElement: HtmlElement = 'div',
  variant = 'display1',
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

export default Display;
