import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { LocationContext } from "../location/location.context";

import { ordersRequest, ordersTransform } from "./orders.service";

export const OrdersContext = createContext();

export const OrdersContextProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { location } = useContext(LocationContext);

  const retrieveOrders = (loc) => {
    setIsLoading(true);
    setOrders([]);

    setTimeout(() => {
      ordersRequest(loc)
        .then(ordersTransform)
        .then((results) => {
          setIsLoading(false);
          setOrders(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveOrders(locationString);
    }
  }, [location]);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        isLoading,
        error,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};
