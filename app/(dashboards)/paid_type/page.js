"use client";
import BankAccountPageComponent from "components/Paid/BankAccountPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(BankAccountPageComponent);
export default ProtectedDashboardPage;
