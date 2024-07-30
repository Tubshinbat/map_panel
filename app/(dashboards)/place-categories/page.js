"use client";
import PlaceCategoriesComponent from "components/Place/PlaceCategories";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PlaceCategoriesComponent);
export default ProtectedDashboardPage;
