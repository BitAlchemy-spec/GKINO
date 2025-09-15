import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './Root.module.css';

const Root = () => {
  return (
    <div className={styles.root}>
      <header className={styles.root__header}>
        <h1 className={styles.root__title}>
          <Link to="./">gkino</Link>
        </h1>
        <nav className={styles.root__nav}>
          <Link to="/login" className={styles.userButton} title="login">
            <FontAwesomeIcon icon={faUser} className={styles.icon} />
          </Link>
        </nav>
      </header>

      <main className={styles.root__main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
