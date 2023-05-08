const filters = '?fields=name,capital,population,flags,languages';
const BASE_URL = 'https://restcountries.com/v3.1/name/';

export const fetchCountries = name => {
  return fetch(`${BASE_URL}${name.trim()}${filters}`).then(response =>
    response.json()
  );
};
