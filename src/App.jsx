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
  const [cart, setCart] = useState(0);
  const [wishlist, setWishlist] = useState(0);
  const [menu, setMenu] = useState(false);
  const [preview, setPreview] = useState(null);
  const scrollTo = id => { document.getElementById(id)?.scrollIntoView({behavior:"smooth"}); setMenu(false); };
  const Card = ({item, type}) => <article className="product"><div className="product-image"><img src={item[2]} alt={item[0]} /><button className="heart" onClick={()=>setWishlist(v=>v+1)}>♡</button><button className="quick" onClick={()=>setPreview(item[2])}>Quick view</button></div><div className="product-info"><span>{type}</span><h3>{item[0]}</h3><strong>{item[1]}</strong><button onClick={()=>setCart(v=>v+1)}>Add to bag</button></div></article>;

  return <div className="kia-page">
    <div className="announcement">FREE SHIPPING ON ORDERS OVER ₹2,500 &nbsp; • &nbsp; EASY RETURNS &nbsp; • &nbsp; COD AVAILABLE</div>
    <header className="header">
      <button className="mobile-menu" onClick={()=>setMenu(!menu)}>☰</button>
      <button className="logo" onClick={()=>scrollTo("home")}><span>KIA FASHION</span><small>Fashion for Ki & Kiddos</small></button>
      <nav className={menu?"nav open":"nav"}>{[["Home","home"],["Shop","shop"],["Collections","collections"],["Style Studio","style-studio"],["About","about"],["Contact","contact"]].map(([x,id])=><button key={id} onClick={()=>scrollTo(id)}>{x}</button>)}</nav>
      <div className="header-actions"><button onClick={()=>setWishlist(v=>v+1)}>♡<sup>{wishlist}</sup></button><button className="cart-button" onClick={()=>scrollTo("shop")}>🛒 <span>Cart</span><sup>{cart}</sup></button></div>
    </header>

    <main>
      <section id="home" className="hero"><div className="hero-content"><span className="kicker">THE NEW KIA COLLECTION</span><h1>Elegance,<br/><em>reimagined.</em></h1><p>Discover graceful sarees and beautiful kidswear designed for moments worth remembering.</p><div className="hero-buttons"><button className="button dark" onClick={()=>scrollTo("collections")}>Explore Collection →</button><button className="button light" onClick={()=>scrollTo("style-studio")}>Find Your Style</button></div><button className="scroll-cue" onClick={()=>scrollTo("highlights")}>SCROLL TO DISCOVER ↓</button></div><div className="hero-image"><img src="/image/hero-saree.jpg" alt="Kia Fashion saree collection"/><div className="hero-caption"><span>01</span><strong>The New Edit</strong></div></div></section>

      <section id="highlights" className="highlights">{[["01","Curated","Collections"],["02","Made for","Every Occasion"],["03","Thoughtful Shopping","Experience"],["04","Free Shipping","over ₹2,500"]].map(x=><div key={x[0]}><b>{x[0]}</b><span>{x[1]}<br/>{x[2]}</span></div>)}</section>

      <section id="collections" className="section"><div className="section-top"><div><span className="kicker">CURATED FOR YOU</span><h2>Shop by <em>collection</em></h2></div><button onClick={()=>scrollTo("shop")}>View all products →</button></div><div className="featured-collection"><div className="collection-copy"><span>01 / WOMEN</span><h3>The Saree Edit</h3><div className="line"/><p>Silk, Banarasi, designer and more.</p><button onClick={()=>scrollTo("shop")}>Explore Sarees →</button></div><div className="collection-images">{sarees.map(x=><button key={x[0]} onClick={()=>setPreview(x[2])}><img src={x[2]} alt={x[0]}/></button>)}</div></div></section>

      <section className="split-banner"><div className="split-image"><img src="/image/festive-collection.jpg" alt="Festive collection"/></div><div className="split-copy"><span className="kicker">THE FESTIVE EDIT</span><h2>For celebrations<br/><em>that stay with you.</em></h2><p>Rich colours, graceful drapes and details designed for your most memorable occasions.</p><button className="button dark" onClick={()=>scrollTo("shop")}>Explore Festive →</button></div></section>

      <section id="shop" className="section shop"><div className="section-top"><div><span className="kicker">THE COLLECTION</span><h2>Signature <em>styles</em></h2></div><p>Thoughtfully selected pieces from the Kia Fashion wardrobe.</p></div><div className="product-grid">{sarees.map(x=><Card key={x[0]} item={x} type="WOMEN / SAREES"/>)}</div></section>

      <section className="kids-banner"><div className="kids-copy"><span className="kicker">FOR KI & KIDDOS</span><h2>Little style,<br/><em>big moments.</em></h2><p>Playful silhouettes and comfortable festive looks made for little personalities.</p><button className="button light" onClick={()=>scrollTo("kids")}>Explore Kidswear →</button></div><div className="kids-image"><img src="/image/hero-kids.jpg" alt="Kia Fashion kidswear"/></div></section>

      <section id="kids" className="section"><div className="section-top"><div><span className="kicker">LITTLE STYLE</span><h2>Made for <em>little moments</em></h2></div></div><div className="product-grid">{kids.map(x=><Card key={x[0]} item={x} type="KIDSWEAR"/>)}</div></section>

      <section id="style-studio" className="style-studio"><div className="studio-heading"><span className="kicker">KIA STYLE STUDIO</span><h2>Dress for<br/><em>the moment.</em></h2></div><div className="studio-cards">{[["wedding-edit.jpg","Wedding"],["festive-collection.jpg","Festival"],["everyday-edit.jpg","Everyday"]].map(x=><button key={x[1]} onClick={()=>scrollTo("shop")}><img src={`/image/${x[0]}`} alt={x[1]}/><span>{x[1]}</span></button>)}</div></section>

      <section id="about" className="about"><div className="about-image"><img src="/image/about-kia-fashion.jpg" alt="About Kia Fashion"/></div><div className="about-copy"><span className="kicker">OUR STORY</span><h2>Fashion for <em>Ki & Kiddos.</em></h2><p>Kia Fashion brings elegant Indian fashion and joyful kidswear together in a warm, modern shopping experience.</p><p>We believe beautiful fashion should feel effortless, personal and memorable — whether it is a wedding, festival or everyday moment.</p><button className="button dark" onClick={()=>scrollTo("contact")}>Discover Kia Fashion →</button></div></section>

      <section className="newsletter"><span className="kicker">JOIN THE KIA COMMUNITY</span><h2>Something beautiful<br/><em>is always coming.</em></h2><p>Sign up for new collections, styling inspiration and special offers.</p><div className="newsletter-form"><input type="email" placeholder="Your email address"/><button onClick={()=>alert("Thank you for joining Kia Fashion!")}>Subscribe →</button></div></section>
    </main>

    <footer id="contact" className="footer"><div className="footer-brand"><span>KIA FASHION</span><p>Fashion for Ki & Kiddos.</p></div><div><h4>Shop</h4><button onClick={()=>scrollTo("shop")}>Sarees</button><button onClick={()=>scrollTo("kids")}>Kidswear</button><button onClick={()=>scrollTo("collections")}>Collections</button></div><div><h4>Explore</h4><button onClick={()=>scrollTo("style-studio")}>Style Studio</button><button onClick={()=>scrollTo("about")}>Our Story</button><button onClick={()=>alert("Contact: hello@kiafashion.in")}>Contact</button></div><div><h4>Customer Care</h4><p>Mon–Sat, 10 AM–6 PM</p><p>Easy returns · COD available</p><p>Free shipping over ₹2,500</p></div></footer>
    <div className="copyright">© {new Date().getFullYear()} Kia Fashion. All rights reserved.</div>
    {preview && <div className="image-modal" onClick={()=>setPreview(null)}><button onClick={()=>setPreview(null)}>×</button><img src={preview} alt="Kia Fashion preview"/></div>}
  </div>;
}
