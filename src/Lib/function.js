import cloudsSun from "../weather-icons/clouds_sun.png";
import cloudy from "../weather-icons/cloudy.png";
import cloudyMoon from "../weather-icons/cloudy_moon.png";
import drizzle from "../weather-icons/drizzel_rain.png";
import moonNight from "../weather-icons/moonlight_night.png";
import rain from "../weather-icons/rain.png";
import rainShower from "../weather-icons/rain_shower.png";
import sunny from "../weather-icons/sun_sunny.png";

const iconChange = (weatherCode, time, sunrise, sunset) => {
  switch (weatherCode) {
    case 0:
    case 1: {
      return time > sunrise && time < sunset ? sunny : moonNight;
    }

    case 2: {
      return time > sunrise && time < sunset ? cloudsSun : cloudyMoon;
    }

    case 3: {
      return time > sunrise && time < sunset ? cloudsSun : cloudyMoon;
    }
    case 51:
    case 53:
    case 55:
    case 56:
    case 57: {
      return drizzle;
    }
    case 61:
    case 63:
    case 65:
    case 66:
    case 67: {
      return rain;
    }
    case 80:
    case 81:
    case 82: {
      return rainShower;
    }
    default: {
      return;
    }
  }
};

export default iconChange;
