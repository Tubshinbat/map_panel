"use client";
import RatePageAddComponent from "components/Rate/RatePageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(RatePageAddComponent);
export default ProtectedDashboardPage;
