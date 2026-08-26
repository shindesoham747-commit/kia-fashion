import React, { useState } from "react";
import "./App.css";

const sarees = [
  {
    id: 1,
    name: "The Rose Silk Saree",
    price: 3499,
    oldPrice: 4299,
    rating: 4.5,
    reviews: 128,
    image: "/image/saree1.jpg",
    category: "Silk Saree",
    description:
      "A graceful silk saree designed with rich colours and elegant detailing for memorable occasions.",
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
    description:
      "A timeless Banarasi-inspired look with a luxurious finish, perfect for celebrations and special moments.",
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
    description:
      "A beautiful festive saree created for effortless elegance and joyful celebrations.",
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
    description:
      "A sophisticated party saree featuring a refined silhouette and statement-making details.",
  },
];

const kids = [
  {
    id: 5,
    name: "Little Celebration",
    price: 1599,
    oldPrice: 1999,
    rating: 4.5,
    reviews: 64,
    image: "/image/kids1.jpg",
    category: "Kidswear",
    description:
      "A charming celebration outfit designed for comfort, movement and beautiful little moments.",
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
    description:
      "A festive kidswear look combining playful charm with elegant Indian-inspired styling.",
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
    description:
      "A stylish party-ready look made for little celebrations and special family occasions.",
  },
];

