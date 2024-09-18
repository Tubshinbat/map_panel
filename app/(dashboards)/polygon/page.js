"use client";
import PolygonPageComponent from "components/Polygon/Polygon";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PolygonPageComponent);
export default ProtectedDashboardPage;
