# Weather App 🌦️

**Author**: Mark Kimitch | **Email**: [mark.kimitch@gmail.com](mailto:mark.kimitch@gmail.com) | **Version**: 1.0.0 | **License**: [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0.html)

[![GitHub license](https://img.shields.io/badge/license-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0.html)
[![GitHub issues](https://img.shields.io/github/issues/mkimitch/weather-app)](https://github.com/mkimitch/weather-app/issues)
[![GitHub forks](https://img.shields.io/github/forks/mkimitch/weather-app)](https://github.com/mkimitch/weather-app/network)
[![GitHub stars](https://img.shields.io/github/stars/mkimitch/weather-app)](https://github.com/mkimitch/weather-app/stargazers)

## Built With

![React](https://img.shields.io/badge/dynamic/json?color=blue&label=React&query=$.dependencies.react&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmkimitch%2Fweather-app%2Fmain%2Fpackage.json&logo=react)
![TypeScript](https://img.shields.io/badge/dynamic/json?color=blue&label=TypeScript&query=$.devDependencies.typescript&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmkimitch%2Fweather-app%2Fmain%2Fpackage.json&logo=typescript)
![Webpack](https://img.shields.io/badge/dynamic/json?color=blue&label=Webpack&query=$.devDependencies.webpack&url=https%3A%2F%2Fraw.githubusercontent.com%2Fmkimitch%2Fweather-app%2Fmain%2Fpackage.json&logo=webpack)

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Usage](#api-usage)
- [License](#license)

## Project Overview

A simple and responsive weather web application that uses the [OpenWeather API](https://openweathermap.org/api) to display current weather details, hourly and daily forecasts, and additional weather information for various locations. Users can search for locations, use geolocation, and toggle between light and dark modes.

## Features

- 🌍 **Search Locations**: Type in any city and get the current weather and forecast.
- 📍 **Geolocation Support**: Automatically detect the user's location and display weather details.
- 🌦️ **Weather Information**:
  - Current weather conditions
  - Hourly and daily forecast
  - Sun and moon phases
  - Wind information
  - Precipitation data
  - Weather alerts (if available)
- 🌑 **Light/Dark Mode**: Toggle between light and dark themes for a personalized experience.
- 🎨 **Icons**: Leverages [weather-icons](https://erikflowers.github.io/weather-icons/) for clean weather visuals and FontAwesome for general icons.

## Live Demo

A live version of this app is available at [url-goes-here].

## Getting Started

To run the project locally, follow these steps:

### Prerequisites

- Node.js (version 18.x or later)
- Yarn package manager

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mkimitch/weather-app.git
   ```

2. Navigate into the project directory:

   ```bash
   cd weather-app
   ```

3. Install the required dependencies:

   ```bash
   yarn install
   ```

4. Obtain an API key from [OpenWeather API](https://openweathermap.org/api) and create a `.env` file in the project root. Add your API key:
   ```bash
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

### Setting Up HTTPS with a Self-Signed Certificate

To use the geolocation API, your local development environment must be served over `https`. Follow these steps to set up a self-signed certificate:

1. **Generate a Self-Signed Certificate:**

   Run the following command in your terminal, adjusting the path as needed:

   ```bash
   openssl req -x509 -out ./certs/localhost.crt -keyout ./certs/localhost.key -newkey rsa:2048 -nodes -sha256 -subj "//CN=localhost" -addext "subjectAltName=DNS:localhost"
   ```

   This will generate `localhost.crt` and `localhost.key` files in the `certs/` directory of your project.

2. **Trust the Certificate in Your Browser:**

   After generating the certificate, you need to trust it in your browser to avoid security warnings.

   **For Chrome (and Chromium-based browsers like Edge)**:

   - **Open Chrome** and navigate to `https://localhost:8080`.
   - Click on **"Not Secure"** in the address bar and then on **"Certificate (Invalid)"**.
   - Click on **"Details"** and select **"Export"** to download the certificate.
   - Open **chrome://settings/security** in Chrome and scroll down to **Manage certificates**.
   - Import your downloaded certificate and add it to the **Trusted Root Certification Authorities**.

   **For Firefox**:

   - Open Firefox and navigate to `https://localhost:8080`.
   - Click on the **lock icon** in the address bar.
   - Click **More Information**, then **View Certificate**.
   - Under the **Details** tab, click **Export** to save the certificate.
   - Open **Preferences**, search for **Certificates**, and click **View Certificates**.
   - In the **Authorities** tab, click **Import** and add your exported certificate.

   **For macOS (Safari/Chrome)**:

   - Open **Keychain Access** (search for it in Spotlight).
   - Drag and drop the `localhost.crt` file into the **System** or **Login** keychain.
   - Double-click the certificate and expand the **Trust** section.
   - Set **"When using this certificate"** to **"Always Trust"**.

   **For Windows (Edge/Chrome)**:

   - Open **Certificate Manager** (`certmgr.msc`) from the Start menu.
   - Navigate to **"Trusted Root Certification Authorities"** > **"Certificates"**.
   - Right-click and choose **"Import"**.
   - Import your `localhost.crt` file and add it to the **Trusted Root Certification Authorities**.

3. **Configure Webpack for HTTPS:**

   Ensure your `webpack.dev.js` is configured to use the certificate files:

   ```js
   const fs = require('fs')
   const path = require('path')

   module.exports = {
   	devServer: {
   		https: {
   			key: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.key')),
   			cert: fs.readFileSync(path.resolve(__dirname, 'certs/localhost.crt')),
   		},
   		port: 8080,
   		allowedHosts: 'all',
   		host: 'localhost',
   		historyApiFallback: true,
   		hot: true,
   		static: './dist',
   	},
   }
   ```

### Running the App

1. Start the development server:

   ```bash
   yarn start
   ```

2. Open your browser and visit:
   ```
   https://localhost:8080
   ```

### Testing

Run unit tests with Jest:

```bash
yarn test
```

## Project Structure

```
├── src
│   ├── components    # Reusable components for weather display and UI
│   ├── hooks         # Custom hooks (e.g., fetching weather data, geolocation)
│   ├── pages         # Main app pages (WeatherDetail, Home)
│   ├── styles        # Global and component-specific styles (using SCSS)
│   ├── App.tsx       # Root component
│   └── index.tsx     # App entry point
├── public            # Static assets (index.html, etc.)
├── .env.example      # Example environment variables
└── README.md         # Project documentation
```

## API Usage

This app uses the OpenWeather API for retrieving weather data. The following endpoints are utilized:

- [One Call API](https://openweathermap.org/api/one-call-api): For weather details and forecast
- [Geocoding API](https://openweathermap.org/api/geocoding-api): For location-based queries

## License

This project is licensed under the GNU 3.0 License - see the [LICENSE](https://raw.githubusercontent.com/mkimitch/weather-app/refs/heads/main/LICENSE) file for details.
