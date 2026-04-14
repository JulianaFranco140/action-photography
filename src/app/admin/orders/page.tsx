"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import AdminSidebar, { type AdminNavItem } from "@/components/admin/AdminSidebar";

type OrderStatus = "Pagada" | "Pendiente" | "En revision" | "Reembolsada";
type PurchaseStep = { label: string; date: string; done: boolean };
type TopProduct = { name: string; units: number; revenue: number };

type Order = {
  id: string;
  customer: string;
  event: string;
  items: number;
  total: number;
  orderDate: string;
  paymentStatus: OrderStatus;
  fulfillmentStatus: "Entregada" | "En proceso" | "Pendiente";
  tracking: PurchaseStep[];
};

const navItems: AdminNavItem[] = [
  { label: "Inicio", href: "/admin" },
  { label: "Ordenes", href: "/admin/orders" },
  { label: "Productos" },
  { label: "Clientes" },
  { label: "Reportes" },
  { label: "Configuracion" },
];

const orders: Order[] = [
  {
    id: "ORD-10491",
    customer: "Maria Garcia",
    event: "Elite Nationals",
    items: 3,
    total: 1160000,
    orderDate: "2026-04-11",
    paymentStatus: "Pagada",
    fulfillmentStatus: "Entregada",
    tracking: [
      { label: "Compra confirmada", date: "11 Abr 2026 - 09:14", done: true },
      { label: "Pago validado", date: "11 Abr 2026 - 09:15", done: true },
      { label: "Material procesado", date: "11 Abr 2026 - 10:02", done: true },
      { label: "Contenido entregado", date: "11 Abr 2026 - 10:08", done: true },
    ],
  },
  {
    id: "ORD-10490",
    customer: "Carlos Rodriguez",
    event: "World of Dance 2025",
    items: 2,
    total: 715000,
    orderDate: "2026-04-10",
    paymentStatus: "Pendiente",
    fulfillmentStatus: "Pendiente",
    tracking: [
      { label: "Compra creada", date: "10 Abr 2026 - 16:31", done: true },
      { label: "Pago en espera", date: "10 Abr 2026 - 16:32", done: true },
      { label: "Validacion manual", date: "En cola", done: false },
      { label: "Entrega final", date: "Pendiente", done: false },
    ],
  },
  {
    id: "ORD-10488",
    customer: "Ana Martinez",
    event: "Masters Super Cheer",
    items: 5,
    total: 1680000,
    orderDate: "2026-04-09",
    paymentStatus: "En revision",
    fulfillmentStatus: "En proceso",
    tracking: [
      { label: "Compra confirmada", date: "09 Abr 2026 - 13:45", done: true },
      { label: "Pago en revision", date: "09 Abr 2026 - 13:50", done: true },
      { label: "Control antifraude", date: "En progreso", done: false },
      { label: "Liberacion y entrega", date: "Pendiente", done: false },
    ],
  },
  {
    id: "ORD-10481",
    customer: "Juan Lopez",
    event: "Summer Spirit Open",
    items: 1,
    total: 220000,
    orderDate: "2026-04-05",
    paymentStatus: "Reembolsada",
    fulfillmentStatus: "Pendiente",
    tracking: [
      { label: "Compra confirmada", date: "05 Abr 2026 - 18:02", done: true },
      { label: "Pago validado", date: "05 Abr 2026 - 18:04", done: true },
      { label: "Solicitud de reembolso", date: "06 Abr 2026 - 11:20", done: true },
      { label: "Reembolso completado", date: "06 Abr 2026 - 14:10", done: true },
    ],
  },
];

const topProducts: TopProduct[] = [
  { name: "Foto individual HD", units: 432, revenue: 7344000 },
  { name: "Pack Duo", units: 188, revenue: 15040000 },
  { name: "Pack Premium", units: 121, revenue: 18150000 },
  { name: "Pack Familiar", units: 79, revenue: 14220000 },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value);
}

