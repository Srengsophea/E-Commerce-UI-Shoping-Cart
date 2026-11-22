import { useState } from 'react';
import { Plus, Check, ArrowRight, ShoppingBag } from 'lucide-react';
import { PRODUCTS, formatCurrency } from '../data/products';
import { ProductArtwork } from './ProductArtwork';

export function ProductsPage({
  cart,
  activeCategory,
  searchQuery,
  onResetFilters,
  onAddToCart,
  onGoToCart,
}) {
  const [justAddedId, setJustAddedId] = useState(null);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.variant.toLowerCase().includes(normalizedQuery) ||
      product.category.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product) => {
    onAddToCart(product);
    setJustAddedId(product.id);
    window.setTimeout(() => {
      setJustAddedId((prev) => (prev === product.id ? null : prev));
    }, 900);
  };

  return (
    <section className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            {activeCategory === 'All' ? 'Featured Tech' : activeCategory}
          </h1>
          <p className="page-subtitle">
            Clean, reliable hardware essentials designed for your everyday
            workspace.
          </p>
        </div>

        {totalItems > 0 && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={onGoToCart}
          >
            <ShoppingBag size={17} />
            <span>
              View Cart ({totalItems}) • {formatCurrency(subtotal)}
            </span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>

      {visibleProducts.length === 0 ? (
        <div className="cart-empty-card">
          <h2 className="cart-empty-title">No matching products</h2>
          <p className="cart-empty-text">
            Try clearing your search or switching back to all products.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onResetFilters}
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="products-grid">
          {visibleProducts.map((product) => {
            const inCartItem = cart.find((item) => item.id === product.id);
            const isJustAdded = justAddedId === product.id;

            return (
              <article key={product.id} className="product-card">
                <div className="product-media">
                  <span className="product-category-tag">
                    {product.category}
                  </span>
                  {inCartItem && (
                    <span className="in-cart-pill tabular-nums">
                      {inCartItem.qty} in cart
                    </span>
                  )}
                  <ProductArtwork
                    productId={product.id}
                    className="product-svg"
                  />
                </div>

                <div className="product-body">
                  <div className="product-title-row">
                    <h2 className="product-name">{product.name}</h2>
                    <span className="product-price tabular-nums">
                      {formatCurrency(product.price)}
                    </span>
                  </div>

                  <p className="product-meta">
                    {product.variant} • {product.color}
                  </p>
                  <p className="product-desc">{product.description}</p>

                  <div className="product-footer">
                    <span className="product-spec">{product.spec}</span>
                    <button
                      type="button"
                      className={`btn btn-add ${isJustAdded ? 'is-added' : ''}`}
                      onClick={() => handleAdd(product)}
                    >
                      {isJustAdded ? (
                        <>
                          <Check size={16} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus size={16} />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {totalItems > 0 && (
        <div className="floating-step-bar">
          <div className="floating-step-info">
            <span className="floating-dot" />
            <span>
              <strong>{totalItems}</strong>{' '}
              {totalItems === 1 ? 'item' : 'items'} in your cart — Subtotal:{' '}
              <strong className="tabular-nums">
                {formatCurrency(subtotal)}
              </strong>
            </span>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={onGoToCart}
          >
            <span>Open Shopping Cart</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
