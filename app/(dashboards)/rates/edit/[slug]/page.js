"use client";
import RatePageEditComponent from "components/Rate/RatePageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(RatePageEditComponent);
export default ProtectedDashboardPage;
