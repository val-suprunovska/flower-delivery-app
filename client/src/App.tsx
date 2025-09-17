import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FlowerShopsPage } from './pages/FlowerShopsPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { OrderDetailsPage } from './pages/OrderDetailsPage';
import { Navigation } from './components/Navigation';
import { CartProvider } from './contexts/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<FlowerShopsPage />} />
            <Route path="/cart" element={<ShoppingCartPage />} />
            <Route path="/order/:orderId" element={<OrderDetailsPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;