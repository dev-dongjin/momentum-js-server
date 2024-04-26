'use strict';
const axios = require('axios');
const getAPIKey = require('./api');
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = `${process.env.STAGE}-WeatherCacheTable`;

const getWeatherData = async ({ latitude, longitude }) => {
  console.log(TABLE_NAME);
  // return;
  const params = {
    TableName: TABLE_NAME,
    Key: {
      latitude,
      longitude,
    },
  };
  try {
    const { Item } = await dynamoDB.get(params).promise();

    console.log({ Item });

    if (Item & (Item.expiresAt > Date.now())) {
      return Item.weatherData;
    }

    const API_KEY = await getAPIKey('WEATHER_API_KEY');

    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}&units=metric`
    );

    const {
      name,
      main: { temp },
      weather,
    } = data;

    const extractedData = {
      name,
      temp,
      weatherDescription: weather[0].description,
    };

    const putParams = {
      TableName: TABLE_NAME,
      Item: {
        latitude,
        longitude,
        weatherData: extractedData,
        expiresAt: Date.now() + 3600 * 1000,
      },
    };
    await dynamoDB.put(putParams).promise();

    return extractedData;
  } catch (err) {
    console.error('Failed to get Weather data:', err);
    throw new Error('Weather data retrieval failed');
  }
};

module.exports = getWeatherData;
