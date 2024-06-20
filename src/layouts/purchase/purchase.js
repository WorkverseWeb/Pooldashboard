// React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import brandDark from "assets/images/purchase-card-img.avif";
import brandWhite from "assets/images/employee-man-alt.svg";
import Divider from "@mui/material/Divider";

// redux
import { useDispatch, useSelector } from "react-redux";
import Cardsdata from "layouts/cart/cardData";
import { ADD, REMOVE, DLT } from "../../redux/actions/action";

// react
import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";

import Login from "layouts/login";
import { useAuth0 } from "@auth0/auth0-react";
import MDBox from "components/MDBox";

// react mui
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import typography from "assets/theme/base/typography";
import Icon from "@mui/material/Icon";
import { Functions } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Purchase() {
  const getdata = useSelector((state) => state.cartreducer.carts);

  const [data, setData] = useState(Cardsdata);
  const dispatch = useDispatch();

  const send = (e) => {
    dispatch(ADD(e));
    toast.success("Item added!");
  };

  // remove one
  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  // delete btn
  const dlt = (id) => {
    dispatch(DLT(id));
  };

  // const getQuantity = (id) => {
  //   const item = getdata.find((i) => i.id === id);
  //   return item ? item.qnty : 0;
  // };

  // auth0
  const { isAuthenticated } = useAuth0();

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
          <>
            <div style={{ textAlign: "end", padding: "20px 20px 0 20px" }}>
              <Link to="/cart" type="button" className="cart" style={{ position: "relative" }}>
                <Icon fontSize="large" style={{ color: "#fff" }}>
                  shopping_cart
                </Icon>
                <span
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "20px",
                    background: "#9ce325",
                    borderRadius: "20px",
                    fontSize: "12px",
                    width: "17px",
                    height: "17px",
                    textAlign: "center",
                    color: "black",
                    fontWeight: "600",
                  }}
                >
                  {getdata.length}
                </span>
              </Link>
            </div>
            <div style={{ paddingBottom: "40px" }}>
              {data.map((e, index) => (
                <div style={{ display: "flex", gap: "40px" }} key={e.id}>
                  {index === 0 && (
                    <>
                      <div>
                        <h4 style={{ marginBottom: "10px" }}>Whole Game :</h4>
                        <Card
                          sx={{ maxWidth: 345 }}
                          style={{
                            position: "sticky",
                            top: "0",
                          }}
                          className="border-container-bottom"
                        >
                          <div className="border-bottom" style={{ padding: "0" }}>
                            <CardMedia sx={{ height: 240 }} mb={3}>
                              <img
                                src={brandDark}
                                alt="img"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  borderRadius: "10px",
                                }}
                              />
                            </CardMedia>

                            <CardContent style={{ color: "#fff", padding: "20px" }}>
                              <Typography gutterBottom variant="h5" component="div">
                                {e.title}
                              </Typography>

                              <Typography variant="body2" style={{ lineHeight: "normal" }}>
                                {e.content}
                              </Typography>
                            </CardContent>
                            <CardActions
                              style={{
                                justifyContent: "space-between",
                                padding: "0 8px",
                              }}
                            >
                              <Button
                                size="small"
                                style={{
                                  fontWeight: "300",
                                  textTransform: "capitalize",
                                  fontSize: "14px",
                                  color: "#fff",
                                }}
                              >
                                Learn
                              </Button>
                              <Button
                                size="small"
                                style={{
                                  fontWeight: "300",
                                  textTransform: "capitalize",
                                  fontSize: "14px",
                                  color: "#9ce325",
                                }}
                              >
                                ₹ {e.price} /-
                              </Button>
                            </CardActions>

                            <Divider
                              orientation="horizontal"
                              sx={{ ml: -2 }}
                              style={{ margin: "0" }}
                            />
                            <CardActions
                              style={{
                                width: "35%",
                                padding: "0",
                                margin: "20px auto",
                              }}
                              className="border-container"
                            >
                              <button
                                style={{
                                  fontFamily: typography.fontFamily,
                                  padding: "10px",
                                }}
                                className="border"
                                onClick={() => send(e)}
                              >
                                Add to Cart
                              </button>
                            </CardActions>
                          </div>
                        </Card>
                      </div>
                      <div>
                        <h4 style={{ marginBottom: "10px" }}>Skills :</h4>
                        <div
                          style={{
                            display: "grid",
                            gap: "20px",
                            gridTemplateColumns: "repeat(3, 1fr)",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {data.slice(1).map((item) => (
                            <Card
                              sx={{ maxWidth: 200 }}
                              key={item.id}
                              className="border-container-bottom"
                            >
                              <div className="border-bottom" style={{ padding: "0" }}>
                                <CardMedia sx={{ height: 100 }} mb={3}>
                                  <img
                                    src={brandDark}
                                    alt="img"
                                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                                  />
                                </CardMedia>
                                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                                  <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                  </Typography>

                                  <Typography
                                    variant="body2"
                                    style={{
                                      color: "#fff",
                                      fontSize: "13px",
                                      lineHeight: "normal",
                                    }}
                                  >
                                    {item.content2}
                                  </Typography>
                                </CardContent>
                                <CardActions
                                  style={{ justifyContent: "space-between", padding: "0 8px" }}
                                >
                                  <Button
                                    size="small"
                                    style={{
                                      fontWeight: "300",
                                      textTransform: "capitalize",
                                      fontSize: "14px",
                                      color: "#fff",
                                    }}
                                  >
                                    Learn
                                  </Button>
                                  <Button
                                    size="small"
                                    style={{
                                      fontWeight: "300",
                                      textTransform: "capitalize",
                                      fontSize: "14px",
                                      color: "#9ce325",
                                    }}
                                  >
                                    ₹ {item.price} /-
                                  </Button>
                                </CardActions>
                                <Divider
                                  orientation="horizontal"
                                  sx={{ ml: -2 }}
                                  style={{ margin: "0" }}
                                />

                                <CardActions
                                  style={{
                                    width: "60%",
                                    margin: "20px auto",
                                    padding: "0",
                                  }}
                                  className="border-container"
                                >
                                  <button
                                    className="border"
                                    style={{ padding: "10px", fontFamily: typography.fontFamily }}
                                    onClick={() => send(item)}
                                  >
                                    Add to Cart
                                  </button>
                                </CardActions>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <Login />
        )}
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}
