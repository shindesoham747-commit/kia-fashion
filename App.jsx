import { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Elegant Silk Saree",
    price: 1999,
    category: "Sarees",
    description:
      "Elegant silk saree perfect for festivals, family functions and special occasions.",
    image: "/image/saree1.jpg",
  },

  {
    id: 2,
    name: "Traditional Banarasi Saree",
    price: 2499,
    category: "Sarees",
    description:
      "Beautiful traditional Banarasi saree with a rich and elegant look.",
    image: "/image/saree2.jpg",
  },

  {
    id: 3,
    name: "Designer Party Saree",
    price: 2999,
    category: "Sarees",
    description:
      "A stylish designer saree perfect for parties and celebrations.",
    image: "/image/saree3.jpg",
  },

  {
    id: 4,
    name: "Georgette Saree",
    price: 1799,
    category: "Sarees",
    description:
      "Lightweight and comfortable georgette saree for everyday elegance.",
    image: "/image/saree4.jpg",
  },

  {
    id: 5,
    name: "Girls Party Dress",
    price: 1299,
    category: "Kids",
    description:
      "Cute and comfortable party dress for girls.",
    image: "/image/kids1.jpg",
  },

  {
    id: 6,
    name: "Kids Traditional Wear",
    price: 1499,
    category: "Kids",
    description:
      "Beautiful traditional outfit for festive occasions.",
    image: "/image/kids2.jpg",
  },

  {
    id: 7,
    name: "Kids Festive Dress",
    price: 1199,
    category: "Kids",
    description:
      "Colorful festive outfit designed for little ones.",
    image: "/image/kids3.jpg",
  },

  {
    id: 8,
    name: "Kids Casual Outfit",
    price: 999,
    category: "Kids",
    description:
      "Comfortable and stylish casual clothing for kids.",
    image: "/image/kids4.jpg",
  },
];

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pin: "",
  });

  const filteredProducts = products.filter((product) => {
    const searchMatch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || product.category === category;

    return searchMatch && categoryMatch;
  });

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (product) => {
    const existing = cart.find(
      (item) => item.id === product.id
    );

    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  const increaseQuantity = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item.id !== id)
    );
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some(
      (item) => item.id === product.id
    );

    if (exists) {
      setWishlist(
        wishlist.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const isWishlisted = (id) => {
    return wishlist.some(
      (item) => item.id === id
    );
  };

  const openCategory = (value) => {
    setCategory(value);
    setSearch("");

    setTimeout(() => {
      document
        .getElementById("shop")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = (e) => {
    e.preventDefault();

    const {
      name,
      email,
      phone,
      address,
      city,
      state,
      pin,
    } = customer;

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pin
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (pin.length !== 6) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    const newOrderNumber =
      "KF" + Date.now().toString().slice(-6);

    setOrderNumber(newOrderNumber);
    setShowCheckout(false);
    setShowCart(false);

    setCart([]);

    setCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pin: "",
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();

    setContactMessage(
      "Thank you! Your message has been received."
    );

    e.target.reset();
  };

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <a href="#home" className="logo-area">
          <img
            src="image/logo.jpg"
            alt="Kia Fashion Logo"
          />
        </a>

        <div className="brand">
          <h1>Kia Fashion</h1>
          <p>Fashion for Ki & Kiddos</p>
        </div>

        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#sarees">Sarees</a>
          <a href="#kids">Kids</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">

          <button
            className="icon-button"
            onClick={() => setShowWishlist(true)}
            title="Wishlist"
          >
            ♡
            {wishlist.length > 0 && (
              <span>{wishlist.length}</span>
            )}
          </button>

          <button
            className="cart-button"
            onClick={() => setShowCart(true)}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span>({cartCount})</span>
            )}
          </button>

        </div>

      </header>


      {/* HERO */}

      <section className="hero" id="home">

        <div className="hero-content">

          <p className="hero-small">
            WELCOME TO KIA FASHION
          </p>

          <h2>
            Elegant Fashion
            <br />
            For Every Occasion
          </h2>

          <p>
            Discover beautiful sarees and stylish
            fashion for women and kids.
          </p>

          <button
            className="primary-button"
            onClick={() => openCategory("All")}
          >
            Shop Now
          </button>

        </div>

      </section>


      {/* CATEGORIES */}

      <section className="categories">

        <p className="section-label">
          EXPLORE
        </p>

        <h2>Shop By Category</h2>

        <div className="category-grid">

          <button
            className="category-card"
            onClick={() =>
              openCategory("Sarees")
            }
          >
            <div className="category-icon">
              👗
            </div>

            <h3>Sarees</h3>

            <p>
              Elegant sarees for every occasion
            </p>
          </button>


          <button
            className="category-card"
            onClick={() =>
              openCategory("Kids")
            }
          >
            <div className="category-icon">
              👧
            </div>

            <h3>Kids Fashion</h3>

            <p>
              Beautiful fashion for little ones
            </p>
          </button>


          <button
            className="category-card"
            onClick={() =>
              openCategory("All")
            }
          >
            <div className="category-icon">
              ✨
            </div>

            <h3>New Collection</h3>

            <p>
              Explore our latest collection
            </p>
          </button>

        </div>

      </section>


      {/* SHOP */}

      <section
        className="shop-section"
        id="shop"
      >

        <p className="section-label">
          OUR COLLECTION
        </p>

        <h2>Shop Our Collection</h2>

        <p className="section-description">
          Find something beautiful for every occasion.
        </p>


        {/* SEARCH */}

        <div className="search-box">

          <input
            type="text"
            placeholder="🔍 Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* FILTER */}

        <div className="filters">

          {["All", "Sarees", "Kids"].map(
            (item) => (

              <button
                key={item}
                className={
                  category === item
                    ? "filter-active"
                    : ""
                }
                onClick={() =>
                  setCategory(item)
                }
              >
                {item}
              </button>

            )
          )}

        </div>


        {/* PRODUCTS */}

        {filteredProducts.length === 0 ? (

          <div className="no-results">

            <h3>No products found</h3>

            <p>
              Try another search.
            </p>

          </div>

        ) : (

          <div className="product-grid">

            {filteredProducts.map(
              (product) => (

                <div
                  className="product-card"
                  key={product.id}
                >

                  <div
                    className="product-image"
                    onClick={() =>
                      setSelectedProduct(product)
                    }
                  >

                    <img
                      src={product.image}
                      alt={product.name}
                    />

                    <span className="badge">
                      {product.category}
                    </span>

                    <button
                      className={
                        isWishlisted(product.id)
                          ? "wishlist active"
                          : "wishlist"
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                    >
                      {isWishlisted(product.id)
                        ? "♥"
                        : "♡"}
                    </button>

                  </div>


                  <div className="product-info">

                    <p className="product-category">
                      {product.category}
                    </p>

                    <h3>
                      {product.name}
                    </h3>

                    <p className="price">
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <div className="product-buttons">

                      <button
                        className="details-button"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >
                        View Details
                      </button>

                      <button
                        className="add-button"
                        onClick={() =>
                          addToCart(product)
                        }
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* SAREES ANCHOR */}

      <div id="sarees"></div>

      {/* KIDS ANCHOR */}

      <div id="kids"></div>


      {/* ABOUT */}

      <section
        className="about-section"
        id="about"
      >

        <div className="about-content">

          <p className="section-label">
            ABOUT US
          </p>

          <h2>
            Welcome to Kia Fashion
          </h2>

          <p>
            Kia Fashion is a fashion destination
            created for women and kids who love
            beautiful, comfortable and stylish
            clothing.
          </p>

          <p>
            Our collection brings together
            traditional elegance and modern fashion.
          </p>

          <p>
            From elegant sarees to adorable kids
            fashion, we aim to make every shopping
            experience simple and enjoyable.
          </p>

        </div>

      </section>


      {/* CONTACT */}

      <section
        className="contact-section"
        id="contact"
      >

        <p className="section-label">
          GET IN TOUCH
        </p>

        <h2>Contact Us</h2>

        <p className="section-description">
          Have a question? We'd love to hear from you.
        </p>

        <div className="contact-grid">

          <div className="contact-info">

            <h3>Contact Information</h3>

            <p>
              📧 kiafashion@example.com
            </p>

            <p>
              📞 +91 98765 43210
            </p>

            <p>
              📍 Maharashtra, India
            </p>

          </div>


          <form
            className="contact-form"
            onSubmit={handleContactSubmit}
          >

            <input
              type="text"
              placeholder="Your Name"
              required
            />

            <input
              type="email"
              placeholder="Your Email"
              required
            />

            <textarea
              placeholder="Your Message"
              rows="5"
              required
            ></textarea>

            <button type="submit">
              Send Message
            </button>

            {contactMessage && (
              <p className="contact-success">
                {contactMessage}
              </p>
            )}

          </form>

        </div>

      </section>


      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-grid">

          <div>

            <h2>Kia Fashion</h2>

            <p>
              Fashion for Ki & Kiddos
            </p>

            <p>
              Elegant fashion for every occasion.
            </p>

          </div>


          <div>

            <h3>Quick Links</h3>

            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>

          </div>


          <div>

            <h3>Categories</h3>

            <button
              onClick={() =>
                openCategory("Sarees")
              }
            >
              Sarees
            </button>

            <button
              onClick={() =>
                openCategory("Kids")
              }
            >
              Kids Fashion
            </button>

          </div>

        </div>

        <div className="copyright">
          © 2026 Kia Fashion. All Rights Reserved.
        </div>

      </footer>


      {/* PRODUCT DETAILS */}

      {selectedProduct && (

        <div className="modal-overlay">

          <div className="product-modal">

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
            />

            <div className="modal-info">

              <p>
                {selectedProduct.category}
              </p>

              <h2>
                {selectedProduct.name}
              </h2>

              <h3>
                ₹
                {selectedProduct.price.toLocaleString(
                  "en-IN"
                )}
              </h3>

              <p>
                {selectedProduct.description}
              </p>

              <button
                className="add-button large"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                  setShowCart(true);
                }}
              >
                Add to Cart
              </button>

            </div>

          </div>

        </div>

      )}


      {/* WISHLIST */}

      {showWishlist && (

        <div className="side-overlay">

          <div className="side-panel">

            <div className="panel-header">

              <h2>My Wishlist</h2>

              <button
                onClick={() =>
                  setShowWishlist(false)
                }
              >
                ✕
              </button>

            </div>


            {wishlist.length === 0 ? (

              <div className="empty-state">

                <div>♡</div>

                <h3>
                  Your wishlist is empty
                </h3>

                <p>
                  Save products you love here.
                </p>

              </div>

            ) : (

              <div className="wishlist-list">

                {wishlist.map((item) => (

                  <div
                    className="wishlist-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <strong>
                        ₹
                        {item.price.toLocaleString(
                          "en-IN"
                        )}
                      </strong>

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                      >
                        Add to Cart
                      </button>

                      <button
                        className="remove-link"
                        onClick={() =>
                          toggleWishlist(item)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      )}


      {/* CART */}

      {showCart && (

        <div className="side-overlay">

          <div className="side-panel">

            <div className="panel-header">

              <h2>
                Shopping Cart
              </h2>

              <button
                onClick={() =>
                  setShowCart(false)
                }
              >
                ✕
              </button>

            </div>


            {cart.length === 0 ? (

              <div className="empty-state">

                <div>🛒</div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add something beautiful!
                </p>

              </div>

            ) : (

              <>

                <div className="cart-list">

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

                        <h3>
                          {item.name}
                        </h3>

                        <strong>
                          ₹
                          {item.price.toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                        <div className="quantity">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item.id
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
                              increaseQuantity(
                                item.id
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="remove-link"
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


                <div className="cart-bottom">

                  <div className="total-row">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>

                  <button
                    className="checkout-button"
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                  >
                    Proceed to Checkout
                  </button>

                </div>

              </>

            )}

          </div>

        </div>

      )}


      {/* CHECKOUT */}

      {showCheckout && (

        <div className="modal-overlay">

          <div className="checkout-modal">

            <button
              className="modal-close"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              ✕
            </button>

            <h2>
              Checkout
            </h2>

            <form onSubmit={placeOrder}>

              <h3>
                Customer Details
              </h3>

              <input
                name="name"
                placeholder="Full Name"
                value={customer.name}
                onChange={handleCustomerChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={customer.email}
                onChange={handleCustomerChange}
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="10-digit Phone Number"
                value={customer.phone}
                onChange={handleCustomerChange}
                maxLength="10"
                required
              />

              <h3>
                Delivery Address
              </h3>

              <textarea
                name="address"
                placeholder="Full Address"
                value={customer.address}
                onChange={handleCustomerChange}
                required
              ></textarea>

              <input
                name="city"
                placeholder="City"
                value={customer.city}
                onChange={handleCustomerChange}
                required
              />

              <input
                name="state"
                placeholder="State"
                value={customer.state}
                onChange={handleCustomerChange}
                required
              />

              <input
                name="pin"
                placeholder="6-digit PIN Code"
                value={customer.pin}
                onChange={handleCustomerChange}
                maxLength="6"
                required
              />

              <h3>
                Payment Method
              </h3>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  defaultChecked
                />
                Cash on Delivery
              </label>

              <label className="payment-option disabled">
                <input
                  type="radio"
                  name="payment"
                  disabled
                />
                Online Payment
                <span>Coming Soon</span>
              </label>


              <div className="checkout-summary">

                <span>
                  Order Total
                </span>

                <strong>
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              <button
                className="place-order"
                type="submit"
              >
                Place Order
              </button>

            </form>

          </div>

        </div>

      )}


      {/* ORDER SUCCESS */}

      {orderNumber && (

        <div className="success-overlay">

          <div className="success-box">

            <div className="success-icon">
              ✓
            </div>

            <h2>
              Order Confirmed!
            </h2>

            <p>
              Thank you for shopping
              with Kia Fashion.
            </p>

            <div className="order-number">
              Order #{orderNumber}
            </div>

            <p>
              Your order has been successfully
              received.
            </p>

            <button
              className="primary-button"
              onClick={() => {
                setOrderNumber("");
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Continue Shopping
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;