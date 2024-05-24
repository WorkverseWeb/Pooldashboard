// React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import brandDark from "assets/images/purchase-card-img.avif";
import brandWhite from "assets/images/employee-man-alt.svg";
import Divider from "@mui/material/Divider";

import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Purchase() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <div style={{ padding: "40px 0 ", display: "flex", gap: "40px" }}>
        <div>
          <h4 style={{ marginBottom: "10px" }}>Whole Game :</h4>
          <Card sx={{ maxWidth: 345, height: 1100 }}>
            <CardMedia sx={{ height: 240 }} mb={3}>
              <img
                src={brandDark}
                alt="img"
                style={{ width: "100%", height: "100%", borderRadius: "10px" }}
              />
            </CardMedia>

            <CardContent style={{ color: "#fff", height: "100%" }}>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                ranging across all continents except Antarctica Lizards are a widespread group of
                squamate reptiles, with over 6,000 species, ranging across all continents except
                Antarctica Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica Lizards are a widespread
                group of squamate reptiles, with over 6,000 species, ranging across all continents
                except Antarctica
              </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "space-between" }}>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
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
              <button>-</button>
              <p style={{ color: "#fff" }}>0</p>
              <button>+</button>
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
              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
                </CardActions>
              </Card>

              <Card sx={{ maxWidth: 200, height: 370 }}>
                <CardMedia sx={{ height: 100 }} mb={3}>
                  <img
                    src={brandDark}
                    alt="img"
                    style={{ width: "100%", height: "100%", borderRadius: "10px" }}
                  />
                </CardMedia>

                <CardContent style={{ paddingBottom: "10px" }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" style={{ color: "#fff", fontSize: "13px" }}>
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                    ranging across all continents
                  </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "space-between" }}>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn</Button>
                </CardActions>
                <Divider orientation="horizontal" sx={{ ml: -2 }} style={{ margin: "0" }} />
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px 25px ",
                    gap: "40px",
                  }}
                >
                  <button>-</button>
                  <p style={{ color: "#fff" }}>0</p>
                  <button>+</button>
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
