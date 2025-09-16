// src/data/movies.ts
export type Movie = {
  id: number;
  title: string;
  img: string;
  category: string;
  year: number;
  country: string;
  director: string;
  actors: string[];
  genres: string[];
};

export const movies: Movie[] = [
  {
    id: 1,
    title: 'Невероятное путешествие',
    img: 'https://picsum.photos/seed/movie1/400/600',
    category: 'Приключения',
    year: 2021,
    country: 'США',
    director: 'Джон Смит',
    actors: ['Актер '],
    genres: ['Приключения', 'Фэнтези'],
  },
  {
    id: 2,
    title: 'Тайна города',
    img: 'https://picsum.photos/seed/movie2/400/600',
    category: 'Детектив',
    year: 2020,
    country: 'Украина',
    director: 'Анна Иваненко',
    actors: ['Актер 3', 'Актер 4'],
    genres: ['Детектив', 'Драма'],
  },
];
