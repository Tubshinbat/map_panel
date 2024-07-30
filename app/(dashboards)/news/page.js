"use client";
import NewsPageComponent from "components/News/NewsPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(NewsPageComponent);
export default ProtectedDashboardPage;
