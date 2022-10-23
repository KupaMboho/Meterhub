import React, { useContext, useState, useEffect } from "react";
import { mocks } from "./mock";
import camelize from "camelize";

export const ordersRequest = (location) => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location];
    if (!mock) {
      reject("not found");
    }
    resolve(mock);
  });
};

export const ordersTransform = ({ results = [] }) => {
  const mappedResults = results.map((order) => {
    return {
      ...order,
      address: order.vicinity,
    };
  });
  return camelize(mappedResults);
};
