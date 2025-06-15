import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Chat from "../Chat";
import ScrollToTopButton from "../ScrollToTopButton";
import "./style.scss";

interface MasterLayoutProps {
  children?: React.ReactNode;
}

const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  return (
    <div className="master-layout">
      <Header />
      <main className="master-layout-content">
        {children}
      </main>
      <Footer />
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <ScrollToTopButton />
    </div>
  );
};

export default MasterLayout; 