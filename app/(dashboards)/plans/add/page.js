"use client";
import PlanPageAddComponent from "components/Plan/PlanPageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PlanPageAddComponent);
export default ProtectedDashboardPage;
