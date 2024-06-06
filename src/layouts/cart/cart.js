import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, REMOVE, DLT, RESET } from "../../redux/actions/action";

import { Icon, IconButton } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";
import MDBox from "components/MDBox";
import typography from "assets/theme/base/typography";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// @mui material components
import Card from "@mui/material/Card";

export default function Cart() {
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const { isAuthenticated, user } = useAuth0();

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

  const handlePurchase = async () => {
    try {
      if (user && user.email) {
        const AllProducts = {};

        getdata.forEach((item) => {
          if (item.title === "All Levels") {
            AllProducts.allLevels = (AllProducts.allLevels || 0) + item.qnty;
          } else {
            const levelKey = item.title.toLowerCase().replace(/\s/g, "");
            AllProducts[levelKey] = (AllProducts[levelKey] || 0) + item.qnty;
          }
        });

        const totalAmount = getdata.reduce((acc, item) => {
          const itemPrice = item.price || 0;
          return acc + item.qnty * itemPrice;
        }, 0);

        const cartData = {
          email: user.email,
          AllProducts,
          TotalAmount: totalAmount,
          paymentStatus: "Success",
        };

        try {
          const getUserResponse = await axios.get(`http://localhost:8000/slots/${user.email}`);

          if (getUserResponse.status === 200) {
            const existingData = getUserResponse.data;

            const updatedAllProducts = { ...existingData.AllProducts };
            for (const key in AllProducts) {
              if (updatedAllProducts.hasOwnProperty(key)) {
                updatedAllProducts[key] += AllProducts[key];
              } else {
                updatedAllProducts[key] = AllProducts[key];
              }
            }
            const updatedTotalAmount = existingData.TotalAmount + totalAmount;

            const updatedCartData = {
              email: user.email,
              AllProducts: updatedAllProducts,
              TotalAmount: updatedTotalAmount,
              paymentStatus: "Success",
            };

            const patchResponse = await axios.patch(
              `http://localhost:8000/slots/${user.email}`,
              updatedCartData
            );
            if (patchResponse.status === 200) {
              console.log(updatedCartData);
              toast.success("Purchase successful!");
              await removeSavedCartData();
              setTimeout(() => {
                dispatch(RESET());
                toast.info("Cart reset!");
              }, 2000);
            }
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            const postResponse = await axios.post(`http://localhost:8000/slots`, cartData);
            if (postResponse.status === 201) {
              console.log(cartData);
              toast.success("Purchase successful!");
              setTimeout(() => {
                dispatch(RESET());
                toast.info("Cart reset!");
              }, 2000);
            }
          } else {
            console.error("Error checking user:", error);
            toast.error("Failed to purchase. Please try again later.");
          }
        }
      }
    } catch (error) {
      console.error("Error purchasing:", error);
      toast.error("Failed to purchase. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      if (user && user.email) {
        try {
          const response = await axios.get(`http://localhost:8000/carts/${user.email}`);
          if (response.status === 200) {
            const { cartAddedProducts } = response.data;
            const cartItems = Object.keys(cartAddedProducts)
              .filter((key) => cartAddedProducts[key] > 0)
              .map((key) => ({
                id: key,
                title: key.replace(/([A-Z])/g, " $1").trim(),
                qnty: cartAddedProducts[key],
                price: 0,
              }));
            cartItems.forEach((item) => dispatch(ADD(item)));
            setPrice(response.data.cartTotalAmount);
          }
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      }
    };

    if (isAuthenticated) {
      fetchCartData();
    }
  }, [isAuthenticated, user, dispatch]);

  const handleSaveCart = async () => {
    try {
      if (!user || !user.email) {
        throw new Error("User email not found.");
      }

      const cartAddedProducts = {};
      getdata.forEach((item) => {
        if (item.title === "All Levels") {
          cartAddedProducts.allLevels = (cartAddedProducts.allLevels || 0) + item.qnty;
        } else {
          const levelKey = item.title.toLowerCase().replace(/\s/g, "");
          cartAddedProducts[levelKey] = (cartAddedProducts[levelKey] || 0) + item.qnty;
        }
      });

      const totalAmount = getdata.reduce((acc, item) => acc + item.price * item.qnty, 0);

      const cartData = {
        email: user.email,
        cartAddedProducts,
        cartTotalAmount: totalAmount,
      };

      try {
        const existingCart = await axios.get(`http://localhost:8000/carts/${user.email}`);
        if (existingCart.status === 200) {
          const response = await axios.patch(`http://localhost:8000/carts/${user.email}`, cartData);
          if (response.status === 200) {
            console.log("Cart details updated:", cartData);
            toast.success("Cart details updated successfully!");
          }
        }
      } catch (error) {
        const response = await axios.post("http://localhost:8000/carts", cartData);
        if (response.status === 201) {
          console.log("Cart details saved:", cartData);
          toast.success("Cart details saved successfully!");
        }
      }
    } catch (error) {
      console.error("Error saving cart details:", error);
      toast.error("Failed to save cart details. Please try again later.");
    }
  };

  const removeSavedCartData = async () => {
    try {
      const deleteResponse = await axios.delete(`http://localhost:8000/carts/${user.email}`);
      if (deleteResponse.status === 200) {
        console.log("Saved cart data removed successfully.");
      }
    } catch (error) {
      console.error("Error removing saved cart data:", error);
    }
  };

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
                  <button
                    style={{
                      color: "#fff",
                      padding: "8px",
                      border: " 0",
                      background: "rgba(255, 255, 255, 0.14)",
                      borderRadius: "5px",
                      cursor: "pointer",
                      backgroundColor: " #021b215e",
                      margin: "20px 50px",
                      fontFamily: typography.fontFamily,
                    }}
                    onClick={handleSaveCart}
                  >
                    Save Cart
                  </button>
                </Card>
                {/* cart totals */}
                <Card style={{ width: "30%", textAlign: "left" }}>
                  <div className="card-total">
                    <table>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #bafff7" }}>
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
                          <button
                            onClick={handlePurchase}
                            style={{
                              fontFamily: typography.fontFamily,
                              textTransform: "uppercase",
                            }}
                          >
                            Purchase
                          </button>
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
