import Layout from "@theme/Layout";
import Header from "@site/src/pages/_Home/components/Header";
import Categories from "@site/src/pages/_Home/components/Categories";

import styles from "./Home.module.css";

const Home = () => {
  return (
    <Layout>
      <Header />
      <main className={styles.wrapper}>
        <div className={styles.container}>
          <Categories />
        </div>
      </main>
    </Layout>
  );
};

export default Home;
