"use client";
import PlanPageComponent from "components/Plan/PlanPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PlanPageComponent);
export default ProtectedDashboardPage;
