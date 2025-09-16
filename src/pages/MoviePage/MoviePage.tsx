// src/pages/MoviePage/MoviePage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { movies } from './../../data/movies';
import styles from './MoviePage.module.css';

const MoviePage: React.FC = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));
  const [activeTab, setActiveTab] = useState<'trailer' | 'videos'>('trailer');

  if (!movie) {
    return <p className={styles['movie-page__not-found']}>Фильм не найдено</p>;
  }

  return (
    <main className={styles['movie-page']}>
      <article className={styles['movie-page__card']}>
        {/* ==== Постер ==== */}
        <figure className={styles['movie-page__poster-wrapper']}>
          <img src={movie.img} alt={movie.title} className={styles['movie-page__poster']} />
        </figure>

        {/* ==== Инфо-блок ==== */}
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
              <dt>Режисер:</dt>
              <dd>{movie.director}</dd>
            </div>
            <div className={styles['movie-page__meta-item']}>
              <dt>Актори:</dt>
              <dd>{movie.actors.join(', ')}</dd>
            </div>
            <div className={styles['movie-page__meta-item']}>
              <dt>Жанри:</dt>
              <dd>{movie.genres.join(', ')}</dd>
            </div>
          </dl>

          {/* ==== Медиа-блок ==== */}
          <section className={styles['movie-page__media']}>
            <nav className={styles['movie-page__tabs']} aria-label="Переключатель медиа">
              <button
                type="button"
                className={`${styles['movie-page__tab']} ${
                  activeTab === 'trailer' ? styles['movie-page__tab--active'] : ''
                }`}
                onClick={() => setActiveTab('trailer')}
                aria-pressed={activeTab === 'trailer'}
              >
                Трейлер
              </button>
              <button
                type="button"
                className={`${styles['movie-page__tab']} ${
                  activeTab === 'videos' ? styles['movie-page__tab--active'] : ''
                }`}
                onClick={() => setActiveTab('videos')}
                aria-pressed={activeTab === 'videos'}
              >
                Видео
              </button>
            </nav>

            <div className={styles['movie-page__tab-content']}>
              {activeTab === 'trailer' && (
                <div className={styles['movie-page__video']}>
                  <ReactPlayer url={movie.trailerUrl} controls width="100%" height="400px" />
                </div>
              )}

              {activeTab === 'videos' && (
                <div className={styles['movie-page__videos']}>
                  {movie.videos.map((videoUrl, index) => (
                    <div key={index} className={styles['movie-page__video']}>
                      <ReactPlayer url={videoUrl} controls width="100%" height="400px" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </section>
      </article>
    </main>
  );
};

export default MoviePage;
