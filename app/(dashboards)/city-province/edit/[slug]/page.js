"use client";
import CityPageEditComponent from "components/City/CityPageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(CityPageEditComponent);
export default ProtectedDashboardPage;
