# Online Book Store

Welcome to the **Online Book Store** project! This application provides a seamless platform for users to browse, purchase, and manage books, favorites, and orders.

## Features

- **User Authentication**: Secure sign-up and login system using JSON Web Tokens (JWT).
- **Book Management**: Browse, search, and view details of available books.
- **Favorites**: Add books to your favorites list for easy access.
- **Cart**: Manage your shopping cart for book purchases.
- **Order Management**: Place orders and view past purchase history.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for ORM)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Management**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/online-book-store.git
   cd online-book-store
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Access the application:
   - Base URL: `http://localhost:1000`

## API Endpoints

### User Routes

| Endpoint         | Method | Description               |
|------------------|--------|---------------------------|
| `/api/v1/sign-up` | POST   | Register a new user       |
| `/api/v1/login`   | POST   | User login and token issue|

### Book Routes

| Endpoint              | Method | Description                  |
|-----------------------|--------|------------------------------|
| `/api/v1/book`        | GET    | Get all books                |
| `/api/v1/book/:id`    | GET    | Get book details by ID       |
| `/api/v1/book`        | POST   | Add a new book (admin only)  |
| `/api/v1/book/:id`    | PUT    | Update book details (admin)  |
| `/api/v1/book/:id`    | DELETE | Delete a book (admin only)   |

### Favorites Routes

| Endpoint                     | Method | Description                  |
|------------------------------|--------|------------------------------|
| `/api/v1/favourite`          | GET    | Get all favorite books       |
| `/api/v1/favourite/:bookId`  | POST   | Add a book to favorites      |
| `/api/v1/favourite/:bookId`  | DELETE | Remove a book from favorites |

### Cart Routes

| Endpoint              | Method | Description              |
|-----------------------|--------|--------------------------|
| `/api/v1/cart`        | GET    | View cart items          |
| `/api/v1/cart`        | POST   | Add a book to cart       |
| `/api/v1/cart/:id`    | DELETE | Remove a book from cart  |

### Order Routes

| Endpoint             | Method | Description             |
|----------------------|--------|-------------------------|
| `/api/v1/order`      | POST   | Place an order          |
| `/api/v1/order`      | GET    | Get all user orders     |


## Testing

1. Use Postman or a similar tool to test the API endpoints.
2. Example Test Request:
   - **Sign-Up**:
     - **Endpoint**: `/api/v1/sign-up`
     - **Method**: POST
     - **Body**:
       ```json
       {
           "username": "drashti",
           "email": "drashti@gmail.com",
           "password": "123",
           "address": "xyz"
       }
       ```





