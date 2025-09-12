import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Root.module.css';

const Root = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.root}>
      <header className={styles.root__header}>
        <h1 className={styles.root__title}>
          <Link to="./">gkino</Link>
        </h1>
        <nav className={styles.root__nav}>
          <div className={styles.dropdown} ref={dropdownRef}>
            <button className={styles.dropdown__button} onClick={toggleDropdown}>
              <FontAwesomeIcon icon={faUser} className={styles.icon} />
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${styles.arrow} ${isDropdownOpen ? styles.rotate : ''}`}
              />
            </button>
            <div className={`${styles.dropdown__content} ${isDropdownOpen ? styles.open : ''}`}>
              <Link to="/register" onClick={toggleDropdown}>
                Регистрация
              </Link>
              <Link to="/login" onClick={toggleDropdown}>
                Логин
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className={styles.root__main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
