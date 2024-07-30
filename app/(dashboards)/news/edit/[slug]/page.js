"use client";
import NewsPageEditComponent from "components/News/NewsPageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(NewsPageEditComponent);
export default ProtectedDashboardPage;
