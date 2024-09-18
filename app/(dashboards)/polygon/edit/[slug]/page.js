"use client";
import PolygonPageEditComponent from "components/Polygon/PolygonEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PolygonPageEditComponent);
export default ProtectedDashboardPage;
