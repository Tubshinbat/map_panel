"use client";
import DistrictAddComponent from "components/District/DistrictAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(DistrictAddComponent);
export default ProtectedDashboardPage;
