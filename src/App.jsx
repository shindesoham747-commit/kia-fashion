import { useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Elegant Silk Saree",
    price: 1999,
    oldPrice: 2499,
    category: "Sarees",
    type: "Silk",
    occasion: "Festival",
    ageGroup: "Women",
    rating: 4.8,
    reviews: 24,
    tag: "Bestseller",
    description:
      "Elegant silk saree perfect for festivals, family functions and special occasions.",
    image: "/image/saree1.jpg",
  },
  {
    id: 2,
    name: "Traditional Banarasi Saree",
    price: 2499,
    oldPrice: 3199,
    category: "Sarees",
    type: "Banarasi",
    occasion: "Wedding",
    ageGroup: "Women",
    rating: 4.9,
    reviews: 38,
    tag: "Premium",
    description:
      "Beautiful traditional Banarasi saree with a rich and elegant look.",
    image: "/image/saree2.jpg",
  },
  {
    id: 3,
    name: "Designer Party Saree",
    price: 2999,
    oldPrice: 3699,
    category: "Sarees",
    type: "Designer",
    occasion: "Party",
    ageGroup: "Women",
    rating: 4.7,
    reviews: 19,
    tag: "Trending",
    description:
      "A stylish designer saree perfect for parties and celebrations.",
    image: "/image/saree3.jpg",
  },
  {
    id: 4,
    name: "Georgette Saree",
    price: 1799,
    oldPrice: 2199,
    category: "Sarees",
    type: "Georgette",
    occasion: "Casual",
    ageGroup: "Women",
    rating: 4.6,
    reviews: 17,
    tag: "New",
    description:
      "Lightweight and comfortable georgette saree for everyday elegance.",
    image: "/image/saree4.jpg",
  },
  {
    id: 5,
    name: "Girls Party Dress",
    price: 1299,
    oldPrice: 1699,
    category: "Kids",
    type: "Party Wear",
    occasion: "Party",
    ageGroup: "6–8 Years",
    rating: 4.8,
    reviews: 31,
    tag: "Bestseller",
    description: "Cute and comfortable party dress for girls.",
    image: "/image/kids1.jpg",
  },
  {
    id: 6,
    name: "Kids Traditional Wear",
    price: 1499,
    oldPrice: 1899,
    category: "Kids",
    type: "Traditional",
    occasion: "Festival",
    ageGroup: "3–5 Years",
    rating: 4.9,
    reviews: 27,
    tag: "Premium",
    description:
      "Beautiful traditional outfit for festive occasions.",
    image: "/image/kids2.jpg",
  },
  {
    id: 7,
    name: "Kids Festive Dress",
    price: 1199,
    oldPrice: 1499,
    category: "Kids",
    type: "Festive",
    occasion: "Festival",
    ageGroup: "9–12 Years",
    rating: 4.7,
    reviews: 21,
    tag: "Trending",
    description:
      "Colorful festive outfit designed for little ones.",
    image: "/image/kids3.jpg",
  },
  {
    id: 8,
    name: "Kids Casual Outfit",
    price: 999,
    oldPrice: 1299,
    category: "Kids",
    type: "Casual",
    occasion: "Casual",
    ageGroup: "0–2 Years",
    rating: 4.6,
    reviews: 14,
    tag: "New",
    description:
      "Comfortable and stylish casual clothing for kids.",
    image: "/image/kids4.jpg",
  },
];

