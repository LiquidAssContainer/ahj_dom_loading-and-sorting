export default class MoviesTable {
  constructor() {
    this.defaultOrder = [];
  }

  renderTable(json) {
    let data;
    try {
      data = JSON.parse(json);
    } catch (err) {
      throw new Error('Некорректный JSON');
    }

    const propsByOrder = ['id', 'title', 'year', 'imdb'];
    const tbody = document.getElementsByTagName('tbody')[0];

    for (const movie of data) {
      const row = document.createElement('tr');

      for (const prop of propsByOrder) {
        row.dataset[prop] = movie[prop];
        const cell = document.createElement('td');
        let cellText = '';
        switch (prop) {
          case 'year':
            cellText = `(${movie[prop]})`;
            break;
          case 'imdb':
            cellText = `imdb: ${movie[prop].toFixed(2)}`;
            break;
          default:
            cellText = movie[prop];
        }
        cell.textContent = cellText;
        row.appendChild(cell);
      }
      tbody.appendChild(row);
      this.defaultOrder.push(row);
    }
    this.addEventListeners();
  }

  addEventListeners() {
    const table = document.getElementsByTagName('table')[0];
    table.addEventListener('click', (e) => this.changeSorting(e.target));
  }

  changeSorting(target) {
    if (!target.classList.contains('table-header')) {
      return;
    }

    const activeSorting = document.querySelector('[data-sort-direction]');
    if (activeSorting && activeSorting !== target) {
      delete activeSorting.dataset.sortDirection;
    }

    this.switchSortDirection(target);

    let rowsArray = [...document.querySelectorAll('tbody tr')];

    switch (target.dataset.sortDirection) {
      case undefined:
        rowsArray = this.defaultOrder;
        break;
      case 'ascending':
        this.sortArray(rowsArray, target.dataset.name);
        break;
      case 'descending':
        rowsArray.reverse();
    }

    document.getElementsByTagName('tbody')[0].innerHTML = '';
    // вроде не очень оптимальное решение, да
    for (const elem of rowsArray) {
      document.getElementsByTagName('tbody')[0].appendChild(elem);
    }
  }

  switchSortDirection(target) {
    switch (target.dataset.sortDirection) {
      case undefined:
        target.dataset.sortDirection = 'ascending';
        break;
      case 'ascending':
        target.dataset.sortDirection = 'descending';
        break;
      case 'descending':
        delete target.dataset.sortDirection;
    }
  }

  sortArray(arr, sortBy) {
    arr.sort((a, b) => {
      let aName = a.dataset[sortBy];
      let bName = b.dataset[sortBy];

      if (sortBy === 'title') {
        return aName.localeCompare(bName, 'ru');
      }

      if (+aName < +bName) return -1;
      if (+aName > +bName) return 1;
      return 0;
    });
  }
}
