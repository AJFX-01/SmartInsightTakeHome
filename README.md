# 📦 Autobot Project

## 🛠️ Overview

The **Autobot Project** is a full-stack application that integrates a Vue.js frontend with a Node.js backend, leveraging Sequelize and MySQL. The project is designed to generate, list, and manage Autobots, providing real-time updates via Socket.IO. The backend handles data generation and storage, while the frontend displays the Autobots and their associated data.

## 🧰 Technologies Used

- **Frontend**: [Vue.js](https://vuejs.org/)
- **Backend**: [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/), and [MySQL](https://www.mysql.com/)
- **Real-Time Updates**: [Socket.IO](https://socket.io/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Task Scheduling**: [Node-Cron](https://www.npmjs.com/package/node-cron)

## 📂 Project Structure

```plaintext
autobot-project/
├── autobot-nodejs/    # Node.js Backend
└── autobot-vuejs/     # Vue.js Frontend
```

- **Frontend**: Located in the `autobot-vuejs` directory. Built with Vue.js, it handles the UI, displaying Autobot data and interacting with the backend API.
- **Backend**: Located in the `autobot-nodejs` directory. Built with Node.js and Express, it manages the database, real-time communication, and scheduled tasks for generating Autobots.

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/AJFX-01/SmartInsightTakeHome.git
cd autobot-project
```

### 2. Navigate to Backend or Frontend
- **For Backend**:
  ```bash
  cd autobot-nodejs
  ```
- **For Frontend**:
  ```bash
  cd autobot-vuejs
  ```

### 3. Follow the instructions in each respective directory's README to set up the backend and frontend.

## 📚 Links to Detailed Documentation

- [📘 Vue.js Frontend README](./autobot-vuejs/README.md)
- [📗 Node.js Backend README](./autobot-nodejs/README.md)


### 4. Documentation for the api.

## 📚 Links to Detailed Documentation

- [📘 Node.js Backend Api Documentation](./api-docs.md)
## 📜 License

This project is licensed under the [MIT License](./LICENSE). See the LICENSE file for more details.
