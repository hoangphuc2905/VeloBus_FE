import React, { useState, useEffect } from "react";
import { FaArrowUp, FaComment } from "react-icons/fa";
import { BsFillChatQuoteFill } from "react-icons/bs";
import "./style.scss";
import Chat from "../Chat";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = (): void => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleChat = (): void => {
    setIsChatOpen(!isChatOpen);
  };

  const openZalo = (): void => {
    window.open("https://zalo.me/0368564833", "_blank");
  };

  return (
    <>
      <div className="scroll-to-top">
        <button
          onClick={toggleChat}
          className="chat-button"
          aria-label="Open chat"
        >
          <FaComment />
        </button>
        <button
          onClick={openZalo}
          className="chat-button"
          aria-label="Open Zalo"
        >
          <BsFillChatQuoteFill />
        </button>
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="scroll-button"
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        )}
      </div>
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default ScrollToTopButton; 