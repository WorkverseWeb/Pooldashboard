import React from "react";
import brandWhite from "assets/images/login-icon-img.png";

const Login = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img src={brandWhite} alt="Login Icon" style={{ width: "200px", height: "125px" }} />
      <div>Kindly login !!</div>
    </div>
  );
};

export default Login;
