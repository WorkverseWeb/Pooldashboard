import React from "react";
import MDButton from "components/MDButton";
import { useAuth0 } from "@auth0/auth0-react";
import MenuItem from "@mui/material/MenuItem";
import brandWhite from "assets/images/login-icon-img.png";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div style={{ textAlign: "center" }}>
      <img src={brandWhite} alt="Login Icon" style={{ width: "200px", height: "125px" }} />

      <MenuItem onClick={() => loginWithRedirect()} style={{ justifyContent: "center" }}>
        <MDButton
          rel="noreferrer"
          variant="gradient"
          style={{
            boxShadow: "none",
            fontSize: "15px",
            fontWeight: "500",
            background: "transparent",
            justifyContent: "start",
            padding: "0",
          }}
        >
          Kindly Login
        </MDButton>
      </MenuItem>
    </div>
  );
};

export default Login;
