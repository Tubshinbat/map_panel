"use client";
import PolygonPageAddComponent from "components/Polygon/PolygonAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PolygonPageAddComponent);
export default ProtectedDashboardPage;
