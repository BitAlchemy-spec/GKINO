// src/pages/HomePage/HomePage.tsx
import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

/* Types */
type Movie = {
  id: number;
  title: string;
  img: string;
  category: string;
};

/* Movies */
const movies: Movie[] = [
  { id: 1, title: 'Невероятное путешествие', img: 'https://picsum.photos/seed/movie1/400/600', category: 'Приключения' },
  { id: 2, title: 'Тайна города', img: 'https://picsum.photos/seed/movie2/400/600', category: 'Детектив' },
  { id: 3, title: 'Космическая одиссея', img: 'https://picsum.photos/seed/movie3/400/600', category: 'Фантастика' },
  { id: 4, title: 'Затерянный мир', img: 'https://picsum.photos/seed/movie4/400/600', category: 'Приключения' },
  { id: 5, title: 'Империя роботов', img: 'https://picsum.photos/seed/movie5/400/600', category: 'Фантастика' },
  { id: 6, title: 'Ограбление века', img: 'https://picsum.photos/seed/movie6/400/600', category: 'Экшн' },
  { id: 7, title: 'Древние проклятия', img: 'https://picsum.photos/seed/movie7/400/600', category: 'Детектив' },
  { id: 8, title: 'Путешествие к центру Земли', img: 'https://picsum.photos/seed/movie8/400/600', category: 'Приключения' },
  { id: 9, title: 'Звездный рубеж', img: 'https://picsum.photos/seed/movie9/400/600', category: 'Фантастика' },
  { id: 10, title: 'Гонка на выживание', img: 'https://picsum.photos/seed/movie10/400/600', category: 'Экшн' },
];

/* Categories */
const allCategories = [
  'Приключения',
  'Фантастика',
  'Комедия',
  'Драма',
  'Фэнтези',
  'Ужасы',
  'Военный',
  'Детектив',
];

/* MovieCard */
const MovieCard = React.memo(({ movie, onWatch }: { movie: Movie; onWatch: (id: number) => void }) => (
  <li className={styles.card}>
    <article>
      <div className={styles.card__imgWrap}>
        <img src={movie.img} alt={movie.title} className={styles.card__img} />
      </div>

      <div className={styles.card__body}>
        <h3 className={styles.card__title}>{movie.title}</h3>
        <button className={styles.card__btn} onClick={() => onWatch(movie.id)}>
          Посмотреть
        </button>
      </div>
    </article>
  </li>
));
MovieCard.displayName = 'MovieCard';

/* Pagination */
const Pagination = React.memo(
  ({ currentPage, totalPages, onChange }: { currentPage: number; totalPages: number; onChange: (p: number) => void }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
      <nav className={styles.pagination}>
        <ul className={styles.pagination__list}>
          <li>
            <button
              className={styles.pagination__button}
              disabled={currentPage === 1}
              onClick={() => onChange(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>

          {pages.map((num) => (
            <li key={num}>
              <button
                onClick={() => onChange(num)}
                className={`${styles.pagination__button} ${
                  currentPage === num ? styles['pagination__button--active'] : ''
                }`}
              >
                {num}
              </button>
            </li>
          ))}

          <li>
            <button
              className={styles.pagination__button}
              disabled={currentPage === totalPages}
              onClick={() => onChange(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </nav>
    );
  },
);
Pagination.displayName = 'Pagination';

/* HomePage */
const HomePage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const matchCategory = category ? m.category === category : true;
      const matchSearch = search ? m.title.toLowerCase().includes(search.toLowerCase()) : true;
      return matchCategory && matchSearch;
    });
  }, [search, category]);

  const totalPages = Math.ceil(filteredMovies.length / itemsPerPage);

  const paginated = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredMovies.slice(start, start + itemsPerPage);
  }, [filteredMovies, page]);

  const handleWatch = useCallback((id: number) => navigate(`/movies/${id}`), [navigate]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <h1 className={styles.logo}>Поиск фильмов</h1>

          {/* Search */}
          <div className={styles.searchWrap}>
            <input
              type="search"
              placeholder="Введите текст..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCategory(null);
                setPage(1);
              }}
            />
          </div>

          {/* Categories */}
          <nav>

            <ul className={styles.sidebar__list}>
              <li
                className={`${styles.sidebar__item} ${category === null ? styles['sidebar__item--active'] : ''}`}
                onClick={() => {
                  setCategory(null);
                  setPage(1);
                }}
              >
                Все категории
              </li>

              {allCategories.map((cat) => (
                <li
                  key={cat}
                  className={`${styles.sidebar__item} ${category === cat ? styles['sidebar__item--active'] : ''}`}
                  onClick={() => {
                    setCategory(cat);
                    setPage(1);
                  }}
                >
                  {cat}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* MAIN */}
        <main className={styles.homepage}>
          <section>
            <ul className={styles.grid}>
              {paginated.length ? (
                paginated.map((movie) => <MovieCard key={movie.id} movie={movie} onWatch={handleWatch} />)
              ) : (
                <p className={styles.noResults}>Фильмы не найдены</p>
              )}
            </ul>
          </section>

          <Pagination currentPage={page} totalPages={totalPages} onChange={setPage} />

          <footer className={styles.footer}>
            <section className={styles.footer__policy}>
              <h4 className={styles.footer__title}>Про нас</h4>
              <p className={styles.footer__text}>
                Наша платформа предлагает просмотр фильмов без рекламы, в хорошем качестве и с удобным подбором по категориям.
              </p>
            </section>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default HomePage;

