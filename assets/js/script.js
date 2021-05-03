function begin() {
	//naming function
	const nameEl = document.getElementById("city-name");
	const picEl = document.getElementById("current-pic");
	const tempEl = document.getElementById("temperature");
	const humidityEl = document.getElementById("humidity");
	const windEl = document.getElementById("wind-speed");
	const currentUVEl = document.getElementById("UV-index");
	const historyEl = document.getElementById("history");
	const cityEl = document.getElementById("enter-city");
	const searchEl = document.getElementById("search-button");
	const clearEl = document.getElementById("clear-history");
	var dayEl = document.getElementById("fiveday-header");
	var todayweatherEl = document.getElementById("today-weather");
	let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

	// Assigning API to a variable
	const APIKey = "84b79da5e5d7c92085660485702f4ce8";

	// Execute a current weather get request from open weather api
	function getWeather(cityName) {
		let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
		axios.get(queryURL)
			.then(function (response) {
				todayweatherEl.classList.remove("d-none");
					// Parse response to display current weather
					const currentDate = new Date(response.data.dt * 1000);
					const day = currentDate.getDate();
					const month = currentDate.getMonth() + 1;
					const year = currentDate.getFullYear();
					nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
					let weatherPic = response.data.weather[0].icon;
					picEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
					picEl.setAttribute("alt", response.data.weather[0].description);
					tempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
					humidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
					windEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
					
					// Get UV Index
					let lat = response.data.coord.lat;
					let lon = response.data.coord.lon;
					let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
					axios.get(UVQueryURL)
						.then(function (response) {
							let UVIndex = document.createElement("span");
							
							// When UV Index is good, shows green, when ok shows yellow, when bad shows red
							if (response.data[0].value < 4 ) {
									UVIndex.setAttribute("class", "badge badge-success");
							}
							else if (response.data[0].value < 8) {
									UVIndex.setAttribute("class", "badge badge-warning");
							}
							else {
									UVIndex.setAttribute("class", "badge badge-danger");
							}
							console.log(response.data[0].value)
							UVIndex.innerHTML = response.data[0].value;
							currentUVEl.innerHTML = "UV Index: ";
							currentUVEl.append(UVIndex);
						});		
					// Get 5 day forecast for this city


			});
	}

	// Get history from local storage
	searchEl.addEventListener("click", function () {
		const searchTerm = cityEl.value;
		getWeather(searchTerm);
		searchHistory.push(searchTerm);
		localStorage.setItem("search", JSON.stringify(searchHistory));
		renderSearchHistory();
	})

	// Clear History button


	function k2f(K) {
		return Math.floor((K - 273.15) * 1.8 + 32);
	}

	function renderSearchHistory() {
		historyEl.innerHTML = "";
		for (let i = 0; i < searchHistory.length; i++) {
			const historyItem = document.createElement("input");
			historyItem.setAttribute("type", "text");
			historyItem.setAttribute("readonly", true);
			historyItem.setAttribute("class", "form-control d-block bg-white");
			historyItem.setAttribute("value", searchHistory[i]);
			historyItem.addEventListener("click", function () {
				getWeather(historyItem.value);
			})
			historyEl.append(historyItem);
		}
	}

}

begin();