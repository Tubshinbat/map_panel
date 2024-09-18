"use client";
import CityPositionComponent from "components/City/CityPosition";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(CityPositionComponent);
export default ProtectedDashboardPage;
