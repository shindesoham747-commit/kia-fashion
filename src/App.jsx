import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "The Rose Silk Saree",
    price: 3499,
    oldPrice: 4299,
    discount: 19,
    rating: 4.5,
    reviews: 128,
    image: "/image/saree1.jpg",
    category: "Silk Saree",
    description:
      "A graceful rose-toned silk saree designed for elegant celebrations and memorable occasions.",
  },
  {
    id: 2,
    name: "Emerald Banarasi Saree",
    price: 4299,
    oldPrice: 5499,
    discount: 22,
    rating: 4.7,
    reviews: 96,
    image: "/image/saree2.jpg",
    category: "Banarasi Saree",
    description:
      "A rich emerald Banarasi saree with timeless detailing, perfect for festive and wedding occasions.",
  },
  {
    id: 3,
    name: "Festive Pink Saree",
    price: 2999,
    oldPrice: 3799,
    discount: 21,
    rating: 4.4,
    reviews: 84,
    image: "/image/saree3.jpg",
    category: "Festive Saree",
    description:
      "A beautiful festive saree combining traditional charm with a modern feminine look.",
  },
  {
    id: 4,
    name: "Royal Party Saree",
    price: 3899,
    oldPrice: 4699,
    discount: 17,
    rating: 4.6,
    reviews: 112,
    image: "/image/saree4.jpg",
    category: "Designer Saree",
    description:
      "A sophisticated designer saree created for parties, celebrations and special evenings.",
  },
  {
    id: 5,
    name: "Little Celebration",
    price: 1599,
    oldPrice: 1999,
    discount: 20,
    rating: 4.5,
    reviews: 64,
    image: "/image/kids1.jpg",
    category: "Kidswear",
    description:
      "A charming kidswear outfit designed for comfort, movement and beautiful celebrations.",
  },
  {
    id: 6,
    name: "Little Festive Edit",
    price: 1899,
    oldPrice: 2399,
    discount: 21,
    rating: 4.6,
    reviews: 71,
    image: "/image/kids2.jpg",
    category: "Kidswear",
    description:
      "A festive kidswear style made for little moments, family celebrations and special days.",
  },
  {
    id: 7,
    name: "Classic Kidswear",
    price: 1399,
    oldPrice: 1799,
    discount: 22,
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
    discount: 23,
    rating: 4.5,
    reviews: 59,
    image: "/image/kids4.jpg",
    category: "Kidswear",
    description:
      "A playful party look designed to keep little ones comfortable while looking their best.",
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

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(null);

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          ...product,
          quantity: 1,
          size: selectedSize,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((current) =>
      current.filter((item) => item.id !== id)
    );
  };

  const changeQuantity = (id, amount) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  item.quantity + amount
                ),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((current) => {
      const exists = current.some(
        (item) => item.id === product.id
      );

      if (exists) {
        return current.filter(
          (item) => item.id !== product.id
        );
      }

      return [...current, product];
    });
  };

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setMenuOpen(false);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
    setSelectedSize("M");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        product.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      if (sort === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

  const ProductCard = ({ product }) => {
    const liked = wishlist.some(
      (item) => item.id === product.id
    );

    return (
      <article className="product-card">
        <div
          className="product-image-wrapper"
          onClick={() => openProduct(product)}
        >
          <img
            src={product.image}
            alt={product.name}
          />

          <button
            className={`wishlist-button ${
              liked ? "active" : ""
            }`}
            onClick={(event) => {
              event.stopPropagation();
              toggleWishlist(product);
            }}
          >
            {liked ? "♥" : "♡"}
          </button>

          <span className="deal-label">
            Deal
          </span>

          <div className="image-view-text">
            View Product
          </div>
        </div>

        <div className="product-card-content">
          <span className="product-category">
            {product.category}
          </span>

          <h3
            onClick={() => openProduct(product)}
          >
            {product.name}
          </h3>

          <div className="rating">
            <strong>{product.rating}</strong>
            <span>★★★★★</span>
            <small>
              ({product.reviews} ratings)
            </small>
          </div>

          <div className="card-price">
            <strong>
              ₹{product.price.toLocaleString()}
            </strong>

            <del>
              ₹{product.oldPrice.toLocaleString()}
            </del>

            <span>
              {product.discount}% off
            </span>
          </div>

          <p className="delivery-text">
            <strong>FREE Delivery</strong>
            <br />
            Available across India
          </p>

          <button
            className="card-cart-button"
            onClick={() => {
              addToCart(product);
              setCartOpen(true);
            }}
          >
            Add to Cart
          </button>

          <button
            className="card-buy-button"
            onClick={() => openProduct(product)}
          >
            Buy Now
          </button>
        </div>
      </article>
    );
  };

  return (
    <div className="kia-page">

      {/* ANNOUNCEMENT */}
      <div className="announcement-bar">
        FREE SHIPPING ON ORDERS OVER ₹2,500
        <span>•</span>
        EASY RETURNS
        <span>•</span>
        COD AVAILABLE
      </div>

      {/* HEADER */}
      <header className="main-header">

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          ☰
        </button>

        <button
          className="kia-logo"
          onClick={() => scrollTo("home")}
        >
          <span>KIA</span>
          <small>FASHION</small>
        </button>

        <div className="delivery-location">
          <span>Deliver to</span>
          <strong>India ▾</strong>
        </div>

        <div className="search-container">

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option value="All">All</option>
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
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search Kia Fashion"
          />

          <button>⌕</button>
        </div>

        <button
          className="header-link"
          onClick={() =>
            alert("Welcome to Kia Fashion")
          }
        >
          <span>Hello, sign in</span>
          <strong>
            Account & Lists ▾
          </strong>
        </button>

        <button
          className="header-link orders-link"
          onClick={() =>
            alert(
              "Your orders will appear here."
            )
          }
        >
          <span>Returns</span>
          <strong>& Orders</strong>
        </button>

        <button
          className="header-cart"
          onClick={() =>
            setCartOpen(true)
          }
        >
          <div className="cart-symbol">
            🛒
            <b>{cartCount}</b>
          </div>
          <strong>Cart</strong>
        </button>
      </header>

      {/* NAVIGATION */}
      <nav
        className={`main-navigation ${
          menuOpen ? "navigation-open" : ""
        }`}
      >
        <button
          onClick={() => scrollTo("home")}
        >
          ☰ All
        </button>

        <button
          onClick={() => scrollTo("shop")}
        >
          Sarees
        </button>

        <button
          onClick={() => {
            setCategory("Kidswear");
            scrollTo("shop");
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
            scrollTo("style-studio")
          }
        >
          Style Studio
        </button>

        <button
          onClick={() => scrollTo("about")}
        >
          About Kia
        </button>

        <button
          onClick={() => scrollTo("contact")}
        >
          Customer Service
        </button>
      </nav>

      {/* PRODUCT DETAIL PAGE */}
      {selectedProduct ? (
        <main className="product-detail-page">

          <div className="breadcrumb">
            Home › {selectedProduct.category} ›{" "}
            {selectedProduct.name}
          </div>

          <button
            className="back-shop-button"
            onClick={closeProduct}
          >
            ← Back to shopping
          </button>

          <section className="product-detail">

            {/* LEFT IMAGE */}
            <div className="detail-gallery">

              <div className="thumbnail-list">

                <button
                  className="thumbnail active"
                  onClick={() =>
                    setSelectedImage(
                      selectedProduct.image
                    )
                  }
                >
                  <img
                    src={selectedProduct.image}
                    alt=""
                  />
                </button>

                <button
                  className="thumbnail"
                  onClick={() =>
                    setSelectedImage(
                      selectedProduct.image
                    )
                  }
                >
                  <img
                    src={selectedProduct.image}
                    alt=""
                  />
                </button>

                <button
                  className="thumbnail"
                  onClick={() =>
                    setSelectedImage(
                      selectedProduct.image
                    )
                  }
                >
                  <img
                    src={selectedProduct.image}
                    alt=""
                  />
                </button>

              </div>

              <div className="main-detail-image">

                <span className="detail-deal">
                  Deal of the Day
                </span>

                <img
                  src={selectedImage}
                  alt={selectedProduct.name}
                />

                <button
                  className={`detail-wishlist ${
                    wishlist.some(
                      (item) =>
                        item.id ===
                        selectedProduct.id
                    )
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    toggleWishlist(
                      selectedProduct
                    )
                  }
                >
                  ♥
                </button>

              </div>
            </div>

            {/* RIGHT INFORMATION */}
            <div className="product-detail-info">

              <span className="detail-category">
                {selectedProduct.category}
              </span>

              <h1>
                {selectedProduct.name}
              </h1>

              <p className="detail-subtitle">
                Elegant Kia Fashion collection
                designed for beautiful moments.
              </p>

              <div className="detail-rating">

                <strong>
                  {selectedProduct.rating}
                </strong>

                <span>
                  ★★★★★
                </span>

                <a>
                  {selectedProduct.reviews} ratings
                </a>

              </div>

              <div className="detail-divider" />

              {/* PRICE */}
              <div className="detail-price">

                <span className="detail-discount">
                  {selectedProduct.discount}%
                </span>

                <strong>
                  ₹
                  {selectedProduct.price.toLocaleString()}
                </strong>

                <span>
                  M.R.P:
                </span>

                <del>
                  ₹
                  {selectedProduct.oldPrice.toLocaleString()}
                </del>

              </div>

              <p className="tax-text">
                Inclusive of all taxes
              </p>

              {/* OFFERS */}
              <div className="offers-box">

                <h3>
                  Special Offers
                </h3>

                <div className="offer-item">
                  <span>•</span>
                  Extra 10% off on selected
                  products
                </div>

                <div className="offer-item">
                  <span>•</span>
                  Free delivery on orders
                  above ₹2,500
                </div>

                <div className="offer-item">
                  <span>•</span>
                  Cash on Delivery available
                </div>

              </div>

              {/* DELIVERY */}
              <div className="delivery-box">

                <div>
                  <span className="delivery-icon">
                    🚚
                  </span>

                  <div>
                    <strong>
                      FREE Delivery
                    </strong>

                    <p>
                      Deliver to your location
                      across India
                    </p>
                  </div>
                </div>

                <p>
                  Order today and enjoy easy
                  returns.
                </p>

              </div>

              {/* SIZE */}
              <div className="size-section">

                <div className="size-heading">
                  <strong>
                    Select Size
                  </strong>

                  <span>
                    Size Guide
                  </span>
                </div>

                <div className="size-buttons">

                  {["S", "M", "L", "XL"].map(
                    (size) => (
                      <button
                        key={size}
                        className={
                          selectedSize === size
                            ? "selected"
                            : ""
                        }
                        onClick={() =>
                          setSelectedSize(size)
                        }
                      >
                        {size}
                      </button>
                    )
                  )}

                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="about-product">

                <h2>
                  About this product
                </h2>

                <p>
                  {selectedProduct.description}
                </p>

                <ul>
                  <li>
                    Premium Kia Fashion
                    quality
                  </li>

                  <li>
                    Designed for comfort
                    and elegance
                  </li>

                  <li>
                    Suitable for festive
                    occasions
                  </li>

                  <li>
                    Easy returns available
                  </li>
                </ul>

              </div>

              {/* ACTIONS */}
              <div className="detail-actions">

                <button
                  className="detail-add-cart"
                  onClick={() => {
                    addToCart(
                      selectedProduct
                    );
                    setCartOpen(true);
                  }}
                >
                  🛒 Add to Cart
                </button>

                <button
                  className="detail-buy-now"
                  onClick={() => {
                    addToCart(
                      selectedProduct
                    );
                    setCartOpen(true);
                  }}
                >
                  Buy Now
                </button>

              </div>

              {/* TRUST */}
              <div className="trust-row">

                <div>
                  <span>🔒</span>
                  <strong>
                    Secure transaction
                  </strong>
                </div>

                <div>
                  <span>↩</span>
                  <strong>
                    Easy returns
                  </strong>
                </div>

                <div>
                  <span>✓</span>
                  <strong>
                    Genuine Kia Fashion
                  </strong>
                </div>

              </div>

            </div>

          </section>

          {/* RELATED PRODUCTS */}
          <section className="related-section">

            <div className="section-title">
              <span>
                YOU MAY ALSO LIKE
              </span>

              <h2>
                Explore more{" "}
                <em>beautiful pieces.</em>
              </h2>
            </div>

            <div className="product-grid">

              {products
                .filter(
                  (product) =>
                    product.id !==
                    selectedProduct.id
                )
                .slice(0, 4)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

            </div>

          </section>

        </main>
      ) : (
        <>
          {/* HERO */}
          <main>

            <section
              id="home"
              className="hero-section"
            >

              <div className="hero-content">

                <span>
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

                <button
                  onClick={() =>
                    scrollTo("shop")
                  }
                >
                  Shop Now →
                </button>

              </div>

              <img
                src="/image/hero-saree.jpg"
                alt="Kia Fashion Collection"
              />

            </section>

            {/* FEATURES */}
            <section className="shopping-features">

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
              className="content-section"
            >

              <div className="section-heading">

                <div>
                  <span>
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
                  See all →
                </button>

              </div>

              <div className="collection-grid">

                {[
                  [
                    "Silk Sarees",
                    "/image/saree1.jpg",
                    "Silk Saree",
                  ],
                  [
                    "Banarasi Sarees",
                    "/image/saree2.jpg",
                    "Banarasi Saree",
                  ],
                  [
                    "Festive Edit",
                    "/image/saree3.jpg",
                    "Festive Saree",
                  ],
                  [
                    "Kidswear",
                    "/image/kids1.jpg",
                    "Kidswear",
                  ],
                ].map(
                  ([title, image, cat]) => (
                    <button
                      key={title}
                      onClick={() => {
                        setCategory(cat);
                        scrollTo("shop");
                      }}
                    >
                      <img
                        src={image}
                        alt={title}
                      />

                      <span>{title}</span>

                      <small>
                        Shop now →
                      </small>
                    </button>
                  )
                )}

              </div>

            </section>

            {/* PRODUCTS */}
            <section
              id="shop"
              className="content-section products-section"
            >

              <div className="section-heading">

                <div>
                  <span>
                    KIA FASHION STORE
                  </span>

                  <h2>
                    Best Sellers &{" "}
                    <em>Deals</em>
                  </h2>
                </div>

                <strong>
                  {filteredProducts.length} results
                </strong>

              </div>

              <div className="shop-toolbar">

                <span>
                  Showing products for you
                </span>

                <select
                  value={sort}
                  onChange={(event) =>
                    setSort(event.target.value)
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
                  <div className="no-products">
                    <h3>
                      No products found
                    </h3>

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

            {/* FESTIVE */}
            <section className="festive-banner">

              <div>

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
                  Rich colours, graceful drapes
                  and details designed for your
                  most memorable occasions.
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
              className="content-section"
            >

              <div className="section-heading">

                <div>
                  <span>
                    FOR KI & KIDDOS
                  </span>

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

              <div className="product-grid">

                {products
                  .filter(
                    (product) =>
                      product.category ===
                      "Kidswear"
                  )
                  .map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}

              </div>

            </section>

            {/* STYLE */}
            <section
              id="style-studio"
              className="style-section"
            >

              <div className="section-heading">

                <div>
                  <span>
                    KIA STYLE STUDIO
                  </span>

                  <h2>
                    Dress for{" "}
                    <em>the moment.</em>
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
                    alt="Wedding"
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
                    alt="Festival"
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
                    alt="Everyday"
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
              className="about-section"
            >

              <img
                src="/image/about-kia-fashion.jpg"
                alt="About Kia Fashion"
              />

              <div>

                <span>
                  OUR STORY
                </span>

                <h2>
                  Fashion for{" "}
                  <em>Ki & Kiddos.</em>
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
        </>
      )}

      {/* FOOTER */}
      <footer
        id="contact"
        className="site-footer"
      >

        <div>
          <h3>KIA FASHION</h3>
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
              scrollTo("style-studio")
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
                "Contact: hello@kiafashion.in"
              )
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
        © {new Date().getFullYear()} Kia Fashion.
        All rights reserved.
      </div>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() =>
            setCartOpen(false)
          }
        >

          <aside
            className="cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="cart-header">

              <div>
                <span>
                  KIA FASHION
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

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add something beautiful
                  from Kia Fashion.
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
                          {item.size || "M"}
                        </p>

                        <strong>
                          ₹
                          {item.price.toLocaleString()}
                        </strong>

                        <div className="quantity-controls">

                          <button
                            onClick={() =>
                              changeQuantity(
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
                              changeQuantity(
                                item.id,
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
                              item.id
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
                      Subtotal ({cartCount} items)
                    </span>

                    <strong>
                      ₹
                      {cartTotal.toLocaleString()}
                    </strong>
                  </div>

                  <p>
                    FREE Delivery available
                    on qualifying orders.
                  </p>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      alert(
                        "Checkout will be added next!"
                      )
                    }
                  >
                    Proceed to Checkout
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

    </div>
  );
}
