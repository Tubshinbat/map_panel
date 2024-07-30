"use client";
import PlanPageEditComponent from "components/Plan/PlanPageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(PlanPageEditComponent);
export default ProtectedDashboardPage;
