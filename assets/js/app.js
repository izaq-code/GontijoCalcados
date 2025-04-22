// =========================
// CARREGAR FILMES NO CONTAINER
// =========================

let todosFilmes = []; // Armazena todos os filmes para filtro posterior

fetch("/assets/json/filmes.json")
  .then(res => res.json())
  .then(data => {
    todosFilmes = data.filmes;
    exibirFilmes(todosFilmes); // Exibe todos inicialmente
  });

function exibirFilmes(lista) {
  const container = document.getElementById("filmes-container");
  if (container) {
    container.innerHTML = ''; // Limpa antes de adicionar novos
    lista.forEach(filme => {
      const card = document.createElement("div");
      card.classList.add("filme-card");
      card.innerHTML = `
        <a href="../../detalhe.html?id=${filme.id}">
          <img src="${filme.imagem}" alt="${filme.titulo}">
          <h3>${filme.titulo}</h3>
          <p>${filme.genero}</p>
        </a>
      `;
      container.appendChild(card);
    });
  }
}

// =========================
// PESQUISA DE FILMES
// =========================
document.getElementById("pesquisa-filme")?.addEventListener("input", function () {
  const termo = this.value.toLowerCase();
  const filtrados = todosFilmes.filter(filme => filme.titulo.toLowerCase().includes(termo));
  exibirFilmes(filtrados);
});
// =========================
// SLIDER FUNCIONAL
// =========================
const slideWrapper = document.querySelector('[data-slide="wrapper"]');
const slideList = document.querySelector('[data-slide="list"]');
const navPreviousButton = document.querySelector('[data-slide="nav-previous-button"]');
const navNextButton = document.querySelector('[data-slide="nav-next-button"]');
const controlsWrapper = document.querySelector('[data-slide="controls-wrapper"]');

let slideItems = document.querySelectorAll('[data-slide="item"]');
let controlButtons;
let slideInterval;

const state = {
  startingPoint: 0,
  savedPosition: 0,
  currentPoint: 0,
  movement: 0,
  currentSlideIndex: 0,
  autoPlay: false,
  timeInterval: 0
};

function translateSlide({ position }) {
  state.savedPosition = position;
  slideList.style.transform = `translateX(${position}px)`;
}

function getCenterPosition({ index }) {
  const slideItem = slideItems[index];
  const slideWidth = slideItem.clientWidth;
  const windowWidth = document.body.clientWidth;
  const margin = (windowWidth - slideWidth) / 2;
  const position = margin - (index * slideWidth);
  return position;
}

function setVisibleSlide({ index, animate }) {
  if (index === 0 || index === slideItems.length - 1) {
    index = state.currentSlideIndex;
  }
  const position = getCenterPosition({ index });
  state.currentSlideIndex = index;
  slideList.style.transition = animate ? 'transform .5s' : 'none';
  activeControlButton({ index });
  translateSlide({ position });
}

function nextSlide() {
  setVisibleSlide({ index: state.currentSlideIndex + 1, animate: true });
}

function previousSlide() {
  setVisibleSlide({ index: state.currentSlideIndex - 1, animate: true });
}

function createControlButtons() {
  slideItems.forEach(() => {
    const controlButton = document.createElement('button');
    controlButton.classList.add('slide-control-button', 'fas', 'fa-circle');
    controlButton.dataset.slide = 'control-button';
    controlsWrapper?.append(controlButton);
  });
}

function activeControlButton({ index }) {
  const slideItem = slideItems[index];
  const dataIndex = Number(slideItem.dataset.index);
  const controlButton = controlButtons[dataIndex];
  controlButtons.forEach(button => button.classList.remove('active'));
  if (controlButton) controlButton.classList.add('active');
}

function createSlideClones() {
  const firstSlide = slideItems[0].cloneNode(true);
  firstSlide.classList.add('slide-cloned');
  firstSlide.dataset.index = slideItems.length;

  const secondSlide = slideItems[1].cloneNode(true);
  secondSlide.classList.add('slide-cloned');
  secondSlide.dataset.index = slideItems.length + 1;

  const lastSlide = slideItems[slideItems.length - 1].cloneNode(true);
  lastSlide.classList.add('slide-cloned');
  lastSlide.dataset.index = -1;

  const penultimateSlide = slideItems[slideItems.length - 2].cloneNode(true);
  penultimateSlide.classList.add('slide-cloned');
  penultimateSlide.dataset.index = -2;

  slideList.append(firstSlide, secondSlide);
  slideList.prepend(lastSlide, penultimateSlide);

  slideItems = document.querySelectorAll('[data-slide="item"]');
}

