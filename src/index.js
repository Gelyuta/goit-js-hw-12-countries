import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import countriesTpl from'./templates/countries.hbs';
import countryCardTpl from'./templates/country_card.hbs';

import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(() => {
    onCountryInput();
  }, DEBOUNCE_DELAY),
);

function onCountryInput() {
  if (!refs.input.value) {
    onClearInput();
    return;
  }

  fetchCountries(refs.input.value)
    .then(value => {
      onClearInput();

      if (value.length === 1) {
        refs.countryInfo.innerHTML = countryCardTpl(value);
      } else if (value.length >= 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (value.length > 1) {
        refs.countryList.innerHTML = countriesTpl(value);
      }
    })
    .catch(() => Notiflix.Notify.failure('Oops, there is no country with that name'));
}

function onClearInput() {
  refs.countryInfo.innerHTML = ' ';
  refs.countryList.innerHTML = ' ';
}
