import LayoutAdmin from "../layout/LayoutAdmin";
import LayoutBasic from "../layout/LayoutBasic";

//Admin pages
import AdminHome from "../pages/admin/admin";
import AdminSingIn from "../pages/admin/SignIn/SignIn";
import AdminUsers from "../pages/admin/Users";
import AdminProduct from "../pages/admin/Product";
import AdminRoute from "../pages/admin/Route";
import AdminClient from "../pages/admin/Client";
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
        permissions: ["admin"],
      },
      {
        path: "/admin/login",
        exact: true,
        component: AdminSingIn,
        permissions: ["admin"],
      },
      {
        path: "/admin/users",
        exact: true,
        component: AdminUsers,
        permissions: ["admin"],
      },
      {
        path: "/admin/product",
        exact: true,
        component: AdminProduct,
        permissions: ["admin"],
      },
      {
        path: "/admin/routes",
        exact: true,
        component: AdminRoute,
        permissions: ["admin"],
      },
      {
        path: "/admin/clients",
        exact: true,
        component: AdminClient,
        permissions: ["admin"],
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
