import React, {type ComponentPropsWithoutRef, forwardRef} from 'react';
import classes from "@site/src/helpers/classes";

import styles from './Card.module.css';

type CardProps = {
  dataTestId?: string;
  ariaLabel?: string;
  dataProductId?: string;
  dataWalkthroughId?: string;
};

const Card = forwardRef<
  HTMLElement,
  ComponentPropsWithoutRef<'section'> & CardProps
>(
  (
    {
      children,
      className,
      onClick,
      onMouseOut,
      dataTestId,
      ariaLabel,
      dataProductId,
      dataWalkthroughId,
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={classes(styles.card, className)}
        onClick={onClick}
        onMouseOut={onMouseOut}
        aria-label={ariaLabel}
        data-testid={dataTestId}
        data-product-id={dataProductId}
        data-walkthrough-id={dataWalkthroughId}>
        {children}
      </section>
    );
  },
);

Card.displayName = 'Card';

export default Card;
