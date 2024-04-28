'use strict';
require('dotenv').config();
const getWeatherData = require('./service/weather');

module.exports.hello = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.getWeather = async (event) => {
  console.log(event);

  const message = await getWeatherData(event);
  console.log(message);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://dev-dongjin.github.io',
      'Access-Control-Allow-Methods': 'OPTIONS,GET',
    },
    body: JSON.stringify(
      {
        message,
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
