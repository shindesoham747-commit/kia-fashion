import React, { useMemo, useState } from "react";
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
    sizes: ["S", "M", "L", "XL"],
    description:
      "A graceful silk saree designed with rich colour, elegant detailing and a timeless festive finish.",
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
    sizes: ["S", "M", "L", "XL"],
    description:
      "A luxurious Banarasi-inspired saree created for weddings, celebrations and memorable occasions.",
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
    sizes: ["S", "M", "L", "XL"],
    description:
      "A beautiful festive saree with a soft feminine palette and elegant traditional character.",
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
    sizes: ["S", "M", "L", "XL"],
    description:
      "A statement party saree made for evening celebrations, parties and special occasions.",
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
    sizes: ["S", "M", "L", "XL"],
    description:
      "A comfortable celebration look designed for little ones to move, play and enjoy every moment.",
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
    sizes: ["S", "M", "L", "XL"],
    description:
      "Festive kidswear combining comfort with a beautiful traditional-inspired look.",
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
    sizes: ["S", "M", "L", "XL"],
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
    sizes: ["S", "M", "L", "XL"],
    description:
      "A charming party look for little celebrations, family events and special days.",
  },
];

const allProducts = [...sarees, ...kids];

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");

  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [email, setEmail] = useState("");

  const addToCart = (product, size = "M") => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          size,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (id, size) => {
    setCart((current) =>
      current.filter(
        (item) => !(item.id === id && item.size === size)
      )
    );
  };

  const changeQuantity = (id, size, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });

    setMobileMenu(false);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountTotal = cart.reduce(
    (total, item) =>
      total + (item.oldPrice - item.price) * item.quantity,
    0
  );

  const deliveryCharge = cartTotal >= 2500 || cartTotal === 0 ? 0 : 99;

  const grandTotal = cartTotal + deliveryCharge;

  const filteredProducts = useMemo(() => {
    const result = allProducts.filter((product) => {
      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const categoryMatch =
        category === "All" || product.category === category;

      return searchMatch && categoryMatch;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [search, category, sort]);

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedSize("M");
  };

  const buyNow = (product, size = "M") => {
    addToCart(product, size);
    setSelectedProduct(null);
    setCartOpen(true);
  };

  const ProductCard = ({ product }) => {
    const liked = wishlist.some(
      (item) => item.id === product.id
    );

    const discount = Math.round(
      ((product.oldPrice - product.price) /
        product.oldPrice) *
        100
    );

    return (
      <article className="product-card">
        <div className="product-image-area">
          <img
            src={product.image}
            alt={product.name}
          />

          <span className="deal-tag">
            Deal
          </span>

          <button
            className={`wishlist-button ${
              liked ? "active" : ""
            }`}
            onClick={() =>
              toggleWishlist(product)
            }
          >
            {liked ? "♥" : "♡"}
          </button>

          <button
            className="quick-button"
            onClick={() =>
              openProduct(product)
            }
          >
            Quick View
          </button>
        </div>

        <div className="product-content">
          <span className="category-label">
            {product.category}
          </span>

          <h3>{product.name}</h3>

          <div className="rating">
            <span>{product.rating}</span>
            <strong>★★★★★</strong>
            <small>
              {product.reviews} ratings
            </small>
          </div>

          <div className="price">
            <strong>
              ₹{product.price.toLocaleString()}
            </strong>

            <del>
              ₹{product.oldPrice.toLocaleString()}
            </del>

            <span>
              {discount}% off
            </span>
          </div>

          <p className="tax">
            Inclusive of all taxes
          </p>

          <p className="delivery-text">
            <strong>FREE Delivery</strong>
            <br />
            Cash on Delivery available
          </p>

          <div className="card-buttons">
            <button
              className="cart-button"
              onClick={() => {
                addToCart(product);
                setCartOpen(true);
              }}
            >
              🛒 Add to Cart
            </button>

            <button
              className="buy-button"
              onClick={() =>
                buyNow(product)
              }
            >
              Buy Now
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="kia-page">

      {/* TOP BAR */}

      <div className="top-bar">
        <span>
          FREE SHIPPING ON ORDERS OVER ₹2,500
        </span>

        <span>•</span>

        <span>
          EASY RETURNS
        </span>

        <span>•</span>

        <span>
          COD AVAILABLE
        </span>
      </div>

      {/* HEADER */}

      <header className="main-header">

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >
          ☰
        </button>

        <button
          className="logo"
          onClick={() =>
            scrollTo("home")
          }
        >
          <span>KIA</span>
          <small>FASHION</small>
        </button>

        <div className="location">
          <span>Deliver to</span>
          <strong>
            🇮🇳 India ▾
          </strong>
        </div>

        <div className="search-container">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="All">
              All
            </option>
            <option value="Silk Saree">
              Silk Saree
            </option>
            <option value="Banarasi Saree">
              Banarasi Saree
            </option>
            <option value="Festive Saree">
              Festive Saree
            </option>
            <option value="Designer Saree">
              Designer Saree
            </option>
            <option value="Kidswear">
              Kidswear
            </option>
          </select>

          <input
            type="text"
            placeholder="Search Kia Fashion"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <button>
            🔍
          </button>
        </div>

        <button
          className="account-button"
          onClick={() =>
            alert(
              "Welcome to Kia Fashion!"
            )
          }
        >
          <span>
            Hello, sign in
          </span>

          <strong>
            Account & Lists ▾
          </strong>
        </button>

        <button
          className="orders-button"
          onClick={() =>
            alert(
              "Your orders will appear here."
            )
          }
        >
          <span>
            Returns
          </span>

          <strong>
            & Orders
          </strong>
        </button>

        <button
          className="cart-header-button"
          onClick={() =>
            setCartOpen(true)
          }
        >
          <div className="cart-icon">
            🛒
            <b>{cartCount}</b>
          </div>

          <strong>
            Cart
          </strong>
        </button>

      </header>

      {/* NAVIGATION */}

      <nav
        className={`navigation ${
          mobileMenu ? "mobile-open" : ""
        }`}
      >

        <button
          onClick={() =>
            scrollTo("home")
          }
        >
          ☰ All
        </button>

        <button
          onClick={() => {
            setCategory("All");
            scrollTo("shop");
          }}
        >
          Sarees
        </button>

        <button
          onClick={() => {
            setCategory("Kidswear");
            scrollTo("kids");
          }}
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

        <button
          onClick={() =>
            scrollTo("style")
          }
        >
          Style Studio
        </button>

        <button
          onClick={() =>
            scrollTo("about")
          }
        >
          About Kia
        </button>

        <button
          onClick={() =>
            scrollTo("contact")
          }
        >
          Customer Service
        </button>

      </nav>

      {/* HERO */}

      <section
        id="home"
        className="hero"
      >

        <img
          src="/image/hero-saree.jpg"
          alt="Kia Fashion"
        />

        <div className="hero-overlay">

          <span>
            THE NEW KIA COLLECTION
          </span>

          <h1>
            Elegance,
            <br />
            <em>
              reimagined.
            </em>
          </h1>

          <p>
            Discover graceful sarees
            and beautiful kidswear
            designed for moments worth
            remembering.
          </p>

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            Shop Now →
          </button>

        </div>

      </section>

      {/* FEATURES */}

      <section className="features">

        <div>
          <span>🚚</span>
          <div>
            <strong>
              Free Delivery
            </strong>
            <p>
              On orders over ₹2,500
            </p>
          </div>
        </div>

        <div>
          <span>↩️</span>
          <div>
            <strong>
              Easy Returns
            </strong>
            <p>
              Simple return policy
            </p>
          </div>
        </div>

        <div>
          <span>🔒</span>
          <div>
            <strong>
              Secure Payments
            </strong>
            <p>
              100% secure checkout
            </p>
          </div>
        </div>

        <div>
          <span>💳</span>
          <div>
            <strong>
              Cash on Delivery
            </strong>
            <p>
              Available across India
            </p>
          </div>
        </div>

      </section>

      {/* COLLECTIONS */}

      <section
        id="collections"
        className="section"
      >

        <div className="section-title">

          <div>
            <span>
              CURATED FOR YOU
            </span>

            <h2>
              Shop by{" "}
              <em>
                collection
              </em>
            </h2>
          </div>

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            See all →
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

            <div>
              <strong>
                Silk Sarees
              </strong>

              <span>
                Shop now →
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              setCategory(
                "Banarasi Saree"
              );
              scrollTo("shop");
            }}
          >
            <img
              src="/image/saree2.jpg"
              alt="Banarasi Sarees"
            />

            <div>
              <strong>
                Banarasi Sarees
              </strong>

              <span>
                Shop now →
              </span>
            </div>
          </button>

          <button
            onClick={() => {
              setCategory(
                "Festive Saree"
              );
              scrollTo("shop");
            }}
          >
            <img
              src="/image/saree3.jpg"
              alt="Festive"
            />

            <div>
              <strong>
                Festive Edit
              </strong>

              <span>
                Shop now →
              </span>
            </div>
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

            <div>
              <strong>
                Kidswear
              </strong>

              <span>
                Shop now →
              </span>
            </div>
          </button>

        </div>

      </section>

      {/* SHOP */}

      <section
        id="shop"
        className="section shop-section"
      >

        <div className="section-title">

          <div>
            <span>
              KIA FASHION STORE
            </span>

            <h2>
              Best Sellers &{" "}
              <em>
                Deals
              </em>
            </h2>
          </div>

          <strong className="results">
            {filteredProducts.length} results
          </strong>

        </div>

        <div className="shop-toolbar">

          <span>
            Showing the best styles
            for you
          </span>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >
            <option value="featured">
              Sort: Featured
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

            <option value="rating">
              Customer Rating
            </option>
          </select>

        </div>

        <div className="product-grid">

          {filteredProducts.length > 0 ? (
            filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )
          ) : (
            <div className="no-results">
              <h2>
                No products found
              </h2>

              <p>
                Try another search or
                category.
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

      {/* FESTIVE BANNER */}

      <section className="festive">

        <div className="festive-content">

          <span>
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
            Rich colours, graceful
            drapes and details designed
            for your most memorable
            occasions.
          </p>

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            Explore Festive →
          </button>

        </div>

        <img
          src="/image/festive-collection.jpg"
          alt="Festive Collection"
        />

      </section>

      {/* KIDS */}

      <section
        id="kids"
        className="section"
      >

        <div className="section-title">

          <div>
            <span>
              FOR KI & KIDDOS
            </span>

            <h2>
              Little style,
              <em>
                big moments.
              </em>
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

      <section
        id="style"
        className="style-section"
      >

        <div className="section-title">

          <div>
            <span>
              KIA STYLE STUDIO
            </span>

            <h2>
              Dress for{" "}
              <em>
                the moment.
              </em>
            </h2>
          </div>

        </div>

        <div className="style-grid">

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            <img
              src="/image/wedding-edit.jpg"
              alt="Wedding Edit"
            />

            <span>
              Wedding Edit →
            </span>
          </button>

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            <img
              src="/image/festive-collection.jpg"
              alt="Festival Edit"
            />

            <span>
              Festival Edit →
            </span>
          </button>

          <button
            onClick={() =>
              scrollTo("shop")
            }
          >
            <img
              src="/image/everyday-edit.jpg"
              alt="Everyday Edit"
            />

            <span>
              Everyday Edit →
            </span>
          </button>

        </div>

      </section>

      {/* ABOUT */}

      <section
        id="about"
        className="about"
      >

        <img
          src="/image/about-kia-fashion.jpg"
          alt="Kia Fashion"
        />

        <div>

          <span>
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
            Beautiful fashion should feel
            effortless, personal and
            memorable.
          </p>

          <button
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

        <span>
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
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            onClick={() => {
              if (!email) {
                alert(
                  "Please enter your email address."
                );
                return;
              }

              alert(
                "Thank you for joining Kia Fashion!"
              );

              setEmail("");
            }}
          >
            Subscribe →
          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer
        id="contact"
        className="footer"
      >

        <div className="footer-brand">

          <h2>
            KIA
          </h2>

          <strong>
            FASHION
          </strong>

          <p>
            Fashion for Ki & Kiddos.
          </p>

        </div>

        <div>

          <h4>
            Shop
          </h4>

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

          <h4>
            Explore
          </h4>

          <button
            onClick={() =>
              scrollTo("style")
            }
          >
            Style Studio
          </button>

          <button
            onClick={() =>
              scrollTo("about")
            }
          >
            Our Story
          </button>

          <button
            onClick={() =>
              alert(
                "Email: hello@kiafashion.in"
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
            Easy returns
          </p>

          <p>
            COD available
          </p>

          <p>
            Free shipping over ₹2,500
          </p>

        </div>

      </footer>

      <div className="copyright">
        © {new Date().getFullYear()} Kia
        Fashion. All rights reserved.
      </div>

      {/* PRODUCT DETAIL MODAL */}

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>

            <div className="modal-image">
              <img
                src={selectedProduct.image}
                alt={
                  selectedProduct.name
                }
              />

              <span>
                Deal of the Day
              </span>
            </div>

            <div className="modal-details">

              <small>
                {selectedProduct.category}
              </small>

              <h2>
                {selectedProduct.name}
              </h2>

              <div className="modal-rating">

                <strong>
                  {selectedProduct.rating}
                </strong>

                <span>
                  ★★★★★
                </span>

                <small>
                  {selectedProduct.reviews}{" "}
                  ratings
                </small>

              </div>

              <hr />

              <p className="deal-title">
                Deal of the Day
              </p>

              <div className="modal-price">

                <strong>
                  ₹
                  {selectedProduct.price.toLocaleString()}
                </strong>

                <del>
                  ₹
                  {selectedProduct.oldPrice.toLocaleString()}
                </del>

                <span>
                  {Math.round(
                    ((selectedProduct.oldPrice -
                      selectedProduct.price) /
                      selectedProduct.oldPrice) *
                      100
                  )}
                  % off
                </span>

              </div>

              <p>
                Inclusive of all taxes
              </p>

              <div className="offers">

                <h3>
                  Special Offers
                </h3>

                <p>
                  • Extra 10% off on selected
                  products
                </p>

                <p>
                  • Free delivery on orders
                  above ₹2,500
                </p>

                <p>
                  • Cash on Delivery available
                </p>

              </div>

              <div className="modal-delivery">

                <strong>
                  🚚 FREE Delivery
                </strong>

                <p>
                  Deliver to your location
                  across India
                </p>

                <p>
                  Order today and enjoy easy
                  returns.
                </p>

              </div>

              <div className="size-section">

                <strong>
                  Select Size
                </strong>

                <div>

                  {selectedProduct.sizes.map(
                    (size) => (
                      <button
                        key={size}
                        className={
                          selectedSize === size
                            ? "selected-size"
                            : ""
                        }
                        onClick={() =>
                          setSelectedSize(
                            size
                          )
                        }
                      >
                        {size}
                      </button>
                    )
                  )}

                </div>

              </div>

              <div className="about-product">

                <h3>
                  About this product
                </h3>

                <p>
                  {
                    selectedProduct.description
                  }
                </p>

              </div>

              <div className="modal-actions">

                <button
                  className="modal-cart"
                  onClick={() => {
                    addToCart(
                      selectedProduct,
                      selectedSize
                    );

                    setSelectedProduct(
                      null
                    );

                    setCartOpen(true);
                  }}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="modal-buy"
                  onClick={() =>
                    buyNow(
                      selectedProduct,
                      selectedSize
                    )
                  }
                >
                  Buy Now
                </button>

              </div>

              <div className="security">

                🔒 Secure transaction

                <span>
                  ↩ Easy returns
                </span>

                <span>
                  ✓ Genuine Kia Fashion
                  product
                </span>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* CART */}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >

          <aside
            className="cart-drawer"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cart-heading">

              <div>
                <span>
                  YOUR KIA BAG
                </span>

                <h2>
                  Shopping Cart
                </h2>
              </div>

              <button
                onClick={() =>
                  setCartOpen(false)
                }
              >
                ×
              </button>

            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">

                <div>
                  🛒
                </div>

                <h2>
                  Your cart is empty
                </h2>

                <p>
                  Discover something beautiful
                  and add it to your cart.
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
                      key={`${item.id}-${item.size}`}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <span>
                          {item.category}
                        </span>

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          Size:{" "}
                          <strong>
                            {item.size}
                          </strong>
                        </p>

                        <strong className="cart-price">
                          ₹
                          {item.price.toLocaleString()}
                        </strong>

                        <div className="quantity">

                          <button
                            onClick={() =>
                              changeQuantity(
                                item.id,
                                item.size,
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
                              changeQuantity(
                                item.id,
                                item.size,
                                1
                              )
                            }
                          >
                            +
                          </button>

                        </div>

                        <button
                          className="delete-button"
                          onClick={() =>
                            removeFromCart(
                              item.id,
                              item.size
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </div>
                  ))}

                </div>

                <div className="cart-summary">

                  <div>
                    <span>
                      Product total
                    </span>

                    <strong>
                      ₹
                      {cartTotal.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>
                      You save
                    </span>

                    <strong className="saving">
                      ₹
                      {discountTotal.toLocaleString()}
                    </strong>
                  </div>

                  <div>
                    <span>
                      Delivery
                    </span>

                    <strong>
                      {deliveryCharge === 0
                        ? "FREE"
                        : `₹${deliveryCharge}`}
                    </strong>
                  </div>

                  <hr />

                  <div className="grand-total">

                    <strong>
                      Total
                    </strong>

                    <strong>
                      ₹
                      {grandTotal.toLocaleString()}
                    </strong>

                  </div>

                  <button
                    className="checkout-button"
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutOpen(true);
                    }}
                  >
                    Proceed to Checkout →
                  </button>

                  <button
                    className="continue-button"
                    onClick={() =>
                      setCartOpen(false)
                    }
                  >
                    Continue Shopping
                  </button>

                </div>

              </>
            )}

          </aside>

        </div>
      )}

      {/* CHECKOUT */}

      {checkoutOpen && (
        <div className="checkout-overlay">

          <div className="checkout-box">

            <button
              className="checkout-close"
              onClick={() =>
                setCheckoutOpen(false)
              }
            >
              ×
            </button>

            <span className="checkout-kicker">
              KIA FASHION
            </span>

            <h2>
              Secure Checkout
            </h2>

            <p>
              Complete your details to place
              your order.
            </p>

            <div className="checkout-grid">

              <div>

                <h3>
                  Delivery Details
                </h3>

                <input
                  placeholder="Full Name"
                />

                <input
                  placeholder="Mobile Number"
                />

                <input
                  placeholder="Email Address"
                />

                <textarea
                  placeholder="Complete Delivery Address"
                  rows="4"
                />

                <input
                  placeholder="Pincode"
                />

              </div>

              <div className="checkout-summary">

                <h3>
                  Order Summary
                </h3>

                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.size}`}
                  >
                    <span>
                      {item.name} ×{" "}
                      {item.quantity}
                    </span>

                    <strong>
                      ₹
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </strong>
                  </div>
                ))}

                <hr />

                <div>
                  <strong>
                    Total
                  </strong>

                  <strong>
                    ₹
                    {grandTotal.toLocaleString()}
                  </strong>
                </div>

                <button
                  onClick={() => {
                    setCheckoutOpen(false);
                    setOrderPlaced(true);
                    setCart([]);
                  }}
                >
                  Place Order →
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* ORDER SUCCESS */}

      {orderPlaced && (
        <div className="success-overlay">

          <div className="success-box">

            <div className="success-icon">
              ✓
            </div>

            <span>
              ORDER CONFIRMED
            </span>

            <h2>
              Thank you for shopping
              with Kia Fashion!
            </h2>

            <p>
              Your order has been placed
              successfully. We will contact
              you with delivery updates.
            </p>

            <button
              onClick={() =>
                setOrderPlaced(false)
              }
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
