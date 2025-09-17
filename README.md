# Flower Delivery App
[link](https://flowerdeliveryapp.netlify.app/)

## Middle Level Implemented


A web application for selecting flower shops, adding bouquets/flowers to cart, placing orders, and viewing order details.

## Features

### Flower Shops Page
- Display list of shops and products from database
- Add products to cart
- Sort products by price and date added
- Mark products as favorites (displayed first when sorting)

### Shopping Cart Page
- View cart items
- Remove items and update quantities
- Input fields: email, phone, delivery address
- Place order (saved to database)
- Cart persisted in Local Storage
- Order time tracking with client timezone

### Order Details Page
- Automatic redirect after order placement
- Display:
  - Order ID
  - Item list
  - Total amount
  - Delivery address
  - Date and time (with timezone consideration)

## Technologies

### Frontend
- **React 18** + TypeScript
- **Vite** for building
- **Tailwind CSS** for styling
- **Heroicons** for icons

### Backend
- **Node.js** + Express
- **TypeScript**
- **MongoDB** with Mongoose
- **CORS** for cross-origin requests

## Installation & Setup

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd flower-delivery-app
```
### 2. Setup Server
```bash
cd server
npm install
```
Create .env file in server directory:
```env
MONGODB_URI=mongodb://localhost:27017/flower-delivery
PORT=5000
```
### 3. Setup Client
```bash
cd client
npm install
```
### 4. Start Development
Server (in separate terminal):

```bash
cd server
npm run dev
```
Client (in separate terminal):

```bash
cd client
npm run dev
```
Application will be available at:

- Client: http://localhost:5173

- Server: http://localhost:5000

## Database
Application uses MongoDB with three main collections:

### Collections
- `shops` - shop information

- `products` - products (flowers and bouquets)

- `orders` - order history

### Add Sample Data
Send POST request via Postman to:

```text
POST http://localhost:5000/api/dev/sample-data
```
Or create data manually through API:

```bash
# Create shop
POST /api/dev/shops

# Create product
POST /api/dev/products

# Clear all data
DELETE /api/dev/clear-data
```
## API Endpoints
### Shops
- `GET /api/shops` - get all shops

- `POST /api/dev/shops` - create shop (development only)

### Products
- `GET /api/products` - get products (with filtering)

- `PATCH /api/products/:id/favorite` - toggle favorite status

- `POST /api/dev/products` - create product (development only)

### Orders
- `POST /api/orders` - create order

- `GET /api/orders/:id` - get order details

### Development
- `POST /api/dev/sample-data` - create sample data

- `DELETE /api/dev/clear-data` - clear all data

## Deployment
The application is available at the public URL:   
https://flowerdeliveryapp.netlify.app/
