$(() => {
    $.ajax({
        url: 'https://restcountries.com/v3.1/all',
        type: 'GET',
        success: function (response) {
            countrySelected(response)
        },
        error: function (err) {
            console.log('error in gettting API', err);
        },
    });
})

function countrySelected(country) {
    for (let i = 0; i < country.length; i++) {
        $('.dropdown-menu').append(`
        <li><button class="dropdown-item" type="button">${country[i].name.common}</button></li>
        `);
    }

    
}
