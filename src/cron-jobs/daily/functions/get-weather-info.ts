/**
 * The api used here is from weatherapi.com
 *
 * You'll want to configure a (free) account there and get an API key.
 */

type WeatherApiResponse = {
  current: {
    temp_c: number;
    condition: {
      /** human readeable weather status */
      text: string;

      /** number describing weather status */
      code: number;
    };
  };
};

export async function getWeatherInfo(
  /** Note: Most city names will work out of the box, including unicode chars, etc. */
  ...cities: string[]
): Promise<string> {
  let results = [];

  for (const city of cities) {
    results.push({
      name: city,
      info: await fetchInfo(city),
    });
  }

  return results.map((res) => `  - ${format(res.name, res.info)}`).join("\n");
}

async function fetchInfo(city: string) {
  // @see https://www.weatherapi.com/docs/#intro-request
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_API_KEY}&q=${city}`,
  ).then((res) => res.json() as Promise<WeatherApiResponse>);
}

function format(cityName: string, cityInfo: WeatherApiResponse) {
  const temperature = cityInfo.current.temp_c;
  const emoji = mapWeatherCodeToEmoji(cityInfo.current.condition.code);

  return `${cityName}, ${temperature} °C ${emoji}`;
}

/**
 * @see https://www.weatherapi.com/docs/#weather-icons:~:text=Resources-,Weather%20Icons%20and%20Codes,-In%20the%20JSON
 *
 * Note: generated by giving the table from the above url to chatgpt
 */
function mapWeatherCodeToEmoji(code: number): string {
  switch (code) {
    case 1000:
      return "☀️"; // Sunny

    // Partly Cloudy / Cloudy / Overcast
    case 1003:
      return "⛅"; // Partly cloudy
    case 1006:
      return "☁️"; // Cloudy
    case 1009:
      return "🌥️"; // Overcast

    // Mist / Fog
    case 1030:
    case 1135:
      return "🌫️"; // Mist, Fog
    case 1147:
      return "🌫️❄️"; // Freezing fog

    // Rain (Light to Heavy)
    case 1063:
    case 1150:
    case 1180:
    case 1240:
      return "🌦️"; // Patchy rain, Light drizzle, Patchy light rain, Light rain shower
    case 1153:
    case 1183:
      return "🌧️"; // Light drizzle, Light rain
    case 1186:
    case 1189:
    case 1243:
      return "🌧️🌦️"; // Moderate rain at times, Moderate rain, Moderate or heavy rain shower
    case 1192:
    case 1195:
    case 1246:
      return "🌧️🌊"; // Heavy rain at times, Heavy rain, Torrential rain shower

    // Freezing Rain / Drizzle
    case 1072:
    case 1168:
    case 1198:
      return "🌧️❄️"; // Patchy freezing drizzle, Freezing drizzle, Light freezing rain
    case 1171:
    case 1201:
      return "🌨️🌧️"; // Heavy freezing drizzle, Moderate or heavy freezing rain

    // Sleet
    case 1069:
    case 1204:
    case 1249:
      return "🌧️❄️"; // Patchy sleet, Light sleet, Light sleet showers
    case 1207:
    case 1252:
      return "🌨️🌨️"; // Moderate or heavy sleet, Moderate or heavy sleet showers

    // Snow (Light to Heavy)
    case 1066:
    case 1210:
    case 1255:
      return "🌨️"; // Patchy snow possible, Patchy light snow, Light snow showers
    case 1114:
      return "🌬️❄️"; // Blowing snow
    case 1117:
    case 1225:
      return "❄️🌨️"; // Blizzard, Heavy snow
    case 1213:
      return "❄️"; // Light snow
    case 1216:
    case 1219:
      return "🌨️❄️"; // Patchy moderate snow, Moderate snow
    case 1222:
    case 1258:
      return "🌨️🌨️"; // Patchy heavy snow, Moderate or heavy snow showers

    // Ice Pellets
    case 1237:
      return "🧊"; // Ice pellets
    case 1261:
      return "🧊🌦️"; // Light showers of ice pellets
    case 1264:
      return "🧊🌨️"; // Moderate or heavy showers of ice pellets

    // Thunderstorms
    case 1087:
    case 1273:
      return "⛈️🌦️"; // Thundery outbreaks possible, Patchy light rain with thunder
    case 1276:
      return "⛈️🌧️"; // Moderate or heavy rain with thunder
    case 1279:
      return "⛈️❄️"; // Patchy light snow with thunder
    case 1282:
      return "🌩️🌨️"; // Moderate or heavy snow with thunder

    // Default fallback
    default:
      return ""; // Unknown weather condition
  }
}
