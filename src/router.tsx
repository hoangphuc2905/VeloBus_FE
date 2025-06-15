import React from 'react';
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/user/HomePage";
import { ROUTER } from "./utils/router";
import MasterLayout from "./pages/user/theme/masterLayout";
import Login from "./component/Login";
import TicketSearch from "pages/user/TicketSearch";
import Introduce from "pages/user/Introduce";
import Contact from "pages/user/Contact";
import Schedule from "pages/user/Schedule";
import BookTicket from "pages/user/BookTicket";
import Profile from "pages/user/Profile";
import Payment from "pages/user/Profile/Payment";
import AccountInfo from "pages/user/Profile/AccountInfo";
import TicketHistory from "pages/user/Profile/TicketHistory";
import Address from "pages/user/Profile/Address";
import ResetPassword from "pages/user/Profile/ResetPassword";
import Guide from "pages/user/Guide";
import HomePageAdmin from "pages/admin/HomePageAdmin";
import AddTrip from "pages/admin/AddTrip";
import ManageTrips from "pages/admin/ManageTrips";
import ManageUsers from "pages/admin/ManageUsers";
import Statistics from "pages/admin/Statistics";

const UserRoutes: React.FC = () => (
  <Routes>
    {/* Các route người dùng */}
    <Route path={ROUTER.USER.HOME} element={<MasterLayout><HomePage /></MasterLayout>} />
    <Route path={ROUTER.USER.TICKET_SEARCH} element={<MasterLayout><TicketSearch /></MasterLayout>} />
    <Route path={ROUTER.USER.INTRODUCE} element={<MasterLayout><Introduce /></MasterLayout>} />
    <Route path={ROUTER.USER.CONTACT} element={<MasterLayout><Contact /></MasterLayout>} />
    <Route path={ROUTER.USER.SCHEDULE} element={<MasterLayout><Schedule /></MasterLayout>} />
    <Route path={ROUTER.USER.LOGIN} element={<MasterLayout><Login /></MasterLayout>} />
    <Route path={`${ROUTER.USER.BOOK_TICKET}/:tripId`} element={<MasterLayout><BookTicket /></MasterLayout>} />
    <Route path={ROUTER.USER.GUIDE} element={<MasterLayout><Guide /></MasterLayout>} />

    {/* Profile và các chức năng con */}
    <Route path={ROUTER.USER.PROFILE} element={<MasterLayout><Profile /></MasterLayout>}>
      <Route path={ROUTER.USER.PAYMENT} element={<Payment />} />
      <Route path={ROUTER.USER.ACCOUNT_INFO} element={<AccountInfo />} />
      <Route path={ROUTER.USER.TICKET_HISTORY} element={<TicketHistory />} />
      <Route path={ROUTER.USER.ADDRESS} element={<Address />} />
      <Route path={ROUTER.USER.RESET_PASSWORD} element={<ResetPassword />} />
    </Route>

    {/* Route Admin không có MasterLayout */}
    <Route path={ROUTER.ADMIN.HOMEADMIN} element={<HomePageAdmin />} />
    <Route path={ROUTER.ADMIN.ADDTRIP} element={<AddTrip />} />
    <Route path={ROUTER.ADMIN.MANAGETRIPS} element={<ManageTrips />} />
    <Route path={ROUTER.ADMIN.MANAGEUSERS} element={<ManageUsers />} />
    <Route path={ROUTER.ADMIN.STATISTICS} element={<Statistics />} />

    {/* Route fallback cho các đường dẫn không khớp */}
    <Route path="*" element={<MasterLayout><HomePage /></MasterLayout>} />
  </Routes>
);

export default UserRoutes; 