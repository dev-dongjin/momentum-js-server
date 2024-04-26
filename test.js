const handler = require('./handler.js');

async function testWeatherFunction() {
  const event = { latitude: '49.282730', longitude: '-123.120735' };
  const result = await handler.getWeather(event);
  console.log(result);
}
testWeatherFunction();
