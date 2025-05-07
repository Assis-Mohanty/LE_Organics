# Organic Food Store eCommerce

A full-stack eCommerce platform for organic food products built with modern web technologies.

## Tech Stack

- **Frontend**: React, TailwindCSS, Redux Toolkit
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **Payment**: Stripe
- **State Management**: Redux Toolkit

## Features

- User authentication (Register/Login)
- Product browsing with filters
- Shopping cart functionality
- Secure checkout process
- Order tracking
- Admin dashboard
- Responsive design

## Project Structure

```
organic-store/
├── client/                 # Frontend React application
├── server/                 # Backend Node.js/Express application
└── README.md              # Project documentation
```

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Create a `.env` file in the client directory:
   ```
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
   ```

5. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## API Documentation

The API documentation will be available at `http://localhost:5000/api-docs` when the server is running.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 