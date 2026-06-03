import { useNavigate } from "react-router-dom";
import { useState } from "react";
import p1 from "../../assets/p-1.webp";
import p2 from "../../assets/p-2.webp";
import p3 from "../../assets/p-3.webp";
import p4 from "../../assets/p-4.webp";
import p5 from "../../assets/p-5.webp";
import p6 from "../../assets/p-6.webp";

import weddingplanners from "../../assets/wedding-planners.webp";
import CorporateEvents from "../../assets/Corporate-Events.webp";
import BirthdayConcerts from "../../assets/Birthday-concerts.webp";
import concertshows from "../../assets/Concert-shows.webp";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.message
    ) {
      alert("Please fill all fields");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <>

      {/* HERO */}
      <section className="hero">
        <h1>Create Unforgettable Events</h1>

        <p>
          From luxury weddings to corporate conferences,
          Eventify transforms your ideas into extraordinary
          experiences with flawless execution.
        </p>

        <button onClick={() => navigate("/book-event")}>
          Book Event
        </button>
      </section>

      {/* ABOUT */}
      <section className="about">
        <h2>About Eventify</h2>

        <p>
          Eventify is a premium event management company
          specializing in weddings, corporate events,
          birthday celebrations, concerts, product launches,
          and luxury gatherings. We focus on creativity,
          precision, and unforgettable experiences.
        </p>

        <button onClick={() => navigate("/about-us")}>
          Learn More
        </button>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>Our Services</h2>

        <div className="service-grid">
          <div className="service-card">
            <img
              src={weddingplanners}
              alt="Wedding-Planners"
            />
            <h3>Wedding Planning</h3>
            <p>
              Luxury wedding planning with beautiful
              decorations and seamless coordination.
            </p>
          </div>

          <div className="service-card">
            <img
              src={CorporateEvents}
              alt="Corporate-Events"
            />
            <h3>Corporate Events</h3>
            <p>
              Professional conferences, seminars,
              and business gatherings.
            </p>
          </div>

          <div className="service-card">
            <img
              src={BirthdayConcerts}
              alt="Birthday-concerts"
            />
            <h3>Birthday Celebrations</h3>
            <p>
              Creative themes and memorable birthday
              experiences for all ages.
            </p>
          </div>

          <div className="service-card">
            <img
              src={concertshows}
              alt="Concerts-Shows"
            />
            <h3>Concerts & Shows</h3>
            <p>
              Large-scale entertainment events with
              professional management.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="pricing">
        <h2>Event Packages</h2>

        <div className="pricing-grid">
          <div className="price-card">
            <h3>Basic</h3>
            <h1>₹25,000</h1>
            <p>Small Gatherings</p>

            <button
              onClick={() => navigate("/basic-package")}
            >
              Select Plan
            </button>
          </div>

          <div className="price-card popular">
            <h3>Premium</h3>
            <h1>₹75,000</h1>
            <p>Weddings & Corporate Events</p>

            <button
              onClick={() => navigate("/premium-package")}
            >
              Select Plan
            </button>
          </div>

          <div className="price-card">
            <h3>Elite</h3>
            <h1>₹1,50,000+</h1>
            <p>Luxury & Grand Events</p>

            <button
              onClick={() => navigate("/elite-package")}
            >
              Select Plan
            </button>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="why-us">
        <h2>Why Choose Us</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>500+ Events</h3>
            <p>Successfully organized events.</p>
          </div>

          <div className="why-card">
            <h3>Expert Team</h3>
            <p>Professional planners and coordinators.</p>
          </div>

          <div className="why-card">
            <h3>24/7 Support</h3>
            <p>Dedicated customer assistance.</p>
          </div>

          <div className="why-card">
            <h3>100% Satisfaction</h3>
            <p>Trusted by hundreds of clients.</p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
<section className="gallery">
        <h2>Event Gallery</h2>

        <div className="gallery-grid">
          <img src={p1} alt="Wedding" />
          <img src={p2} alt="Concert" />
          <img src={p3} alt="Event" />
          <img src={p4} alt="Corporate" />
          <img src={p5} alt="Birthday" />
          <img src={p6} alt="Wedding Hall" />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>Client Testimonials</h2>

        <div className="testimonial-grid">
          <div className="testimonial-card">
            <p>
              "Eventify made our wedding magical.
              Every detail was perfectly managed."
            </p>

            <h4>★★★★★</h4>
            <span>Rahul & Priya</span>
          </div>

          <div className="testimonial-card">
            <p>
              "Professional team and excellent
              execution of our annual conference."
            </p>

            <h4>★★★★★</h4>
            <span>ABC Technologies</span>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <h2>Reach Out To Us</h2>

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Tell us about your event..."
            value={formData.message}
            onChange={handleChange}
          />

          <button type="submit">
            Submit Inquiry
          </button>

          {submitted && (
            <p className="success-msg">
              ✅ Submitted Successfully!
            </p>
          )}
        </form>
      </section>

    </>
  );
}

export default Home;