// React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import brandDark from "assets/images/purchase-card-img.avif";
import brandWhite from "assets/images/employee-man-alt.svg";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";

export default function Purchase() {
  const getdata = useSelector((state) => state.cartreducer.carts);
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div style={{ textAlign: "end", padding: "20px 20px 0 20px" }}>
        <Link to="/cart" type="button" className="cart" style={{ position: "relative" }}>
          <Icon fontSize="large" style={{ color: "#0bb08c" }}>
            shopping_cart
          </Icon>
          <span
            style={{
              position: "absolute",
              top: "-20px",
              left: "20px",
              background: "red",
              borderRadius: "20px",
              fontSize: "12px",
              width: "17px",
              height: "17px",
              textAlign: "center",
              color: "#fff",
            }}
          >
            {getdata.length}
          </span>
        </Link>
      </div>

      {/* <Link to="/cart" type="button" className="btn  position-relative">
            <i className="fa-solid fa-cart-shopping cart"></i>
            <span className="position-absolute top-10 start-90 translate-middle badge rounded-pill bg-danger">
              {getdata.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </Link> */}

      <div style={{ padding: "0 0 40px 0", display: "flex", gap: "40px" }}>
        <div>
          <h4 style={{ marginBottom: "10px" }}>Whole Game :</h4>
          <Card sx={{ maxWidth: 345 }} style={{ position: "sticky", top: "0" }}>
            <CardMedia sx={{ height: 240 }} mb={3}>
              <img
                src={brandDark}
                alt="img"
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            </CardMedia>

            <CardContent style={{ color: "#fff", padding: "20px" }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>

              <Typography variant="body2" style={{ lineHeight: "normal" }}>
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica Lizards are a widespread group of
                squamate reptiles, with over 6,000 species, ranging across all continents except
                Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000.
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
                }}
              >
                Share
              </Button>
              <Button
                size="small"
                style={{
                  fontWeight: "300",
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
              >
                Learn
              </Button>
            </CardActions>

            <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
            <CardActions
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "15px 25px ",
                gap: "40px",
              }}
            >
              <button className="purchase-delete">-</button>
              <p style={{ color: "#fff" }}>0</p>
              <button className="purchase-add">+</button>
            </CardActions>
          </Card>
        </div>

        <div>
          <h4 style={{ marginBottom: "10px" }}>Skills :</h4>
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexDirection: "column",
              flex: "1 0 auto",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>

                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px", padding: "20px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{ color: "#fff", fontSize: "13px", lineHeight: "normal" }}
                  >
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between", padding: "0 8px" }}>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    style={{
                      fontWeight: "300",
                      textTransform: "capitalize",
                      fontSize: "14px",
                    }}
                  >
                    Learn
                  </Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "15px 15px ",
                    gap: "30px",
                  }}
                >
                  <button className="purchase-delete">-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button className="purchase-add">+</button>
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </DashboardLayout>
  );
}
