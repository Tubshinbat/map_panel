"use client";
import KhorooAddComponent from "components/Khoroo/KhorooAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(KhorooAddComponent);
export default ProtectedDashboardPage;
