function begin() {
	//naming function
	const nameEl = document.getElementById("city-name");
	const picEl = document.getElementById("current-pic");
	const tempEl = document.getElementById("temperature");
	const humidityEl = document.getElementById("humidity");
	const windEl = document.getElementById("wind-speed");
	let todayweatherEl = document.getElementById("today-weather");
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

			});
	}

	// Get history from local storage


	// Clear History button

}

begin();