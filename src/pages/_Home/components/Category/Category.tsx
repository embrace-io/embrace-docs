import { type FC } from "react";
import { type HomeCardProps } from "@site/src/pages/_Home/components/HomeCard/HomeCard";
import HomeCard from "@site/src/pages/_Home/components/HomeCard";
import Display from "@site/src/components/Text/Display";

import styles from "./Category.module.css";

type CategoryProps = {
  title: string;
  items: HomeCardProps[];
};

const Category: FC<CategoryProps> = ({ title, items }) => {
  return (
    <section className={styles.container}>
      <Display variant="display3">{title}</Display>
      <div className={styles.items}>
        {items.map((item) => (
          <HomeCard
            key={item.title}
            title={item.title}
            description={item.description}
            icon={item.icon}
            linkTo={item.linkTo}
          />
        ))}
      </div>
    </section>
  );
};

export default Category;
