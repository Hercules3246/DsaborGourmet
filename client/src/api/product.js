import { basePath, apiVersion } from "./config";

export function getProductActiveApi(page, limit, status) {
  const url = `${basePath}/${apiVersion}/product-active?page=${page}&limit=${limit}&active=${status}`;

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

export function getProductSearch(page, limit, name, status) {
  const url = `${basePath}/${apiVersion}/product-search?page=${page}&limit=${limit}&name=${name}&active=${status}`;

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

export function addProductAdminApi(token, data) {
  const url = `${basePath}/${apiVersion}/add-product-admin/`;
  const params = {
    method: "POST",
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
      return err.message;
    });
}

export function activateProdApi(token, userdId, status) {
  const url = `${basePath}/${apiVersion}/activate-prod/${userdId}`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      active: status,
    }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .then((err) => {
      return err.message;
    });
}
