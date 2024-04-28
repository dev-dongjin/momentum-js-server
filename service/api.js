'use strict';
const { SSM } = require('@aws-sdk/client-ssm');

const getAPIKey = async (apiKeyName) => {
  let apiKey;
  try {
    if (process.env.NODE_ENV === 'prod') {
      const ssm = new SSM();
      const parameter = await ssm.getParameter({
        Name: apiKeyName,
        WithDecryption: true,
      });
      apiKey = parameter.Parameter.Value;
    } else {
      apiKey = process.env[apiKeyName];
    }
  } catch (err) {
    console.error('Failed to retrieve the API key:', err);
    throw new Error('API key retrieval failed');
  }

  return apiKey;
};

module.exports = getAPIKey;
