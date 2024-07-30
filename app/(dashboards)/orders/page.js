"use client";
import OrderPageComponent from "components/Order/OrderPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(OrderPageComponent);
export default ProtectedDashboardPage;
