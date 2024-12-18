import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectToken } from "../store/slices/authSlice";
import { verifyPayment } from "../store/slices/orderSlice";

const Verify = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const userId = searchParams.get("userId");
  const items = searchParams.get("items");
  const amount = searchParams.get("amount");
  const address = searchParams.get("address");

  useEffect(() => {
    if (token && success) {
      dispatch(
        verifyPayment({
          params: { success, userId, items, amount, address },
          token,
        })
      )
        .unwrap()
        .then(() => {
          navigate("/orders");
          toast.success("Order placed successfully!");
        })
        .catch(() => navigate("/cart"));
    }
  }, [token, success]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <p className="text-xl">
        {success === "true"
          ? "Verifying your payment..."
          : "Payment cancelled. Redirecting..."}
      </p>
    </div>
  );
};

export default Verify;
