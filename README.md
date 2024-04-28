# Momentum JS Server

This repository serves as the server-side component for the [Momentum JS app](https://github.com/dev-dongjin/momentum-js), providing backend functionalities using modern technologies.

## Tech Stack

- **Node.js**: For building the server-side logic.
- **Serverless Framework**: Simplifies deploying and managing serverless applications on AWS.
- **AWS SDK**: For integrating AWS services like DynamoDB and API Gateway.

## Features

1. **Weather Data API**: Connects with OpenWeatherMap to provide real-time weather data based on user location.
2. **Data Caching**: Utilizes AWS DynamoDB for efficient data caching, enhancing response times and reducing API call costs.
3. **CORS Security**: Manages secure CORS origin via AWS API Gateway.
4. **Secure API Key Management**: Retrieves API keys securely using AWS SSM (Parameter Store).
5. **Stage Level Management**: Supports distinct configurations for development (dev) and production (prod) environments, allowing seamless transitions and better control over deployment stages.

## Demonstration

See the frontend in action here: [Momentum JS](https://dev-dongjin.github.io/momentum-js/).
