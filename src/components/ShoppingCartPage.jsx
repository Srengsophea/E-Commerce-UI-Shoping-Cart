import { useState } from 'react';
import {
  Minus,
  Plus,
  Trash2,
  Heart,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Tag,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import { PRODUCTS, formatCurrency } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

const PROMO_CODES = {
  SAVE10: { label: 'SAVE10 (10% off)', type: 'percent', value: 0.1 },
  TECH20: { label: 'TECH20 ($20 off)', type: 'fixed', value: 20 },
};

export function ShoppingCartPage({
  cart,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onAddAllSample,
  onContinueShopping,
  onProceedToCheckout,
  promoCode,
  onApplyPromo,
}) {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [showPromoInput, setShowPromoInput] = useState(Boolean(promoCode));
  const [promoDraft, setPromoDraft] = useState(promoCode || '');
  const [promoError, setPromoError] = useState('');

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const activePromo = promoCode ? PROMO_CODES[promoCode] : null;
  const discountAmount = activePromo
    ? activePromo.type === 'percent'
      ? Number((subtotal * activePromo.value).toFixed(2))
      : Math.min(activePromo.value, subtotal)
    : 0;

  const grandTotal = Math.max(0, subtotal - discountAmount);

  const toggleWishlist = (id) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePromoSubmit = (e) => {
    e.preventDefault();
    const normalized = promoDraft.trim().toUpperCase();
    if (!normalized) {
      setPromoError('Enter a promo code (try SAVE10)');
      return;
    }
    if (!PROMO_CODES[normalized]) {
      setPromoError('Invalid code. Try SAVE10 or TECH20');
      return;
    }
    setPromoError('');
    onApplyPromo(normalized);
  };

  const handleRemovePromo = () => {
    onApplyPromo('');
    setPromoDraft('');
    setPromoError('');
  };

  if (cart.length === 0) {
    return (
      <section className="page-container">
        <div className="cart-empty-card">
          <div className="cart-empty-icon">
            <ShoppingBag size={30} strokeWidth={1.6} />
          </div>
          <h1 className="cart-empty-title">Your shopping cart is empty</h1>
          <p className="cart-empty-text">
            Add products from the catalog to review quantities, calculate
            subtotals, and proceed to checkout.
          </p>
          <div className="cart-empty-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onContinueShopping}
            >
              <ArrowLeft size={16} />
              <span>Browse Products</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onAddAllSample}
            >
              <span>Load All {PRODUCTS.length} Products</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-container">
      <div className="cart-layout">
        {/* Left Column: Cart Items */}
        <div className="cart-items-panel">
          <div className="cart-panel-header">
            <div className="cart-heading-group">
              <h1 className="cart-title">Cart</h1>
              <span className="cart-count-pill tabular-nums">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="cart-header-actions">
              <button
                type="button"
                className="text-action-btn"
                onClick={onContinueShopping}
              >
                <ArrowLeft size={15} />
                <span>Add more products</span>
              </button>
              <button
                type="button"
                className="text-action-btn is-danger"
                onClick={onClearCart}
              >
                Clear cart
              </button>
            </div>
          </div>

          <div className="cart-items-list">
            {cart.map((item) => {
              const lineTotal = item.price * item.qty;
              const isWishlisted = wishlistIds.includes(item.id);

              return (
                <article key={item.id} className="cart-item-card">
                  <div className="cart-item-thumb">
                    <ProductArtwork
                      productId={item.id}
                      className="cart-item-svg"
                    />
                  </div>

                  <div className="cart-item-details">
                    <div className="cart-item-top">
                      <div>
                        <h2 className="cart-item-name">{item.name}</h2>
                        <dl className="cart-item-specs">
                          <div>
                            <dt>Variant:</dt>
                            <dd>{item.variant}</dd>
                          </div>
                          <div>
                            <dt>Color:</dt>
                            <dd>{item.color}</dd>
                          </div>
                          <div>
                            <dt>Unit Price:</dt>
                            <dd className="tabular-nums">
                              {formatCurrency(item.price)}
                            </dd>
                          </div>
                        </dl>
                      </div>

                      <div className="cart-item-price-block">
                        <span className="cart-item-total tabular-nums">
                          {formatCurrency(lineTotal)}
                        </span>
                        {item.qty > 1 && (
                          <span className="cart-item-unit-note tabular-nums">
                            {formatCurrency(item.price)} × {item.qty}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-item-icon-actions">
                        <button
                          type="button"
                          className={`icon-action-btn ${
                            isWishlisted ? 'is-wishlisted' : ''
                          }`}
                          onClick={() => toggleWishlist(item.id)}
                          aria-label={
                            isWishlisted
                              ? `Remove ${item.name} from wishlist`
                              : `Save ${item.name} for later`
                          }
                          title={
                            isWishlisted ? 'Saved to wishlist' : 'Save for later'
                          }
                        >
                          <Heart
                            size={17}
                            fill={isWishlisted ? 'currentColor' : 'none'}
                          />
                        </button>

                        <button
                          type="button"
                          className="icon-action-btn is-remove"
                          onClick={() => onRemoveItem(item.id)}
                          aria-label={`Remove ${item.name} from cart`}
                          title="Remove item"
                        >
                          <Trash2 size={17} />
                          <span className="remove-label">Remove</span>
                        </button>
                      </div>

                      <div
                        className="qty-stepper"
                        role="group"
                        aria-label={`Quantity controls for ${item.name}`}
                      >
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.qty - 1)}
                          disabled={item.qty <= 1}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} strokeWidth={2.2} />
                        </button>
                        <span className="qty-value tabular-nums">
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, item.qty + 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} strokeWidth={2.2} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="order-summary-card" aria-label="Order Summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-rows">
            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span className="tabular-nums font-medium">
                {formatCurrency(subtotal)}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span className="summary-muted">Free / Standard</span>
            </div>

            <div className="summary-row">
              <span>Discount</span>
              <span
                className={`tabular-nums ${
                  discountAmount > 0 ? 'summary-discount' : 'summary-muted'
                }`}
              >
                {discountAmount > 0
                  ? `-${formatCurrency(discountAmount)}`
                  : '—'}
              </span>
            </div>
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <span>Grand Total</span>
            <span className="summary-grand-total tabular-nums">
              {formatCurrency(grandTotal)}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-full btn-lg"
            onClick={onProceedToCheckout}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={17} />
          </button>

          {/* Optional Promo Code (clean toggle like screenshot) */}
          <div className="promo-section">
            {activePromo ? (
              <div className="promo-applied-chip">
                <div className="promo-chip-left">
                  <Tag size={14} />
                  <span>{activePromo.label}</span>
                </div>
                <button
                  type="button"
                  className="promo-remove-btn"
                  onClick={handleRemovePromo}
                  aria-label="Remove promo code"
                >
                  <X size={14} />
                </button>
              </div>
            ) : !showPromoInput ? (
              <button
                type="button"
                className="promo-toggle-link"
                onClick={() => setShowPromoInput(true)}
              >
                Use a promo code
              </button>
            ) : (
              <form className="promo-form" onSubmit={handlePromoSubmit}>
                <div className="promo-input-row">
                  <input
                    type="text"
                    value={promoDraft}
                    onChange={(e) => {
                      setPromoDraft(e.target.value);
                      if (promoError) setPromoError('');
                    }}
                    placeholder="Enter SAVE10 or TECH20"
                    className="promo-input"
                    aria-label="Promo code"
                  />
                  <button type="submit" className="btn btn-secondary btn-sm">
                    Apply
                  </button>
                </div>
                {promoError && <p className="promo-error">{promoError}</p>}
              </form>
            )}
          </div>

          <div className="summary-perks">
            <div className="perk-item">
              <Truck size={15} />
              <span>Free standard shipping available at checkout</span>
            </div>
            <div className="perk-item">
              <ShieldCheck size={15} />
              <span>UI-only preview • Instant local calculation</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
