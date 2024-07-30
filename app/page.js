"use client";
import "bootstrap/dist/css/bootstrap.css";
import "public/assets/css/styles.css";

import LoginPageComponent from "components/Login/LoginPage";
import withAuth from "hoc/withAuth";

const ProtectedLoginPage = withAuth(LoginPageComponent, "/dashboard");
export default ProtectedLoginPage;
