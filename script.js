const darkMode = document.querySelector('#darkMode');
const main = document.querySelector('main');
const movieArea = document.querySelector('.movieArea');
const searchField = document.querySelector('#searchField');
const searchInput = document.querySelector('#searchInput');
const favoriteTab = document.querySelector('#favoriteTab');

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

    movies = data;

    // If no movies found using search display error message
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

      const newBtnsDiv = document.createElement('div');
      newBtnsDiv.classList.add('movieBtns');

      const newReadMoreBtn = document.createElement('button');
      newReadMoreBtn.textContent = 'Läs mer';

      const newFavoriteBtn = document.createElement('button');
      newFavoriteBtn.id = 'favoriteBtn';
      newFavoriteBtn.textContent = '';
      newFavoriteBtn.innerHTML =
        '<span class="material-symbols-outlined">favorite</span>';
      newFavoriteBtn.addEventListener('click', () => {
        addFavorite(element);

        newFavoriteBtn.innerHTML =
          '<span class="material-icons">favorite</span>';
      });

      newBtnsDiv.append(newReadMoreBtn, newFavoriteBtn);

      newDiv.append(newMovieTitle, newImagePoster, newBtnsDiv);
      movieArea.append(newDiv);
    });
  } catch (error) {
    console.error('Error occured: ', error);
  }
}

console.log(movies);

// Default homepage search
addEventListener('DOMContentLoaded', () => {
  getMovies();
});

searchField.addEventListener('submit', (event) => {
  event.preventDefault();

  getMovies(searchInput.value);
  searchInput.value = '';
});

function addFavorite(indexMovie) {
  console.log('HEJEJE', indexMovie);

  let favoriteMovies = {
    title: indexMovie.Title,
    year: indexMovie.Year,
    imdbID: indexMovie.imdbID,
    poster: indexMovie.Poster,
  };

  favorites.push(favoriteMovies);
  console.log(favorites);

  /*   const favoritesLength = document.createElement('p');
  favoritesLength.textContent = favorites.length;
  document.querySelector('#favoriteTab').append(favoritesLength);
 */
  favoriteTab.innerHTML =
    '<span class="material-icons">favorite</span> Favoriter ' +
    favorites.length;
}

favoriteTab.addEventListener('click', () => {
  // Clearing movieCard div before adding new elements
  if (document.querySelector('.movieCard')) {
    movieArea.innerHTML = '';
  }

  favorites.forEach((element) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('movieCard');

    const newMovieTitle = document.createElement('h2');
    newMovieTitle.classList.add('movieTitle');
    newMovieTitle.textContent = element.title;

    const newImagePoster = document.createElement('img');
    newImagePoster.classList.add('moviePoster');
    newImagePoster.src = element.poster;

    const newBtnsDiv = document.createElement('div');
    newBtnsDiv.classList.add('movieBtns');

    const newReadMoreBtn = document.createElement('button');
    newReadMoreBtn.textContent = 'Läs mer';

    newBtnsDiv.append(newReadMoreBtn);

    newDiv.append(newMovieTitle, newImagePoster, newBtnsDiv);

    movieArea.append(newDiv);

    console.log(element.title);
  });
});
