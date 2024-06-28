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
        <div className="border-container">
          <MDButton
            rel="noreferrer"
            variant="gradient"
            style={{
              background: "transparent",
            }}
            className="border"
          >
            Kindly Login
          </MDButton>
        </div>
      </MenuItem>
    </div>
  );
};

export default Login;
