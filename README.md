# Start React App

mkdir weather_app
npx create-react-app weather_app
cd weather_app
npm start

The installation process will start immediately and once completed, your react setup is successfully completed and it will redirect on your browser in localhost:3000.

#Install packages
These packages are:
1) npm install @fortawesome/react-fontawesome @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons

#Get your API Keys
To get weather data we need to use API to fetch data & for that i have used Open Weather Map API. Its free to use & highly accurate data.
To get your keys, simply sign up into Open Weather & then confirm your email account & after this you will get Your API key. Your API Key will be sent to to mail & also you can find your key into dashboard in the same website.
Now, finally you got your API Key then include that key into your app by creating new file apiKeys.js & add your key with API domain.

Once the user enter a city name and view the current weather details of the city, which includes:
   - Current temperature
   - Minimum and maximum temperature
   - Humidity
   - Wind speed and direction
   - Description of the weather (e.g., clear sky, light rain, etc.)
   - An appropriate icon reflecting the current weather will be display
View a 5-day forecast for the selected city, displaying:
   - Average temperature
  - Description of the weather
- An appropriate weather icon

It Include an option for the user to toggle between  in both Celsius and Fahrenheit  units.
- The application should be user-friendly and intuitive, with clear error handling. 
For example, if a user enters a city name that doesn't exist, error message is displayed.


