const darkMode = document.querySelector('#darkMode');
const main = document.querySelector('main');
const movieArea = document.querySelector('.movieArea');
const fullMovieArea = document.querySelector('.fullMovieArea');
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

// Api fetch
const apiKi = 'b43ebaaf';

// Default search '= x'
async function getMovies(search = 'spider-man') {
  // Clearing movieCard div before adding new elements
  if (document.querySelector('.movieCard')) {
    movieArea.innerHTML = '';
  }
  if (document.querySelector('.fullMovieArea')) {
    fullMovieArea.innerHTML = '';
  }

  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKi}&s=${search}`
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
      newMovieTitle.textContent = `${element.Title} (${element.Year})`;

      const newImagePoster = document.createElement('img');
      newImagePoster.classList.add('moviePoster');
      newImagePoster.src = element.Poster;
      // Add alt text to image
      newImagePoster.alt = `${element.Title} film poster`;

      const newBtnsDiv = document.createElement('div');
      newBtnsDiv.classList.add('movieBtns');

      const newReadMoreBtn = document.createElement('button');
      newReadMoreBtn.textContent = 'Läs mer';
      newReadMoreBtn.addEventListener('click', () => {
        readMore(element.imdbID);
      });

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
    const newError = document.createElement('h2');
    newError.textContent = 'Något gick fel, försök igen senare.';
    newError.classList.add('movieCard');
    newError.id = 'errorTxt';

    movieArea.append(newError);
  }
}

console.log(movies);

// Siteloaded default homepage search
addEventListener('DOMContentLoaded', () => {
  getMovies();
  getFavLocal();
  updateFavTabText();

  // Dark/light mode from localstorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    darkMode.textContent = 'light_mode';
  } else {
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
  let favoriteMovies = {
    title: indexMovie.Title,
    year: indexMovie.Year,
    imdbID: indexMovie.imdbID,
    poster: indexMovie.Poster,
    uniqueID: Date.now(),
  };

  favorites.push(favoriteMovies);

  updateFavTabText();
  saveFavLocal();
}

// Remove favorites
function removeFavorite(removeMovie) {
  favorites = favorites.filter((favo) => favo.imdbID !== removeMovie);

  updateFavTabText();
  saveFavLocal();
}

// Favorite tab
favoriteTab.addEventListener('click', () => {
  // Clearing movieCard div before adding new elements
  if (document.querySelector('.movieCard')) {
    movieArea.innerHTML = '';
  }
  if (document.querySelector('.fullMovieArea')) {
    fullMovieArea.innerHTML = '';
  }

  getFavLocal();

  // Render and append items from favorites array
  favorites.forEach((element) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('movieCard');

    const newMovieTitle = document.createElement('h2');
    newMovieTitle.classList.add('movieTitle');
    newMovieTitle.textContent = `${element.title} (${element.year})`;

    const newImagePoster = document.createElement('img');
    newImagePoster.classList.add('moviePoster');
    newImagePoster.src = element.poster;
    // Add alt text to image
    newImagePoster.alt = `${element.Title} film poster`;

    const newBtnsDiv = document.createElement('div');
    newBtnsDiv.classList.add('movieBtns');

    const newReadMoreBtn = document.createElement('button');
    newReadMoreBtn.textContent = 'Läs mer';
    newReadMoreBtn.addEventListener('click', () => {
      readMore(element.imdbID);
    });

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
      newFavoriteBtn.innerHTML = '<span class="material-icons">favorite</span>';
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

    newBtnsDiv.append(newReadMoreBtn, newFavoriteBtn);

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

// Read more movie full view
async function readMore(movieID) {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${movieID}&plot=full&apikey=${apiKi}`
    );
    const data = await response.json();

    // Clearing movieCard div before adding new elements
    if (document.querySelector('.movieCard')) {
      movieArea.innerHTML = '';
    }
    if (document.querySelector('.fullMovieArea')) {
      fullMovieArea.innerHTML = '';
    }

    // Create all elements
    const newDiv = document.createElement('div');
    newDiv.classList.add('fullMovie');

    const newTitle = document.createElement('h2');
    newTitle.id = 'fullMovieH2';
    newTitle.textContent = `${data.Title} (${data.Year})`;

    const newImagePoster = document.createElement('img');
    newImagePoster.classList.add('fullMoviePoster');
    newImagePoster.src = data.Poster;
    // Add alt text to image
    newImagePoster.alt = `${data.Title} film poster`;

    const newActorstxt = document.createElement('p');
    newActorstxt.id = 'actorsTxt';
    newActorstxt.textContent = `Actors: ${data.Actors}`;

    const yearRelease = document.createElement('p');
    yearRelease.id = 'yearRelease';
    yearRelease.textContent = `Released: ${data.Released} `;

    const movieLength = document.createElement('p');
    movieLength.id = 'movieLength';
    movieLength.textContent = `Runtime: ${data.Runtime}`;

    const movieAwards = document.createElement('p');
    movieAwards.id = 'movieAwards';
    movieAwards.textContent = `Awards: ${data.Awards}`;

    const moviePlot = document.createElement('p');
    moviePlot.id = 'moviePlot';
    moviePlot.textContent = `${data.Plot}`;

    const ratingIMDB = document.createElement('h2');
    ratingIMDB.id = 'ratingIMDB';
    ratingIMDB.textContent = `⭐ ${data.imdbRating} (${data.imdbVotes})`;

    const movieGenre = document.createElement('p');
    movieGenre.id = 'movieGenre';
    movieGenre.textContent = `Genre: ${data.Genre}`;

    const boxOffice = document.createElement('p');
    boxOffice.id = 'boxOffice';
    boxOffice.textContent = `Boxoffice: 💵 ${data.BoxOffice}`;

    // Append all items
    //newDiv.append(newTitle, newImagePoster);
    fullMovieArea.append(
      newTitle,
      ratingIMDB,
      newImagePoster,
      moviePlot,
      movieLength,
      yearRelease,
      movieGenre,
      movieAwards,
      newActorstxt,

      boxOffice
    );

    console.log(data);
  } catch (error) {
    console.error('Error read more fetch: ', error);
    const newError = document.createElement('h2');
    newError.textContent = 'Något gick fel, försök igen senare.';
    newError.classList.add('movieCard');
    newError.id = 'errorTxt';

    movieArea.append(newError);
  }
}
