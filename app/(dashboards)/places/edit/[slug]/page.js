"use client";
import PlacePageEditComponent from "components/Place/PlacePageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PlacePageEditComponent);
export default ProtectedDashboardPage;
