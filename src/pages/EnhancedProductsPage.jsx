import React from 'react';
import { Navbar, EnhancedProducts, Footer } from "../components";
import "../components/EnhancedProducts.css";

const EnhancedProductsPage = () => {
  return (
    <>
      <Navbar />
      <div className="enhanced-products-container" style={{ minHeight: '100vh' }}>
        <div className="container py-4">
          <div className="text-center mb-5">
            <div className="hero-section">
              <h1 className="display-4 fw-bold mb-3">
                🚀 Enhanced Product Showcase
              </h1>
              <p className="lead mb-4">
                Experience our modern, responsive product cards with advanced features
              </p>
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="feature-card">
                    <h5 className="card-title text-primary mb-3">✨ Key Features</h5>
                    <div className="row text-start">
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">📱 <strong>Responsive Design</strong> - Works on all devices</li>
                          <li className="mb-2">🖼️ <strong>Image Carousel</strong> - Multiple product images</li>
                          <li className="mb-2">🎨 <strong>Variant Selection</strong> - Size, color options</li>
                          <li className="mb-2">💰 <strong>Dynamic Pricing</strong> - Real-time price updates</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <ul className="list-unstyled">
                          <li className="mb-2">🔐 <strong>Wallet Integration</strong> - MetaMask support</li>
                          <li className="mb-2">📦 <strong>Stock Management</strong> - Real-time inventory</li>
                          <li className="mb-2">⭐ <strong>Product Ratings</strong> - Customer reviews</li>
                          <li className="mb-2">🛒 <strong>Smart Cart</strong> - Enhanced shopping experience</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-4">
                      <small className="text-muted">
                        💡 <strong>Note:</strong> Connect your wallet to enable purchasing functionality
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <EnhancedProducts />
      </div>
      <Footer />
    </>
  );
};

export default EnhancedProductsPage;
