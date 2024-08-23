---
# 📖 Autobot API Documentation

Welcome to the **Autobot API Documentation**. This document provides comprehensive information about all the endpoints available in the Autobot API, including their request and response structures, parameters, and examples. This API enables interaction with the Autobot database, allowing for retrieval and management of Autobots, their posts, and comments.

---

## 🗂️ Table of Contents

- [📖 Introduction](#-introduction)
- [🌐 Base URL](#-base-url)
- [🔒 Authentication](#-authentication)
- [⏱️ Rate Limiting](#️-rate-limiting)
- [📦 Endpoints](#-endpoints)
  - [Autobots](#autobots)
    - [Get All Autobots](#get-all-autobots)
    - [Get Autobot by ID](#get-autobot-by-id)
  - [Posts](#posts)
    - [Get Posts by Autobot ID](#get-posts-by-autobot-id)
    - [Get Post by ID](#get-post-by-id)
  - [Comments](#comments)
    - [Get Comments by Post ID](#get-comments-by-post-id)
    - [Get Comment by ID](#get-comment-by-id)
- [⚠️ Error Handling](#️-error-handling)
- [📈 Status Codes](#-status-codes)
- [📞 Support](#-support)
- [📜 License](#-license)

---

## 📖 Introduction

The **Autobot API** provides a RESTful interface for interacting with Autobot-related data. Clients can perform various operations such as retrieving a list of Autobots, fetching posts made by a specific Autobot, and accessing comments associated with a post.

This API supports real-time updates through **Socket.IO**, enabling clients to receive instant notifications about changes in the data.

---

## 🌐 Base URL

**Development:**
```
http://localhost:3000/api/
```

**Production:**
```
https://yourdomain.com/api/
```

> Ensure that you replace `https://yourdomain.com` with your actual production domain when deploying.

---

## 🔒 Authentication

Currently, the Autobot API does **not** require authentication and is open for public access. However, rate limiting is enforced to prevent abuse.

> **Note:** In a production environment, it is recommended to implement proper authentication mechanisms such as API keys, JWT, or OAuth for securing your API endpoints.

---

## ⏱️ Rate Limiting

To ensure fair usage and prevent abuse, the API implements rate limiting using `express-rate-limit`.

- **Limit:** 100 requests per 15 minutes per IP address.
- **Response on Limit Exceed:** HTTP 429 Too Many Requests with a descriptive error message.

> Adjust the rate limiting settings in your configuration as needed for your application's requirements.

---

## 📦 Endpoints

### Autobots

#### Get All Autobots

Retrieve a paginated list of all Autobots.

- **URL:** `/autobots`
- **Method:** `GET`
- **Query Parameters:**
  | Parameter | Type    | Required | Default | Description                          |
  |-----------|---------|----------|---------|--------------------------------------|
  | `page`    | integer | No       | 1       | Page number for pagination.          |
  | `limit`   | integer | No       | 10      | Number of Autobots per page (max 50).|

- **Sample Request:**
  ```http
  GET /api/v1/autobots?page=1&limit=10 HTTP/1.1
  Host: localhost:3000
  ```

- **Successful Response:**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": 1,
          "name": "Optimus Prime",
          "username": "optimus",
          "email": "optimus@autobots.com",
          "createdAt": "2023-08-23T12:00:00Z",
          "updatedAt": "2023-08-23T12:00:00Z"
        },
        {
          "id": 2,
          "name": "Bumblebee",
          "username": "bumblebee",
          "email": "bumblebee@autobots.com",
          "createdAt": "2023-08-23T12:05:00Z",
          "updatedAt": "2023-08-23T12:05:00Z"
        }
        // More Autobots...
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 5,
        "pageSize": 10,
        "totalRecords": 50
      }
    }
    ```

- **Error Responses:**
  - **400 Bad Request:** Invalid query parameters.
  - **500 Internal Server Error:** Server encountered an unexpected condition.

---

#### Get Autobot by ID

Retrieve a single Autobot by its unique ID.

- **URL:** `/autobots/{id}`
- **Method:** `GET`
- **Path Parameters:**
  | Parameter | Type    | Required | Description                   |
  |-----------|---------|----------|-------------------------------|
  | `id`      | integer | Yes      | Unique identifier of the Autobot.|

- **Sample Request:**
  ```http
  GET /api/v1/autobots/1 HTTP/1.1
  Host: localhost:3000
  ```

- **Successful Response:**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "success": true,
      "data": {
        "id": 1,
        "name": "Optimus Prime",
        "username": "optimus",
        "email": "optimus@autobots.com",
        "createdAt": "2023-08-23T12:00:00Z",
        "updatedAt": "2023-08-23T12:00:00Z"
      }
    }
    ```

- **Error Responses:**
  - **404 Not Found:** Autobot with specified ID does not exist.
    ```json
    {
      "success": false,
      "error": "Autobot not found."
    }
    ```
  - **400 Bad Request:** Invalid ID format.
  - **500 Internal Server Error:** Server encountered an unexpected condition.

---

### Posts

#### Get Posts by Autobot ID

Retrieve a list of posts made by a specific Autobot.

- **URL:** `/autobots/{autobotId}/posts`
- **Method:** `GET`
- **Path Parameters:**
  | Parameter   | Type    | Required | Description                          |
  |-------------|---------|----------|--------------------------------------|
  | `autobotId` | integer | Yes      | Unique identifier of the Autobot.    |

- **Query Parameters:**
  | Parameter | Type    | Required | Default | Description                          |
  |-----------|---------|----------|---------|--------------------------------------|
  | `page`    | integer | No       | 1       | Page number for pagination.          |
  | `limit`   | integer | No       | 10      | Number of posts per page (max 50).   |

- **Sample Request:**
  ```http
  GET /api/autobots/1/posts?page=1&limit=5 HTTP/1.1
  Host: localhost:3000
  ```

- **Successful Response:**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": 101,
          "title": "Defending Earth",
          "content": "We must protect the humans.",
          "autobotId": 1,
          "createdAt": "2023-08-24T08:00:00Z",
          "updatedAt": "2023-08-24T08:00:00Z"
        },
        {
          "id": 102,
          "title": "Energy Sources",
          "content": "Looking for new energy sources.",
          "autobotId": 1,
          "createdAt": "2023-08-24T09:30:00Z",
          "updatedAt": "2023-08-24T09:30:00Z"
        }
        // More posts...
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 2,
        "pageSize": 5,
        "totalRecords": 10
      }
    }
    ```

- **Error Responses:**
  - **404 Not Found:** Autobot with specified ID does not exist.
    ```json
    {
      "success": false,
      "error": "Autobot not found."
    }
    ```
  - **400 Bad Request:** Invalid parameters.
  - **500 Internal Server Error:** Server encountered an unexpected condition.

---

#### Get Post by ID

Retrieve a single post by its unique ID.

- **URL:** `/posts/{postId}`
- **Method:** `GET`
- **Path Parameters:**
  | Parameter | Type    | Required | Description                 |
  |-----------|---------|----------|-----------------------------|
  | `postId`  | integer | Yes      | Unique identifier of the post.|

- **Sample Request:**
  ```http
  GET /api/posts/101 HTTP/1.1
  Host: localhost:3000
  ```

- **Successful Response:**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "success": true,
      "data": {
        "id": 101,
        "title": "Defending Earth",
        "content": "We must protect the humans.",
        "autobotId": 1,
        "createdAt": "2023-08-24T08:00:00Z",
        "updatedAt": "2023-08-24T08:00:00Z"
      }
    }
    ```

- **Error Responses:**
  - **404 Not Found:** Post with specified ID does not exist.
    ```json
    {
      "success": false,
      "error": "Post not found."
    }
    ```
  - **400 Bad Request:** Invalid ID format.
  - **500 Internal Server Error:** Server encountered an unexpected condition.

---

### Comments

#### Get Comments by Post ID

Retrieve a list of comments associated with a specific post.

- **URL:** `/posts/{postId}/comments`
- **Method:** `GET`
- **Path Parameters:**
  | Parameter | Type    | Required | Description                   |
  |-----------|---------|----------|-------------------------------|
  | `postId`  | integer | Yes      | Unique identifier of the post.|

- **Query Parameters:**
  | Parameter | Type    | Required | Default | Description                          |
  |-----------|---------|----------|---------|--------------------------------------|
  | `page`    | integer | No       | 1       | Page number for pagination.          |
  | `limit`   | integer | No       | 10      | Number of comments per page (max 50).|

- **Sample Request:**
  ```http
  GET /api/posts/101/comments?page=1&limit=5 HTTP/1.1
  Host: localhost:3000
  ```

- **Successful Response:**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "success": true,
      "data": [
        {
          "id": 1001,
          "content": "Well said, Optimus!",
          "postId": 101,
          "autobotId": 2,
          "createdAt": "2023-08-24T10:00:00Z",
          "updatedAt": "2023-08-24T10:00:00Z"
        },
        {
          "id": 1002,
          "content": "Agreed, we must act now.",
          "postId": 101,
          "autobotId": 3,
          "createdAt": "2023-08-24T10:05:00Z",
          "updatedAt": "2023-08-24T10:05:00Z"
        }
        // More comments...
      ],
      "pagination": {
        "currentPage": 1,
        "totalPages": 2,
        "pageSize": 5,
        "totalRecords": 10
      }
    }
    ```

- **Error Responses:**
  - **404 Not Found:** Post with specified ID does not exist.
    ```json
    {
      "success": false,
      "error": "Post not found."
    }
    ```
  - **400 Bad Request:** Invalid parameters.
  - **500 Internal Server Error:** Server encountered an unexpected condition.

---

#### Get Comment by ID

Retrieve a single comment by its unique ID.

- **URL:** `/comments/{commentId}`
- **Method:** `GET`
- **Path Parameters:**
  | Parameter   | Type    | Required | Description                     |
  |-------------|---------|----------|---------------------------------|
  | `commentId` | integer | Yes      | Unique identifier of the comment.|

- **Sample Request:**
  ```http
  GET /api/comments/1001 HTTP/1.1
  Host: localhost:3000
  ```

- **Successful Response:**
  - **Status Code:** `200 OK`
  - **Response Body:**
    ```json
    {
      "success": true,
      "data": {
        "id": 1001,
        "content": "Well said, Optimus!",
        "postId": 101,
        "autobotId": 2,
        "createdAt": "2023-08-24T10:00:00Z",
        "updatedAt": "2023-08-24T10:00:00Z"
      }
    }
    ```

- **Error Responses:**
  - **404 Not Found:** Comment with specified ID does not exist.
    ```json
    {
      "success": false,
      "error": "Comment not found."
    }
    ```
  - **400 Bad Request:** Invalid ID format.
  - **500 Internal Server Error:** Server encountered an unexpected condition.

---

## ⚠️ Error Handling

The API uses consistent error response formats to make it easier for clients to handle and debug issues.

- **Error Response Structure:**
  ```json
  {
    "success": false,
    "error": "Descriptive error message.",
  }
  ```

- **Example Error Response:**
  ```json
  {
    "success": false,
    "error": "Autobot not found.",
    "details": {
      "autobotId": 999
    }
  }
  ```

- **Common Error Messages:**
  - `"Autobot not found."`
  - `"Post not found."`
  - `"Comment not found."`
  - `"Invalid request parameters."`
  - `"Too many requests. Please try again later."`
  - `"Internal server error."`

---

## 📈 Status Codes

The API utilizes standard HTTP status codes to indicate the success or failure of API requests.

| Status Code | Description                                 |
|-------------|---------------------------------------------|
| **200 OK**              | The request was successful.                |
| **400 Bad Request**     | The request parameters are invalid.        |
| **404 Not Found**       | The requested resource does not exist.     |
| **429 Too Many Requests** | The rate limit has been exceeded.         |
| **500 Internal Server Error** | The server encountered an error.          |

---

## 📞 Support

If you encounter any issues or have questions about the Autobot API, please reach out:

- **Email:** opeyemi.ajegbomogun@yahoo.com
- **Issue Tracker:** [GitHub Issues](https://github.com/AJFX-01/SmartInsightTakeHome/issues)

We welcome contributions and feedback to improve the API and its documentation.

---

## 📜 License

This project is licensed under the [MIT License](../LICENSE). You are free to use, modify, and distribute this software in accordance with the license terms.

---
