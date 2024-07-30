"use client";
import DashboardPageComponent from "components/Dashboard/DashboardPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(DashboardPageComponent);
export default ProtectedDashboardPage;
