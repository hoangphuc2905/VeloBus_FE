import { memo } from "react";
import Header from "../Header";
import Footer from "../Footer";
import ScrollToTopButton from "../ScrollToTopButton";
import Chat from "../Chat";

const MasterLayout = ({ children, ...props }) => {
  return (
    <div {...props}>
      <Header />
      {children}
      <Footer />
      <Chat />
      <ScrollToTopButton />
    </div>
  );
};

export default memo(MasterLayout);
