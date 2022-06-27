import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
//++++++++++++++++++++++++++++++++++++++++++//

export default function fetchCountries(name) {
  const BASE_URL = `https://restcountries.com/v2/name/${name}`;
  return fetch(BASE_URL).then(response => {
    if (!response.ok) {
      throw new Error(response);
    }
    response.json();
  });
}
