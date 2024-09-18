"use client";
import CityPageAddComponent from "components/City/CityPageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(CityPageAddComponent);
export default ProtectedDashboardPage;
