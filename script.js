const darkMode = document.querySelector('#darkMode');
const main = document.querySelector('main');
const movieArea = document.querySelector('.movieArea');
const searchField = document.querySelector('#searchField');
const searchInput = document.querySelector('#searchInput');

darkMode.addEventListener('click', () => {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    darkMode.textContent = 'dark_mode';
  } else {
    document.body.classList.add('dark-mode');
    darkMode.textContent = 'light_mode';
  }
});

let movies = [];
let favorites = [];
console.log(movies);

// Api fetch
const apiKi = 'b43ebaaf';

// Default search '= x'
async function getMovies(search = 'spider-man') {
  // Clearing movieCard div before adding new elements
  if (document.querySelector('.movieCard')) {
    movieArea.innerHTML = '';
  }

  try {
    console.log('KÖR: ', search);

    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKi}&s=${search}`
    );
    const data = await response.json();
    console.log(data);

    if (data.Response === 'False') {
      const newError = document.createElement('h2');
      newError.textContent = 'Ingen film hittades, testa annan sökning.';
      newError.classList.add('movieCard');
      newError.id = 'errorTxt';
      console.log(movieArea);

      movieArea.append(newError);
    }

    // Create elements and append
    data.Search.forEach((element) => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('movieCard');

      const newMovieTitle = document.createElement('h2');
      newMovieTitle.classList.add('movieTitle');
      newMovieTitle.textContent = element.Title;

      const newImagePoster = document.createElement('img');
      newImagePoster.classList.add('moviePoster');
      newImagePoster.src = element.Poster;

      const newReadMoreBtn = document.createElement('button');
      newReadMoreBtn.textContent = 'Läs mer';

      const newFavoriteBtn = document.createElement('button');
      newFavoriteBtn.textContent = '';
      newFavoriteBtn.innerHTML =
        '<span class="material-symbols-outlined">favorite</span>';

      newDiv.append(
        newMovieTitle,
        newImagePoster,
        newReadMoreBtn,
        newFavoriteBtn
      );
      movieArea.append(newDiv);
    });
  } catch (error) {
    console.error('Error occured: ', error);
  }
}
// Default homepage search
addEventListener('DOMContentLoaded', () => {
  getMovies();
});

searchField.addEventListener('submit', (event) => {
  event.preventDefault();

  getMovies(searchInput.value);
  searchInput.value = '';
});
