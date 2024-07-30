"use client";
import QpayPageComponent from "components/Paid/QpayPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(QpayPageComponent);
export default ProtectedDashboardPage;