export default function AdminOrdersPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState<"Todas" | OrderStatus>("Todas");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    if (filter === "Todas") {
      return orders;
    }
    return orders.filter((order) => order.paymentStatus === filter);
  }, [filter]);

  const selectedOrder = useMemo(
    () => orders.find((order) => order.id === selectedOrderId) ?? null,
    [selectedOrderId],
  );

  const totalSales = orders.reduce((acc, order) => acc + order.total, 0);
  const pendingCount = orders.filter((order) => order.paymentStatus === "Pendiente").length;
  const reviewCount = orders.filter((order) => order.paymentStatus === "En revision").length;

  useEffect(() => {
    if (!isTrackingModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsTrackingModalOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isTrackingModalOpen]);

  const handleViewTracking = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsTrackingModalOpen(true);
  };

  return (
    <div className={styles.page}>
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        items={navItems}
        activeItem="Ordenes"
      />

      <main className={styles.main}>
        <section className={styles.content}>
          <div className={styles.titleRow}>
            <button
              type="button"
              className={styles.sidebarIconButton}
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Abrir sidebar"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 4H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M3 14H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div>
              <h1>Ordenes</h1>
              <p className={styles.subtitle}>Vista completa de ventas, pendientes y seguimiento de compras.</p>
            </div>
          </div>

          <section className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <p>Total ventas</p>
              <strong>{formatCurrency(totalSales)}</strong>
            </article>
            <article className={styles.summaryCard}>
              <p>Ordenes pendientes</p>
              <strong>{pendingCount}</strong>
            </article>
            <article className={styles.summaryCard}>
              <p>Ordenes en revision</p>
              <strong>{reviewCount}</strong>
            </article>
          </section>

          <section className={styles.panelCard}>
            <div className={styles.panelHeader}>
              <h2>Listado de ventas</h2>
              <div className={styles.filters}>
                {(["Todas", "Pagada", "Pendiente", "En revision", "Reembolsada"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setFilter(item)}
                    className={`${styles.filterChip} ${filter === item ? styles.filterChipActive : ""}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Cliente</th>
                    <th>Evento</th>
                    <th>Fecha</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Pago</th>
                    <th>Seguimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className={order.id === selectedOrderId ? styles.selectedOrderRow : ""}
                    >
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.event}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.items}</td>
                      <td>{formatCurrency(order.total)}</td>
                      <td>
                        <span className={`${styles.statusPill} ${styles[`status_${order.paymentStatus.replace(" ", "_")}`]}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={styles.trackButton}
                          onClick={() => handleViewTracking(order.id)}
                          aria-haspopup="dialog"
                        >
                          Ver tracking
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={styles.bottomGrid}>
            <article className={styles.panelCard}>
              <h2>Pendientes por atender</h2>
              <ul className={styles.pendingList}>
                {orders
                  .filter((order) => order.paymentStatus === "Pendiente" || order.paymentStatus === "En revision")
                  .map((order) => (
                    <li key={order.id} className={styles.pendingRow}>
                      <div>
                        <p>{order.id}</p>
                        <span>{order.customer}</span>
                      </div>
                      <strong>{order.paymentStatus}</strong>
                    </li>
                  ))}
              </ul>
            </article>

            <article className={styles.panelCard}>
              <h2>Top productos vendidos</h2>
              <ul className={styles.topProductsList}>
                {topProducts.map((product) => (
                  <li key={product.name} className={styles.topProductRow}>
                    <div>
                      <p>{product.name}</p>
                      <span>{product.units} ventas</span>
                    </div>
                    <strong>{formatCurrency(product.revenue)}</strong>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        </section>
      </main>

      {isTrackingModalOpen && selectedOrder ? (
        <div className={styles.modalOverlay}>
          <button
            type="button"
            className={styles.modalBackdrop}
            aria-label="Cerrar modal de tracking"
            onClick={() => setIsTrackingModalOpen(false)}
          />

          <section className={styles.modalCard} role="dialog" aria-modal="true" aria-labelledby="tracking-title">
            <div className={styles.modalHeader}>
              <h2 id="tracking-title">Seguimiento de compra</h2>
              <button
                type="button"
                className={styles.modalCloseButton}
                onClick={() => setIsTrackingModalOpen(false)}
              >
                Cerrar
              </button>
            </div>

            <section className={styles.modalSummarySection}>
              <p className={styles.modalSectionTitle}>Resumen de la orden</p>
              <div className={styles.modalInfoGrid}>
                <div className={styles.modalInfoItem}>
                  <span>Orden</span>
                  <strong>{selectedOrder.id}</strong>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Cliente</span>
                  <strong>{selectedOrder.customer}</strong>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Evento</span>
                  <strong>{selectedOrder.event}</strong>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Fecha</span>
                  <strong>{selectedOrder.orderDate}</strong>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Total</span>
                  <strong>{formatCurrency(selectedOrder.total)}</strong>
                </div>
                <div className={styles.modalInfoItem}>
                  <span>Estado</span>
                  <strong>{selectedOrder.fulfillmentStatus}</strong>
                </div>
              </div>
            </section>

            <section className={styles.modalTimelineSection}>
              <p className={styles.modalSectionTitle}>Linea de tiempo</p>
              <ul className={styles.timeline}>
                {selectedOrder.tracking.map((step) => (
                  <li key={step.label} className={styles.timelineItem}>
                    <span className={`${styles.dot} ${step.done ? styles.dotDone : ""}`} aria-hidden="true" />
                    <div>
                      <p>{step.label}</p>
                      <small>{step.date}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </div>
      ) : null}
    </div>
  );
}
