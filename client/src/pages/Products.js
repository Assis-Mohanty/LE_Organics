import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchProducts } from '../store/slices/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items: products, loading, totalPages } = useSelector((state) => state.products);
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'newest',
    page: parseInt(searchParams.get('page')) || 1,
  });

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
      page: 1, // Reset to first page when filters change
    }));
    setSearchParams((prev) => {
      if (value) {
        prev.set(name, value);
      } else {
        prev.delete(name);
      }
      return prev;
    });
  };

  const categories = [
    'All',
    'Fruits & Vegetables',
    'Dairy & Eggs',
    'Bakery',
    'Meat & Seafood',
    'Pantry',
    'Beverages',
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Categories</h3>
              <div className="mt-4 space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      value={category === 'All' ? '' : category}
                      checked={filters.category === (category === 'All' ? '' : category)}
                      onChange={handleFilterChange}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label className="ml-3 text-sm text-gray-600">{category}</label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Price Range</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="minPrice" className="block text-sm text-gray-600">
                    Min Price
                  </label>
                  <input
                    type="number"
                    name="minPrice"
                    id="minPrice"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="maxPrice" className="block text-sm text-gray-600">
                    Max Price
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    id="maxPrice"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Products</h2>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <div className="text-center py-12">Loading...</div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
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
                            <a href={`/products/${product._id}`}>
                              {product.name}
                            </a>
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => {
                            setFilters((prev) => ({ ...prev, page }));
                            setSearchParams((prev) => {
                              prev.set('page', page);
                              return prev;
                            });
                          }}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            filters.page === page
                              ? 'z-10 bg-green-50 border-green-500 text-green-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products; 