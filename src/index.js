import './css/styles.css';
import debounce from 'lodash.debounce';
import fetchCountries from './API/fetchCountries';
import Notiflix from 'notiflix';
//++++++++++++++++++++++++++++++++++++++++++//
const refs = {
  input: document.querySelector('#search-box'),
  DEBOUNCE_DELAY: 300,
  list: document.querySelector('.country-list'),
  box: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInput, refs.DEBOUNCE_DELAY));

function onInput(e) {
  const quary = e.target.value;
  fetchCountries(quary)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        refs.list.innerHTML = createList(data);
        refs.box.innerHTML = '';
      } else {
        refs.list.innerHTML = '';
        refs.box.innerHTML = createCountyCard(data);
      }
    })
    .catch(error => console.log(error));
}

function createList(arr) {
  return (markUp = arr
    .map(item => {
      return `<li class="country-item"><img class="country-img" src="${item.flags.png}" alt="${item.name}" width="60"> <p class="country-title">${item.name}</pc></li>`;
    })
    .join(''));
}

function createCountyCard(arr) {
  return `<h2 class="title">
            <img class="box-img" src="${arr[0].flags.png}" alt="${
    arr[0].name
  }" width="60">${arr[0].name}
          </h2>
          <p class="text"> <span class="forhand">Capital: </span>${
            arr[0].capital
          }</p>
          <p class="text"> <span class="forhand">Population: </span>${
            arr[0].population
          }</p>
            <p class="text"> <span class="forhand">Languages: </span>${arr[0].languages
              .map(item => item.name)
              .join(' ,')}</p>`;
}
