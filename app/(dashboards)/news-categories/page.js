"use client";
import NewsCategoriesComponent from "components/News/NewsCategories";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(NewsCategoriesComponent);
export default ProtectedDashboardPage;