const occasions = ["All", "Wedding", "Party", "Festival", "Casual"];
const sareeTypes = ["All", "Silk", "Banarasi", "Designer", "Georgette"];
const ageGroups = ["All", "0–2 Years", "3–5 Years", "6–8 Years", "9–12 Years"];

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [occasion, setOccasion] = useState("All");
  const [sareeType, setSareeType] = useState("All");
  const [ageGroup, setAgeGroup] = useState("All");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [styleResults, setStyleResults] = useState(null);
  const [orderNumber, setOrderNumber] = useState("");
  const [toast, setToast] = useState("");
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

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__kiaToastTimer);
    window.__kiaToastTimer = window.setTimeout(() => setToast(""), 2400);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setRecentlyViewed((current) => [
      product,
      ...current.filter((item) => item.id !== product.id),
    ].slice(0, 4));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingLeft = Math.max(0, 2500 - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / 2500) * 100);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const text = `${product.name} ${product.category} ${product.type}`.toLowerCase();
      const searchMatch = text.includes(search.toLowerCase());
      const categoryMatch =
        category === "All" || product.category === category;
      const occasionMatch =
        occasion === "All" || product.occasion === occasion;
      const sareeMatch =
        category !== "Sarees" ||
        sareeType === "All" ||
        product.type === sareeType;
      const ageMatch =
        category !== "Kids" ||
        ageGroup === "All" ||
        product.ageGroup === ageGroup;

      return (
        searchMatch &&
        categoryMatch &&
        occasionMatch &&
        sareeMatch &&
        ageMatch &&
        product.price <= maxPrice
      );
    });

    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "newest") {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [
    search,
    category,
    occasion,
    sareeType,
    ageGroup,
    maxPrice,
    sort,
  ]);

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
    notify(`${product.name} added to your bag`);
  };

  const increaseQuantity = (id) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((current) => current.filter((item) => item.id !== id));
    notify("Item removed from your bag");
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((current) => current.filter((item) => item.id !== product.id));
      notify("Removed from wishlist");
    } else {
      setWishlist((current) => [...current, product]);
      notify("Added to wishlist");
    }
  };

  const isWishlisted = (id) => wishlist.some((item) => item.id === id);

  const openCategory = (value) => {
    setCategory(value);
    setSearch("");
    setSareeType("All");
    setAgeGroup("All");
    setTimeout(() => {
      document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setOccasion("All");
    setSareeType("All");
    setAgeGroup("All");
    setMaxPrice(5000);
    setSort("featured");
  };

  const handleCustomerChange = (e) => {
    setCustomer((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    const { name, email, phone, address, city, state, pin } = customer;

    if (!name || !email || !phone || !address || !city || !state || !pin) {
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

    const newOrderNumber = "KF" + Date.now().toString().slice(-6);
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
    setContactMessage("Thank you! Your message has been received.");
    e.target.reset();
  };

  const runStyleStudio = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const forWho = form.get("forWho");
    const selectedOccasion = form.get("styleOccasion");
    const budget = Number(form.get("budget"));

    const results = products.filter((product) => {
      const whoMatch =
        forWho === "Women"
          ? product.category === "Sarees"
          : product.category === "Kids";
      const occasionMatch =
        selectedOccasion === "All" || product.occasion === selectedOccasion;
      const budgetMatch = product.price <= budget;
      return whoMatch && occasionMatch && budgetMatch;
    });

    setStyleResults({
      forWho,
      occasion: selectedOccasion,
      budget,
      products: results,
    });
  };

  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <div className="announcement">
        <span>✦</span> Free shipping on orders above ₹2,500 <span>✦</span>
        <span className="announcement-hide"> | </span>
        <span className="announcement-hide">Easy shopping · Elegant fashion</span>
      </div>

      <header className="header">
        <a href="#home" className="logo-area">
          <img src="/image/logo.jpg" alt="Kia Fashion Logo" />
        </a>

        <div className="brand">
          <h1>Kia Fashion</h1>
          <p>Fashion for Ki & Kiddos</p>
        </div>

        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#shop">Shop</a>
          <a href="#collections">Collections</a>
          <a href="#style-studio">Style Studio</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="header-actions">
          <button
            className="icon-button"
            onClick={() => setShowWishlist(true)}
            title="Wishlist"
            aria-label="Wishlist"
          >
            ♡
            {wishlist.length > 0 && <span>{wishlist.length}</span>}
          </button>

          <button
            className="cart-button"
            onClick={() => setShowCart(true)}
            aria-label="Shopping cart"
          >
            🛒 <span className="cart-text">Cart</span>
            {cartCount > 0 && <span>({cartCount})</span>}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay" />
          <div className="hero-content">
            <span className="hero-kicker">THE NEW KIA COLLECTION</span>
            <h2>
              Elegance,
              <br />
              <em>reimagined.</em>
            </h2>
            <p>
              Discover graceful sarees and beautiful kidswear designed
              for moments worth remembering.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToShop}>
                Explore Collection <span>→</span>
              </button>
              <a className="ghost-button" href="#style-studio">
                Find Your Style
              </a>
            </div>
          </div>
          <div className="hero-scroll">SCROLL TO DISCOVER ↓</div>
        </section>

        <section className="trust-strip">
          <div><strong>01</strong><span>Curated Collections</span></div>
          <div><strong>02</strong><span>Made for Every Occasion</span></div>
          <div><strong>03</strong><span>Thoughtful Shopping Experience</span></div>
          <div><strong>04</strong><span>Free Shipping over ₹2,500</span></div>
        </section>

        <section className="collections-section" id="collections">
          <div className="section-heading left-heading">
            <div>
              <p className="section-label">CURATED FOR YOU</p>
              <h2>Shop by <em>collection</em></h2>
            </div>
            <button className="text-link" onClick={() => openCategory("All")}>
              View all products →
            </button>
          </div>

          <div className="collection-grid">
            <button
              className="collection-card collection-saree"
              onClick={() => openCategory("Sarees")}
            >
              <div className="collection-card-content">
                <span>01 / WOMEN</span>
                <h3>The Saree Edit</h3>
                <p>Silk, Banarasi, designer and more.</p>
                <b>Explore Sarees →</b>
              </div>
            </button>

            <button
              className="collection-card collection-kids"
              onClick={() => openCategory("Kids")}
            >
              <div className="collection-card-content">
                <span>02 / KIDS</span>
                <h3>Little Ones</h3>
                <p>Playful looks for every little celebration.</p>
                <b>Explore Kids →</b>
              </div>
            </button>
          </div>
        </section>

        <section className="studio-section" id="style-studio">
          <div className="studio-copy">
            <p className="section-label">KIA STYLE STUDIO</p>
            <h2>Find a look that feels <em>like you.</em></h2>
            <p>
              Tell us who you are shopping for, your occasion and your
              budget. We will curate the closest matches from the collection.
            </p>
          </div>

          <form className="studio-form" onSubmit={runStyleStudio}>
            <label>
              Shopping for
              <select name="forWho" defaultValue="Women">
                <option>Women</option>
                <option>Kids</option>
              </select>
            </label>

            <label>
              Occasion
              <select name="styleOccasion" defaultValue="All">
                {occasions.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label>
              Maximum budget
              <select name="budget" defaultValue="3000">
                <option value="1500">₹1,500</option>
                <option value="2000">₹2,000</option>
                <option value="3000">₹3,000</option>
                <option value="5000">₹5,000</option>
              </select>
            </label>

            <button className="primary-button" type="submit">
              Find My Style →
            </button>
          </form>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="section-label">THE COLLECTION</p>
              <h2>Pieces worth <em>discovering.</em></h2>
              <p className="section-description">
                Find something beautiful for every occasion.
              </p>
            </div>
            <div className="product-count">{filteredProducts.length} pieces</div>
          </div>

          <div className="shop-toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search sarees, kidswear..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button onClick={() => setSearch("")}>×</button>
              )}
            </div>

            <div className="toolbar-right">
              <button
                className="filter-toggle"
                onClick={() => setShowFilters((value) => !value)}
              >
                ☷ Filters
              </button>

              <select
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="rating">Top Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className={`filter-panel ${showFilters ? "filter-open" : ""}`}>
            <div className="filter-group">
              <span>Category</span>
              <div className="filter-pills">
                {["All", "Sarees", "Kids"].map((item) => (
                  <button
                    key={item}
                    className={category === item ? "active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-group">
              <span>Occasion</span>
              <div className="filter-pills">
                {occasions.map((item) => (
                  <button
                    key={item}
                    className={occasion === item ? "active" : ""}
                    onClick={() => setOccasion(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {category === "Sarees" && (
              <div className="filter-group">
                <span>Saree Type</span>
                <div className="filter-pills">
                  {sareeTypes.map((item) => (
                    <button
                      key={item}
                      className={sareeType === item ? "active" : ""}
                      onClick={() => setSareeType(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {category === "Kids" && (
              <div className="filter-group">
                <span>Age Group</span>
                <div className="filter-pills">
                  {ageGroups.map((item) => (
                    <button
                      key={item}
                      className={ageGroup === item ? "active" : ""}
                      onClick={() => setAgeGroup(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="filter-group price-filter">
              <span>Maximum Price: ₹{maxPrice.toLocaleString("en-IN")}</span>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <button className="clear-filter" onClick={clearFilters}>
              Clear all filters
            </button>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="no-results">
              <div>⌕</div>
              <h3>No pieces found</h3>
              <p>Try changing your search or filters.</p>
              <button className="primary-button" onClick={clearFilters}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div
                    className="product-image"
                    onClick={() => openProduct(product)}
                  >
                    <img src={product.image} alt={product.name} />
                    <span className="product-tag">{product.tag}</span>
                    <button
                      className={`wishlist ${isWishlisted(product.id) ? "active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                      aria-label="Wishlist"
                    >
                      {isWishlisted(product.id) ? "♥" : "♡"}
                    </button>
                    <div className="quick-view">Quick view →</div>
                  </div>

                  <div className="product-info">
                    <div className="product-meta">
                      <span>{product.category}</span>
                      <span>★ {product.rating}</span>
                    </div>
                    <h3>{product.name}</h3>
                    <div className="rating-line">
                      <span className="stars">★★★★★</span>
                      <span>({product.reviews})</span>
                    </div>
                    <div className="price-row">
                      <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                      <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
                      <span className="discount">
                        {Math.round(
                          ((product.oldPrice - product.price) /
                            product.oldPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    </div>
                    <div className="product-buttons">
                      <button
                        className="details-button"
                        onClick={() => openProduct(product)}
                      >
                        Quick View
                      </button>
                      <button
                        className="add-button"
                        onClick={() => addToCart(product)}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="editorial-section">
          <div className="editorial-copy">
            <p className="section-label">THE KIA EDIT</p>
            <h2>Designed for moments that <em>matter.</em></h2>
            <p>
              From intimate celebrations to family festivals, discover
              thoughtfully selected pieces that make dressing up feel effortless.
            </p>
            <button className="text-link" onClick={() => openCategory("Sarees")}>
              Explore the Saree Edit →
            </button>
          </div>
          <div className="editorial-stats">
            <div><strong>08</strong><span>Curated pieces</span></div>
            <div><strong>04</strong><span>Occasion edits</span></div>
            <div><strong>∞</strong><span>Ways to style</span></div>
          </div>
        </section>

        {recentlyViewed.length > 0 && (
          <section className="recent-section">
            <div className="section-heading">
              <div>
                <p className="section-label">JUST FOR YOU</p>
                <h2>Recently <em>viewed.</em></h2>
              </div>
            </div>
            <div className="mini-product-grid">
              {recentlyViewed.map((product) => (
                <button
                  className="mini-product"
                  key={product.id}
                  onClick={() => openProduct(product)}
                >
                  <img src={product.image} alt={product.name} />
                  <div>
                    <span>{product.category}</span>
                    <h3>{product.name}</h3>
                    <strong>₹{product.price.toLocaleString("en-IN")}</strong>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className="about-section" id="about">
          <div className="about-content">
            <p className="section-label">OUR STORY</p>
            <h2>Fashion for <em>Ki & Kiddos.</em></h2>
            <p>
              Kia Fashion is a fashion destination created for women and kids
              who love beautiful, comfortable and stylish clothing.
            </p>
            <p>
              Our collection brings together traditional elegance and modern
              fashion, with a simple shopping experience at its heart.
            </p>
            <div className="about-features">
              <div><span>01</span><strong>Curated</strong><small>Handpicked styles</small></div>
              <div><span>02</span><strong>Versatile</strong><small>For every occasion</small></div>
              <div><span>03</span><strong>Thoughtful</strong><small>Designed for families</small></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-heading">
            <p className="section-label">GET IN TOUCH</p>
            <h2>Let's talk <em>fashion.</em></h2>
            <p>Have a question? We'd love to hear from you.</p>
          </div>

          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-card">
                <span>EMAIL</span>
                <strong>kiafashion@example.com</strong>
              </div>
              <div className="contact-card">
                <span>PHONE</span>
                <strong>+91 98765 43210</strong>
              </div>
              <div className="contact-card">
                <span>LOCATION</span>
                <strong>Maharashtra, India</strong>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required />
              <button type="submit" className="primary-button">
                Send Message →
              </button>
              {contactMessage && (
                <p className="contact-success">{contactMessage}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h2>Kia Fashion</h2>
            <p>Fashion for Ki & Kiddos</p>
            <p>Elegant fashion for every occasion.</p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="#home">Home</a>
            <a href="#shop">Shop</a>
            <a href="#collections">Collections</a>
            <a href="#style-studio">Style Studio</a>
          </div>
          <div>
            <h3>Categories</h3>
            <button onClick={() => openCategory("Sarees")}>Sarees</button>
            <button onClick={() => openCategory("Kids")}>Kids Fashion</button>
            <button onClick={() => openCategory("All")}>New Collection</button>
          </div>
          <div>
            <h3>Shopping</h3>
            <button onClick={() => setShowWishlist(true)}>Wishlist</button>
            <button onClick={() => setShowCart(true)}>Shopping Bag</button>
            <a href="#contact">Need Help?</a>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 Kia Fashion. All Rights Reserved.</span>
          <span>Made with care for Ki & Kiddos.</span>
        </div>
      </footer>

      {styleResults && (
        <div className="modal-overlay">
          <div className="style-results-modal">
            <button className="modal-close" onClick={() => setStyleResults(null)}>✕</button>
            <p className="section-label">YOUR STYLE MATCH</p>
            <h2>Curated <em>for you.</em></h2>
            <p>
              {styleResults.forWho} · {styleResults.occasion} · up to ₹
              {styleResults.budget.toLocaleString("en-IN")}
            </p>

            {styleResults.products.length ? (
              <div className="style-results-grid">
                {styleResults.products.map((product) => (
                  <button
                    key={product.id}
                    className="style-result-card"
                    onClick={() => {
                      setStyleResults(null);
                      openProduct(product);
                    }}
                  >
                    <img src={product.image} alt={product.name} />
                    <strong>{product.name}</strong>
                    <span>₹{product.price.toLocaleString("en-IN")}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="no-results compact">
                <div>♡</div>
                <h3>No exact match yet</h3>
                <p>Try a wider budget or another occasion.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="modal-overlay">
          <div className="product-modal">
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="modal-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <span className="product-tag">{selectedProduct.tag}</span>
            </div>
            <div className="modal-info">
              <span className="modal-category">{selectedProduct.category} · {selectedProduct.type}</span>
              <h2>{selectedProduct.name}</h2>
              <div className="modal-rating">
                <span className="stars">★★★★★</span>
                <strong>{selectedProduct.rating}</strong>
                <span>({selectedProduct.reviews} reviews)</span>
              </div>
              <div className="modal-price">
                <strong>₹{selectedProduct.price.toLocaleString("en-IN")}</strong>
                <del>₹{selectedProduct.oldPrice.toLocaleString("en-IN")}</del>
              </div>
              <p>{selectedProduct.description}</p>
              <div className="detail-tags">
                <span>✦ {selectedProduct.occasion}</span>
                <span>✦ Curated collection</span>
                <span>✦ Easy shopping</span>
              </div>
              <div className="modal-actions">
                <button
                  className="add-button large"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                    setShowCart(true);
                  }}
                >
                  Add to Bag
                </button>
                <button
                  className={`modal-wishlist ${isWishlisted(selectedProduct.id) ? "active" : ""}`}
                  onClick={() => toggleWishlist(selectedProduct)}
                >
                  {isWishlisted(selectedProduct.id) ? "♥ Saved" : "♡ Save"}
                </button>
              </div>
              <div className="recommendation-note">
                <strong>You may also like</strong>
                <div className="recommendation-row">
                  {products
                    .filter((item) => item.id !== selectedProduct.id && item.category === selectedProduct.category)
                    .slice(0, 3)
                    .map((item) => (
                      <button key={item.id} onClick={() => openProduct(item)}>
                        <img src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showWishlist && (
        <div className="side-overlay">
          <div className="side-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">SAVED PIECES</span>
                <h2>My Wishlist</h2>
              </div>
              <button onClick={() => setShowWishlist(false)}>✕</button>
            </div>

            {wishlist.length === 0 ? (
              <div className="empty-state">
                <div>♡</div>
                <h3>Your wishlist is empty</h3>
                <p>Save pieces you love and find them here later.</p>
              </div>
            ) : (
              <div className="wishlist-list">
                {wishlist.map((item) => (
                  <div className="wishlist-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <span>{item.category}</span>
                      <h3>{item.name}</h3>
                      <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                      <button onClick={() => addToCart(item)}>Add to Bag</button>
                      <button className="remove-link" onClick={() => toggleWishlist(item)}>
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

      {showCart && (
        <div className="side-overlay">
          <div className="side-panel cart-panel">
            <div className="panel-header">
              <div>
                <span className="panel-kicker">{cartCount} ITEM{cartCount !== 1 ? "S" : ""}</span>
                <h2>Shopping Bag</h2>
              </div>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-state">
                <div>🛍</div>
                <h3>Your bag is waiting</h3>
                <p>Add something beautiful from the collection.</p>
                <button className="primary-button" onClick={() => {
                  setShowCart(false);
                  scrollToShop();
                }}>
                  Shop Collection →
                </button>
              </div>
            ) : (
              <>
                <div className="shipping-progress">
                  {shippingLeft > 0 ? (
                    <p>Add <strong>₹{shippingLeft.toLocaleString("en-IN")}</strong> more for free shipping.</p>
                  ) : (
                    <p><strong>You've unlocked free shipping ✦</strong></p>
                  )}
                  <div><span style={{ width: `${shippingProgress}%` }} /></div>
                </div>

                <div className="cart-list">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-info">
                        <span>{item.category}</span>
                        <h3>{item.name}</h3>
                        <strong>₹{item.price.toLocaleString("en-IN")}</strong>
                        <div className="quantity">
                          <button onClick={() => decreaseQuantity(item.id)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>
                        <button className="remove-link" onClick={() => removeFromCart(item.id)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-bottom">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
                  </div>
                  <p className="cart-note">Taxes and delivery calculated at checkout.</p>
                  <button
                    className="checkout-button"
                    onClick={() => {
                      setShowCart(false);
                      setShowCheckout(true);
                    }}
                  >
                    Proceed to Checkout →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showCheckout && (
        <div className="modal-overlay">
          <div className="checkout-modal">
            <button className="modal-close" onClick={() => setShowCheckout(false)}>✕</button>
            <div className="checkout-header">
              <p className="section-label">SECURE CHECKOUT</p>
              <h2>Complete your <em>order.</em></h2>
            </div>

            <form onSubmit={placeOrder}>
              <h3>Customer Details</h3>
              <div className="form-grid">
                <input name="name" placeholder="Full Name" value={customer.name} onChange={handleCustomerChange} required />
                <input type="email" name="email" placeholder="Email Address" value={customer.email} onChange={handleCustomerChange} required />
                <input type="tel" name="phone" placeholder="10-digit Phone Number" value={customer.phone} onChange={handleCustomerChange} maxLength="10" required />
              </div>

              <h3>Delivery Address</h3>
              <textarea name="address" placeholder="Full Address" value={customer.address} onChange={handleCustomerChange} required />
              <div className="form-grid">
                <input name="city" placeholder="City" value={customer.city} onChange={handleCustomerChange} required />
                <input name="state" placeholder="State" value={customer.state} onChange={handleCustomerChange} required />
                <input name="pin" placeholder="6-digit PIN Code" value={customer.pin} onChange={handleCustomerChange} maxLength="6" required />
              </div>

              <h3>Payment Method</h3>
              <label className="payment-option">
                <input type="radio" name="payment" defaultChecked />
                <span>Cash on Delivery</span>
                <small>Available now</small>
              </label>
              <label className="payment-option disabled">
                <input type="radio" name="payment" disabled />
                <span>Online Payment</span>
                <small>Coming Soon</small>
              </label>

              <div className="checkout-summary">
                <span>Order Total</span>
                <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
              </div>

              <button className="place-order" type="submit">
                Place Order →
              </button>
            </form>
          </div>
        </div>
      )}

      {orderNumber && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="success-icon">✓</div>
            <p className="section-label">ORDER RECEIVED</p>
            <h2>Thank you for <em>shopping.</em></h2>
            <p>Your order has been successfully received.</p>
            <div className="order-number">Order #{orderNumber}</div>
            <button className="primary-button" onClick={() => {
              setOrderNumber("");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}>
              Continue Shopping →
            </button>
          </div>
        </div>
      )}

      {toast && <div className="toast">{toast} <span>✓</span></div>}

      <button
        className="back-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
}

export default App;
