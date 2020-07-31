import React, { useState, useEffect } from "react";
import { getProductApi } from "../../../api/product";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { notification } from "antd";

import ProductList from "../../../components/Admin/Products/ProductList";
import Pagination from "../../../components/Pagination";

function Product(props) {
  const { location, history } = props;
  const [productLocation, setProductLocation] = useState(null);
  const [product, setProduct] = useState(null);
  const [reloadProduct, setReloadProduct] = useState(false);
  const [ProductLocationTotal, setProductLocationTotal] = useState(null);
  const [ProductLocationLimit, setProductLocationLimit] = useState(null);
  const { page = 1 } = queryString.parse(location.search);

  useEffect(() => {
    getProductApi(page, 6)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setProduct(response.posts.docs);
          setProductLocation(response.posts.page);
          setProductLocationTotal(response.posts.total);
          setProductLocationLimit(response.posts.limit);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "Error del servidor",
        });
      });
    setReloadProduct(false);
  }, [page, reloadProduct]);

  if (!product) {
    return null;
  }

  return (
    <div>
      <ProductList
        classname="product-page"
        product={product}
        setReloadProduct={setReloadProduct}
      />
      <Pagination
        productLocation={productLocation}
        location={location}
        history={history}
        ProductLocationTotal={ProductLocationTotal}
        ProductLocationLimit={ProductLocationLimit}
      />
    </div>
  );
}

export default withRouter(Product);
