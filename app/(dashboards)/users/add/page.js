"use client";
import UserPageAddComponent from "components/User/UserPageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(UserPageAddComponent);
export default ProtectedDashboardPage;
