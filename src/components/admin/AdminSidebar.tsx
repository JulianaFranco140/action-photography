"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import styles from "./AdminSidebar.module.css";

export type AdminNavItem = {
  label: string;
  href?: string;
};

type AdminSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  items: Array<AdminNavItem | string>;
  activeItem?: string;
};

export default function AdminSidebar({ isOpen, onClose, items, activeItem = "Dashboard" }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const handleCancelLogout = () => {
    setIsLogoutModalOpen(false);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    onClose();
    router.push("/");
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isLogoutModalOpen) {
          setIsLogoutModalOpen(false);
          return;
        }

        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isLogoutModalOpen, onClose]);

  return (
    <>
      <button
        type="button"
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ""}`}
        onClick={onClose}
        aria-label="Cerrar menu admin"
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.sidebarBrandWrap}>
          <img src="/Logo Action Blanco.svg" alt="Action Photography" className={styles.actionLogo} />
          <button type="button" onClick={onClose} className={styles.closeButton} aria-label="Cerrar menu admin">
            x
          </button>
        </div>

        <p className={styles.sidebarBrand}>Admin Panel</p>

        <nav className={styles.nav}>
          {items.map((item, index) => {
            const normalizedItem = typeof item === "string" ? { label: item } : item;
            const itemKey = `${normalizedItem.label}-${index}`;
            const isActive =
              normalizedItem.label === activeItem ||
              (typeof normalizedItem.href === "string" && pathname === normalizedItem.href);

            return normalizedItem.href ? (
              <a
                key={itemKey}
                href={normalizedItem.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
                onClick={onClose}
              >
                {normalizedItem.label}
              </a>
            ) : (
              <button
                key={itemKey}
                type="button"
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}
              >
                {normalizedItem.label}
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.adminUser}>
            <span className={styles.adminInitials}>AD</span>
            <div>
              <p className={styles.adminName}>Admin User</p>
              <p className={styles.adminMail}>admin@example.com</p>
            </div>
          </div>

          <button type="button" className={styles.logoutButton} onClick={handleOpenLogoutModal}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {isLogoutModalOpen ? (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-labelledby="logout-modal-title">
          <div className={styles.modalCard}>
            <h3 id="logout-modal-title" className={styles.modalTitle}>
              Confirmar cierre de sesión
            </h3>
            <p className={styles.modalText}>¿Seguro que quieres cerrar sesion y volver al inicio?</p>
            <div className={styles.modalActions}>
              <button type="button" className={styles.modalCancelButton} onClick={handleCancelLogout}>
                Cancelar
              </button>
              <button type="button" className={styles.modalConfirmButton} onClick={handleConfirmLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
