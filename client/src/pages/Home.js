import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 4 }));
  }, [dispatch]);

  const categories = [
    {
      name: 'Fruits & Vegetables',
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf',
      link: '/products?category=fruits-vegetables',
    },
    {
      name: 'Dairy & Eggs',
      image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da',
      link: '/products?category=dairy-eggs',
    },
    {
      name: 'Bakery',
      image: 'https://images.unsplash.com/photo-1608198093002-ad4e505484ba',
      link: '/products?category=bakery',
    },
    {
      name: 'Meat & Seafood',
      image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f',
      link: '/products?category=meat-seafood',
    },
  ];

  const benefits = [
    {
      title: '100% Organic',
      description: 'All our products are certified organic and grown without harmful pesticides.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
    },
    {
      title: 'Fast Delivery',
      description: 'Get your fresh organic products delivered to your doorstep within 24 hours.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: 'Best Quality',
      description: 'We source our products from the best organic farms and suppliers.',
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-green-800">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Organic vegetables"
          />
          <div className="absolute inset-0 bg-green-800 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Fresh Organic Food
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            Discover the best selection of organic products, delivered fresh to your doorstep.
            Shop with confidence knowing that every item is sustainably sourced and certified organic.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-white py-3 px-8 border border-transparent rounded-md text-base font-medium text-green-700 hover:bg-green-50"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-extrabold text-gray-900">Shop by Category</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group relative"
            >
              <div className="relative w-full h-80 rounded-lg overflow-hidden group-hover:opacity-75">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-extrabold text-gray-900">Featured Products</h2>
          <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div>Loading...</div>
            ) : (
              products.map((product) => (
                <div key={product._id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <Link to={`/products/${product._id}`}>
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">${product.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-8 text-center">
            <Link
              to="/products"
              className="inline-block bg-green-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-700"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{benefit.title}</h3>
                <p className="mt-2 text-base text-gray-500">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 