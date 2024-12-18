import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Title from "../components/Title";
import { selectToken } from "../store/slices/authSlice";
import { selectCurrency } from "../store/slices/cartSlice";
import { fetchUserOrders, selectOrders } from "../store/slices/orderSlice";
import { toast } from "react-toastify";

const Orders = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const currency = useSelector(selectCurrency);
  const orders = useSelector(selectOrders);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserOrders(token));
    }
  }, [token, dispatch]);

  const orderData = orders
    .flatMap((order) =>
      order.items.map((item) => ({
        ...item,
        status: order.status,
        payment: order.payment,
        paymentMethod: order.paymentMethod,
        date: order.date,
      }))
    )
    .reverse();

  return (
    <div className="border-t pt-16 px-7">
      <div className="text-3xl text-bold">
        {/* <Title text1={"MY"} text2={"ORDERS"} /> */}
        <h1>MY ORDERS</h1>
      </div>

      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-1 text-base text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-1">
                  Date:{" "}
                  <span className=" text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment:{" "}
                  <span className=" text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
