const generateButton = document.getElementById("generate");
const searchZip = document.getElementById("zip");
const tempMessage = document.getElementById("temperature");
const forecastMessage = document.getElementById("forecast");
const countryMessage = document.getElementById("country");
const locationMessage = document.getElementById("location");
const dateMessage = document.getElementById("date");
const feelMessage = document.getElementById("feel");
const feelings = document.getElementById("feelings");

const apiKey = "a6e5b772926f26d6e8a89011d8e0701b&units=imperial";
generateButton.addEventListener("click", (e) => {
  e.preventDefault();
  const zipCode = searchZip.value;
  const feelingYou = feelings.value;
  tempMessage.textContent = "loading...";
  fetch(`http://localhost:3000/weather?zip=${zipCode}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        tempMessage.textContent = data.error;
        locationMessage.textContent = "";
        countryMessage.textContent = "";
        forecastMessage.textContent = "";
        dateMessage.textContent = "";
        feelMessage.textContent = "";
      } else {
        tempMessage.textContent = data.temperature;
        locationMessage.textContent = data.location;
        countryMessage.textContent = data.country;
        forecastMessage.textContent = data.forecast;
        dateMessage.textContent = data.date;
        feelMessage.textContent = "you are feeling " + feelingYou;
        const dataForward = {
          temperature: data.temperature,
          location: data.location,
          country: data.country,
          forecast: data.forecast,
          date: data.date,
          feelingYou,
        };

        postData("http://localhost:3000/postweather", dataForward);
      }
    });
  });
});
//////
const postData = async (url = "", dataForward = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForward),
  });

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};
