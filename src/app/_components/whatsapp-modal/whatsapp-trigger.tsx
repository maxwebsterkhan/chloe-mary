"use client";

import { useEffect } from "react";
import AnimatedUnderline from "../animated-underline/animated-underline";
import styles from "./whatsapp-modal.module.scss";

interface WhatsAppTriggerProps {
  whatsappUrl: string;
  className?: string;
}

export default function WhatsAppTrigger({
  whatsappUrl,
  className,
}: WhatsAppTriggerProps) {
  useEffect(() => {
    const trigger = document.querySelector("[data-whatsapp-modal-trigger]");
    const modal = document.querySelector("[data-whatsapp-modal]");

    if (!trigger || !modal) return;

    const handleClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const isActive =
        modal.getAttribute("data-whatsapp-modal-status") === "active";
      modal.setAttribute(
        "data-whatsapp-modal-status",
        isActive ? "not-active" : "active"
      );
    };

    trigger.addEventListener("click", handleClick);

    return () => {
      trigger.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <AnimatedUnderline
        href="#"
        as="a"
        className={className}
        data-whatsapp-modal-trigger
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        aria-label="Open WhatsApp QR code modal"
      >
        WHATSAPP
      </AnimatedUnderline>
      {/* Hidden overlay link for touch devices */}
      <a
        data-whatsapp-modal-link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.whatsappModal__overlayLink}
        aria-hidden="true"
        style={{ display: "none" }}
      />
    </>
  );
}
