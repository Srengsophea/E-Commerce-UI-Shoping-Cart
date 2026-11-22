import { useState } from 'react';
import {
  CheckCircle2,
  Printer,
  ShoppingBag,
  Clock,
  MapPin,
  Mail,
  Phone,
  Truck,
  Copy,
  Check,
  Package,
  Calendar,
  User,
  Hash,
} from 'lucide-react';
import { formatCurrency } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

export function ConfirmationPage({ order, onStartNewOrder }) {
  const [copiedId, setCopiedId] = useState(false);

  if (!order) return null;

  const totalItems = order.items.reduce((sum, item) => sum + item.qty, 0);

  const handleCopyOrderId = async () => {
    try {
      await navigator.clipboard.writeText(order.orderId);
      setCopiedId(true);
      window.setTimeout(() => setCopiedId(false), 1800);
    } catch {
      // Clipboard API may be unavailable in restricted contexts
    }
  };

  return (
    <section className="page-container">
      {/* ==================== Interactive Screen View ==================== */}
      <div className="conf-screen-only">
        {/* Top Hero Banner */}
        <div className="conf-banner">
          <div className="conf-banner-left">
            <div className="conf-check-badge">
              <CheckCircle2 size={28} strokeWidth={2.1} />
            </div>
            <div>
              <div className="conf-eyebrow-row">
                <span className="conf-order-pill tabular-nums">
                  Order ID: {order.orderId}
                </span>
                <button
                  type="button"
                  className="conf-copy-btn"
                  onClick={handleCopyOrderId}
                  title="Copy Order ID"
                >
                  {copiedId ? (
                    <>
                      <Check size={12} />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <span className="status-badge-pending">
                  <span className="status-dot-pulse" />
                  <span>Order Status: {order.status}</span>
                </span>
              </div>

              <h1 className="conf-title">Order Placed Successfully!</h1>
              <p className="conf-subtitle">
                Thank you, <strong>{order.customerName}</strong>. A summary of
                your order has been prepared below.
              </p>
            </div>
          </div>

          <div className="conf-banner-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              <Printer size={16} />
              <span>Print Receipt</span>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onStartNewOrder}
            >
              <ShoppingBag size={16} />
              <span>Start New Order</span>
            </button>
          </div>
        </div>

        {/* Visual Status Timeline */}
        <div className="conf-timeline-card">
          <div className="conf-timeline">
            <div className="timeline-step is-done">
              <div className="timeline-node">
                <Check size={13} strokeWidth={2.6} />
              </div>
              <div className="timeline-text">
                <span className="timeline-title">Order Placed</span>
                <span className="timeline-sub">{order.orderDate}</span>
              </div>
            </div>

            <div className="timeline-connector is-active" />

            <div className="timeline-step is-current">
              <div className="timeline-node">
                <Clock size={13} strokeWidth={2.3} />
              </div>
              <div className="timeline-text">
                <span className="timeline-title">{order.status}</span>
                <span className="timeline-sub">Awaiting verification</span>
              </div>
            </div>

            <div className="timeline-connector" />

            <div className="timeline-step">
              <div className="timeline-node">
                <Package size={13} strokeWidth={2} />
              </div>
              <div className="timeline-text">
                <span className="timeline-title">Packing</span>
                <span className="timeline-sub">Prepared for dispatch</span>
              </div>
            </div>

            <div className="timeline-connector" />

            <div className="timeline-step">
              <div className="timeline-node">
                <Truck size={13} strokeWidth={2} />
              </div>
              <div className="timeline-text">
                <span className="timeline-title">Delivery</span>
                <span className="timeline-sub">
                  {order.shippingMethod.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Two-Column Main Content */}
        <div className="conf-grid">
          {/* Left Column: Customer, Order Info & Delivery */}
          <div className="conf-left-col">
            <div className="conf-card">
              <h2 className="conf-card-title">Order Information</h2>

              <div className="conf-info-grid">
                <div className="conf-info-item">
                  <span className="conf-info-icon">
                    <Hash size={15} />
                  </span>
                  <div>
                    <span className="conf-info-label">Order ID</span>
                    <span className="conf-info-val tabular-nums">
                      {order.orderId}
                    </span>
                  </div>
                </div>

                <div className="conf-info-item">
                  <span className="conf-info-icon">
                    <User size={15} />
                  </span>
                  <div>
                    <span className="conf-info-label">Customer Name</span>
                    <span className="conf-info-val">{order.customerName}</span>
                  </div>
                </div>

                <div className="conf-info-item">
                  <span className="conf-info-icon">
                    <Calendar size={15} />
                  </span>
                  <div>
                    <span className="conf-info-label">Order Date</span>
                    <span className="conf-info-val tabular-nums">
                      {order.orderDate}
                    </span>
                  </div>
                </div>

                <div className="conf-info-item">
                  <span className="conf-info-icon">
                    <Clock size={15} />
                  </span>
                  <div>
                    <span className="conf-info-label">Order Status</span>
                    <span className="status-badge-pending is-compact">
                      <span className="status-dot-pulse" />
                      <span>{order.status}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="conf-card">
              <h2 className="conf-card-title">Shipping &amp; Contact</h2>

              <div className="conf-delivery-list">
                <div className="conf-delivery-row">
                  <span className="conf-info-icon">
                    <MapPin size={15} />
                  </span>
                  <div>
                    <span className="conf-info-label">Delivery Address</span>
                    <span className="conf-info-val">
                      {order.customer.address}
                    </span>
                  </div>
                </div>

                <div className="conf-delivery-row">
                  <span className="conf-info-icon">
                    <Truck size={15} />
                  </span>
                  <div>
                    <span className="conf-info-label">Shipping Method</span>
                    <span className="conf-info-val">
                      {order.shippingMethod.name} (
                      {order.shippingMethod.price === 0
                        ? 'Free'
                        : formatCurrency(order.shippingMethod.price)}
                      )
                    </span>
                    <span className="conf-info-hint">
                      {order.shippingMethod.description}
                    </span>
                  </div>
                </div>

                <div className="conf-contact-split">
                  <div className="conf-delivery-row">
                    <span className="conf-info-icon">
                      <Mail size={15} />
                    </span>
                    <div>
                      <span className="conf-info-label">Email</span>
                      <span className="conf-info-val">
                        {order.customer.email}
                      </span>
                    </div>
                  </div>

                  <div className="conf-delivery-row">
                    <span className="conf-info-icon">
                      <Phone size={15} />
                    </span>
                    <div>
                      <span className="conf-info-label">Phone Number</span>
                      <span className="conf-info-val tabular-nums">
                        {order.customer.phone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ordered Products & Total Amount */}
          <aside className="conf-card conf-summary-card">
            <div className="conf-summary-header">
              <h2 className="conf-card-title">Ordered Products</h2>
              <span className="cart-count-pill tabular-nums">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            <div className="conf-items-list">
              {order.items.map((item) => (
                <div key={item.id} className="conf-item-row">
                  <div className="mini-item-thumb">
                    <ProductArtwork
                      productId={item.id}
                      className="mini-item-svg"
                    />
                    <span className="mini-qty-badge tabular-nums">
                      {item.qty}
                    </span>
                  </div>

                  <div className="conf-item-info">
                    <span className="conf-item-name">{item.name}</span>
                    <span className="conf-item-meta tabular-nums">
                      {item.variant} • {formatCurrency(item.price)} each
                    </span>
                  </div>

                  <span className="conf-item-total tabular-nums">
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
                  {formatCurrency(order.subtotal)}
                </span>
              </div>
              <div className="summary-row">
                <span>Shipping ({order.shippingMethod.name})</span>
                <span className="tabular-nums">
                  {order.shippingMethod.price === 0
                    ? '$0.00'
                    : formatCurrency(order.shippingMethod.price)}
                </span>
              </div>
              {order.discountAmount > 0 && (
                <div className="summary-row">
                  <span>Discount</span>
                  <span className="summary-discount tabular-nums">
                    -{formatCurrency(order.discountAmount)}
                  </span>
                </div>
              )}
            </div>

            <div className="summary-divider" />

            <div className="conf-total-box">
              <span>Total Amount</span>
              <span className="conf-total-amount tabular-nums">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </aside>
        </div>
      </div>

      {/* ==================== Dedicated Print Receipt View ==================== */}
      <div className="print-receipt" aria-hidden="true">
        <div className="print-header">
          <div>
            <div className="print-brand">MinimalTech</div>
            <div className="print-brand-sub">Official Order Receipt</div>
          </div>

          <div className="print-header-right">
            <div className="print-doc-label">ORDER RECEIPT</div>
            <div className="print-order-id tabular-nums">{order.orderId}</div>
          </div>
        </div>

        <div className="print-status-strip">
          <div className="print-status-left">
            <span className="print-check-mark">✓</span>
            <span>
              <strong>Order Placed Successfully!</strong> — Thank you,{' '}
              {order.customerName}.
            </span>
          </div>
          <span className="print-status-pill">
            Order Status: {order.status}
          </span>
        </div>

        <div className="print-meta-grid">
          <div className="print-meta-card">
            <div className="print-section-label">CUSTOMER &amp; DELIVERY</div>
            <div className="print-meta-row">
              <span className="print-key">Customer Name</span>
              <span className="print-val">{order.customerName}</span>
            </div>
            <div className="print-meta-row">
              <span className="print-key">Email</span>
              <span className="print-val">{order.customer.email}</span>
            </div>
            <div className="print-meta-row">
              <span className="print-key">Phone Number</span>
              <span className="print-val tabular-nums">
                {order.customer.phone}
              </span>
            </div>
            <div className="print-meta-row">
              <span className="print-key">Delivery Address</span>
              <span className="print-val">{order.customer.address}</span>
            </div>
          </div>

          <div className="print-meta-card">
            <div className="print-section-label">ORDER SUMMARY</div>
            <div className="print-meta-row">
              <span className="print-key">Order ID</span>
              <span className="print-val tabular-nums">{order.orderId}</span>
            </div>
            <div className="print-meta-row">
              <span className="print-key">Order Date</span>
              <span className="print-val tabular-nums">{order.orderDate}</span>
            </div>
            <div className="print-meta-row">
              <span className="print-key">Shipping Method</span>
              <span className="print-val">{order.shippingMethod.name}</span>
            </div>
            <div className="print-meta-row">
              <span className="print-key">Order Status</span>
              <span className="print-val">{order.status}</span>
            </div>
          </div>
        </div>

        <div className="print-table-wrap">
          <div className="print-section-label">
            ORDERED PRODUCTS ({totalItems}{' '}
            {totalItems === 1 ? 'ITEM' : 'ITEMS'})
          </div>
          <table className="print-table">
            <thead>
              <tr>
                <th className="col-idx">#</th>
                <th>Product</th>
                <th className="col-num">Unit Price</th>
                <th className="col-qty">Qty</th>
                <th className="col-num">Line Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={item.id}>
                  <td className="col-idx tabular-nums">{idx + 1}</td>
                  <td>
                    <div className="print-prod-name">{item.name}</div>
                    <div className="print-prod-meta">
                      {item.variant} • {item.color}
                    </div>
                  </td>
                  <td className="col-num tabular-nums">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="col-qty tabular-nums">{item.qty}</td>
                  <td className="col-num tabular-nums print-line-total">
                    {formatCurrency(item.price * item.qty)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="print-totals-wrap">
          <div className="print-totals-box">
            <div className="print-total-row">
              <span>Subtotal</span>
              <span className="tabular-nums">
                {formatCurrency(order.subtotal)}
              </span>
            </div>
            <div className="print-total-row">
              <span>Shipping ({order.shippingMethod.name})</span>
              <span className="tabular-nums">
                {order.shippingMethod.price === 0
                  ? '$0.00'
                  : formatCurrency(order.shippingMethod.price)}
              </span>
            </div>
            {order.discountAmount > 0 && (
              <div className="print-total-row">
                <span>Discount</span>
                <span className="tabular-nums">
                  -{formatCurrency(order.discountAmount)}
                </span>
              </div>
            )}
            <div className="print-total-divider" />
            <div className="print-total-grand">
              <span>Total Amount</span>
              <span className="tabular-nums">
                {formatCurrency(order.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="print-footer">
          <span>Thank you for your order with MinimalTech.</span>
          <span>
            Order ID: {order.orderId} • Status: {order.status}
          </span>
        </div>
      </div>
    </section>
  );
}
