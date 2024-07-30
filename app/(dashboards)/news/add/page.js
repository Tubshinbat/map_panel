"use client";
import NewsPageAddComponent from "components/News/NewsPageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(NewsPageAddComponent);
export default ProtectedDashboardPage;
