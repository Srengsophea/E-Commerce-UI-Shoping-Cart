import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Lock,
  Truck,
} from 'lucide-react';
import { SHIPPING_METHODS, formatCurrency } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields(values) {
  const errors = {};

  if (!values.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }
  if (!values.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }
  if (!values.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (values.phone.replace(/\D/g, '').length < 7) {
    errors.phone = 'Please enter a valid phone number (at least 7 digits).';
  }
  if (!values.address.trim()) {
    errors.address = 'Shipping address is required.';
  }

  return errors;
}

export function CheckoutPage({
  cart,
  promoCode,
  onBackToCart,
  onPlaceOrder,
}) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [shippingId, setShippingId] = useState(SHIPPING_METHODS[0].id);

  const selectedShipping =
    SHIPPING_METHODS.find((m) => m.id === shippingId) || SHIPPING_METHODS[0];

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  let discountAmount = 0;
  if (promoCode === 'SAVE10') {
    discountAmount = Number((subtotal * 0.1).toFixed(2));
  } else if (promoCode === 'TECH20') {
    discountAmount = Math.min(20, subtotal);
  }

  const grandTotal = Math.max(
    0,
    subtotal - discountAmount + selectedShipping.price
  );

  const handleChange = (field, value) => {
    const nextForm = { ...form, [field]: value };
    setForm(nextForm);
    if (touched[field]) {
      const nextErrors = validateFields(nextForm);
      setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const nextErrors = validateFields(form);
    setErrors((prev) => ({ ...prev, [field]: nextErrors[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateFields(form);
    setErrors(validationErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
    });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    onPlaceOrder({
      customer: {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
      },
      shippingMethod: selectedShipping,
      subtotal,
      discountAmount,
      grandTotal,
    });
  };

  return (
    <section className="page-container">
      <div className="checkout-top-bar">
        <nav className="flow-breadcrumb" aria-label="Checkout progress">
          <button
            type="button"
            className="flow-crumb-link"
            onClick={onBackToCart}
          >
            Cart
          </button>
          <span className="flow-crumb-sep">&rsaquo;</span>
          <span className="flow-crumb-current">Checkout</span>
          <span className="flow-crumb-sep">&rsaquo;</span>
          <span className="flow-crumb-muted">Confirmation</span>
        </nav>

        <button
          type="button"
          className="text-action-btn"
          onClick={onBackToCart}
        >
          <ArrowLeft size={15} />
          <span>Back to Cart</span>
        </button>
      </div>

      <form className="checkout-layout" onSubmit={handleSubmit} noValidate>
        {/* Left Column: Customer Form + Shipping Method */}
        <div className="checkout-form-panel">
          <div className="checkout-section">
            <h1 className="checkout-title">Shipping Address</h1>
            <p className="checkout-subtitle">
              Enter your contact and delivery details to complete your order.
            </p>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="firstName" className="field-label">
                  First Name <span className="required-star">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  placeholder="Sokha"
                  className={`field-input ${
                    touched.firstName && errors.firstName ? 'is-error' : ''
                  }`}
                />
                {touched.firstName && errors.firstName && (
                  <p className="field-error">
                    <AlertCircle size={13} />
                    <span>{errors.firstName}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="lastName" className="field-label">
                  Last Name <span className="required-star">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  placeholder="Chan"
                  className={`field-input ${
                    touched.lastName && errors.lastName ? 'is-error' : ''
                  }`}
                />
                {touched.lastName && errors.lastName && (
                  <p className="field-error">
                    <AlertCircle size={13} />
                    <span>{errors.lastName}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="email" className="field-label">
                  Email <span className="required-star">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="sokha.chan@example.com"
                  className={`field-input ${
                    touched.email && errors.email ? 'is-error' : ''
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="field-error">
                    <AlertCircle size={13} />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div className="form-field">
                <label htmlFor="phone" className="field-label">
                  Phone Number <span className="required-star">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  placeholder="+855 12 345 678"
                  className={`field-input ${
                    touched.phone && errors.phone ? 'is-error' : ''
                  }`}
                />
                {touched.phone && errors.phone && (
                  <p className="field-error">
                    <AlertCircle size={13} />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              <div className="form-field form-field-full">
                <label htmlFor="address" className="field-label">
                  Address <span className="required-star">*</span>
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={form.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  onBlur={() => handleBlur('address')}
                  placeholder="Street 271, Sangkat Boeung Tompun, Phnom Penh"
                  className={`field-input field-textarea ${
                    touched.address && errors.address ? 'is-error' : ''
                  }`}
                />
                {touched.address && errors.address && (
                  <p className="field-error">
                    <AlertCircle size={13} />
                    <span>{errors.address}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="checkout-section">
            <div className="section-heading-row">
              <Truck size={18} />
              <h2 className="checkout-section-title">Shipping Method</h2>
            </div>

            <div className="shipping-options">
              {SHIPPING_METHODS.map((method) => {
                const isSelected = method.id === shippingId;
                return (
                  <label
                    key={method.id}
                    className={`shipping-card ${
                      isSelected ? 'is-selected' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="shippingMethod"
                      value={method.id}
                      checked={isSelected}
                      onChange={() => setShippingId(method.id)}
                      className="sr-only"
                    />
                    <div className="shipping-card-top">
                      <span className="shipping-radio-dot">
                        {isSelected && <span className="shipping-radio-inner" />}
                      </span>
                      <span className="shipping-name">{method.name}</span>
                      <span className="shipping-price tabular-nums">
                        {method.price === 0
                          ? '$0'
                          : formatCurrency(method.price)}
                      </span>
                    </div>
                    <p className="shipping-desc">{method.description}</p>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="order-summary-card" aria-label="Your Cart Summary">
          <h2 className="summary-title">Your Cart</h2>

          <div className="checkout-mini-items">
            {cart.map((item) => (
              <div key={item.id} className="mini-item-row">
                <div className="mini-item-thumb">
                  <ProductArtwork
                    productId={item.id}
                    className="mini-item-svg"
                  />
                  <span className="mini-qty-badge tabular-nums">
                    {item.qty}
                  </span>
                </div>
                <div className="mini-item-info">
                  <span className="mini-item-name">{item.name}</span>
                  <span className="mini-item-meta">{item.variant}</span>
                </div>
                <span className="mini-item-price tabular-nums">
                  {formatCurrency(item.price * item.qty)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal</span>
              <span className="tabular-nums font-medium">
                {formatCurrency(subtotal)}
              </span>
            </div>
            <div className="summary-row">
              <span>Shipping ({selectedShipping.name})</span>
              <span className="tabular-nums">
                {selectedShipping.price === 0
                  ? '$0.00'
                  : formatCurrency(selectedShipping.price)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="summary-row">
                <span>Discount ({promoCode})</span>
                <span className="summary-discount tabular-nums">
                  -{formatCurrency(discountAmount)}
                </span>
              </div>
            )}
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <span>Grand Total</span>
            <span className="summary-grand-total tabular-nums">
              {formatCurrency(grandTotal)}
            </span>
          </div>

          <button type="submit" className="btn btn-primary btn-full btn-lg">
            <CheckCircle2 size={17} />
            <span>Place Order</span>
          </button>

          <p className="checkout-secure-note">
            <Lock size={13} />
            <span>UI Simulation • No real payment processed</span>
          </p>
        </aside>
      </form>
    </section>
  );
}
