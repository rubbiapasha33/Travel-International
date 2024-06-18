// Fetch data from JSON
async function fetchData() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();
        console.log(data); // Check the data
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Search function
function search() {
    const query = document.getElementById('search-input').value.toLowerCase();
    fetchData().then(data => {
        let results = [];

        // Search through countries, cities, temples, and beaches
        data.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(query)) {
                    results.push(city);
                }
            });
        });

        data.temples.forEach(temple => {
            if (temple.name.toLowerCase().includes(query)) {
                results.push(temple);
            }
        });

        data.beaches.forEach(beach => {
            if (beach.name.toLowerCase().includes(query)) {
                results.push(beach);
            }
        });

        displayResults(results);
    });
}


// Display search results
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Clear previous results
    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `
            <h3>${result.name}</h3>
            <img src="${result.imageUrl}" alt="${result.name}">
            <p>${result.description}</p>
        `;
        resultsContainer.appendChild(resultItem);
    });
}

// Clear search results
function clearResults() {
    document.getElementById('search-input').value = '';
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
}

