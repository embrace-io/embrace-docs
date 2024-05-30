import { type FC, type ReactNode } from "react";
import Title from "@site/src/components/Text/Title";
import Body from "@site/src/components/Text/Body";
import Card from "@site/src/components/Card";
import Link from "@docusaurus/Link";

import styles from "./HomeCard.module.css";

type HomeCardProps = {
  title: string;
  description?: string;
  icon: ReactNode;
  linkTo: string;
};

const HomeCard: FC<HomeCardProps> = ({ title, description, icon, linkTo }) => {
  return (
    <Link to={linkTo} className={styles.link}>
      <Card className={styles.container}>
        <div className={styles.header}>
          {icon}
          <Title variant="title2" htmlElement="h2">
            {title}
          </Title>
        </div>
        {description && (
          <Body variant="body4" htmlElement="p">
            {description}
          </Body>
        )}
      </Card>
    </Link>
  );
};

export default HomeCard;
export type { HomeCardProps };
