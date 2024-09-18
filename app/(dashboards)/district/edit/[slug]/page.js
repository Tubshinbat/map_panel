"use client";
import DistrictEditComponent from "components/District/DistrictEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(DistrictEditComponent);
export default ProtectedDashboardPage;
