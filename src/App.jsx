import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { ProductsPage } from './components/ProductsPage';
import { ShoppingCartPage } from './components/ShoppingCartPage';
import { CheckoutPage } from './components/CheckoutPage';
import { ConfirmationPage } from './components/ConfirmationPage';
import './App.css';

function formatOrderId(num) {
  return `ORD-${String(num).padStart(4, '0')}`;
}

function formatOrderDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function App() {
  const [step, setStep] = useState('products');
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [orderCounter, setOrderCounter] = useState(1);
  const [latestOrder, setLatestOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToastMessage(`${product.name} added to cart`);
  };

  const handleUpdateQty = (productId, nextQty) => {
    if (nextQty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: nextQty } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    const target = cart.find((item) => item.id === productId);
    setCart((prev) => prev.filter((item) => item.id !== productId));
    if (target) {
      setToastMessage(`${target.name} removed from cart`);
    }
  };

  const handleClearCart = () => {
    setCart([]);
    setPromoCode('');
    setToastMessage('Cart cleared');
  };

  const handleAddAllSample = () => {
    setCart(PRODUCTS.map((product) => ({ ...product, qty: 1 })));
    setToastMessage('Added all 4 products to cart');
  };

  const handlePlaceOrder = ({
    customer,
    shippingMethod,
    subtotal,
    discountAmount,
    grandTotal,
  }) => {
    const newOrder = {
      orderId: formatOrderId(orderCounter),
      customerName: `${customer.firstName} ${customer.lastName}`,
      customer,
      orderDate: formatOrderDate(new Date()),
      items: cart.map((item) => ({ ...item })),
      shippingMethod,
      subtotal,
      discountAmount,
      totalAmount: grandTotal,
      status: 'Pending',
    };

    setLatestOrder(newOrder);
    setOrderCounter((prev) => prev + 1);
    setCart([]);
    setPromoCode('');
    setStep('confirmation');
  };

  const handleStartNewOrder = () => {
    setLatestOrder(null);
    setStep('products');
  };

  return (
    <div className="app-shell">
      <Navbar
        currentStep={step}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNavigate={setStep}
        cartCount={cartCount}
      />

      <main className="app-main">
        {step === 'products' && (
          <ProductsPage
            cart={cart}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
            onResetFilters={() => {
              setActiveCategory('All');
              setSearchQuery('');
            }}
            onAddToCart={handleAddToCart}
            onGoToCart={() => setStep('cart')}
          />
        )}

        {step === 'cart' && (
          <ShoppingCartPage
            cart={cart}
            onUpdateQty={handleUpdateQty}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onAddAllSample={handleAddAllSample}
            onContinueShopping={() => setStep('products')}
            onProceedToCheckout={() => setStep('checkout')}
            promoCode={promoCode}
            onApplyPromo={setPromoCode}
          />
        )}

        {step === 'checkout' && (
          <CheckoutPage
            cart={cart}
            promoCode={promoCode}
            onBackToCart={() => setStep('cart')}
            onPlaceOrder={handlePlaceOrder}
          />
        )}

        {step === 'confirmation' && (
          <ConfirmationPage
            order={latestOrder}
            onStartNewOrder={handleStartNewOrder}
          />
        )}
      </main>

      {toastMessage && (
        <div className="toast-banner" role="status" aria-live="polite">
          <span className="toast-icon">
            <Check size={13} strokeWidth={2.5} />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
