"use client";
import CityPageComponent from "components/City/CityPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(CityPageComponent);
export default ProtectedDashboardPage;
