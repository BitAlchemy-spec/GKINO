import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './HomePage.module.css';

type Movie = {
  id: number;
  title: string;
  img: string;
  category: string;
};

// ==== Список фильмов (тестовые данные) ====
const movies: Movie[] = [
  {
    id: 1,
    title: 'Невероятное путешествие',
    img: 'https://picsum.photos/seed/movie1/400/600',
    category: 'Приключения',
  },
  {
    id: 2,
    title: 'Тайна города',
    img: 'https://picsum.photos/seed/movie2/400/600',
    category: 'Детектив',
  },
  {
    id: 3,
    title: 'Космическая одиссея',
    img: 'https://picsum.photos/seed/movie3/400/600',
    category: 'Фантастика',
  },
  {
    id: 4,
    title: 'Затерянный мир',
    img: 'https://picsum.photos/seed/movie4/400/600',
    category: 'Приключения',
  },
  {
    id: 5,
    title: 'Империя роботов',
    img: 'https://picsum.photos/seed/movie5/400/600',
    category: 'Фантастика',
  },
  {
    id: 6,
    title: 'Ограбление века',
    img: 'https://picsum.photos/seed/movie6/400/600',
    category: 'Экшн',
  },
  {
    id: 7,
    title: 'Древние проклятия',
    img: 'https://picsum.photos/seed/movie7/400/600',
    category: 'Детектив',
  },
  {
    id: 8,
    title: 'Путешествие к центру Земли',
    img: 'https://picsum.photos/seed/movie8/400/600',
    category: 'Приключения',
  },
  {
    id: 9,
    title: 'Звездный рубеж',
    img: 'https://picsum.photos/seed/movie9/400/600',
    category: 'Фантастика',
  },
  {
    id: 10,
    title: 'Гонка на выживание',
    img: 'https://picsum.photos/seed/movie10/400/600',
    category: 'Экшн',
  },
];

const allCategories: string[] = [
  'Приключения',
  'Фантастика',
  'Комедия',
  'Драма',
  'Фэнтези',
  'Ужасы',
  'Военный',
  'Детектив',
];

// ==== Компонент карточки фильма ====
const MovieCard: React.FC<{ movie: Movie; onWatch: (id: number) => void }> = React.memo(
  ({ movie, onWatch }) => (
    <li className={styles.card} aria-labelledby={`movie-${movie.id}`}>
      <div className={styles.card__imgWrap}>
        <img src={movie.img} alt={movie.title} className={styles.card__img} loading="lazy" />
      </div>
      <div className={styles.card__body}>
        <h3 id={`movie-${movie.id}`} className={styles.card__title}>
          {movie.title}
        </h3>
        <button className={styles.card__btn} onClick={() => onWatch(movie.id)}>
          Посмотреть
        </button>
      </div>
    </li>
  ),
);

// ==== Компонент пагинации ====
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = React.memo(
  ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null; // скрыть если страниц меньше 2
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <nav aria-label="Навигация по страницам" className={styles.pagination}>
        <ul className={styles.pagination__list}>
          {/* Кнопка "назад" */}
          <li>
            <button
              className={styles.pagination__button}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
          </li>

          {/* Номера страниц */}
          {pageNumbers.map((num) => (
            <li key={num}>
              <button
                onClick={() => onPageChange(num)}
                className={`${styles.pagination__button} ${
                  num === currentPage ? styles['pagination__button--active'] : ''
                }`}
              >
                {num}
              </button>
            </li>
          ))}

          {/* Кнопка "вперёд" */}
          <li>
            <button
              className={styles.pagination__button}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  },
);

// ==== Главная страница ====
const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // ==== Состояния ====
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // текущая категория
  const [currentPage, setCurrentPage] = useState(1); // текущая страница
  const [movieSearch, setMovieSearch] = useState(''); // строка поиска
  const itemsPerPage = 8; // кол-во фильмов на страницу

  // ==== Фильтрация фильмов ====
  const filteredMovies = useMemo(() => {
    let result = movies;

    // фильтрация по категории
    if (selectedCategory) {
      result = result.filter((m) => m.category === selectedCategory);
    }
    // фильтрация по строке поиска
    if (movieSearch.trim()) {
      result = result.filter((m) => m.title.toLowerCase().includes(movieSearch.toLowerCase()));
    }
    return result;
  }, [selectedCategory, movieSearch]);

  // ==== Разбиение на страницы ====
  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);
  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ==== Обработчики ====
  const handleWatch = useCallback((id: number) => navigate(`/movies/${id}`), [navigate]);
  const handlePageChange = useCallback((page: number) => setCurrentPage(page), []);
  const handleCategoryChange = useCallback((category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1); // при смене категории сброс на первую страницу
  }, []);
  const handleSearchChange = useCallback((value: string) => {
    setMovieSearch(value);
    setSelectedCategory(null); // при поиске сбрасываем категорию
    setCurrentPage(1);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {/* ==== Сайдбар ==== */}
        <aside className={styles.sidebar}>
          <h1 className={styles.logo}>Поиск</h1>

          {/* ==== Поле поиска ==== */}
          <div className={styles.searchWrap}>
            <input
              type="text"
              placeholder="Введите текст"
              className={styles.searchInput}
              value={movieSearch}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            {/* Кнопка очистки поиска */}
            {movieSearch && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => handleSearchChange('')}
                aria-label="Очистить поиск"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            )}
          </div>

          {/* ==== Список категорий ==== */}
          <h2 className={styles.sidebar__title}>Категории</h2>
          <ul className={styles.sidebar__list}>
            {/* Главная (сброс фильтров) */}
            <li
              className={`${styles.sidebar__item} ${
                selectedCategory === null ? styles['sidebar__item--active'] : ''
              }`}
              onClick={() => handleCategoryChange(null)}
            >
              Главная
            </li>
            {/* Выводим все категории */}
            {allCategories.map((category) => (
              <li
                key={category}
                className={`${styles.sidebar__item} ${
                  selectedCategory === category ? styles['sidebar__item--active'] : ''
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* ==== Контент ==== */}
        <main className={styles.homepage}>
          <section aria-label="Список фильмов">
            <ul className={styles.grid}>
              {paginatedMovies.length > 0 ? (
                paginatedMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} onWatch={handleWatch} />
                ))
              ) : (
                <p className={styles.noResults}>Фильмы не найдены</p>
              )}
            </ul>
          </section>

          {/* ==== Пагинация ==== */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />

          {/* ==== Футер ==== */}
          <footer className={styles.footer}>
            <div className={styles.footer__policy}>
              <h4 className={styles.footer__title}>Политика конфиденциальности</h4>
              <p className={styles.footer__text}>
                Администратор сайта обязуется сохранять вашу конфиденциальность.
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
