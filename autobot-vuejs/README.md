# Autobot VueJs Frontend

This repository contains the Vue.js frontend for managing Autobots. It is part of a larger project that involves creating, listing, and managing Autobots in real-time. This application communicates with a backend API and provides a user-friendly interface for interacting with Autobots.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Integration](#api-integration)
- [Socket.IO Integration](#socket-io-integration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project provides a frontend interface to interact with Autobots. It allows users to view a list of Autobots, monitor the real-time count of Autobots, and manage Autobot details. The application is built using Vue.js, with real-time updates powered by Socket.IO.

## Features

- **Real-time Autobot Count:** Display the number of Autobots in real-time using Socket.IO.
- **Autobot Details:** View detailed information about each Autobot.
- **Responsive Design:** Fully responsive design for mobile and desktop views.
- **API Integration:** Seamless integration with the backend API for fetching and managing Autobot data.

## Tech Stack

- **Vue.js** - JavaScript framework for building user interfaces.
- **Axios** - Promise-based HTTP client for making API requests.
- **Socket.IO** - Real-time bidirectional event-based communication.


## Project Structure

```bash
├── public
│   ├── index.html       # Entry HTML file
├── src
│   ├── assets           # Static assets (images, fonts, etc.)
│   ├── components       # Reusable Vue components
│   ├── App.vue          # Root Vue component
│   ├── main.js          # Entry point for the application
├── .env                 # Environment variables
├── babel.config.js      # Babel configuration
├── package.json         # Project dependencies and scripts
├── README.md            # Project documentation
```

## Installation

### Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AJFX-01/SmartInsightTakeHome.git
   cd autobot-vuejs
   ```

2. **Install dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

## Configuration

Before running the project, you may need to configure environment variables:

1. **Create a `.env` file:**

   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**

   Update the API base URL, Socket.IO server URL, and any other necessary environment variables.

   ```bash
   VUE_APP_API_BASE_URL=http://localhost:8000/api
   VUE_APP_SOCKET_URL=http://localhost:8000
   ```

## Running the Project

### Development

To run the project in development mode with hot-reloading:

```bash
npm run serve
```

Or using yarn:

```bash
yarn serve
```

The application will be accessible at `http://localhost:8080`.

### Production

To build the project for production:

```bash
npm run build
```

Or using yarn:

```bash
yarn build
```

The production-ready files will be located in the `dist` directory.

## Usage

### Real-time Updates

- The Autobot count is displayed at the top of the page.
- The count updates automatically in real-time using Socket.IO.

## API Integration

This application communicates with a backend API to fetch Autobot data. The API client is configured using Axios and is located in `src/api/axios.js`.

### Example API Call

```javascript
import axios from 'axios';

axios.get('/autobots')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
```

## Socket.IO Integration

Socket.IO is used for real-time updates. The Socket.IO client is configured in `src/socket.js`.

### Example Usage

```javascript
import io from 'socket.io-client';

const socket = io(process.env.VUE_APP_SOCKET_URL);

socket.on('autobot_count', count => {
  console.log('Autobot count:', count);
});
```
## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md) to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides a solid foundation for your Vue.js project documentation, covering everything from setup to advanced usage.