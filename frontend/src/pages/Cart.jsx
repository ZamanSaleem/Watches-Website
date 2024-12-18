import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectCartItems,
  updateQuantityAsync,
  getUserCartAsync,
} from "../store/slices/cartSlice";
import { selectAllProducts, fetchProducts } from "../store/slices/productSlice";
import { selectToken } from "../store/slices/authSlice";
import bin_icon from "../assets/bin_icon.png";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const cartItems = useSelector(selectCartItems);
  const products = useSelector(selectAllProducts);
  const token = useSelector(selectToken);
  const currency = useSelector((state) => state.cart.currency);
  

  const updateQuantity = (itemId, quantity) => {
    dispatch(updateQuantityAsync({ itemId, quantity, token }));
  };

  const handleCheckout = () => {
    if (!token) {
      toast.error("You need to be logged in to proceed to checkout.");
      navigate("/login");
      return;
    }

    if (cartProducts.length === 0) {
      toast.error(
        "Your cart is empty. Please add items to your cart before proceeding to checkout."
      );
      return;
    }

    navigate("/place-order");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProducts()).unwrap();
        if (token) {
          await dispatch(getUserCartAsync(token)).unwrap();
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error loading cart data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, token]);

  const cartProducts = Object.entries(cartItems)
    .filter(([_, quantity]) => quantity > 0)
    .map(([id, quantity]) => {
      const product = products.find((p) => p._id === id);
      return product ? { ...product, quantity } : null;
    })
    .filter(Boolean);

  if (!isLoading && (!cartProducts || cartProducts.length === 0)) {
    return (
      <div className="pt-14 px-7 h-svh bg-gray-100">
        <div className="text-3xl mb-3 flex justify-center">
          <h1>YOUR CART</h1>
        </div>
        <div className="text-center py-10">Your cart is empty</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="pt-14 px-7 h-svh bg-gray-100 flex justify-center items-center">
        <div>Loading cart...</div>
      </div>
    );
  }

  return (
    <div className="pt-14 px-7 h-svh bg-gray-100">
      <div className="text-3xl mb-5 font-bold flex justify-center">
        
        <h1>YOUR CART</h1>
      </div>

      <div className="flex flex-wrap gap-8">
        
        <div className="w-full lg:w-2/3 border rounded-2xl bg-white shadow-md">
          {cartProducts.map((product) => (
            <div
              key={product._id}
              className="w-full py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 px-auto ml-2 sm:w-20 rounded-md shadow-sm"
                  src={product.image[0]}
                  alt=""
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {product.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(product._id, Number(e.target.value))
                  }
                  className="border border-gray-300 rounded-md max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center"
                  type="number"
                  min={1}
                  value={product.quantity}
                />
                
              </div>
              <img
                onClick={() => updateQuantity(product._id, 0)}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={bin_icon}
                alt="Remove item"
              />
            </div>
          ))}
        </div>

        <div className="w-full lg:w-[350px] border rounded-2xl bg-white shadow-md sticky top-14">
          <div className="p-6">
            <CartTotal />
            <div className="w-full text-end mt-4">
              <button
                onClick={handleCheckout}
                className="bg-[burlywood] hover:bg-black rounded-md w-full text-white text-sm my-8 px-8 py-3 transition-colors"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
