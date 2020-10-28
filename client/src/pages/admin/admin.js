import React from "react";
import { withRouter } from "react-router-dom";

function Admin(props) {
  // const { location } = props;
  console.log(props);
  return (
    <div>
      <h1>We're in admin page </h1>
    </div>
  );
}

export default withRouter(Admin);
