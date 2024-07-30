"use client";
import UserPageEditComponent from "components/User/UserPageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(UserPageEditComponent);
export default ProtectedDashboardPage;
