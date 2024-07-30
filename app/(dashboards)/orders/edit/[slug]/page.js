"use client";
import OrderPageEditComponent from "components/Order/OrderPageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(OrderPageEditComponent);
export default ProtectedDashboardPage;
