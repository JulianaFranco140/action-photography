"use client";

import { useEffect } from "react";
import styles from "./AdminSidebar.module.css";

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  items: string[];
  activeItem?: string;
};

export default function AdminSidebar({ isOpen, onClose, items, activeItem = "Dashboard" }: AdminSidebarProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`} onClick={onClose} />

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`} aria-hidden={!isOpen}>
        <div className={styles.sidebarBrandWrap}>
          <img src="/Logo Action Blanco.svg" alt="Action Photography" className={styles.actionLogo} />
          <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Cerrar menu admin">
            x
          </button>
        </div>

        <p className={styles.sidebarBrand}>Admin Panel</p>

        <nav className={styles.nav}>
          {items.map((item) => (
            <button
              key={item}
              type="button"
              className={`${styles.navItem} ${item === activeItem ? styles.navItemActive : ""}`}
            >
              {item}
            </button>
          ))}
        </nav>

        <div className={styles.adminUser}>
          <span className={styles.adminInitials}>AD</span>
          <div>
            <p className={styles.adminName}>Admin User</p>
            <p className={styles.adminMail}>admin@example.com</p>
          </div>
        </div>
      </aside>
    </>
  );
}
