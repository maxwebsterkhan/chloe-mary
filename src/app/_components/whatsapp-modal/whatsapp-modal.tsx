"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Script from "next/script";
import styles from "./whatsapp-modal.module.scss";

// Declare kjua as a global function
declare global {
  interface Window {
    kjua: (options: {
      text: string;
      render: string;
      crisp: boolean;
      minVersion: number;
      ecLevel: string;
      size: number;
      fill: string;
      back: string;
      rounded: number;
    }) => SVGElement;
  }
}

interface WhatsAppModalProps {
  whatsappUrl: string;
}

export default function WhatsAppModal({ whatsappUrl }: WhatsAppModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const qrCanvasRef = useRef<HTMLDivElement>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (typeof window.kjua === "function") {
      setScriptLoaded(true);
    }
  }, []);

  const generateQRCode = useCallback(
    (isDark: boolean) => {
      if (!window.kjua || !qrCanvasRef.current) return;

      const svg = window.kjua({
        text: whatsappUrl,
        render: "svg",
        crisp: true,
        minVersion: 1,
        ecLevel: "M",
        size: 540,
        fill: isDark ? "#FFFFFF" : "#000000",
        back: isDark ? "transparent" : "#FFFFFF",
        rounded: 0,
      });

      // Let CSS control sizing
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.removeAttribute("style");

      qrCanvasRef.current.innerHTML = "";
      qrCanvasRef.current.appendChild(svg);
    },
    [whatsappUrl]
  );

  useEffect(() => {
    if (
      !scriptLoaded ||
      !window.kjua ||
      !modalRef.current ||
      !qrCanvasRef.current
    )
      return;

    const isDark =
      document.documentElement.getAttribute("data-theme-status") === "dark";
    generateQRCode(isDark);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme-status"
        ) {
          const isDarkNow =
            document.documentElement.getAttribute("data-theme-status") ===
            "dark";
          generateQRCode(isDarkNow);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme-status"],
    });

    // Add the link to all elements with [data-whatsapp-modal-link] attribute
    const linkElements = modalRef.current.querySelectorAll(
      "[data-whatsapp-modal-link]"
    );
    linkElements.forEach((linkEl) => {
      if (linkEl instanceof HTMLAnchorElement) {
        linkEl.setAttribute("href", whatsappUrl);
        linkEl.setAttribute("target", "_blank");
        linkEl.setAttribute("rel", "noopener noreferrer");
      }
    });

    // Toggle open/close the modal
    const toggleButtons = modalRef.current.querySelectorAll(
      "[data-whatsapp-modal-toggle]"
    );
    toggleButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!modalRef.current) return;
        const isActive =
          modalRef.current.getAttribute("data-whatsapp-modal-status") ===
          "active";
        modalRef.current.setAttribute(
          "data-whatsapp-modal-status",
          isActive ? "not-active" : "active"
        );
      });
    });

    // Close on ESC key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        if (modalRef.current) {
          modalRef.current.setAttribute(
            "data-whatsapp-modal-status",
            "not-active"
          );
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      toggleButtons.forEach((btn) => {
        btn.removeEventListener("click", () => {});
      });
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [whatsappUrl, scriptLoaded, generateQRCode]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/kjua@0.10.0/dist/kjua.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          setScriptLoaded(true);
        }}
      />
      <div
        ref={modalRef}
        data-whatsapp-modal={whatsappUrl}
        data-whatsapp-modal-status="not-active"
        className={styles.whatsappModal}
      >
        <div
          data-whatsapp-modal-toggle
          className={styles.whatsappModal__dark}
        />
        <div className={styles.whatsappModal__card}>
          <div
            ref={qrCanvasRef}
            data-whatsapp-modal-qr-canvas
            className={styles.whatsappModal__qrCanvas}
          />
          <div className={styles.whatsappModal__text}>
            <h2 className={styles.whatsappModal__h2}>WhatsApp us</h2>
            <p className={styles.whatsappModal__p}>
              Scan the QR Code to chat with our staff via your smartphone.
            </p>
          </div>
          <a
            data-whatsapp-modal-link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsappModal__btn}
          >
            <span className={styles.whatsappModal__btnSpan}>
              or chat via desktop
            </span>
          </a>
          <div
            data-hover
            data-whatsapp-modal-toggle
            className={styles.whatsappModal__close}
          >
            <div className={styles.whatsappModal__closeBar} />
            <div
              className={`${styles.whatsappModal__closeBar} ${styles.isDuplicate}`}
            />
          </div>
        </div>
      </div>
    </>
  );
}
