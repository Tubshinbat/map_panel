"use client";
import PlacePageComponent from "components/Place/PlacePage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PlacePageComponent);
export default ProtectedDashboardPage;
