import React from "react";
import { Pagination as PaginationAntd } from "antd";

import "./Pagination.scss";

export default function Pagination(props) {
  const {
    productLocation,
    history,
    ProductLocationLimit,
    ProductLocationTotal,
    location,
  } = props;

  // console.log(productLocation);
  // console.log("History: ");
  // console.log(history);
  // console.log("limit: ");
  // console.log(ProductLocationLimit);
  // console.log("total: ");
  // console.log(ProductLocationTotal);
  // console.log("location: ");
  // console.log(location);

  const currentPage = parseInt(productLocation);
  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  return (
    <PaginationAntd
      defaultCurrent={currentPage}
      total={ProductLocationTotal}
      pageSize={ProductLocationLimit}
      onChange={(newPage) => onChangePage(newPage)}
      className="pagination"
    />
  );
}
