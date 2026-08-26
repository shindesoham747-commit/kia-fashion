import React, { useState } from "react";
import "./App.css";

const sarees = [
  {
    id: 1,
    name: "The Rose Silk Saree",
    price: 3499,
    image: "/image/saree1.jpg",
    category: "Women / Sarees",
    rating: 4.6,
    reviews: 128,
    description:
      "A graceful rose-toned silk saree designed for weddings, festive occasions and elegant celebrations.",
  },
  {
    id: 2,
    name: "Emerald Banarasi Saree",
    price: 4299,
    image: "/image/saree2.jpg",
    category: "Women / Sarees",
    rating: 4.8,
    reviews: 96,
    description:
      "A rich emerald Banarasi-inspired saree featuring a timeless festive look with elegant detailing.",
  },
  {
    id: 3,
    name: "Festive Pink Saree",
    price: 2999,
    image: "/image/saree3.jpg",
    category: "Women / Sarees",
    rating: 4.5,
    reviews: 74,
    description:
      "A beautiful festive pink saree made for celebrations, family functions and memorable occasions.",
  },
  {
    id: 4,
    name: "Royal Party Saree",
    price: 3899,
    image: "/image/saree4.jpg",
    category: "Women / Sarees",
    rating: 4.7,
    reviews: 112,
    description:
      "A sophisticated party saree with a royal finish, perfect for evening celebrations and special events.",
  },
];

const kids = [
  {
    id: 5,
    name: "Little Celebration",
    price: 1599,
    image: "/image/kids1.jpg",
    category: "Kidswear",
    rating: 4.6,
    reviews: 61,
    description:
      "A comfortable and stylish festive outfit designed for little celebrations.",
  },
  {
    id: 6,
    name: "Little Festive Edit",
    price: 1899,
    image: "/image/kids2.jpg",
    category: "Kidswear",
    rating: 4.8,
    reviews: 83,
    description:
      "A charming festive look combining comfort, colour and playful style for kids.",
  },
  {
    id: 7,
    name: "Classic Kidswear",
    price: 1399,
    image: "/image/kids3.jpg",
    category: "Kidswear",
    rating: 4.5,
    reviews: 48,
    description:
      "Classic everyday kidswear designed to keep little ones comfortable and stylish.",
  },
  {
    id: 8,
    name: "Party Day Look",
    price: 1699,
    image: "/image/kids4.jpg",
    category: "Kidswear",
    rating: 4.7,
    reviews: 57,
    description:
      "A fun party-ready outfit created for birthdays, family events and special moments.",
  },
];

