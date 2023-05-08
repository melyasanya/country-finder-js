import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener(
  'input',
  debounce(event => {
    fetchCountries(event.target.value)
      .then(data => getData(data))
      .catch(error => {
        Notify.failure(error.message);
      });
  }, DEBOUNCE_DELAY)
);

function getData(data) {
  if (data.length > 10) {
    countryInfo.innerHTML = '';
    list.innerHTML = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (data.length <= 10 && data.length >= 2) {
    listMarkUp(data);
  } else if (data.length === 1) {
    countryInfoMarkUp(data);
  } else if (data.status === 404) {
    countryInfo.innerHTML = '';
    list.innerHTML = '';
    throw new Error('Oops, there is no country with that name');
  } else {
    countryInfo.innerHTML = '';
    list.innerHTML = '';
  }
}

const listMarkUp = data => {
  countryInfo.innerHTML = '';
  const item = data
    .map(
      el =>
        `<li>
        <img src = '${el.flags.svg}' alt = '${el.flags.alt}' width ='40' >
        <p>${el.name.official}</p>
        </li>`
    )
    .join('');
  list.innerHTML = item;
};

const countryInfoMarkUp = data => {
  list.innerHTML = '';
  const country = data
    .map(
      el => `<div class = 'name-and-image'>
    <img src = '${el.flags.svg}' alt = '${el.flags.alt}' width = '40' >
    <h2>${el.name.official}</h2>
    </div>
    <p><b>Capital</b>: ${el.capital}</p>
    <p><b>Population</b>: ${el.population}</p>
    <p><b>Languages</b>: ${Object.values(el.languages).join(', ')}</p>`
    )
    .join('');
  countryInfo.innerHTML = country;
};
