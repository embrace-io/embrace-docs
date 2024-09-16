import React, {type FC} from 'react';

import {type TextProps} from '../textProps';
import classes from "@site/src/helpers/classes";

import styles from './Body.module.css';

type BodyProp = TextProps<'body1' | 'body2' | 'body3' | 'body4'>;

const Body: FC<BodyProp> = ({
  children,
  className,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  htmlElement: HtmlElement = 'div',
  variant = 'body1',
  dataWalkthroughId,
  ...elementProps
}) => {
  return (
    <HtmlElement
      data-walkthrough-id={dataWalkthroughId}
      className={classes(className, styles[variant])}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...elementProps}>
      {children}
    </HtmlElement>
  );
};

export default Body;
