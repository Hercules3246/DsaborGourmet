import { basePath, apiVersion } from "./config";

export function getProductApi(page, limit) {
  const url = `${basePath}/${apiVersion}/get-products?page=${page}&limit=${limit}`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateProductApi(token, prodId, data) {
  const url = `${basePath}/${apiVersion}/update-product/${prodId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err;
    });
}

export function addProductApi(token, product) {
  const url = `${basePath}/${apiVersion}/add-product`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(product),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteProductApi(token, prodId) {
  const url = `${basePath}/${apiVersion}/delete-product/${prodId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}
