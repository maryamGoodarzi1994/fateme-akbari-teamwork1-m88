const getCityWeather = (lat, lon) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=385a7a70d4dca4ccb79d668d67357807`
  )
    .then((response) => response.json())
    .then((result) => {
      const tempearature = result.list[0].main.temp;
      const humidity = result.list[0].main.humidity;
      const visibility = result.list[0].visibility;
      const windSpeed = result.list[0].wind.speed;
    })
    .catch((err) => {
      console.log(err);
    });
};
const getCityLatAndLon = (selectedCountry) => {
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${selectedCountry}&limit=5&appid=385a7a70d4dca4ccb79d668d67357807`
  )
    .then((response) => response.json())
    .then((result) => {
      const lat = result[0].lat;
      const lon = result[0].lon;
      getCityWeather(lat, lon);
    })
    .catch((err) => {
      console.log(err);
    });
};
const arrayToObjectByNestedKey = (array, keyName) => {
  return array.reduce((acc, cur) => {
    const resultedKeyValue = keyName.split(".").reduce((accu, currentKey) => {
      return accu[currentKey];
    }, cur);
    acc[resultedKeyValue] = cur;
    return acc;
  }, {});
};

const getCountryList = () => {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((result) => {
      const res = result.map((country) => ({
        flag: country.flag,
        code: country.idd.root,
        population: country.population,
        timezones: country.timezones[0],
        name: country.name.common,
        capital: country.capital,
        region: country.region,
      }));

      const countryList = arrayToObjectByNestedKey(res, "name");

      showCountriesNameInDropDown(countryList);
    });
};

const showCountriesNameInDropDown = (countryList) => {
  for (const countryName in countryList) {
    const optionElm = $(`
    <option class="country-list" style="overflow:scroll" id="${countryName}">${countryName} ${countryList[countryName].flag}</option>
    `).data(countryList[countryName])
 
    $("#country-name-select")
      .append(optionElm);
  }
};
$("#country-name-select").change(function (event) {
  if ($(this).val() !== "countryList") {
    const selectedCountryName = $(this).val();
    const selectedCountryInfo =($("#country-name-select option:selected").data());
    console.log(selectedCountryInfo);
    const url = `https://maps.google.com/maps?q=${selectedCountryName}&t=&z=5&ie=UTF8&iwloc=&output=embed`;
    $("#gmap_canvas").attr("src", url);
    getCityLatAndLon(selectedCountryName);
  }
});

getCountryList();
