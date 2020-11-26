import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import { addProductToCartRequest } from "../store/modules/cart/actions";

export default function Catalog() {
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get("products");
      setCatalog(response.data);
    }

    loadProducts();
  }, []);

  const handleAddProductToCart = useCallback(
    (product) => {
      dispatch(addProductToCartRequest(product));
    },

    [dispatch]
  );

  return (
    <main>
      <h1>Catalog</h1>

      {catalog.map((product) => (
        <article key={product.id}>
          <strong>{product.title}</strong>
          {" - "}
          <span>{product.price}</span>{" "}
          <button type="button" onClick={() => handleAddProductToCart(product)}>
            Comprar
          </button>
        </article>
      ))}
    </main>
  );
}
