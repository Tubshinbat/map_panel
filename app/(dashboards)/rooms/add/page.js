"use client";
import RoomPageAddComponent from "components/Room/RoomPageAdd";
import withAuth from "hoc/withAuth";

const ProtectedDashboardPage = withAuth(RoomPageAddComponent);
export default ProtectedDashboardPage;
