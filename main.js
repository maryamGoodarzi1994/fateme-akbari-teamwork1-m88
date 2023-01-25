// (function getCountryList () {

//     let countryList = [];

//     $.get("https://restcountries.com/v3.1/all", function (response) {
//         countryList = response;

//         showCountriesNameInDropDown(countryList)
//     });
// })()

// const showCountriesNameInDropDown =(countryList) => {
//     for (const [index,country] of countryList.entries() ) {
//         console.log(index);
//         $("#countries-name").append(`
//         <option> value="${index}">${country.name.common}</option>
//         `);
//     }
// }
// const showCountriesNameInDropDown =(countryList) => {
//     for (const [index,country] of countryList.entries() ) {
//         console.log(index);
//         $(".dropdown-menu").append(`
//         <li><button class="dropdown-item" type="button" id="${index}">${country.name.common}</button></li>
//         `);
//     }
// }
