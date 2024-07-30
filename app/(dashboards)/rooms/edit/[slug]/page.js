"use client";
import RoomPageEditComponent from "components/Room/RoomPageEdit";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(RoomPageEditComponent);
export default ProtectedDashboardPage;
