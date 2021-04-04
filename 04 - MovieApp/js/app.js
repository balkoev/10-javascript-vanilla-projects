const API_KEY = "f9974dfafac815fd53f9f7c31027313b";
const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ru-RU&page=1`;
const API_URL_GENRES = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`;
const API_SEARCH_QUERY = "";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url);
  const respData = await resp.json();
  showMovies(respData.results);
}

async function getMovieGenre(ids) {
  const resp = await fetch(API_URL_GENRES);
  const respData = await resp.json();

  let result = [];
  for (const [, value] of Object.entries(respData.genres)) {
    ids.map((el) => {
      if (el === value.id) {
        result.push(value.name);
      }
    });
  }
  return result.join(", ");
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(movies) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  movies.forEach(async (movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
          ${
            movie.poster_path !== null
              ? `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="movie__cover" alt="Годзилла против Конга">`
              : `<img src="./img/no-image.png" class="movie__cover" alt="No image">`
          }
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.title}</div>
          <div class="movie__category">${await getMovieGenre(
            movie.genre_ids
          )}</div>
          <div class="movie__average movie__average--${getClassByRate(
            movie.vote_average
          )}">${movie.vote_average}</div> 
        </div>
      `;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  const apiSearchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ru-RU&query=${searchTerm}&page=1&include_adult=false`;
  if (searchTerm) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
