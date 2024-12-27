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
    localStorage.setItem('darkMode', 'false');
  } else {
    document.body.classList.add('dark-mode');
    darkMode.textContent = 'light_mode';
    localStorage.setItem('darkMode', 'true');
  }
});

let movies = [];
let favorites = [];
console.log(favorites);

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

      // Favorite button
      const newFavoriteBtn = document.createElement('button');
      newFavoriteBtn.id = 'favoriteBtn';
      newFavoriteBtn.textContent = '';
      newFavoriteBtn.innerHTML =
        '<span class="material-symbols-outlined">favorite</span>';

      console.log('favorites:', favorites);

      let isFavorited = false;

      // check if movie already favorited, some returns true/false instead of .filter
      if (favorites.some((fav) => fav.imdbID === element.imdbID)) {
        console.log('TRUE Finns id redan');
        isFavorited = true;
        newFavoriteBtn.innerHTML =
          '<span class="material-icons">favorite</span>';
      } else {
        console.log('FALSE ID FINNS EJ REDAN');
      }

      newFavoriteBtn.addEventListener('click', () => {
        if (isFavorited === true) {
          // Remove favorite

          isFavorited = false;
          removeFavorite(element.imdbID);

          newFavoriteBtn.innerHTML =
            '<span class="material-symbols-outlined">favorite</span>';
        } else {
          // Add favorite

          isFavorited = true;
          addFavorite(element);
          newFavoriteBtn.innerHTML =
            '<span class="material-icons">favorite</span>';
        }
      });

      //Append elements
      newBtnsDiv.append(newReadMoreBtn, newFavoriteBtn);

      newDiv.append(newMovieTitle, newImagePoster, newBtnsDiv);
      movieArea.append(newDiv);
    });
  } catch (error) {
    console.error('Error occured: ', error);
  }
}

console.log(movies);

// Siteloaded default homepage search
addEventListener('DOMContentLoaded', () => {
  getMovies();
  getFavLocal();
  updateFavTabText();

  // Dark/light mode from localstorage
  console.log(typeof localStorage.getItem('darkMode'));

  if (localStorage.getItem('darkMode') === 'true') {
    console.log('dark mode ON');
    document.body.classList.add('dark-mode');
    darkMode.textContent = 'light_mode';
  } else {
    console.log('dark mode OFF');
    document.body.classList.remove('dark-mode');
    darkMode.textContent = 'dark_mode';
  }
});

// Search field form
searchField.addEventListener('submit', (event) => {
  event.preventDefault();

  getMovies(searchInput.value);
  searchInput.value = '';
});

// Add favorite function
function addFavorite(indexMovie) {
  console.log('HEJEJE', indexMovie);

  let favoriteMovies = {
    title: indexMovie.Title,
    year: indexMovie.Year,
    imdbID: indexMovie.imdbID,
    poster: indexMovie.Poster,
    uniqueID: Date.now(),
  };

  console.log('WTFF', favorites);

  favorites.push(favoriteMovies);
  console.log(favorites);

  updateFavTabText();
  saveFavLocal();
}

// Remove favorites
function removeFavorite(removeMovie) {
  console.log('removed', removeMovie);
  console.log(favorites);
  favorites = favorites.filter((favo) => favo.imdbID !== removeMovie);
  console.log(favorites);

  updateFavTabText();
  saveFavLocal();
}

// Favorite tab
favoriteTab.addEventListener('click', () => {
  // Clearing movieCard div before adding new elements
  if (document.querySelector('.movieCard')) {
    movieArea.innerHTML = '';
  }

  getFavLocal();

  // Render and append items from favorites array
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

  // If no favorites in favorite array show error message
  if (favorites.length === 0) {
    const newError = document.createElement('h2');
    newError.textContent = 'Inga favoriter hittades, testa favorisera en film.';
    newError.classList.add('movieCard');
    newError.id = 'errorTxt';
    console.log(movieArea);
    movieArea.append(newError);
  }
});

function saveFavLocal() {
  const saveFavoriteLocalStorage = JSON.stringify(favorites);
  localStorage.setItem('savedFavorites', saveFavoriteLocalStorage);
}

function getFavLocal() {
  let favoriteFromLocal = localStorage.getItem('savedFavorites');

  // If null localstorage set to empty array, else get localstorage convert to object and save to favorites array
  if (favoriteFromLocal) {
    favorites = JSON.parse(favoriteFromLocal);
  } else {
    favorites = [];
  }
}

function updateFavTabText() {
  favoriteTab.innerHTML =
    '<span class="material-icons">favorite</span> Favoriter ' +
    favorites.length;
}
