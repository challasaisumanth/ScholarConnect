import React from 'react';
import { Link } from 'react-router-dom';
import './styles/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-wrapper">
      {/* Navigation Bar */}
      <header className="header">
        <div className="logo">
          <h1>ScholarConnect</h1>
        </div>
        <nav className="nav-links">
          <Link to="/login" className="nav-item">Sign In</Link>
          <Link to="/register" className="nav-item">Get Started</Link>
        </nav>
      </header>

      {/* Main Section with Intro */}
      <section className="main-section">
        <div className="main-content">
          <h2>Discover Your Future with Scholarships</h2>
          <p>We simplify your journey to find and apply for scholarships suited to your needs. Join our platform and get started!</p>
          <div className="cta-buttons">
            <Link to="/register" className="cta-btn">Register Now</Link>
            <Link to="/login" className="cta-btn">Log In</Link>
          </div>
        </div>
        <div className="main-image">
          <img src="scholarship-image.png" alt="Scholarships" />
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card">
          <h3>Easy Search</h3>
          <p>Find scholarships based on your profile, field of study, and location.</p>
        </div>
        <div className="feature-card">
          <h3>Custom Recommendations</h3>
          <p>Get personalized scholarship recommendations based on your achievements and goals.</p>
        </div>
        <div className="feature-card">
          <h3>Track Your Applications</h3>
          <p>Keep track of all your applications and deadlines from one platform.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="benefit-card">
          <h3>Wide Range of Scholarships</h3>
          <p>Access thousands of scholarships for undergraduates, graduates, and professionals worldwide.</p>
        </div>
        <div className="benefit-card">
          <h3>Comprehensive Support</h3>
          <p>Get help and guidance on how to apply, improve your chances, and succeed in the application process.</p>
        </div>
        <div className="benefit-card">
          <h3>Fast & Secure</h3>
          <p>Our platform ensures a seamless and secure application process with instant updates and alerts.</p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>“ScholarConnect helped me find scholarships that matched my profile. It was so easy to apply!”</p>
            <h4>- Sarah, Scholarship Recipient</h4>
          </div>
          <div className="testimonial-card">
            <p>“I received personalized recommendations, which made finding scholarships much less overwhelming.”</p>
            <h4>- John, Student</h4>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 ScholarConnect | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
