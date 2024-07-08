"use client";

import LoginPageComponent from "components/Login/LoginPage";
import withAuth from "hoc/withAuth";

const ProtectedLoginPage = withAuth(LoginPageComponent, "/dashboard");
export default ProtectedLoginPage;
