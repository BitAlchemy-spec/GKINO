import { Outlet, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import styles from "./Root.module.css";

const Root = () => {
  return (
    <div className={styles.root}>
      <header className={styles.root__header}>
        <h1 className={styles.root__title}>
          <NavLink to="/" aria-label="Главная страница">
            gkino
          </NavLink>
        </h1>

        <nav className={styles.root__nav} aria-label="Основная навигация">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.userButton} ${styles.userButton_active}`
                : styles.userButton
            }
            title="Главная"
            aria-label="Главная"
          >
            <FontAwesomeIcon icon={faHome} className={styles.icon} />
          </NavLink>
        </nav>
      </header>

      <main className={styles.root__main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;

