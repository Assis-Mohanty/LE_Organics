import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart, updateCartItem, removeFromCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [dispatch, isAuthenticated]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateCartItem({ productId, quantity: newQuantity }))
      .unwrap()
      .then(() => {
        toast.success('Cart updated');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to update cart');
      });
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId))
      .unwrap()
      .then(() => {
        toast.success('Item removed from cart');
      })
      .catch((error) => {
        toast.error(error.message || 'Failed to remove item');
      });
  };

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Please login to view your cart</h2>
          <div className="mt-6">
            <Link
              to="/login"
              className="inline-block bg-green-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-700"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>

        {items.length === 0 ? (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-medium text-gray-900">Your cart is empty</h2>
            <div className="mt-6">
              <Link
                to="/products"
                className="inline-block bg-green-600 py-3 px-8 border border-transparent rounded-md text-base font-medium text-white hover:bg-green-700"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            <div className="lg:col-span-7">
              <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item._id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-md object-center object-cover sm:w-32 sm:h-32"
                      />
                    </div>

                    <div className="ml-4 flex-1 flex flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <Link to={`/products/${item._id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.name}
                            </Link>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                      </div>

                      <div className="mt-4 flex-1 flex items-end justify-between">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <span className="sr-only">Decrease quantity</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="mx-2 text-gray-500">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <span className="sr-only">Increase quantity</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item._id)}
                          className="text-sm font-medium text-green-600 hover:text-green-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Order summary */}
            <div className="mt-16 lg:mt-0 lg:col-span-5">
              <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Subtotal</div>
                    <div className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600">Shipping</div>
                    <div className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <div className="text-base font-medium text-gray-900">Order total</div>
                    <div className="text-base font-medium text-gray-900">${total.toFixed(2)}</div>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-green-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart; 