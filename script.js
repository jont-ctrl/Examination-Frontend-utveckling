const darkMode = document.querySelector('#darkMode');
const main = document.querySelector('main');
const movieArea = document.querySelector('.movieArea');

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

async function getMovies() {
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKi}&s=movie`
    );
    const data = await response.json();
    console.log(data);

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

      newDiv.append(newMovieTitle, newImagePoster, newReadMoreBtn);
      movieArea.append(newDiv);
    });

    /*     const newDiv = document.createElement('div');
    newDiv.classList.add('movieCard');

    const newMovieTitle = document.createElement('h2');
    newMovieTitle.classList.add('movieTitle');
    newMovieTitle.textContent = data.Search[0].Title;

    newDiv.append(newMovieTitle);
    main.append(newDiv); */
  } catch (error) {
    console.error('Error occured: ', error);
  }
}

getMovies();
