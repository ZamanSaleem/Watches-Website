import { useSelector } from "react-redux";
import {
  selectCurrency,
  selectDeliveryFee,
  selectCartAmount,
} from "../store/slices/cartSlice";

const CartTotal = () => {
  const currency = useSelector(selectCurrency);
  const delivery_fee = useSelector(selectDeliveryFee);
  const cartAmount = useSelector(selectCartAmount);

  return (
    <div className="w-full">
      <div className="text-xl text-center font-semibold">CART TOTALS</div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {cartAmount}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency} {cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
