import MoviesTable from '../MoviesTable';

test('Expect JSON error', () => {
  const moviesTable = new MoviesTable();
  const json = `[
    {
      "id": 26,
      "title": "Побег из Шоушенка",
      "imdb": 9.30,
      "year": 1994
    },
    {
      "id": 25,
      "title": "Крёстный отец",
      "imdb": 9.20,
      year: 1972
    },
  ]`;
  expect(() => moviesTable.renderTable(json)).toThrow(Error('Некорректный JSON'));
});
