/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef, useState } from "react";
import { PrefContext } from "../../../contexts/preff";
import { keys } from "../../../keys";

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const setValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };

  return {
    onChange,
    onSubmit,
    setValue,
    values,
  };
};

export function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  useEffect(() => {
    if (ref?.current) {
      observer.observe(ref.current);
    }
    // Remove the observer as soon as the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

export const useBill = () => {
  const { pref } = useContext(PrefContext);

  const [bill, setBill] = useState({});
  const finalPrice = {};

  const calculateBill = ({ pricePerItem, miscData, orderItems }) => {
    finalPrice.pricePerItem = pricePerItem.reduce((a, b) => a + b, 0);
    finalPrice.tax = miscData.getMisc.tax;
    if (pref.deliveryOption === "pickup") {
      finalPrice.deliveryFee = orderItems[0].chefAll?.pickupFee;
    } else {
      finalPrice.deliveryFee = orderItems[0].chefAll?.deliveryFee;
    }
    finalPrice.total =
      finalPrice.tax + finalPrice.pricePerItem + finalPrice.deliveryFee;
    finalPrice.serviceFee = 0.2 * finalPrice.total;
    finalPrice.finalPrice = finalPrice.total + finalPrice.serviceFee;

    setBill({ ...bill, bill: finalPrice });
  };

  useEffect(() => {
    setBill({ ...bill, deliverOrPickup: pref?.deliveryOption });
  }, [pref]);

  return { bill, calculateBill, setBill };
};
