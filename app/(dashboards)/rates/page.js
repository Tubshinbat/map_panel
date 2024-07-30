"use client";
import RatePageComponent from "components/Rate/RatePage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(RatePageComponent);
export default ProtectedDashboardPage;
