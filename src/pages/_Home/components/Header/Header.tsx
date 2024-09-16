import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Embrace Documentation</h1>
      <h2 className={styles.subtitle}>
        Take the guesswork out of building next-level mobile experiences.
      </h2>
    </header>
  );
};

export default Header;
