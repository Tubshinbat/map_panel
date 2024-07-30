"use client";
import UserPageComponent from "components/User/UserPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(UserPageComponent);
export default ProtectedDashboardPage;
