import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./EnhancedProducts.css";
import { testProducts } from "../data/testProducts";

// Wallet Integration Hook
const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        toast.success("Wallet Connected Successfully!");
        return accounts[0];
      } else {
        toast.error("Please install MetaMask!");
        return null;
      }
    } catch (error) {
      toast.error("Failed to connect wallet");
      console.error("Error connecting wallet:", error);
      return null;
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsConnected(false);
    toast.success("Wallet Disconnected");
  };

  useEffect(() => {
    // Check if wallet is already connected
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setIsConnected(true);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };
    checkWalletConnection();
  }, []);

  return { walletAddress, isConnected, connectWallet, disconnectWallet };
};

// Enhanced Product Card Component
const ProductCard = ({ product, variants = [], inStock = true }) => {
  const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  const { walletAddress, isConnected, connectWallet } = useWallet();

  // Create image array for carousel
  const productImages = product.images || [product.image];

  const addProduct = (product) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first!");
      return;
    }
    
    const productWithVariant = {
      ...product,
      selectedVariant,
      walletAddress,
    };
    dispatch(addCart(productWithVariant));
    toast.success("Added to cart");
  };

  const handleVariantChange = (e) => {
    const variant = variants.find(v => v.id === e.target.value);
    setSelectedVariant(variant);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
      <div className="card h-100 shadow-sm product-card">
        {/* Product Image Carousel */}
        <div className="card-img-container position-relative">
          {productImages.length > 1 ? (
            <Carousel
              indicators={true}
              navButtonsAlwaysVisible={false}
              navButtonsAlwaysInvisible={productImages.length <= 1}
              height={300}
              className="product-carousel"
              index={currentImageIndex}
              onChange={(index) => setCurrentImageIndex(index)}
            >
              {productImages.map((image, index) => (
                <div key={index} className="carousel-item-wrapper">
                  <img
                    src={image}
                    alt={`${product.title} - View ${index + 1}`}
                    className="card-img-top product-image"
                    style={{
                      height: '300px',
                      objectFit: 'cover',
                      width: '100%'
                    }}
                  />
                </div>
              ))}
            </Carousel>
          ) : (
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top product-image"
              style={{
                height: '300px',
                objectFit: 'cover',
                width: '100%'
              }}
            />
          )}
          
          {/* Stock Badge */}
          <div className="position-absolute top-0 end-0 m-2">
            <span className={`product-badge ${inStock ? 'bg-success' : 'bg-danger'}`}>
              {inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          {/* Wallet Status Badge */}
          <div className="position-absolute top-0 start-0 m-2">
            <span className={`product-badge ${isConnected ? 'bg-primary' : 'bg-secondary'}`}>
              {isConnected ? 'Wallet Connected' : 'No Wallet'}
            </span>
          </div>
        </div>

        <div className="card-body d-flex flex-column">
          {/* Product Title */}
          <h5 className="card-title text-truncate" title={product.title}>
            {product.title}
          </h5>

          {/* Product Description */}
          <p className="card-text text-muted small flex-grow-1">
            {product.description?.substring(0, 100)}...
          </p>

          {/* Product Rating */}
          {product.rating && (
            <div className="mb-2">
              <div className="d-flex align-items-center">
                <div className="rating-stars me-2">
                  {'★'.repeat(Math.floor(product.rating.rate))}
                  {'☆'.repeat(5 - Math.floor(product.rating.rate))}
                </div>
                <small className="text-muted">
                  ({product.rating.rate}) • {product.rating.count} reviews
                </small>
              </div>
            </div>
          )}

          {/* Variant Selector */}
          {variants.length > 0 && (
            <div className="mb-3">
              <label htmlFor={`variant-${product.id}`} className="form-label small">
                <strong>Variant:</strong>
              </label>
              <select
                id={`variant-${product.id}`}
                className="form-select form-select-sm"
                value={selectedVariant?.id || ''}
                onChange={handleVariantChange}
              >
                {variants.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.name} {variant.priceModifier && `(+$${variant.priceModifier})`}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Display */}
          <div className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="price-tag">
                  {formatPrice(
                    product.price + (selectedVariant?.priceModifier || 0)
                  )}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <small className="text-muted text-decoration-line-through ms-2">
                    {formatPrice(product.originalPrice)}
                  </small>
                )}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="badge bg-success">
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-enhanced btn-enhanced btn-sm flex-fill"
              >
                View Details
              </Link>
              
              {inStock ? (
                <button
                  className="btn btn-primary-enhanced btn-enhanced btn-sm flex-fill"
                  onClick={() => addProduct(product)}
                  disabled={!isConnected}
                >
                  {isConnected ? 'Add to Cart' : 'Connect Wallet'}
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-enhanced btn-sm flex-fill"
                  disabled
                >
                  Out of Stock
                </button>
              )}
            </div>

            {/* Wallet Connection Button */}
            {!isConnected && (
              <div className="mt-2">
                <button
                  className="btn btn-warning btn-enhanced btn-sm w-100"
                  onClick={connectWallet}
                >
                  🔐 Connect Wallet to Purchase
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Products Component
const EnhancedProducts = ({ useTestData = false }) => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState(useTestData);
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWallet();

  // Sample variants for demonstration
  const sampleVariants = {
    1: [
      { id: 'size-s', name: 'Small', priceModifier: 0 },
      { id: 'size-m', name: 'Medium', priceModifier: 5 },
      { id: 'size-l', name: 'Large', priceModifier: 10 },
    ],
    2: [
      { id: 'color-black', name: 'Black', priceModifier: 0 },
      { id: 'color-white', name: 'White', priceModifier: 0 },
      { id: 'color-blue', name: 'Blue', priceModifier: 15 },
    ]
  };

  useEffect(() => {
    let componentMounted = true;
    
    const getProducts = async () => {
      setLoading(true);
      try {
        let enhancedProducts;
        
        if (dataSource) {
          // Use test data
          enhancedProducts = testProducts;
          if (componentMounted) {
            setData(enhancedProducts);
            setFilter(enhancedProducts);
            setLoading(false);
          }
        } else {
          // Use API data
          const response = await fetch("https://fakestoreapi.com/products/");
          const products = await response.json();
          
          // Enhanced products with additional data
          enhancedProducts = products.map((product, index) => ({
            ...product,
            images: [product.image], // Can be extended with multiple images
            inStock: Math.random() > 0.1, // 90% chance of being in stock
            originalPrice: index % 3 === 0 ? product.price * 1.2 : null, // Some products on sale
          }));
          
          if (componentMounted) {
            setData(enhancedProducts);
            setFilter(enhancedProducts);
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
        setLoading(false);
      }
    };

    getProducts();
    
    return () => {
      componentMounted = false;
    };
  }, [dataSource]);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-sm-6 col-12 mb-4">
            <div className="card h-100">
              <Skeleton height={300} />
              <div className="card-body">
                <Skeleton height={25} className="mb-2" />
                <Skeleton height={60} className="mb-2" />
                <Skeleton height={20} width={100} className="mb-2" />
                <Skeleton height={35} />
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        {/* Wallet Status Bar */}
        <div className="col-12 mb-4">
          <div className="wallet-status-card card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title mb-1">🔐 Wallet Status</h6>
                  <small className="text-light">
                    {isConnected 
                      ? `Connected: ${walletAddress?.substring(0, 6)}...${walletAddress?.substring(-4)}`
                      : 'Not connected - Connect wallet to make purchases'
                    }
                  </small>
                </div>
                {isConnected ? (
                  <button 
                    className="btn btn-outline-light btn-sm"
                    onClick={disconnectWallet}
                  >
                    Disconnect Wallet
                  </button>
                ) : (
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Source Toggle */}
        <div className="col-12 mb-4">
          <div className="text-center">
            <div className="btn-group" role="group">
              <button
                className={`btn btn-sm ${!dataSource ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setDataSource(false)}
              >
                📡 API Data (FakeStore)
              </button>
              <button
                className={`btn btn-sm ${dataSource ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setDataSource(true)}
              >
                🧪 Test Data (Demo)
              </button>
            </div>
            <div className="mt-2">
              <small className="text-muted">
                Toggle between live API data and curated test data for demonstration
              </small>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="col-12 mb-4">
          <div className="d-flex justify-content-center flex-wrap gap-2">
            <button
              className="filter-button btn"
              onClick={() => setFilter(data)}
            >
              All Products ({data.length})
            </button>
            <button
              className="filter-button btn"
              onClick={() => filterProduct("men's clothing")}
            >
              Men's Clothing
            </button>
            <button
              className="filter-button btn"
              onClick={() => filterProduct("women's clothing")}
            >
              Women's Clothing
            </button>
            <button
              className="filter-button btn"
              onClick={() => filterProduct("jewelery")}
            >
              Jewelery
            </button>
            <button
              className="filter-button btn"
              onClick={() => filterProduct("electronics")}
            >
              Electronics
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filter.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variants={product.variants || sampleVariants[product.id] || []}
            inStock={product.inStock}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <div className="enhanced-products-container">
        <div className="container my-3 py-3">
          <div className="row">
            <div className="col-12 text-center">
              <div className="hero-section">
                <h2 className="display-5 mb-2">Enhanced Product Showcase</h2>
                <p className="lead mb-4">
                  Modern responsive product cards with wallet integration & carousel
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {loading ? <Loading /> : <ShowProducts />}
          </div>
        </div>
      </div>
    </>
  );
};

export default EnhancedProducts;
