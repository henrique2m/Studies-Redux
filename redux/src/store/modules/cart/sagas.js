import { all, takeLatest, select, call, put } from "redux-saga/effects";
import api from "../../../services/api";
import { addProductToCartFailure, addProductToCartSuccess } from "./actions";

function* checkProductStock({ payload }) {
  const { product } = payload;

  const availableStockResponse = yield call(api.get, `stock/${product.id}`);

  const { quantity } = availableStockResponse.data;

  if (quantity === 0) {
    yield put(addProductToCartFailure(product.id));
    console.log("Sem estoque.");
    return;
  }

  yield put(addProductToCartSuccess(product));
}

export default all([
  takeLatest("ADD_PRODUCT_TO_CART_REQUEST", checkProductStock),
]);
