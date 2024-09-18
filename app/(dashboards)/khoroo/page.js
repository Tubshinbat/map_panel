"use client";
import KhorooPageComponent from "components/Khoroo/KhorooPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(KhorooPageComponent);
export default ProtectedDashboardPage;
