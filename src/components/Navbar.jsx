import { Search, ShoppingBag, Heart, User } from 'lucide-react';

const NAV_CATEGORIES = [
  { id: 'All', label: 'Shop All' },
  { id: 'Computers', label: 'Laptops' },
  { id: 'Accessories', label: 'Accessories' },
  { id: 'Displays', label: 'Monitors' },
];

export function Navbar({
  currentStep,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onNavigate,
  cartCount,
}) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-left">
          <button
            type="button"
            className="brand"
            onClick={() => {
              onSelectCategory('All');
              onSearchChange('');
              onNavigate('products');
            }}
          >
            <span className="brand-name">MinimalTech</span>
          </button>

          <nav className="site-nav" aria-label="Store categories">
            {NAV_CATEGORIES.map((cat) => {
              const isActive =
                currentStep === 'products' && activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`site-nav-link ${isActive ? 'is-active' : ''}`}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    onNavigate('products');
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="navbar-right">
          <div className="nav-search">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (currentStep !== 'products') {
                  onNavigate('products');
                }
              }}
              placeholder="Search"
              className="nav-search-input"
              aria-label="Search products"
            />
            <Search size={15} className="nav-search-icon" />
          </div>

          <div className="nav-icon-group">
            <button
              type="button"
              className={`nav-icon-btn ${
                currentStep === 'cart' ? 'is-active' : ''
              }`}
              onClick={() => onNavigate('cart')}
              aria-label={`Shopping cart (${cartCount} items)`}
              title="Shopping Cart"
            >
              <ShoppingBag size={19} strokeWidth={1.8} />
              {cartCount > 0 && (
                <span className="nav-icon-badge tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              className="nav-icon-btn"
              onClick={() => onNavigate('cart')}
              aria-label="Wishlist"
              title="Saved Items"
            >
              <Heart size={19} strokeWidth={1.8} />
            </button>

            <button
              type="button"
              className="nav-icon-btn"
              onClick={() =>
                cartCount > 0 ? onNavigate('checkout') : onNavigate('products')
              }
              aria-label="Customer details"
              title="Account & Checkout"
            >
              <User size={19} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
