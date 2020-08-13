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

  const currentPage = parseInt(productLocation);
  const onChangePage = (newPage) => {
    history.push(`${location.pathname}?page=${newPage}`);
  };

  // useEffect(() => {

  //   console.log();
  // }, [total]);

  // console.log(history);
  // console.log(ProductLocationLimit);
  // console.log(ProductLocationTotal);
  // console.log(productLocation);

  // console.log(currentPage);
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
