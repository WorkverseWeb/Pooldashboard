import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, REMOVE, DLT } from "../../redux/actions/action";

import { Icon, IconButton } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";
import MDBox from "components/MDBox";

// @mui material components
import Card from "@mui/material/Card";

export default function Cart() {
  const getdata = useSelector((state) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const [price, setPrice] = useState(0);

  // total
  useEffect(() => {
    const total = () => {
      let price = 0;
      getdata.forEach((ele, k) => {
        price = ele.price * ele.qnty + price;
      });
      setPrice(price);
    };

    total();
  }, [getdata]);

  // add data

  const send = (e) => {
    dispatch(ADD(e));
  };

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  // delete btn
  const dlt = (id) => {
    dispatch(DLT(id));
  };

  // auth0
  const { isAuthenticated } = useAuth0();

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox
        style={
          !isAuthenticated
            ? {
                background:
                  "linear-gradient(45deg, rgb(5 74 25 / 9%) 30%, rgb(127 207 207 / 18%) 80%)",
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                overflow: "hidden",
              }
            : {}
        }
      >
        {isAuthenticated ? (
          <div className="cart-container">
            {getdata.length ? (
              <div className="add-to-cart ">
                <Card style={{ width: "70%" }}>
                  <div className="card-details">
                    <table>
                      <thead>
                        <tr>
                          <th></th>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>

                      <tbody>
                        {getdata.map((e) => {
                          return (
                            <>
                              <tr key={e.id}>
                                <td>
                                  <IconButton
                                    onClick={() => dlt(e.id)}
                                    aria-label="delete"
                                    size="small"
                                    style={{
                                      color: "red",
                                    }}
                                  >
                                    <Icon>delete</Icon>
                                  </IconButton>
                                </td>

                                <td>{e.title}</td>
                                <td>₹ {e.price}.00</td>

                                <td>
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100px",
                                      margin: "auto",
                                    }}
                                  >
                                    <button
                                      className="purchase-delete"
                                      onClick={e.qnty <= 1 ? () => dlt(e.id) : () => remove(e)}
                                    >
                                      -
                                    </button>
                                    <span>{e.qnty}</span>
                                    <button className="purchase-add" onClick={() => send(e)}>
                                      +
                                    </button>
                                  </div>
                                </td>

                                <td>₹ {e.price * e.qnty}.00</td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
                {/* cart totals */}
                <Card style={{ width: "30%", textAlign: "left" }}>
                  <div className="card-total">
                    <table>
                      <thead>
                        <tr>
                          <th>Cart totals</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Subtotal :</td>
                          <td>₹ {price}.00</td>
                        </tr>
                        <tr>
                          <td>Total :</td>
                          <td>₹ {price}.00</td>
                        </tr>

                        <div className="cart-purchase">
                          <button>Purchase</button>
                        </div>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            ) : (
              <>
                <div className="cart-empty">
                  <h4>Your cart is currently empty !!</h4>
                </div>
              </>
            )}
          </div>
        ) : (
          <Login />
        )}
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}
