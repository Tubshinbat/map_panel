"use client";
import KhorooEditComponent from "components/Khoroo/KhorooEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(KhorooEditComponent);
export default ProtectedDashboardPage;
