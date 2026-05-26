# E-Commerce Backend API

A simple backend API for an e-commerce application built with **Node.js** and **Express.js**.  
This project simulates a real-world online store system including users, products, carts, and orders — using JSON files as a lightweight database.

---

## Project Overview

This project demonstrates how an e-commerce backend works step by step:

- User authentication system
- Product listing and retrieval
- Shopping cart management
- Order creation from cart items
- Order tracking and status updates

All data is stored in local JSON files instead of a real database, making it simple and easy to understand.

---

## Features

### Authentication
- User registration and login
- Middleware-based authentication
- Protected routes using `user-id` header
- Basic role system (user / admin)

---

### Products
- Get all products
- Get product by ID
- Products used for cart and order calculations

---

### Cart
- Add product to cart
- Increase quantity if product already exists
- Remove single product from cart
- Clear cart
- Get user cart

---

### Orders
- Create order from cart items
- Calculate total price automatically
- Store product price at purchase time
- Get all user orders
- Get order by ID
- Update order status (pending → shipped)

---

## System Flow

1. User logs in / registers
2. User browses products
3. Products are added to cart
4. Cart is converted into an order
5. Order stores final price and product snapshot
6. Cart is cleared after order creation

---

## Concepts Used

- REST API design
- Express routing
- Middleware (authentication & authorization)
- File system operations (JSON storage)
- Array methods (`map`, `find`, `filter`, `some`)
- Basic e-commerce business logic

---

## Data Storage

This project uses JSON files instead of a database:

- `users.json` – user data
- `products.json` – product catalog
- `carts.json` – shopping cart data
- `orders.json` – order history

---

## Tech Stack

- Node.js
- Express.js
- JavaScript (ES Modules)
- File System (fs module)

---

## Purpose

This project was built for learning backend development concepts:

- How REST APIs are structured
- How authentication middleware works
- How cart → order systems are implemented
- How data flows in real backend systems
- How to simulate a database using files

---

## Author

Built for learning purposes while studying backend development with Node.js.