const allProducts = [...sarees, ...kids];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [menu, setMenu] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [checkout, setCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₹${price.toLocaleString("en-IN")}`;

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenu(false);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setCartOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const addToCart = (product, qty = 1) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + qty,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const changeCartQuantity = (id, amount) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount,
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

  const handleSearch = (value) => {
    setSearch(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const results = allProducts.filter((product) =>
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );

    setSearchResults(results);
  };

  const buyNow = (product, qty = 1) => {
    addToCart(product, qty);
    setSelectedProduct(null);
    setCheckout(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const placeOrder = () => {
    setCart([]);
    setCheckout(false);
    setOrderPlaced(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const ProductCard = ({ product }) => {
    const wished = wishlist.some(
      (item) => item.id === product.id
    );

    return (
      <article className="product">
        <div
          className="product-image"
          onClick={() => openProduct(product)}
        >
          <img src={product.image} alt={product.name} />

          <button
            className={`heart ${wished ? "liked" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
          >
            {wished ? "♥" : "♡"}
          </button>

          <span className="product-badge">
            KIA CHOICE
          </span>
        </div>

        <div className="product-info">
          <span>{product.category}</span>

          <h3
            onClick={() => openProduct(product)}
            className="clickable-title"
          >
            {product.name}
          </h3>

          <div className="rating">
            <strong>{product.rating}</strong>
            <span>★★★★★</span>
            <small>({product.reviews})</small>
          </div>

          <strong className="product-price">
            {formatPrice(product.price)}
          </strong>

          <p>FREE Delivery · Easy Returns</p>

          <button
            onClick={() => addToCart(product)}
            className="add-button"
          >
            Add to Cart
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="kia-page">

      {/* ANNOUNCEMENT */}

      <div className="announcement">
        FREE SHIPPING ON ORDERS OVER ₹2,500
        <span>•</span>
        EASY RETURNS
        <span>•</span>
        COD AVAILABLE
      </div>

      {/* HEADER */}

      <header className="amazon-header">

        <button
          className="mobile-menu"
          onClick={() => setMenu(!menu)}
        >
          ☰
        </button>

        <button
          className="logo"
          onClick={() => {
            setSelectedProduct(null);
            setCheckout(false);
            setOrderPlaced(false);
            scrollTo("home");
          }}
        >
          <span>KIA FASHION</span>
          <small>Fashion for Ki & Kiddos</small>
        </button>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search Kia Fashion..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          <button>🔍</button>

          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((product) => (
                <button
                  key={product.id}
                  onClick={() => {
                    openProduct(product);
                    setSearch("");
                    setSearchResults([]);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <div>
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <nav className={menu ? "nav open" : "nav"}>
          <button
            onClick={() => {
              setSelectedProduct(null);
              scrollTo("home");
            }}
          >
            Home
          </button>

          <button
            onClick={() => {
              setSelectedProduct(null);
              scrollTo("shop");
            }}
          >
            Shop
          </button>

          <button
            onClick={() => {
              setSelectedProduct(null);
              scrollTo("collections");
            }}
          >
            Collections
          </button>

          <button
            onClick={() => {
              setSelectedProduct(null);
              scrollTo("kids");
            }}
          >
            Kidswear
          </button>

          <button
            onClick={() => {
              setSelectedProduct(null);
              scrollTo("about");
            }}
          >
            About
          </button>
        </nav>

        <div className="header-actions">

          <button
            className="account-button"
            onClick={() =>
              alert(
                "Welcome to Kia Fashion!\n\nAccount & Orders will be available soon."
              )
            }
          >
            <small>Hello, Sign in</small>
            <strong>Account & Orders</strong>
          </button>

          <button
            className="wishlist-button"
            onClick={() =>
              alert(
                `You have ${wishlist.length} item(s) in your wishlist.`
              )
            }
          >
            ♡
          </button>

          <button
            className="cart-button"
            onClick={() => {
              setSelectedProduct(null);
              setCheckout(false);
              setCartOpen(true);
            }}
          >
            🛒
            <span>Cart</span>
            <sup>{cartCount}</sup>
          </button>

        </div>
      </header>

      {/* PRODUCT PAGE */}

      {selectedProduct && !checkout && !orderPlaced && (
        <section className="product-detail-page">

          <div className="breadcrumb">
            Home › {selectedProduct.category} ›{" "}
            {selectedProduct.name}
          </div>

          <button
            className="back-button"
            onClick={() => setSelectedProduct(null)}
          >
            ← Back to Shopping
          </button>

          <div className="product-detail">

            <div className="detail-image">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
            </div>

            <div className="detail-content">

              <span className="detail-category">
                {selectedProduct.category}
              </span>

              <h1>{selectedProduct.name}</h1>

              <div className="detail-rating">
                <strong>
                  {selectedProduct.rating} ★
                </strong>

                <span>
                  {selectedProduct.reviews} ratings & reviews
                </span>
              </div>

              <hr />

              <p className="price-label">
                Deal Price
              </p>

              <div className="detail-price">
                {formatPrice(selectedProduct.price)}
              </div>

              <p className="tax-text">
                Inclusive of all taxes
              </p>

              <div className="offer-box">
                <strong>Special Offer</strong>
                <p>
                  Get free shipping on orders above ₹2,500.
                </p>
              </div>

              <div className="delivery-box">
                <strong>🚚 Delivery</strong>
                <p>
                  FREE Delivery available
                </p>
                <small>
                  Usually delivered within 3–5 business days.
                </small>
              </div>

              <p className="detail-description">
                {selectedProduct.description}
              </p>

              <div className="quantity-section">
                <strong>Quantity</strong>

                <div className="quantity-control">
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity((q) => q + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="detail-actions">

                <button
                  className="detail-cart"
                  onClick={() => {
                    addToCart(
                      selectedProduct,
                      quantity
                    );
                    setCartOpen(true);
                    setSelectedProduct(null);
                  }}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="buy-now"
                  onClick={() =>
                    buyNow(
                      selectedProduct,
                      quantity
                    )
                  }
                >
                  Buy Now
                </button>

              </div>

              <button
                className="wishlist-detail"
                onClick={() =>
                  toggleWishlist(selectedProduct)
                }
              >
                ♡ Add to Wishlist
              </button>

            </div>
          </div>
        </section>
      )}

      {/* CHECKOUT */}

      {checkout && !orderPlaced && (
        <section className="checkout-page">

          <button
            className="back-button"
            onClick={() => setCheckout(false)}
          >
            ← Back to Cart
          </button>

          <h1>Checkout</h1>

          <div className="checkout-layout">

            <div className="checkout-form">

              <div className="checkout-card">
                <h2>1. Delivery Address</h2>

                <input
                  type="text"
                  placeholder="Full Name"
                />

                <input
                  type="text"
                  placeholder="Mobile Number"
                />

                <textarea
                  placeholder="Complete Address"
                  rows="4"
                />

                <div className="address-row">
                  <input
                    type="text"
                    placeholder="City"
                  />

                  <input
                    type="text"
                    placeholder="PIN Code"
                  />
                </div>
              </div>

              <div className="checkout-card">
                <h2>2. Payment Method</h2>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                  />
                  Cash on Delivery
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                  />
                  UPI / Online Payment
                </label>
              </div>

            </div>

            <div className="order-summary">

              <h2>Order Summary</h2>

              {cart.map((item) => (
                <div
                  className="summary-item"
                  key={item.id}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div>
                    <strong>{item.name}</strong>
                    <p>
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <b>
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </b>
                </div>
              ))}

              <hr />

              <div className="summary-line">
                <span>Items</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              <div className="summary-line">
                <span>Delivery</span>
                <span>
                  {cartTotal >= 2500
                    ? "FREE"
                    : "₹99"}
                </span>
              </div>

              <div className="summary-total">
                <span>Order Total</span>

                <strong>
                  {formatPrice(
                    cartTotal +
                      (cartTotal >= 2500 ? 0 : 99)
                  )}
                </strong>
              </div>

              <button
                className="place-order"
                onClick={placeOrder}
              >
                Place Your Order
              </button>

            </div>

          </div>
        </section>
      )}

      {/* ORDER SUCCESS */}

      {orderPlaced && (
        <section className="order-success">

          <div className="success-icon">
            ✓
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for shopping with Kia Fashion.
          </p>

          <p>
            Your order has been confirmed.
          </p>

          <button
            className="button dark"
            onClick={() => {
              setOrderPlaced(false);
              scrollTo("shop");
            }}
          >
            Continue Shopping →
          </button>

        </section>
      )}

      {/* CART */}

      {cartOpen && !checkout && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >

          <aside
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
          >

            <div className="cart-header">
              <h2>
                Shopping Cart
              </h2>

              <button
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (

              <div className="empty-cart">
                <div>🛒</div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add something beautiful from Kia Fashion.
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
                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          {formatPrice(item.price)}
                        </span>

                        <div className="cart-quantity">

                          <button
                            onClick={() =>
                              changeCartQuantity(
                                item.id,
                                -1
                              )
                            }
                          >
                            −
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              changeCartQuantity(
                                item.id,
                                1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="remove-cart"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          Remove
                        </button>

                      </div>

                      <strong>
                        {formatPrice(
                          item.price *
                            item.quantity
                        )}
                      </strong>

                    </div>
                  ))}

                </div>

                <div className="cart-footer">

                  <div className="cart-total">
                    <span>
                      Subtotal
                    </span>

                    <strong>
                      {formatPrice(cartTotal)}
                    </strong>
                  </div>

                  <p>
                    FREE delivery on orders over ₹2,500
                  </p>

                  <button
                    className="checkout-button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckout(true);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Proceed to Checkout
                  </button>

                </div>
              </>
            )}

          </aside>
        </div>
      )}

      {/* HOME */}

      {!selectedProduct &&
        !checkout &&
        !orderPlaced && (
          <main>

            <section
              id="home"
              className="hero"
            >

              <div className="hero-content">

                <span className="kicker">
                  THE NEW KIA COLLECTION
                </span>

                <h1>
                  Elegance,
                  <br />
                  <em>reimagined.</em>
                </h1>

                <p>
                  Discover graceful sarees and
                  beautiful kidswear designed for
                  moments worth remembering.
                </p>

                <div className="hero-buttons">

                  <button
                    className="button dark"
                    onClick={() =>
                      scrollTo("shop")
                    }
                  >
                    Shop Now →
                  </button>

                  <button
                    className="button light"
                    onClick={() =>
                      scrollTo("collections")
                    }
                  >
                    Explore Collection
                  </button>

                </div>

              </div>

              <div className="hero-image">
                <img
                  src="/image/hero-saree.jpg"
                  alt="Kia Fashion saree collection"
                />
              </div>

            </section>

            {/* BENEFITS */}

            <section className="highlights">

              <div>
                <b>01</b>
                <span>
                  Curated
                  <br />
                  Collections
                </span>
              </div>

              <div>
                <b>02</b>
                <span>
                  Made for
                  <br />
                  Every Occasion
                </span>
              </div>

              <div>
                <b>03</b>
                <span>
                  Easy
                  <br />
                  Shopping
                </span>
              </div>

              <div>
                <b>04</b>
                <span>
                  Free Shipping
                  <br />
                  over ₹2,500
                </span>
              </div>

            </section>

            {/* COLLECTIONS */}

            <section
              id="collections"
              className="section"
            >

              <div className="section-top">

                <div>

                  <span className="kicker">
                    CURATED FOR YOU
                  </span>

                  <h2>
                    Shop by{" "}
                    <em>collection</em>
                  </h2>

                </div>

                <button
                  onClick={() =>
                    scrollTo("shop")
                  }
                >
                  View all products →
                </button>

              </div>

              <div className="featured-collection">

                <div className="collection-copy">

                  <span>
                    01 / WOMEN
                  </span>

                  <h3>
                    The Saree Edit
                  </h3>

                  <div className="line" />

                  <p>
                    Silk, Banarasi, designer
                    and more.
                  </p>

                  <button
                    onClick={() =>
                      scrollTo("shop")
                    }
                  >
                    Explore Sarees →
                  </button>

                </div>

                <div className="collection-images">

                  {sarees.map((product) => (
                    <button
                      key={product.id}
                      onClick={() =>
                        openProduct(product)
                      }
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                      />
                    </button>
                  ))}

                </div>

              </div>
            </section>

            {/* FESTIVE */}

            <section className="split-banner">

              <div className="split-image">
                <img
                  src="/image/festive-collection.jpg"
                  alt="Festive collection"
                />
              </div>

              <div className="split-copy">

                <span className="kicker">
                  THE FESTIVE EDIT
                </span>

                <h2>
                  For celebrations
                  <br />
                  <em>
                    that stay with you.
                  </em>
                </h2>

                <p>
                  Rich colours, graceful drapes
                  and details designed for your
                  most memorable occasions.
                </p>

                <button
                  className="button dark"
                  onClick={() =>
                    scrollTo("shop")
                  }
                >
                  Explore Festive →
                </button>

              </div>

            </section>

            {/* SAREES */}

            <section
              id="shop"
              className="section shop"
            >

              <div className="section-top">

                <div>

                  <span className="kicker">
                    THE COLLECTION
                  </span>

                  <h2>
                    Signature{" "}
                    <em>styles</em>
                  </h2>

                </div>

                <p>
                  Thoughtfully selected pieces
                  from the Kia Fashion wardrobe.
                </p>

              </div>

              <div className="product-grid">

                {sarees.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            </section>

            {/* KIDS */}

            <section className="kids-banner">

              <div className="kids-copy">

                <span className="kicker">
                  FOR KI & KIDDOS
                </span>

                <h2>
                  Little style,
                  <br />
                  <em>
                    big moments.
                  </em>
                </h2>

                <p>
                  Playful silhouettes and
                  comfortable festive looks made
                  for little personalities.
                </p>

                <button
                  className="button light"
                  onClick={() =>
                    scrollTo("kids")
                  }
                >
                  Explore Kidswear →
                </button>

              </div>

              <div className="kids-image">
                <img
                  src="/image/hero-kids.jpg"
                  alt="Kia Fashion kidswear"
                />
              </div>

            </section>

            <section
              id="kids"
              className="section"
            >

              <div className="section-top">

                <div>

                  <span className="kicker">
                    LITTLE STYLE
                  </span>

                  <h2>
                    Made for{" "}
                    <em>
                      little moments
                    </em>
                  </h2>

                </div>

              </div>

              <div className="product-grid">

                {kids.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            </section>

            {/* STYLE STUDIO */}

            <section className="style-studio">

              <div className="studio-heading">

                <span className="kicker">
                  KIA STYLE STUDIO
                </span>

                <h2>
                  Dress for
                  <br />
                  <em>
                    the moment.
                  </em>
                </h2>

              </div>

              <div className="studio-cards">

                {[
                  [
                    "wedding-edit.jpg",
                    "Wedding",
                  ],
                  [
                    "festive-collection.jpg",
                    "Festival",
                  ],
                  [
                    "everyday-edit.jpg",
                    "Everyday",
                  ],
                ].map((item) => (
                  <button
                    key={item[1]}
                    onClick={() =>
                      scrollTo("shop")
                    }
                  >
                    <img
                      src={`/image/${item[0]}`}
                      alt={item[1]}
                    />

                    <span>
                      {item[1]}
                    </span>
                  </button>
                ))}

              </div>

            </section>

            {/* ABOUT */}

            <section
              id="about"
              className="about"
            >

              <div className="about-image">

                <img
                  src="/image/about-kia-fashion.jpg"
                  alt="About Kia Fashion"
                />

              </div>

              <div className="about-copy">

                <span className="kicker">
                  OUR STORY
                </span>

                <h2>
                  Fashion for{" "}
                  <em>
                    Ki & Kiddos.
                  </em>
                </h2>

                <p>
                  Kia Fashion brings elegant
                  Indian fashion and joyful
                  kidswear together in a warm,
                  modern shopping experience.
                </p>

                <p>
                  We believe beautiful fashion
                  should feel effortless, personal
                  and memorable.
                </p>

                <button
                  className="button dark"
                  onClick={() =>
                    scrollTo("contact")
                  }
                >
                  Discover Kia Fashion →
                </button>

              </div>

            </section>

            {/* NEWSLETTER */}

            <section className="newsletter">

              <span className="kicker">
                JOIN THE KIA COMMUNITY
              </span>

              <h2>
                Something beautiful
                <br />
                <em>
                  is always coming.
                </em>
              </h2>

              <p>
                Sign up for new collections,
                styling inspiration and special
                offers.
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
        )}

      {/* FOOTER */}

      <footer
        id="contact"
        className="footer"
      >

        <div className="footer-brand">

          <span>
            KIA FASHION
          </span>

          <p>
            Fashion for Ki & Kiddos.
          </p>

        </div>

        <div>

          <h4>Shop</h4>

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            Sarees
          </button>

          <button
            onClick={() =>
              scrollTo("kids")
            }
          >
            Kidswear
          </button>

          <button
            onClick={() =>
              scrollTo("collections")
            }
          >
            Collections
          </button>

        </div>

        <div>

          <h4>Explore</h4>

          <button
            onClick={() =>
              scrollTo("about")
            }
          >
            Our Story
          </button>

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            New Arrivals
          </button>

          <button
            onClick={() =>
              alert(
                "Contact: hello@kiafashion.in"
              )
            }
          >
            Contact
          </button>

        </div>

        <div>

          <h4>
            Customer Care
          </h4>

          <p>
            Mon–Sat, 10 AM–6 PM
          </p>

          <p>
            Easy returns · COD available
          </p>

          <p>
            Free shipping over ₹2,500
          </p>

        </div>

      </footer>

      <div className="copyright">
        © {new Date().getFullYear()} Kia Fashion.
        All rights reserved.
      </div>

    </div>
  );
}
