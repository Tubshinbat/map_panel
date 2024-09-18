"use client";
import DistrictPageComponent from "components/District/DistrictPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(DistrictPageComponent);
export default ProtectedDashboardPage;
