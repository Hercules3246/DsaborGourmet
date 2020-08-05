import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { notification } from "antd";
import Pagination from "../../../components/Pagination";

import { getProductSearch } from "../../../api/product";
import { getAccesTokenApi } from "../../../api/auth";
import ProductList from "../../../components/Admin/Products/ProductList";

function Product(props) {
  const { location, history } = props;

  const [productActive, setProductActive] = useState([]);
  const [productInactive, setProductInactive] = useState([]);
  const [reloadProduct, setReloadProduct] = useState(false);

  const { page = 1 } = queryString.parse(location.search);

  // useEffect(() => {
  //   getProductApi(page, 6)
  //     .then((response) => {
  //       if (response?.code !== 200) {
  //         notification["warning"]({
  //           message: response.message,
  //         });
  //       } else {
  //         setProduct(response.posts.docs);
  //         setProductLocation(response.posts.page);
  //         setProductLocationTotal(response.posts.total);
  //         setProductLocationLimit(response.posts.limit);
  //       }
  //     })
  //     .catch((err) => {
  //       notification["error"]({
  //         message: "Error del servidor",
  //       });
  //     });
  //   setReloadProduct(false);
  // }, [page, reloadProduct]);

  const token = getAccesTokenApi();

  return (
    <div>
      <ProductList classname="product-page" />

      {/* <Pagination
        productLocation={productLocation}
        location={location}
        history={history}
        ProductLocationTotal={ProductLocationTotal}
        ProductLocationLimit={ProductLocationLimit}
      /> */}
    </div>
  );
}

export default withRouter(Product);
