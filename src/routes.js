// React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import Purchase from "layouts/purchase/purchase";
import Cart from "layouts/cart/cart";
// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Pool Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "User Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },

  {
    type: "collapse",
    name: "Purchase",
    key: "purchase",
    icon: <Icon fontSize="small">shop</Icon>,
    route: "/purchase",
    component: <Purchase />,
  },
  {
    type: "collapse",
    name: "Cart",
    key: "cart",
    icon: <Icon fontSize="small">shopping_cart</Icon>,
    route: "/cart",
    component: <Cart />,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
];

export default routes;
