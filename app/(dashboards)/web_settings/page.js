"use client";
import WebSettingsPageComponent from "components/WebSettings/WebSettingsPage";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(WebSettingsPageComponent);
export default ProtectedDashboardPage;
