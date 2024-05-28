import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ADD, REMOVE, DLT } from "../../redux/actions/action";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// @mui material components
import Card from "@mui/material/Card";

export default function Cart() {
  const getdata = useSelector((state) => state.cartreducer.carts);

  const dispatch = useDispatch();

  const [price, setPrice] = useState(0);
  // console.log(price);

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

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div className="cart-container">
        {getdata.length ? (
          <div className="add-to-cart ">
            <Card style={{ width: "50%" }}>
              <div className="card-details">
                <table>
                  <thead>
                    <tr>
                      <th className="text-center"></th>
                      <th className="text-center fs-5">Product</th>
                      <th className="text-center fs-5">Price</th>
                      <th className="text-center fs-5">Quantity</th>
                      <th className="text-center fs-5">Subtotal</th>
                    </tr>
                  </thead>

                  <tbody>
                    {getdata.map((e) => {
                      console.warn("map", e.qnty);

                      return (
                        <>
                          <tr key={e.id}>
                            <td className="text-center">
                              <i
                                className="fa-solid fa-trash delete-btn"
                                onClick={() => dlt(e.id)}
                              ></i>
                            </td>

                            <td className="text-center fs-5">{e.title}</td>
                            <td className="text-center">₹ {e.price}.00</td>

                            <td className="text-center">
                              <div className="d-flex justify-content-between align-items-center qnty-btn">
                                <span
                                  style={{ fontSize: 24 }}
                                  onClick={e.qnty <= 1 ? () => dlt(e.id) : () => remove(e)}
                                >
                                  -
                                </span>
                                <span style={{ fontSize: 22 }}>{e.qnty}</span>
                                <span style={{ fontSize: 24 }} onClick={() => send(e)}>
                                  +
                                </span>
                              </div>
                            </td>

                            <td className="text-center">₹ {e.price * e.qnty}.00</td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
            {/* cart totals */}
            <Card style={{ width: "30%" }}>
              <div className="card-total">
                <table>
                  <thead>
                    <tr>
                      <th className="fs-3 px-4 py-3">Cart totals</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="d-flex justify-content-between p-lg-3 p-2 fw-bold">
                      <td>Subtotal :</td>
                      <td>₹ {price}.00</td>
                    </tr>
                    <tr className="d-flex justify-content-between p-lg-3 p-2 fw-bold">
                      <td>Total :</td>
                      <td>₹ {price}.00</td>
                    </tr>
                    <tr>
                      <td className="p-4">
                        <button>Buy</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        ) : (
          <>
            <div className="cart-empty">
              <h4 className="m-0">Your cart is currently empty !!</h4>
            </div>
          </>
        )}
      </div>

      <Footer />
    </DashboardLayout>
  );
}