function onMouseDown(event, index) {
  const slideItem = event.currentTarget;
  state.startingPoint = event.clientX;
  state.currentPoint = event.clientX - state.savedPosition;
  state.currentSlideIndex = index;
  slideList.style.transition = 'none';
  slideItem.addEventListener('mousemove', onMouseMove);
}

function onMouseMove(event) {
  state.movement = event.clientX - state.startingPoint;
  const position = event.clientX - state.currentPoint;
  translateSlide({ position });
}

function onMouseUp(event) {
  const pointsToMove = event.type.includes('touch') ? 50 : 150;
  if (state.movement < -pointsToMove) nextSlide();
  else if (state.movement > pointsToMove) previousSlide();
  else setVisibleSlide({ index: state.currentSlideIndex, animate: true });

  state.movement = 0;
  event.currentTarget.removeEventListener('mousemove', onMouseMove);
}

function onTouchStart(event, index) {
  event.clientX = event.touches[0].clientX;
  onMouseDown(event, index);
  event.currentTarget.addEventListener('touchmove', onTouchMove);
}

function onTouchMove(event) {
  event.clientX = event.touches[0].clientX;
  onMouseMove(event);
}

function onTouchEnd(event) {
  onMouseUp(event);
  event.currentTarget.removeEventListener('touchmove', onTouchMove);
}

function onControlButtonClick(index) {
  setVisibleSlide({ index: index + 2, animate: true });
}

function onSlideListTransitionEnd() {
  const slideItem = slideItems[state.currentSlideIndex];
  const dataIndex = Number(slideItem.dataset.index);

  if (slideItem.classList.contains('slide-cloned') && dataIndex > 0) {
    setVisibleSlide({ index: 2, animate: false });
  } else if (slideItem.classList.contains('slide-cloned') && dataIndex < 0) {
    setVisibleSlide({ index: slideItems.length - 3, animate: false });
  }
}

function setAutoPlay() {
  if (state.autoPlay) {
    slideInterval = setInterval(() => {
      setVisibleSlide({ index: state.currentSlideIndex + 1, animate: true });
    }, state.timeInterval);
  }
}

function setListeners() {
  controlButtons = document.querySelectorAll('[data-slide="control-button"]');
  controlButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => onControlButtonClick(index));
  });

  slideItems.forEach((slideItem, index) => {
    slideItem.addEventListener('dragstart', e => e.preventDefault());
    slideItem.addEventListener('mousedown', e => onMouseDown(e, index));
    slideItem.addEventListener('mouseup', onMouseUp);
    slideItem.addEventListener('touchstart', e => onTouchStart(e, index));
    slideItem.addEventListener('touchend', onTouchEnd);
  });

  navNextButton?.addEventListener('click', nextSlide);
  navPreviousButton?.addEventListener('click', previousSlide);
  slideList?.addEventListener('transitionend', onSlideListTransitionEnd);

  slideWrapper?.addEventListener('mouseenter', () => clearInterval(slideInterval));
  slideWrapper?.addEventListener('mouseleave', () => setAutoPlay());

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setVisibleSlide({ index: state.currentSlideIndex, animate: true });
    }, 1000);
  });
}

function initSlider({ startAtIndex = 0, autoPlay = false, timeInterval = 0 }) {
  if (!slideList || !slideWrapper) return;
  state.autoPlay = autoPlay;
  state.timeInterval = timeInterval;
  createControlButtons();
  createSlideClones();
  setListeners();
  setVisibleSlide({ index: startAtIndex + 2, animate: true });
  setAutoPlay();
}

// Inicializar slider
initSlider({
  startAtIndex: 0,
  autoPlay: true,
  timeInterval: 4000
});

// =========================
// MENU HAMBURGUER
// =========================
let procurar = document.querySelector(`.procurar-box`);

document.querySelector(`#pesquisa`).onclick = () => {


procurar.classList.toggle(`active`);

}


let navbar = document.querySelector(`.navbar`);

document.querySelector(`#menu-icone`).onclick = () => {


navbar.classList.toggle(`active`);

}

// =========================
// CLIQUE NA LOGO RECARREGA PÁGINA
// =========================
document.querySelector('.logo')?.addEventListener('click', () => {
    location.reload();
  });

// =========================
// DETALHES DO FILME
// =========================
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  fetch("/assets/json/filmes.json")
    .then(res => res.json())
    .then(data => {
      const filme = data.filmes.find(f => f.id == id);
      const detalhes = document.getElementById("detalhes-filme");
      if (filme && detalhes) {
        detalhes.innerHTML = `
          <h2>${filme.titulo}</h2>
          <img src="${filme.imagem}" alt="${filme.titulo}">
          <p><strong>Gênero:</strong> ${filme.genero}</p>
          <p><strong>Duração:</strong> ${filme.duracao}</p>
          <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
          <a id="voltar" href="index.html">Voltar</a>
        `;
      }
    });
}

