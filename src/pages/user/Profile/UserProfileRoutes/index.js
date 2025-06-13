import { Routes, Route } from "react-router-dom";
import ProfilePage from "pages/user/Profile";
import Payment from "../Payment";
import AccountInfo from "../AccountInfo";
import TicketHistory from "../TicketHistory";
import Address from "../Address";
import ResetPassword from "../ResetPassword";
import { ROUTER } from "utils/router";

export const UserProfileRoutes = () => (
  <Routes>
    <Route path={ROUTER.USER.PROFILE} element={<ProfilePage />}>
      <Route path={ROUTER.USER.PAYMENT} element={<Payment />} />
      <Route path={ROUTER.USER.ACCOUNT_INFO} element={<AccountInfo />} />
      <Route path={ROUTER.USER.TICKET_HISTORY} element={<TicketHistory />} />
      <Route path={ROUTER.USER.ADDRESS} element={<Address />} />
      <Route path={ROUTER.USER.RESET_PASSWORD} element={<ResetPassword />} />
    </Route>
  </Routes>
);
