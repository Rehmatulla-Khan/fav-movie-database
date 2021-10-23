const addMovieModal = document.getElementById("add-modal");
const startAddMovieBtn = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModal.querySelector(".btn--passive");
const confirmAddMovie = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");
const movies = [];

const toggleBackDrop = () => {
  backDrop.classList.toggle("visible");
};

const cancelMovieModal = () => {
  addMovieModal.classList.remove("visible");
  toggleBackDrop();
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackDrop();
};

const closeMovieDeletionModal = () => {
  toggleBackDrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  closeMovieDeletionModal();
  updateUi();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackDrop();
  const cancelDeletion = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletion = deleteMovieModal.querySelector(".btn--danger");
  confirmDeletion.replaceWith(confirmDeletion.cloneNode(true));
  confirmDeletion = deleteMovieModal.querySelector(".btn--danger");
  cancelDeletion.removeEventListener("click", closeMovieDeletionModal);
  cancelDeletion.addEventListener("click", closeMovieDeletionModal);
  confirmDeletion.addEventListener("click", deleteMovie.bind(null, movieId));
};

const renderNewMovieElement = (id, imageUrl, title, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
    <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${rating}/5 star</p>
    </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.appendChild(newMovieElement);
};

const updateUi = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const clearUserInput = () => {
  for (const usrinput of userInputs) {
    usrinput.value = "";
  }
};

const addMovieHandler = () => {
  const titleInput = userInputs[0].value;
  const imgUrlInput = userInputs[1].value;
  const ratingInput = userInputs[2].value;

  if (
    titleInput.trim() === "" ||
    imgUrlInput.trim() === "" ||
    ratingInput.trim() === "" ||
    parseInt.ratingInput < 0 ||
    parseInt.ratingInput > 5
  ) {
    alert("PLEASE ENTER VALID USER INPUT AND RATING FROM (1-5)");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleInput,
    image: imgUrlInput,
    rating: ratingInput,
  };
  movies.push(newMovie);
  console.log(movies);
  renderNewMovieElement(
    newMovie.id,
    newMovie.image,
    newMovie.title,
    newMovie.rating
  );
  updateUi();
  clearUserInput();
  cancelMovieModal();
};

const cancelAddMoiveHandler = () => {
  clearUserInput();
  cancelMovieModal();
};

const backDropClickHandler = () => {
  clearUserInput();
  toggleBackDrop();
  cancelMovieModal();
  closeMovieDeletionModal();
};

startAddMovieBtn.addEventListener("click", showMovieModal);
backDrop.addEventListener("click", backDropClickHandler);
cancelAddMovieBtn.addEventListener("click", cancelAddMoiveHandler);
confirmAddMovie.addEventListener("click", addMovieHandler);
