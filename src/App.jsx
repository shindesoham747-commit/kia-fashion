import React, { useState } from "react";
import "./App.css";

const sarees = [
  ["The Rose Silk Saree", "₹3,499", "/image/saree1.jpg"],
  ["Emerald Banarasi Saree", "₹4,299", "/image/saree2.jpg"],
  ["Festive Pink Saree", "₹2,999", "/image/saree3.jpg"],
  ["Royal Party Saree", "₹3,899", "/image/saree4.jpg"]
];

const kids = [
  ["Little Celebration", "₹1,599", "/image/kids1.jpg"],
  ["Little Festive Edit", "₹1,899", "/image/kids2.jpg"],
  ["Classic Kidswear", "₹1,399", "/image/kids3.jpg"],
  ["Party Day Look", "₹1,699", "/image/kids4.jpg"]
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState(0);
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth"
    });
    setMenu(false);
  };

  // ADD PRODUCT TO CART
  const addToCart = (item, type) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (product) => product.name === item[0]
      );

      if (existing) {
        return currentCart.map((product) =>
          product.name === item[0]
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }

      return [
        ...currentCart,
        {
          name: item[0],
          price: item[1],
          image: item[2],
          type: type,
          quantity: 1
        }
      ];
    });

    setCartOpen(true);
  };

  // INCREASE QUANTITY
  const increaseQuantity = (name) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (name) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE PRODUCT
  const removeFromCart = (name) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.name !== name)
    );
  };

  // TOTAL ITEMS
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // TOTAL PRICE
  const totalPrice = cart.reduce((total, item) => {
    const price = Number(item.price.replace(/[₹,]/g, ""));
    return total + price * item.quantity;
  }, 0);

  const formatPrice = (price) => {
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const Card = ({ item, type }) => (
    <article className="product">
      <div className="product-image">
        <img src={item[2]} alt={item[0]} />

        <button
          className="heart"
          onClick={() => setWishlist((value) => value + 1)}
        >
          ♡
        </button>

        <button
          className="quick"
          onClick={() => setPreview(item[2])}
        >
          Quick view
        </button>
      </div>

      <div className="product-info">
        <span>{type}</span>

        <h3>{item[0]}</h3>

        <strong>{item[1]}</strong>

        <button onClick={() => addToCart(item, type)}>
          Add to bag
        </button>
      </div>
    </article>
  );

  return (
    <div className="kia-page">

      {/* ANNOUNCEMENT */}
      <div className="announcement">
        FREE SHIPPING ON ORDERS OVER ₹2,500
        &nbsp; • &nbsp;
        EASY RETURNS
        &nbsp; • &nbsp;
        COD AVAILABLE
      </div>

      {/* HEADER */}
      <header className="header">

        <button
          className="mobile-menu"
          onClick={() => setMenu(!menu)}
        >
          ☰
        </button>

        <button
          className="logo"
          onClick={() => scrollTo("home")}
        >
          <span>KIA FASHION</span>
          <small>Fashion for Ki & Kiddos</small>
        </button>

        <nav className={menu ? "nav open" : "nav"}>
          {[
            ["Home", "home"],
            ["Shop", "shop"],
            ["Collections", "collections"],
            ["Style Studio", "style-studio"],
            ["About", "about"],
            ["Contact", "contact"]
          ].map(([name, id]) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
            >
              {name}
            </button>
          ))}
        </nav>

        <div className="header-actions">

          <button
            onClick={() => setWishlist((value) => value + 1)}
          >
            ♡
            <sup>{wishlist}</sup>
          </button>

          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
          >
            🛒
            <span>Cart</span>
            <sup>{totalItems}</sup>
          </button>

        </div>
      </header>

      <main>

        {/* HERO */}
        <section id="home" className="hero">

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
              Discover graceful sarees and beautiful kidswear
              designed for moments worth remembering.
            </p>

            <div className="hero-buttons">

              <button
                className="button dark"
                onClick={() => scrollTo("collections")}
              >
                Explore Collection →
              </button>

              <button
                className="button light"
                onClick={() => scrollTo("style-studio")}
              >
                Find Your Style
              </button>

            </div>

            <button
              className="scroll-cue"
              onClick={() => scrollTo("highlights")}
            >
              SCROLL TO DISCOVER ↓
            </button>

          </div>

          <div className="hero-image">

            <img
              src="/image/hero-saree.jpg"
              alt="Kia Fashion saree collection"
            />

            <div className="hero-caption">
              <span>01</span>
              <strong>The New Edit</strong>
            </div>

          </div>

        </section>

        {/* HIGHLIGHTS */}
        <section id="highlights" className="highlights">

          {[
            ["01", "Curated", "Collections"],
            ["02", "Made for", "Every Occasion"],
            ["03", "Thoughtful Shopping", "Experience"],
            ["04", "Free Shipping", "over ₹2,500"]
          ].map((item) => (
            <div key={item[0]}>
              <b>{item[0]}</b>
              <span>
                {item[1]}
                <br />
                {item[2]}
              </span>
            </div>
          ))}

        </section>

        {/* COLLECTIONS */}
        <section id="collections" className="section">

          <div className="section-top">

            <div>
              <span className="kicker">
                CURATED FOR YOU
              </span>

              <h2>
                Shop by <em>collection</em>
              </h2>
            </div>

            <button onClick={() => scrollTo("shop")}>
              View all products →
            </button>

          </div>

          <div className="featured-collection">

            <div className="collection-copy">

              <span>01 / WOMEN</span>

              <h3>The Saree Edit</h3>

              <div className="line" />

              <p>
                Silk, Banarasi, designer and more.
              </p>

              <button onClick={() => scrollTo("shop")}>
                Explore Sarees →
              </button>

            </div>

            <div className="collection-images">

              {sarees.map((item) => (
                <button
                  key={item[0]}
                  onClick={() => setPreview(item[2])}
                >
                  <img src={item[2]} alt={item[0]} />
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
              <em>that stay with you.</em>
            </h2>

            <p>
              Rich colours, graceful drapes and details designed
              for your most memorable occasions.
            </p>

            <button
              className="button dark"
              onClick={() => scrollTo("shop")}
            >
              Explore Festive →
            </button>

          </div>

        </section>

        {/* SHOP */}
        <section id="shop" className="section shop">

          <div className="section-top">

            <div>
              <span className="kicker">
                THE COLLECTION
              </span>

              <h2>
                Signature <em>styles</em>
              </h2>
            </div>

            <p>
              Thoughtfully selected pieces from the Kia Fashion
              wardrobe.
            </p>

          </div>

          <div className="product-grid">

            {sarees.map((item) => (
              <Card
                key={item[0]}
                item={item}
                type="WOMEN / SAREES"
              />
            ))}

          </div>

        </section>

        {/* KIDS BANNER */}
        <section className="kids-banner">

          <div className="kids-copy">

            <span className="kicker">
              FOR KI & KIDDOS
            </span>

            <h2>
              Little style,
              <br />
              <em>big moments.</em>
            </h2>

            <p>
              Playful silhouettes and comfortable festive looks
              made for little personalities.
            </p>

            <button
              className="button light"
              onClick={() => scrollTo("kids")}
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

        {/* KIDS */}
        <section id="kids" className="section">

          <div className="section-top">

            <div>
              <span className="kicker">
                LITTLE STYLE
              </span>

              <h2>
                Made for <em>little moments</em>
              </h2>
            </div>

          </div>

          <div className="product-grid">

            {kids.map((item) => (
              <Card
                key={item[0]}
                item={item}
                type="KIDSWEAR"
              />
            ))}

          </div>

        </section>

        {/* STYLE STUDIO */}
        <section id="style-studio" className="style-studio">

          <div className="studio-heading">

            <span className="kicker">
              KIA STYLE STUDIO
            </span>

            <h2>
              Dress for
              <br />
              <em>the moment.</em>
            </h2>

          </div>

          <div className="studio-cards">

            {[
              ["wedding-edit.jpg", "Wedding"],
              ["festive-collection.jpg", "Festival"],
              ["everyday-edit.jpg", "Everyday"]
            ].map((item) => (
              <button
                key={item[1]}
                onClick={() => scrollTo("shop")}
              >
                <img
                  src={`/image/${item[0]}`}
                  alt={item[1]}
                />

                <span>{item[1]}</span>
              </button>
            ))}

          </div>

        </section>

        {/* ABOUT */}
        <section id="about" className="about">

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
              Fashion for <em>Ki & Kiddos.</em>
            </h2>

            <p>
              Kia Fashion brings elegant Indian fashion and
              joyful kidswear together in a warm, modern
              shopping experience.
            </p>

            <p>
              We believe beautiful fashion should feel effortless,
              personal and memorable — whether it is a wedding,
              festival or everyday moment.
            </p>

            <button
              className="button dark"
              onClick={() => scrollTo("contact")}
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

          <span>KIA FASHION</span>

          <p>
            Fashion for Ki & Kiddos.
          </p>

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

          <p>Easy returns · COD available</p>

          <p>Free shipping over ₹2,500</p>

        </div>

      </footer>

      <div className="copyright">
        © {new Date().getFullYear()} Kia Fashion.
        All rights reserved.
      </div>

      {/* IMAGE MODAL */}
      {preview && (
        <div
          className="image-modal"
          onClick={() => setPreview(null)}
        >

          <button
            onClick={() => setPreview(null)}
          >
            ×
          </button>

          <img
            src={preview}
            alt="Kia Fashion preview"
            onClick={(event) => event.stopPropagation()}
          />

        </div>
      )}

      {/* CART OVERLAY */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          
          {/* CART DRAWER */}
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="cart-header">

              <div>
                <span className="kicker">
                  YOUR SELECTION
                </span>

                <h2>
                  Shopping <em>Bag</em>
                </h2>
              </div>

              <button
                className="cart-close"
                onClick={() => setCartOpen(false)}
              >
                ×
              </button>

            </div>

            {/* EMPTY CART */}
            {cart.length === 0 ? (
              <div className="empty-cart">

                <div className="empty-cart-icon">
                  🛍️
                </div>

                <h3>Your bag is empty</h3>

                <p>
                  Discover something beautiful from
                  the Kia Fashion collection.
                </p>

                <button
                  className="button dark"
                  onClick={() => {
                    setCartOpen(false);
                    scrollTo("shop");
                  }}
                >
                  Explore Collection →
                </button>

              </div>
            ) : (

              <>
                {/* CART PRODUCTS */}
                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={item.name}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="cart-item-info">

                        <span>{item.type}</span>

                        <h3>{item.name}</h3>

                        <strong>{item.price}</strong>

                        <div className="quantity-row">

                          <div className="quantity">

                            <button
                              onClick={() =>
                                decreaseQuantity(item.name)
                              }
                            >
                              −
                            </button>

                            <span>
                              {item.quantity}
                            </span>

                            <button
                              onClick={() =>
                                increaseQuantity(item.name)
                              }
                            >
                              +
                            </button>

                          </div>

                          <button
                            className="remove"
                            onClick={() =>
                              removeFromCart(item.name)
                            }
                          >
                            Remove
                          </button>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

                {/* CART SUMMARY */}
                <div className="cart-summary">

                  <div className="summary-row">
                    <span>Subtotal</span>
                    <strong>
                      {formatPrice(totalPrice)}
                    </strong>
                  </div>

                  <div className="summary-row">
                    <span>Shipping</span>
                    <strong>
                      {totalPrice >= 2500
                        ? "FREE"
                        : "₹99"}
                    </strong>
                  </div>

                  <div className="summary-line" />

                  <div className="summary-row total">
                    <span>Total</span>

                    <strong>
                      {formatPrice(
                        totalPrice >= 2500
                          ? totalPrice
                          : totalPrice + 99
                      )}
                    </strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={() =>
                      alert(
                        "Thank you for shopping with Kia Fashion! Checkout will be available soon."
                      )
                    }
                  >
                    Proceed to Checkout →
                  </button>

                  <p className="cart-note">
                    🔒 Secure shopping · COD available
                  </p>

                </div>

              </>
            )}

          </aside>

        </div>
      )}

    </div>
  );
}
