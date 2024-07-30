"use client";
import PlacePageAddComponent from "components/Place/PlacePageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PlacePageAddComponent);
export default ProtectedDashboardPage;
