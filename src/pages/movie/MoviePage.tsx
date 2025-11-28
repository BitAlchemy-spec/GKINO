// src/pages/MoviePage/MoviePage.tsx
import React, { useCallback } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { movies } from '../../data/movies';
import styles from './MoviePage.module.css';

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const renderPlayer = useCallback(
    () => (
      <ReactPlayer
        src="https://www.youtube.com/watch?v=LXb3EKWsInQ"
        width={100 + '%'}
        height={400}
        controls
        playing={false}
        muted={false}
        volume={0.8}
        playbackRate={1}
        className="custom-player"
      />
    ),
    []
  );

  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return <p className={styles['movie-page__not-found']}>Фильм не найдено</p>;
  }

  return (
    <main className={styles['movie-page']}>
      <article className={styles['movie-page__card']}>

        {/* Постер */}
        <figure className={styles['movie-page__poster-wrapper']}>
          <img
            src={movie.img}
            alt={movie.title}
            className={styles['movie-page__poster']}
            loading="lazy"
          />
        </figure>

        {/* Информация */}
        <section className={styles['movie-page__info']}>
          <header>
            <h1 className={styles['movie-page__title']}>{movie.title}</h1>
          </header>

          {/* Метаданные */}
          <dl className={styles['movie-page__meta']}>

            <div className={styles['movie-page__meta-item']}>
              <dt>Год:</dt>
              <dd>{movie.year}</dd>
            </div>

            <div className={styles['movie-page__meta-item']}>
              <dt>Страна:</dt>
              <dd>{movie.country}</dd>
            </div>

            <div className={styles['movie-page__meta-item']}>
              <dt>Режиссёр:</dt>
              <dd>{movie.director}</dd>
            </div>

            <div className={styles['movie-page__meta-item']}>
              <dt>Акторы:</dt>
              <dd>{movie.actors.join(', ')}</dd>
            </div>

            <div className={styles['movie-page__meta-item']}>
              <dt>Жанры:</dt>
              <dd>{movie.genres.join(', ')}</dd>
            </div>

          </dl>

          {/* Видео */}
          <section className={styles['movie-page__media']}>
            <div className={styles['movie-page__video']}>
              {renderPlayer()}
            </div>
          </section>

        </section>
      </article>
    </main>
  );
};

export default MoviePage;

