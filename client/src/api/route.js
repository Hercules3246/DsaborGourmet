import { basePath, apiVersion } from "./config";

export function getRouteSearch(page, limit, name, status) {
  const url = `${basePath}/${apiVersion}/route-search?page=${page}&limit=${limit}&name=${name}&active=${status}`;

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

export function updateRouteApi(token, routeId, data) {
  const url = `${basePath}/${apiVersion}/update-route/${routeId}`;

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

export function deleteRouteApi(token, routeId) {
  const url = `${basePath}/${apiVersion}/delete-route/${routeId}`;

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

export function addRouteAdminApi(token, data) {
  const url = `${basePath}/${apiVersion}/add-route-admin/`;
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

export function activateRouteApi(token, route, status) {
  const url = `${basePath}/${apiVersion}/activate-route/${route}`;
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
