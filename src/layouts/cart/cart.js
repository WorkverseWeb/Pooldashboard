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
// @mui material components'
import Card from "@mui/material/Card";
import PopupForm from "./popup/feedback";
import RenderRazorpay from "./renderRazorPay";

export default function Cart() {
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const { isAuthenticated, user } = useAuth0();
  const [orderDetails, setOrderDetails] = useState({
    orderId: null,
    currency: null,
    amount: null,
  });
  const [showFeedback1, setShowFeedback1] = useState(false);
  const [displayRazorpay, setDisplayRazorpay] = useState(false);

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
      if (!user || !user.email) {
        return;
      }

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

      const [firstApiResult, secondApiResult] = await Promise.all([
        axios.get(`${process.env.REACT_APP_BASE_URL}/slots/${user.email}`).catch(() => null),
        axios.get(`${process.env.REACT_APP_BASE_URL}/initialslot/${user.email}`).catch(() => null),
      ]);

      // Handle first API
      if (firstApiResult && firstApiResult.status === 200) {
        await updateCartData(
          firstApiResult.data,
          cartData,
          `${process.env.REACT_APP_BASE_URL}/slots/${user.email}`
        );
      } else {
        await createCartData(cartData, `${process.env.REACT_APP_BASE_URL}/slots`);
      }

      // Handle second API
      if (secondApiResult && secondApiResult.status === 200) {
        await updateCartData(
          secondApiResult.data,
          cartData,
          `${process.env.REACT_APP_BASE_URL}/initialslot/${user.email}`
        );
      } else {
        await createCartData(cartData, `${process.env.REACT_APP_BASE_URL}/initialslot`);
      }

      // Initiate Razorpay payment
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/order`, {
        amount: totalAmount * 100,
        currency: "INR",
      });

      // Update state with order details
      setOrderDetails({
        orderId: response.data.order_id,
        currency: response.data.currency,
        amount: response.data.amount,
      });

      // Display Razorpay checkout modal
      setDisplayRazorpay(true);

      // Success messages
      // toast.success("Purchase successful!");
      // setTimeout(() => {
      //   dispatch(RESET());
      //   toast.info("Cart reset!");
      // }, 1000);

      // feedback
      // setTimeout(() => {
      //   setShowFeedback1(true);
      // }, 1 * 60 * 1000);

      setTimeout(() => {
        setShowFeedback1(true);
      }, 1 * 60 * 1000);
    } catch (error) {
      console.error("Error purchasing:", error);
      toast.error("Failed to purchase. Please try again later.");
    }
  };

  const updateCartData = async (existingData, cartData, apiUrl) => {
    const updatedAllProducts = { ...existingData.AllProducts };
    for (const key in cartData.AllProducts) {
      if (updatedAllProducts.hasOwnProperty(key)) {
        updatedAllProducts[key] += cartData.AllProducts[key];
      } else {
        updatedAllProducts[key] = cartData.AllProducts[key];
      }
    }
    const updatedTotalAmount = existingData.TotalAmount + cartData.TotalAmount;

    const updatedCartData = {
      email: cartData.email,
      AllProducts: updatedAllProducts,
      TotalAmount: updatedTotalAmount,
      paymentStatus: "Success",
    };

    await axios.patch(apiUrl, updatedCartData);
  };

  const createCartData = async (cartData, apiUrl) => {
    await axios.post(apiUrl, cartData);
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/order/${paymentResponse.razorpay_order_id}`,
        {
          paymentStatus: "Success",
        }
      );

      dispatch(RESET());
      toast.success("Payment successful!");
      toast.info("Cart reset!");
      // toast.success("Payment successful!");
      // setTimeout(() => {
      //   dispatch(RESET());
      //   toast.info("Cart reset!");
      // }, 2000);
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status. Please contact support.");
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
    toast.error("Payment failed. Please try again.");
  };

  useEffect(() => {
    let timer1;

    const handleFocus = () => {
      if (isAuthenticated) {
        timer1 = setTimeout(() => {
          setShowFeedback1(true);
        }, 1 * 60 * 1000);
      }
    };

    const handleBlur = () => {
      clearTimeout(timer1);
    };

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      clearTimeout(timer1);
    };
  }, [isAuthenticated]);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox
        style={
          !isAuthenticated
            ? {
                background: "linear-gradient(45deg, rgb(0 0 0 / 7%) 30%, rgb(0 0 0 / 56%) 80%)",
                backdropFilter: "blur(8px)",
                minHeight: "85vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "10px",
                overflow: "hidden",
                marginBottom: "20px",
              }
            : {}
        }
      >
        {isAuthenticated ? (
          <div className="cart-container">
            {getdata.length ? (
              <div className="add-to-cart ">
                <Card
                  style={{
                    width: "70%",
                  }}
                  className="border-container-bottom"
                >
                  <div className="card-details border-bottom">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>

                      <tbody>
                        {getdata.map((e) => {
                          return (
                            <>
                              <tr key={e.id}>
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
                                    <div className="border-container">
                                      <button
                                        className=" border"
                                        style={{
                                          padding: "0 9px",
                                          fontSize: "20px",
                                        }}
                                        onClick={e.qnty <= 1 ? () => dlt(e.id) : () => remove(e)}
                                      >
                                        -
                                      </button>
                                    </div>
                                    <span>{e.qnty}</span>
                                    <div className="border-container-left">
                                      <button
                                        className=" border-left"
                                        style={{
                                          padding: "0 6px",
                                          fontSize: "20px",
                                        }}
                                        onClick={() => send(e)}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                </td>

                                <td>₹ {e.price * e.qnty}.00</td>

                                <td>
                                  <IconButton
                                    onClick={() => dlt(e.id)}
                                    aria-label="delete"
                                    size="small"
                                    style={{
                                      color: "#9CE325",
                                    }}
                                  >
                                    <Icon>delete</Icon>
                                  </IconButton>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </Card>
                {/* cart totals */}
                <Card
                  style={{
                    width: "30%",
                    textAlign: "left",
                  }}
                  className="border-container-bottom"
                >
                  <div className="card-total border-bottom">
                    <table>
                      <thead>
                        <tr style={{ borderBottom: "1px solid #fff" }}>
                          <th>Cart totals</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td>Subtotal :</td>
                          <td>₹ {price}.00</td>
                        </tr>
                        <tr style={{ borderBottom: "none" }}>
                          <td>Total :</td>
                          <td>₹ {price}.00</td>
                        </tr>

                        <div className=" border-container" style={{ margin: "35px 8px" }}>
                          <button
                            className="border"
                            onClick={handlePurchase}
                            style={{
                              fontFamily: typography.fontFamily,
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

      {showFeedback1 && <PopupForm />}

      {displayRazorpay && (
        <RenderRazorpay
          displayRazorpay={displayRazorpay}
          orderDetails={orderDetails}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          setDisplayRazorpay={setDisplayRazorpay}
        />
      )}

      <Footer />
    </DashboardLayout>
  );
}
