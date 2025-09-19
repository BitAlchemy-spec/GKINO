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
    director: 'Стивен Спилберг',
    actors: ['Том Хэнкс', 'Эми Адамс', 'Мэтт Дэймон'],
    genres: ['Приключения', 'Фэнтези', 'Семейный'],
  },
  {
    id: 2,
    title: 'Тайна города',
    img: 'https://picsum.photos/seed/movie2/400/600',
    category: 'Детектив',
    year: 2020,
    country: 'Украина',
    director: 'Анна Иваненко',
    actors: ['Ирма Витовская', 'Ахтем Сеитаблаев', 'Алексей Горбунов'],
    genres: ['Детектив', 'Драма', 'Триллер'],
  },
  {
    id: 3,
    title: 'Последний рассвет',
    img: 'https://picsum.photos/seed/movie3/400/600',
    category: 'Драма',
    year: 2019,
    country: 'Франция',
    director: 'Луи Гаррель',
    actors: ['Венсан Кассель', 'Леа Сейду', 'Ромен Дюрис'],
    genres: ['Драма', 'Романтика'],
  },
  {
    id: 4,
    title: 'Звёздный рубеж',
    img: 'https://picsum.photos/seed/movie4/400/600',
    category: 'Фантастика',
    year: 2022,
    country: 'Канада',
    director: 'Дени Вильнёв',
    actors: ['Райан Гослинг', 'Зои Салдана', 'Оскар Айзек'],
    genres: ['Фантастика', 'Боевик', 'Приключения'],
  },
  {
    id: 5,
    title: 'Тени прошлого',
    img: 'https://picsum.photos/seed/movie5/400/600',
    category: 'Триллер',
    year: 2018,
    country: 'Испания',
    director: 'Педро Альмодовар',
    actors: ['Антонио Бандерас', 'Пенелопа Крус'],
    genres: ['Триллер', 'Детектив', 'Мистика'],
  },
  {
    id: 6,
    title: 'Свет над океаном',
    img: 'https://picsum.photos/seed/movie6/400/600',
    category: 'Романтика',
    year: 2021,
    country: 'Италия',
    director: 'Паоло Соррентино',
    actors: ['Моника Беллуччи', 'Риккардо Скамарчо'],
    genres: ['Романтика', 'Драма'],
  },
  {
    id: 7,
    title: 'Бегущий в буре',
    img: 'https://picsum.photos/seed/movie7/400/600',
    category: 'Боевик',
    year: 2023,
    country: 'США',
    director: 'Кристофер Нолан',
    actors: ['Кристиан Бейл', 'Энн Хэтэуэй', 'Джозеф Гордон-Левитт'],
    genres: ['Боевик', 'Триллер', 'Фантастика'],
  },
  {
    id: 8,
    title: 'Голос тишины',
    img: 'https://picsum.photos/seed/movie8/400/600',
    category: 'Артхаус',
    year: 2017,
    country: 'Япония',
    director: 'Хирокадзу Корээда',
    actors: ['Такаши Китано', 'Ринко Кикучи'],
    genres: ['Артхаус', 'Драма', 'Философский'],
  },
  {
    id: 9,
    title: 'Затерянный храм',
    img: 'https://picsum.photos/seed/movie9/400/600',
    category: 'Приключения',
    year: 2022,
    country: 'Индия',
    director: 'Рахул Шарма',
    actors: ['Ирфан Кхан', 'Приянка Чопра', 'Амитабх Баччан'],
    genres: ['Приключения', 'Фэнтези', 'Экшн'],
  },
  {
    id: 10,
    title: 'Легенда о двух мирах',
    img: 'https://picsum.photos/seed/movie10/400/600',
    category: 'Фэнтези',
    year: 2024,
    country: 'Великобритания',
    director: 'Гай Ричи',
    actors: ['Орландо Блум', 'Кира Найтли', 'Идрис Эльба'],
    genres: ['Фэнтези', 'Драма', 'Эпос'],
  },
];