const allProducts = [...sarees, ...kids];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [cartOpen, setCartOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");

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

  const changeQuantity = (id, amount) => {
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
    setSelectedProduct(null);

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
      });
    }, 50);

    setMenu(false);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize("M");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = (product) =>
    Math.round(
      ((product.oldPrice - product.price) / product.oldPrice) * 100
    );

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

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

  const ProductCard = ({ product }) => {
    const liked = wishlist.some((item) => item.id === product.id);

    return (
      <article className="amazon-product-card">
        <div
          className="product-image-box clickable-product"
          onClick={() => openProduct(product)}
        >
          <img src={product.image} alt={product.name} />

          <button
            className={`wishlist-btn ${liked ? "liked" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            {liked ? "♥" : "♡"}
          </button>

          <span className="deal-badge">Deal</span>

          <button
            className="quick-view-btn"
            onClick={(e) => {
              e.stopPropagation();
              setPreview(product);
            }}
          >
            Quick View
          </button>
        </div>

        <div className="amazon-product-info">
          <span className="product-category">{product.category}</span>

          <h3
            className="clickable-title"
            onClick={() => openProduct(product)}
          >
            {product.name}
          </h3>

          <div className="rating-row">
            <strong>{product.rating}</strong>
            <span className="stars">★★★★★</span>
            <span className="review-count">
              ({product.reviews})
            </span>
          </div>

          <div className="price-row">
            <span className="price">
              ₹{product.price.toLocaleString()}
            </span>

            <span className="old-price">
              ₹{product.oldPrice.toLocaleString()}
            </span>
          </div>

          <p className="delivery">
            <strong>FREE Delivery</strong>
            <br />
            Available for Cash on Delivery
          </p>

          <button
            className="add-cart-btn"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>

          <button
            className="buy-btn"
            onClick={() => {
              addToCart(product);
              setCartOpen(true);
            }}
          >
            Buy Now
          </button>
        </div>
      </article>
    );
  };

  /* ================= PRODUCT DETAIL PAGE ================= */

  if (selectedProduct) {
    const product = selectedProduct;
    const liked = wishlist.some((item) => item.id === product.id);

    return (
      <div className="kia-page">
        <div className="announcement">
          FREE SHIPPING ON ORDERS OVER ₹2,500
          <span>•</span>
          EASY RETURNS
          <span>•</span>
          COD AVAILABLE
        </div>

        <header className="amazon-header">
          <button
            className="mobile-menu"
            onClick={() => setMenu(!menu)}
          >
            ☰
          </button>

          <button
            className="amazon-logo"
            onClick={() => {
              setSelectedProduct(null);
              scrollTo("home");
            }}
          >
            <span>KIA</span>
            <small>FASHION</small>
          </button>

          <div className="delivery-location">
            <span>Deliver to</span>
            <strong>India ▾</strong>
          </div>

          <div className="search-box">
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
              type="text"
              placeholder="Search Kia Fashion"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              onClick={() => {
                setSelectedProduct(null);
                setTimeout(() => scrollTo("shop"), 50);
              }}
            >
              🔍
            </button>
          </div>

          <button
            className="header-account"
            onClick={() => alert("Welcome to Kia Fashion")}
          >
            <span>Hello, sign in</span>
            <strong>Account & Lists ▾</strong>
          </button>

          <button
            className="header-orders"
            onClick={() =>
              alert("Your orders will appear here.")
            }
          >
            <span>Returns</span>
            <strong>& Orders</strong>
          </button>

          <button
            className="header-cart"
            onClick={() => setCartOpen(true)}
          >
            <span className="cart-icon">🛒</span>
            <b>{cartCount}</b>
            <strong>Cart</strong>
          </button>
        </header>

        <nav className={`amazon-nav ${menu ? "open" : ""}`}>
          <button onClick={() => scrollTo("home")}>☰ All</button>
          <button onClick={() => scrollTo("shop")}>Sarees</button>
          <button onClick={() => scrollTo("kids")}>Kidswear</button>
          <button onClick={() => scrollTo("collections")}>
            Collections
          </button>
          <button onClick={() => scrollTo("style-studio")}>
            Style Studio
          </button>
          <button onClick={() => scrollTo("about")}>
            About Kia
          </button>
          <button onClick={() => scrollTo("contact")}>
            Customer Service
          </button>
        </nav>

        <main className="product-detail-page">
          <div className="product-breadcrumb">
            Home / {product.category} / {product.name}
          </div>

          <button
            className="back-to-store"
            onClick={() => {
              setSelectedProduct(null);
              setTimeout(() => scrollTo("shop"), 50);
            }}
          >
            ← Back to Kia Fashion
          </button>

          <section className="premium-product-layout">
            <div className="product-gallery">
              <div className="main-product-image">
                <span className="detail-deal">DEAL OF THE DAY</span>

                <button
                  className={`detail-wishlist ${
                    liked ? "liked" : ""
                  }`}
                  onClick={() => toggleWishlist(product)}
                >
                  {liked ? "♥" : "♡"}
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="gallery-note">
                ✦ Kia Fashion Premium Collection
              </div>
            </div>

            <div className="product-detail-info">
              <span className="detail-category">
                {product.category}
              </span>

              <h1>{product.name}</h1>

              <p className="detail-tagline">
                Designed for beautiful moments, made for effortless
                elegance.
              </p>

              <div className="detail-rating">
                <span className="rating-number">
                  {product.rating}
                </span>

                <span className="stars">★★★★★</span>

                <span>
                  {product.reviews} ratings & reviews
                </span>
              </div>

              <div className="detail-divider" />

              <div className="detail-price">
                <span>
                  ₹{product.price.toLocaleString()}
                </span>

                <del>
                  ₹{product.oldPrice.toLocaleString()}
                </del>

                <strong>{discount(product)}% off</strong>
              </div>

              <p className="tax-note">
                Inclusive of all taxes
              </p>

              <div className="offer-box">
                <h3>Special Offers</h3>

                <p>
                  ✦ Extra 10% off on selected products
                </p>

                <p>
                  ✦ Free delivery on orders above ₹2,500
                </p>

                <p>
                  ✦ Cash on Delivery available
                </p>
              </div>

              <div className="delivery-box">
                <div className="delivery-icon">🚚</div>

                <div>
                  <strong>FREE Delivery</strong>
                  <p>
                    Deliver to your location across India
                  </p>
                  <small>
                    Order today and enjoy easy returns.
                  </small>
                </div>
              </div>

              <div className="size-section">
                <div className="size-heading">
                  <strong>Select Size</strong>
                  <button
                    onClick={() =>
                      alert(
                        "Size guide: S, M, L and XL are available."
                      )
                    }
                  >
                    Size Guide
                  </button>
                </div>

                <div className="size-buttons">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      className={
                        selectedSize === size ? "selected" : ""
                      }
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="about-product">
                <h2>About this product</h2>

                <p>{product.description}</p>

                <ul>
                  <li>Premium Kia Fashion quality</li>
                  <li>Comfort-focused design</li>
                  <li>Perfect for special occasions</li>
                  <li>Easy returns available</li>
                </ul>
              </div>

              <div className="detail-actions">
                <button
                  className="detail-add-cart"
                  onClick={() => {
                    addToCart(product);
                  }}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="detail-buy-now"
                  onClick={() => {
                    addToCart(product);
                    setCartOpen(true);
                  }}
                >
                  Buy Now
                </button>
              </div>

              <div className="trust-row">
                <div>
                  <span>🔒</span>
                  <strong>Secure transaction</strong>
                </div>

                <div>
                  <span>↩</span>
                  <strong>Easy returns</strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>Genuine Kia product</strong>
                </div>
              </div>
            </div>
          </section>

          <section className="you-may-like">
            <div className="section-heading">
              <div>
                <span className="kicker">YOU MAY ALSO LIKE</span>
                <h2>
                  More from <em>Kia Fashion</em>
                </h2>
              </div>
            </div>

            <div className="amazon-product-grid">
              {allProducts
                .filter((item) => item.id !== product.id)
                .slice(0, 4)
                .map((item) => (
                  <ProductCard
                    key={item.id}
                    product={item}
                  />
                ))}
            </div>
          </section>
        </main>

        {/* CART */}
        {cartOpen && (
          <CartDrawer
            cart={cart}
            cartCount={cartCount}
            cartTotal={cartTotal}
            setCartOpen={setCartOpen}
            removeFromCart={removeFromCart}
            changeQuantity={changeQuantity}
            scrollTo={scrollTo}
          />
        )}
      </div>
    );
  }

  /* ================= MAIN HOME PAGE ================= */

  return (
    <div className="kia-page">
      <div className="announcement">
        FREE SHIPPING ON ORDERS OVER ₹2,500
        <span>•</span>
        EASY RETURNS
        <span>•</span>
        COD AVAILABLE
      </div>

      <header className="amazon-header">
        <button
          className="mobile-menu"
          onClick={() => setMenu(!menu)}
        >
          ☰
        </button>

        <button
          className="amazon-logo"
          onClick={() => scrollTo("home")}
        >
          <span>KIA</span>
          <small>FASHION</small>
        </button>

        <div className="delivery-location">
          <span>Deliver to</span>
          <strong>India ▾</strong>
        </div>

        <div className="search-box">
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
            type="text"
            placeholder="Search Kia Fashion"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button>🔍</button>
        </div>

        <button
          className="header-account"
          onClick={() => alert("Welcome to Kia Fashion")}
        >
          <span>Hello, sign in</span>
          <strong>Account & Lists ▾</strong>
        </button>

        <button
          className="header-orders"
          onClick={() =>
            alert("Your orders will appear here.")
          }
        >
          <span>Returns</span>
          <strong>& Orders</strong>
        </button>

        <button
          className="header-cart"
          onClick={() => setCartOpen(true)}
        >
          <span className="cart-icon">🛒</span>
          <b>{cartCount}</b>
          <strong>Cart</strong>
        </button>
      </header>

      <nav className={`amazon-nav ${menu ? "open" : ""}`}>
        <button onClick={() => scrollTo("home")}>☰ All</button>
        <button onClick={() => scrollTo("shop")}>Sarees</button>
        <button onClick={() => scrollTo("kids")}>Kidswear</button>
        <button onClick={() => scrollTo("collections")}>
          Collections
        </button>
        <button onClick={() => scrollTo("style-studio")}>
          Style Studio
        </button>
        <button onClick={() => scrollTo("about")}>
          About Kia
        </button>
        <button onClick={() => scrollTo("contact")}>
          Customer Service
        </button>
      </nav>

      <main>
        <section id="home" className="amazon-hero">
          <div className="hero-overlay">
            <span>THE NEW KIA COLLECTION</span>

            <h1>
              Elegance,
              <br />
              <em>reimagined.</em>
            </h1>

            <p>
              Discover graceful sarees and beautiful
              kidswear designed for moments worth remembering.
            </p>

            <button onClick={() => scrollTo("shop")}>
              Shop Now →
            </button>
          </div>

          <img
            src="/image/hero-saree.jpg"
            alt="Kia Fashion Collection"
          />
        </section>

        <section className="shopping-features">
          <div>
            <span>🚚</span>
            <div>
              <strong>Free Delivery</strong>
              <p>On orders over ₹2,500</p>
            </div>
          </div>

          <div>
            <span>↩️</span>
            <div>
              <strong>Easy Returns</strong>
              <p>Simple return policy</p>
            </div>
          </div>

          <div>
            <span>🔒</span>
            <div>
              <strong>Secure Payments</strong>
              <p>100% secure checkout</p>
            </div>
          </div>

          <div>
            <span>💳</span>
            <div>
              <strong>Cash on Delivery</strong>
              <p>Available across India</p>
            </div>
          </div>
        </section>

        <section id="collections" className="amazon-section">
          <div className="section-heading">
            <div>
              <span className="kicker">CURATED FOR YOU</span>

              <h2>
                Shop by <em>collection</em>
              </h2>
            </div>

            <button onClick={() => scrollTo("shop")}>
              See all
            </button>
          </div>

          <div className="collection-grid">
            <button
              onClick={() => {
                setCategory("Silk Saree");
                scrollTo("shop");
              }}
            >
              <img
                src="/image/saree1.jpg"
                alt="Silk Sarees"
              />
              <span>Silk Sarees</span>
              <small>Shop now →</small>
            </button>

            <button
              onClick={() => {
                setCategory("Banarasi Saree");
                scrollTo("shop");
              }}
            >
              <img
                src="/image/saree2.jpg"
                alt="Banarasi Sarees"
              />
              <span>Banarasi Sarees</span>
              <small>Shop now →</small>
            </button>

            <button
              onClick={() => {
                setCategory("Festive Saree");
                scrollTo("shop");
              }}
            >
              <img
                src="/image/saree3.jpg"
                alt="Festive Sarees"
              />
              <span>Festive Edit</span>
              <small>Shop now →</small>
            </button>

            <button
              onClick={() => {
                setCategory("Kidswear");
                scrollTo("kids");
              }}
            >
              <img
                src="/image/kids1.jpg"
                alt="Kidswear"
              />
              <span>Kidswear</span>
              <small>Shop now →</small>
            </button>
          </div>
        </section>

        <section id="shop" className="amazon-section products-section">
          <div className="section-heading">
            <div>
              <span className="kicker">KIA FASHION STORE</span>

              <h2>
                Best Sellers & <em>Deals</em>
              </h2>
            </div>

            <span className="results-count">
              {filteredProducts.length} results
            </span>
          </div>

          <div className="shop-toolbar">
            <span>Showing products for you</span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Sort: Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>

          <div className="amazon-product-grid">
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

                <p>
                  Try searching for another saree or kidswear
                  product.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                >
                  Show All Products
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="festive-banner">
          <div>
            <span className="kicker">THE FESTIVE EDIT</span>

            <h2>
              For celebrations
              <br />
              <em>that stay with you.</em>
            </h2>

            <p>
              Rich colours, graceful drapes and details designed
              for your most memorable occasions.
            </p>

            <button onClick={() => scrollTo("shop")}>
              Explore Festive →
            </button>
          </div>

          <img
            src="/image/festive-collection.jpg"
            alt="Festive Collection"
          />
        </section>

        <section id="kids" className="amazon-section">
          <div className="section-heading">
            <div>
              <span className="kicker">FOR KI & KIDDOS</span>

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

          <div className="amazon-product-grid">
            {kids.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </section>

        <section id="style-studio" className="style-section">
          <div className="section-heading">
            <div>
              <span className="kicker">KIA STYLE STUDIO</span>

              <h2>
                Dress for <em>the moment.</em>
              </h2>
            </div>
          </div>

          <div className="style-grid">
            <button onClick={() => scrollTo("shop")}>
              <img
                src="/image/wedding-edit.jpg"
                alt="Wedding"
              />
              <span>Wedding Edit →</span>
            </button>

            <button onClick={() => scrollTo("shop")}>
              <img
                src="/image/festive-collection.jpg"
                alt="Festival"
              />
              <span>Festival Edit →</span>
            </button>

            <button onClick={() => scrollTo("shop")}>
              <img
                src="/image/everyday-edit.jpg"
                alt="Everyday"
              />
              <span>Everyday Edit →</span>
            </button>
          </div>
        </section>

        <section id="about" className="about-section">
          <img
            src="/image/about-kia-fashion.jpg"
            alt="About Kia Fashion"
          />

          <div>
            <span className="kicker">OUR STORY</span>

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

        <section className="newsletter">
          <span className="kicker">JOIN THE KIA COMMUNITY</span>

          <h2>
            Something beautiful
            <br />
            <em>is always coming.</em>
          </h2>

          <p>
            Sign up for new collections, styling inspiration
            and special offers.
          </p>

          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Your email address"
            />

            <button
              onClick={() =>
                alert(
                  "Thank you for joining Kia Fashion!"
                )
              }
            >
              Subscribe →
            </button>
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="footer-brand">
          <span>KIA FASHION</span>
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
          <button
            onClick={() =>
              alert("Contact: hello@kiafashion.in")
            }
          >
            Contact
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
        © {new Date().getFullYear()} Kia Fashion. All rights
        reserved.
      </div>

      {cartOpen && (
        <CartDrawer
          cart={cart}
          cartCount={cartCount}
          cartTotal={cartTotal}
          setCartOpen={setCartOpen}
          removeFromCart={removeFromCart}
          changeQuantity={changeQuantity}
          scrollTo={scrollTo}
        />
      )}

      {preview && (
        <div
          className="quick-modal-overlay"
          onClick={() => setPreview(null)}
        >
          <div
            className="quick-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setPreview(null)}
            >
              ×
            </button>

            <img
              src={preview.image}
              alt={preview.name}
            />

            <div className="modal-info">
              <span>{preview.category}</span>

              <h2>{preview.name}</h2>

              <div className="rating-row">
                <strong>{preview.rating}</strong>

                <span className="stars">★★★★★</span>

                <span>
                  ({preview.reviews} reviews)
                </span>
              </div>

              <h3>
                ₹{preview.price.toLocaleString()}
              </h3>

              <p>
                FREE Delivery · Cash on Delivery available.
              </p>

              <button
                className="add-cart-btn"
                onClick={() => {
                  addToCart(preview);
                  setPreview(null);
                  setCartOpen(true);
                }}
              >
                Add to Cart
              </button>

              <button
                className="product-open-modal-btn"
                onClick={() => {
                  setPreview(null);
                  openProduct(preview);
                }}
              >
                View Full Product →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= CART COMPONENT ================= */

function CartDrawer({
  cart,
  cartCount,
  cartTotal,
  setCartOpen,
  removeFromCart,
  changeQuantity,
  scrollTo,
}) {
  return (
    <div
      className="cart-overlay"
      onClick={() => setCartOpen(false)}
    >
      <aside
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h2>Shopping Cart ({cartCount})</h2>

          <button onClick={() => setCartOpen(false)}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>

            <h3>Your Kia Fashion Cart is empty</h3>

            <p>
              Add some beautiful products to your cart.
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
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-details">
                    <h3>{item.name}</h3>

                    <p>
                      ₹{item.price.toLocaleString()}
                    </p>

                    <div className="quantity">
                      <button
                        onClick={() =>
                          changeQuantity(item.id, -1)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          changeQuantity(item.id, 1)
                        }
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="remove-item"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p>Subtotal ({cartCount} items)</p>

              <h2>
                ₹{cartTotal.toLocaleString()}
              </h2>

              <button
                className="checkout-btn"
                onClick={() =>
                  alert(
                    "Checkout will be added next!"
                  )
                }
              >
                Proceed to Checkout
              </button>

              <button
                className="continue-btn"
                onClick={() => setCartOpen(false)}
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
