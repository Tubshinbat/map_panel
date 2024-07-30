"use client";
import OrderPageAddComponent from "components/Order/OrderPageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(OrderPageAddComponent);
export default ProtectedDashboardPage;
