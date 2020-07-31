import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutBasic from "../layout/LayoutBasic";

//Admin pages
import AdminHome from "../pages/admin/admin";
import AdminSingIn from "../pages/admin/SignIn/SignIn";
import AdminUsers from "../pages/admin/Users";
import AdminProduct from "../pages/admin/Product";

//PAGES
import Home from "../pages/Home";
import Contact from "../pages/Contact";

//Other
import Error404 from "../pages/Error404";

const routes = [
  {
    path: "/admin",
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: "/admin",
        exact: true,
        component: AdminHome,
      },
      {
        path: "/admin/login",
        exact: true,
        component: AdminSingIn,
      },
      {
        path: "/admin/users",
        exact: true,
        component: AdminUsers,
      },
      {
        path: "/admin/product",
        exact: true,
        component: AdminProduct,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
