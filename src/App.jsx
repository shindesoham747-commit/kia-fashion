```jsx
import React, { useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "The Rose Silk Saree",
    price: 3499,
    oldPrice: 4299,
    rating: 4.5,
    reviews: 128,
    image: "/image/saree1.jpg",
    category: "Silk Saree",
    tag: "Bestseller",
    description:
      "A graceful silk saree designed for elegant celebrations and timeless occasions.",
  },
  {
    id: 2,
    name: "Emerald Banarasi Saree",
    price: 4299,
    oldPrice: 5499,
    rating: 4.7,
    reviews: 96,
    image: "/image/saree2.jpg",
    category: "Banarasi Saree",
    tag: "Trending",
    description:
      "Rich Banarasi detailing with a luxurious finish for festive and wedding moments.",
  },
  {
    id: 3,
    name: "Festive Pink Saree",
    price: 2999,
    oldPrice: 3799,
    rating: 4.4,
    reviews: 84,
    image: "/image/saree3.jpg",
    category: "Festive Saree",
    tag: "Deal",
    description:
      "A beautiful festive edit combining graceful colour with effortless comfort.",
  },
  {
    id: 4,
    name: "Royal Party Saree",
    price: 3899,
    oldPrice: 4699,
    rating: 4.6,
    reviews: 112,
    image: "/image/saree4.jpg",
    category: "Designer Saree",
    tag: "Popular",
    description:
      "A statement designer saree created for parties, celebrations and special evenings.",
  },
  {
    id: 5,
    name: "Little Celebration",
    price: 1599,
    oldPrice: 1999,
    rating: 4.5,
    reviews: 64,
    image: "/image/kids1.jpg",
    category: "Kidswear",
    tag: "Bestseller",
    description:
      "Comfortable and joyful kidswear made for celebrations and little adventures.",
  },
  {
    id: 6,
    name: "Little Festive Edit",
    price: 1899,
    oldPrice: 2399,
    rating: 4.6,
    reviews: 71,
    image: "/image/kids2.jpg",
    category: "Kidswear",
    tag: "Trending",
    description:
      "A festive kidswear look balancing playful details with all-day comfort.",
  },
  {
    id: 7,
    name: "Classic Kidswear",
    price: 1399,
    oldPrice: 1799,
    rating: 4.3,
    reviews: 52,
    image: "/image/kids3.jpg",
    category: "Kidswear",
    tag: "Deal",
    description:
      "A classic everyday kidswear style made for comfort and easy movement.",
  },
  {
    id: 8,
    name: "Party Day Look",
    price: 1699,
    oldPrice: 2199,
    rating: 4.5,
    reviews: 59,
    image: "/image/kids4.jpg",
    category: "Kidswear",
    tag: "Popular",
    description:
      "A charming party-ready outfit for memorable little moments.",
  },
];

const collections = [
  {
    title: "Silk Sarees",
    category: "Silk Saree",
    image: "/image/saree1.jpg",
    text: "Timeless elegance",
  },
  {
    title: "Banarasi Sarees",
    category: "Banarasi Saree",
    image: "/image/saree2.jpg",
    text: "Royal craftsmanship",
  },
  {
    title: "Festive Edit",
    category: "Festive Saree",
    image: "/image/saree3.jpg",
    text: "Made for celebrations",
  },
  {
    title: "Kidswear",
    category: "Kidswear",
    image: "/image/kids1.jpg",
    text: "Little style, big moments",
  },
];

const styleEdits = [
  {
    title: "Wedding Edit",
    image: "/image/wedding-edit.jpg",
  },
  {
    title: "Festival Edit",
    image: "/image/festive-collection.jpg",
  },
  {
    title: "Everyday Edit",
    image: "/image/everyday-edit.jpg",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [mobileSearch, setMobileSearch] = useState(false);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(1, item.quantity + amount),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some((item) => item.id === product.id);

      if (exists) {
        return current.filter((item) => item.id !== product.id);
      }

      return [...current, product];
    });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setMenuOpen(false);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const query = search.trim().toLowerCase();

        const matchesSearch =
          !query ||
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query);

        const matchesCategory =
          category === "All" || product.category === category;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;

        return 0;
      });
  }, [search, category, sort]);

  const ProductCard = ({ product }) => {
    const liked = wishlist.some((item) => item.id === product.id);

    const discount = Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

    return (
      <article className="product-card">
        <div className="product-image">
          <img src={product.image} alt={product.name} />

          <span className="deal-pill">{product.tag}</span>

          <button
            className={`wishlist ${liked ? "active" : ""}`}
            onClick={() => toggleWishlist(product)}
            aria-label="Wishlist"
          >
            {liked ? "♥" : "♡"}
          </button>

          <button
            className="quick-view"
            onClick={() => setPreview(product)}
          >
            Quick View
          </button>
        </div>

        <div className="product-content">
          <span className="category-label">{product.category}</span>

          <h3>{product.name}</h3>

          <div className="rating">
            <span className="rating-number">{product.rating}</span>
            <span className="stars">★★★★★</span>
            <span className="reviews">({product.reviews})</span>
          </div>

          <div className="price">
            <strong>₹{product.price.toLocaleString()}</strong>
            <del>₹{product.oldPrice.toLocaleString()}</del>
            <span>{discount}% off</span>
          </div>

          <p className="delivery-text">
            <b>FREE Delivery</b> · COD available
          </p>

          <div className="product-actions">
            <button
              className="add-button"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <button
              className="buy-button"
              onClick={() => {
                addToCart(product);
                setCartOpen(true);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="app">

      {/* ANNOUNCEMENT */}
      <div className="announcement">
        <span>FREE SHIPPING OVER ₹2,500</span>
        <span>•</span>
        <span>EASY RETURNS</span>
        <span>•</span>
        <span>COD AVAILABLE</span>
      </div>

      {/* HEADER */}
      <header className="header">
        <button
          className="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <button
          className="logo"
          onClick={() => scrollTo("home")}
        >
          <span>KIA</span>
          <small>FASHION</small>
        </button>

        <div className="location">
          <small>Deliver to</small>
          <strong>India ▾</strong>
        </div>

        <div className="desktop-search">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Silk Saree">Silk Saree</option>
            <option value="Banarasi Saree">Banarasi Saree</option>
            <option value="Festive Saree">Festive Saree</option>
            <option value="Designer Saree">Designer Saree</option>
            <option value="Kidswear">Kidswear</option>
          </select>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Kia Fashion"
          />

          <button>⌕</button>
        </div>

        <button
          className="header-link account"
          onClick={() => alert("Welcome to Kia Fashion")}
        >
          <small>Hello, sign in</small>
          <strong>Account & Lists</strong>
        </button>

        <button
          className="header-link orders"
          onClick={() => alert("Your orders will appear here.")}
        >
          <small>Returns</small>
          <strong>& Orders</strong>
        </button>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
        >
          <span>🛒</span>
          <b>{cartCount}</b>
          <strong>Cart</strong>
        </button>

        <button
          className="mobile-search-button"
          onClick={() => setMobileSearch(!mobileSearch)}
        >
          🔍
        </button>
      </header>

      {/* MOBILE SEARCH */}
      {mobileSearch && (
        <div className="mobile-search">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sarees, kidswear..."
          />
          <button onClick={() => setMobileSearch(false)}>
            Search
          </button>
        </div>
      )}

      {/* NAV */}
      <nav className={`nav ${menuOpen ? "show" : ""}`}>
        <button onClick={() => scrollTo("home")}>Home</button>
        <button onClick={() => scrollTo("collections")}>
          Collections
        </button>
        <button onClick={() => scrollTo("shop")}>Sarees</button>
        <button onClick={() => scrollTo("kids")}>Kidswear</button>
        <button onClick={() => scrollTo("style-studio")}>
          Style Studio
        </button>
        <button onClick={() => scrollTo("about")}>Our Story</button>
        <button onClick={() => scrollTo("contact")}>
          Customer Care
        </button>
      </nav>

      {/* HERO */}
      <main>
        <section id="home" className="hero">
          <img
            src="/image/hero-saree.jpg"
            alt="Kia Fashion"
          />

          <div className="hero-content">
            <span className="eyebrow">
              THE NEW KIA COLLECTION
            </span>

            <h1>
              Elegance,
              <br />
              <em>reimagined.</em>
            </h1>

            <p>
              Graceful sarees and joyful kidswear for
              moments worth remembering.
            </p>

            <button onClick={() => scrollTo("shop")}>
              Explore Collection <span>→</span>
            </button>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="benefits">
          <div>
            <span>🚚</span>
            <section>
              <strong>Free Delivery</strong>
              <small>Orders over ₹2,500</small>
            </section>
          </div>

          <div>
            <span>↩</span>
            <section>
              <strong>Easy Returns</strong>
              <small>Simple return policy</small>
            </section>
          </div>

          <div>
            <span>🔒</span>
            <section>
              <strong>Secure Payments</strong>
              <small>100% secure checkout</small>
            </section>
          </div>

          <div>
            <span>₹</span>
            <section>
              <strong>Cash on Delivery</strong>
              <small>Available across India</small>
            </section>
          </div>
        </section>

        {/* COLLECTIONS */}
        <section id="collections" className="section">
          <div className="section-title">
            <div>
              <span className="eyebrow">CURATED FOR YOU</span>
              <h2>
                Shop by <em>collection</em>
              </h2>
            </div>

            <button onClick={() => scrollTo("shop")}>
              See all →
            </button>
          </div>

          <div className="collection-row">
            {collections.map((item) => (
              <button
                className="collection-card"
                key={item.title}
                onClick={() => {
                  setCategory(item.category);
                  scrollTo("shop");
                }}
              >
                <img src={item.image} alt={item.title} />

                <div>
                  <span>{item.text}</span>
                  <h3>{item.title}</h3>
                  <small>Shop now →</small>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SHOP */}
        <section id="shop" className="section shop-section">
          <div className="section-title">
            <div>
              <span className="eyebrow">KIA FASHION STORE</span>
              <h2>
                Best Sellers <em>& Deals</em>
              </h2>
            </div>

            <span className="results">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="shop-controls">
            <div className="category-pills">
              {[
                "All",
                "Silk Saree",
                "Banarasi Saree",
                "Festive Saree",
                "Designer Saree",
                "Kidswear",
              ].map((item) => (
                <button
                  className={category === item ? "selected" : ""}
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try another search or category.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Show all products
                </button>
              </div>
            )}
          </div>
        </section>

        {/* FESTIVE */}
        <section className="feature-banner">
          <img
            src="/image/festive-collection.jpg"
            alt="Festive collection"
          />

          <div>
            <span className="eyebrow">THE FESTIVE EDIT</span>

            <h2>
              For celebrations
              <br />
              <em>that stay with you.</em>
            </h2>

            <p>
              Rich colours, graceful drapes and beautiful
              details for your most memorable occasions.
            </p>

            <button onClick={() => scrollTo("shop")}>
              Explore Festive →
            </button>
          </div>
        </section>

        {/* KIDS */}
        <section id="kids" className="section">
          <div className="section-title">
            <div>
              <span className="eyebrow">FOR KI & KIDDOS</span>
              <h2>
                Little style,
                <em> big moments.</em>
              </h2>
            </div>

            <button
              onClick={() => {
                setCategory("Kidswear");
                scrollTo("shop");
              }}
            >
              Shop Kidswear →
            </button>
          </div>

          <div className="product-grid kids-grid">
            {products
              .filter((product) => product.category === "Kidswear")
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
          </div>
        </section>

        {/* STYLE */}
        <section id="style-studio" className="section style-section">
          <div className="section-title">
            <div>
              <span className="eyebrow">KIA STYLE STUDIO</span>
              <h2>
                Dress for <em>the moment.</em>
              </h2>
            </div>
          </div>

          <div className="style-row">
            {styleEdits.map((item) => (
              <button
                className="style-card"
                key={item.title}
                onClick={() => scrollTo("shop")}
              >
                <img src={item.image} alt={item.title} />
                <span>{item.title} →</span>
              </button>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about">
          <img
            src="/image/about-kia-fashion.jpg"
            alt="About Kia Fashion"
          />

          <div>
            <span className="eyebrow">OUR STORY</span>

            <h2>
              Fashion for <em>Ki & Kiddos.</em>
            </h2>

            <p>
              Kia Fashion brings elegant Indian fashion and
              joyful kidswear together in a warm, modern
              shopping experience.
            </p>

            <p>
              Beautiful fashion should feel effortless,
              personal and memorable.
            </p>

            <button onClick={() => scrollTo("contact")}>
              Discover Kia Fashion →
            </button>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="newsletter">
          <span className="eyebrow">JOIN THE KIA COMMUNITY</span>

          <h2>
            Something beautiful
            <br />
            <em>is always coming.</em>
          </h2>

          <p>
            Get new collection updates, styling inspiration
            and special offers.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
            />

            <button
              onClick={() =>
                alert("Thank you for joining Kia Fashion!")
              }
            >
              Subscribe →
            </button>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="contact" className="footer">
        <div className="footer-brand">
          <strong>KIA FASHION</strong>
          <p>Fashion for Ki & Kiddos.</p>
        </div>

        <div>
          <h4>Shop</h4>
          <button onClick={() => scrollTo("shop")}>
            Sarees
          </button>
          <button onClick={() => scrollTo("kids")}>
            Kidswear
          </button>
          <button onClick={() => scrollTo("collections")}>
            Collections
          </button>
        </div>

        <div>
          <h4>Explore</h4>
          <button onClick={() => scrollTo("style-studio")}>
            Style Studio
          </button>
          <button onClick={() => scrollTo("about")}>
            Our Story
          </button>
        </div>

        <div>
          <h4>Customer Care</h4>
          <p>Mon–Sat, 10 AM–6 PM</p>
          <p>Easy returns</p>
          <p>COD available</p>
          <p>Free shipping over ₹2,500</p>
        </div>
      </footer>

      <div className="copyright">
        © {new Date().getFullYear()} Kia Fashion. All rights reserved.
      </div>

      {/* MOBILE BOTTOM BAR */}
      <div className="mobile-bottom-bar">
        <button onClick={() => scrollTo("home")}>
          <span>⌂</span>
          Home
        </button>

        <button onClick={() => scrollTo("shop")}>
          <span>⌕</span>
          Shop
        </button>

        <button onClick={() => scrollTo("collections")}>
          <span>✦</span>
          Collections
        </button>

        <button onClick={() => setCartOpen(true)}>
          <span>
            🛒
            {cartCount > 0 && <b>{cartCount}</b>}
          </span>
          Cart
        </button>
      </div>

      {/* CART */}
      {cartOpen && (
        <div
          className="overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <span className="eyebrow">YOUR KIA BAG</span>
                <h2>Shopping Cart</h2>
              </div>

              <button onClick={() => setCartOpen(false)}>
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🛒</span>
                <h3>Your cart is empty</h3>
                <p>
                  Add something beautiful to your Kia Fashion
                  cart.
                </p>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    scrollTo("shop");
                  }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <span>{item.category}</span>
                        <h3>{item.name}</h3>
                        <strong>
                          ₹{item.price.toLocaleString()}
                        </strong>

                        <div className="quantity">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                          >
                            −
                          </button>

                          <b>{item.quantity}</b>

                          <button
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="delete"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      ₹{cartTotal.toLocaleString()}
                    </strong>
                  </div>

                  <p>
                    FREE delivery on orders over ₹2,500
                  </p>

                  <button
                    className="checkout"
                    onClick={() =>
                      alert(
                        "Checkout page can be connected next."
                      )
                    }
                  >
                    Proceed to Checkout →
                  </button>

                  <button
                    className="continue"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* QUICK VIEW */}
      {preview && (
        <div
          className="overlay modal-overlay"
          onClick={() => setPreview(null)}
        >
          <div
            className="product-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setPreview(null)}
            >
              ×
            </button>

            <div className="modal-image">
              <img src={preview.image} alt={preview.name} />
            </div>

            <div className="modal-details">
              <span className="category-label">
                {preview.category}
              </span>

              <h2>{preview.name}</h2>

              <div className="rating">
                <span className="rating-number">
                  {preview.rating}
                </span>
                <span className="stars">★★★★★</span>
                <span className="reviews">
                  ({preview.reviews})
                </span>
              </div>

              <div className="modal-price">
                ₹{preview.price.toLocaleString()}
                <del>
                  ₹{preview.oldPrice.toLocaleString()}
                </del>
              </div>

              <p>{preview.description}</p>

              <div className="offers">
                <strong>Special Offers</strong>
                <span>✓ Extra 10% off on selected products</span>
                <span>✓ Free delivery over ₹2,500</span>
                <span>✓ Cash on Delivery available</span>
              </div>

              <div className="sizes">
                <strong>Select Size</strong>
                <div>
                  <button>S</button>
                  <button>M</button>
                  <button>L</button>
                  <button>XL</button>
                </div>
              </div>

              <button
                className="modal-add"
                onClick={() => {
                  addToCart(preview);
                  setPreview(null);
                  setCartOpen(true);
                }}
              >
                🛒 Add to Cart
              </button>

              <small className="secure">
                🔒 Secure transaction · ↩ Easy returns
              </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```
