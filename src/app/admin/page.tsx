"use client";

import { useState } from "react";
import styles from "./page.module.css";
import AdminSidebar, { type AdminNavItem } from "@/components/admin/AdminSidebar";

type Metric = { label: string; value: string; delta: string };
type Alert = { label: string; value: string; tone: "warning" | "hot" | "down" };
type EventRevenue = { event: string; amount: number };

const metrics: Metric[] = [
	{ label: "Ganancias totales", value: "$328,600", delta: "+12.5%" },
	{ label: "Ingresos mensuales", value: "$52,980", delta: "+11.1%" },
	{ label: "Ventas ", value: "1,247", delta: "+8.3%" },
	{ label: "Clientes activos", value: "342", delta: "+15.2%" },
];

const alerts: Alert[] = [
	{ label: "Evento sin ventas", value: "3 eventos", tone: "warning" },
	{ label: "Fotos sin comprar", value: "11,420 fotos", tone: "warning" },
	{ label: "Evento con alto rendimiento", value: "Elite Nationals", tone: "hot" },
	{ label: "Caida de ventas hoy", value: "-14% vs ayer", tone: "down" },
];

const realtimeOps: Metric[] = [
	{ label: "Eventos activos", value: "12", delta: "+2" },
	{ label: "Proximos eventos", value: "6", delta: "Esta semana" },
	{ label: "Eventos sin fotos", value: "2", delta: "Pendiente de carga" },
	{ label: "Eventos sin ventas", value: "3", delta: "Requiere accion" },
];

const topEvents = ["Elite Nationals", "World of Dance 2025", "Masters Super Cheer", "Summer Spirit Open"];
const topTeams = ["Velocity Team", "Power District", "Action Storm", "Diamond Flyers"];
const topProducts = ["Pack Premium", "Pack Duo", "Foto individual HD", "Pack Familiar"];
const topCustomers = ["Maria Garcia", "Carlos Rodriguez", "Ana Martinez", "Juan Lopez"];

const eventRevenue: EventRevenue[] = [
	{ event: "Elite Nationals", amount: 84200 },
	{ event: "World of Dance 2025", amount: 76600 },
	{ event: "Masters Super Cheer", amount: 64100 },
	{ event: "Summer Spirit Open", amount: 58800 },
];

const navItems: AdminNavItem[] = [
	{ label: "Inicio", href: "/admin" },
	{ label: "Ordenes", href: "/admin/orders" },
	{ label: "Productos" },
	{ label: "Clientes" },
	{ label: "Reportes" },
	{ label: "Configuracion" },
];

export default function AdminDashboardPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const maxEventRevenue = Math.max(...eventRevenue.map((item) => item.amount));

	return (
		<div className={styles.page}>
			<AdminSidebar
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
				items={navItems}
				activeItem="Inicio"
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
							<h1>Inicio</h1>
							<p className={styles.subtitle}>
								Bienvenido al panel de administracion. Aqui puedes ver las metricas de tu negocio.
							</p>
						</div>
					</div>

					<div className={styles.metricsGrid}>
						{metrics.map((metric) => (
							<article key={metric.label} className={styles.metricCard}>
								<p className={styles.metricLabel}>{metric.label}</p>
								<p className={styles.metricValue}>{metric.value}</p>
								<p className={styles.metricDelta}>{metric.delta}</p>
							</article>
						))}
					</div>

					<section className={styles.alertsAndRevenueSection}>
						<div className={styles.alertsCard}>
							<div className={styles.sectionHeader}>
								<h2>Alertas y Rendimiento</h2>
							</div>
							<ul className={styles.alertList}>
								{alerts.map((alert) => (
									<li key={alert.label} className={`${styles.alertRow} ${styles[`tone_${alert.tone}`]}`}>
										<span>{alert.label}</span>
										<strong>{alert.value}</strong>
									</li>
								))}
							</ul>
						</div>

						<div className={styles.eventsRevenueCard}>
							<div className={styles.sectionHeader}>
								<h2>Ganancias por eventos</h2>
							</div>
							<ul className={styles.revenueList}>
								{eventRevenue.map((item) => (
									<li key={item.event} className={styles.revenueRow}>
										<div className={styles.revenueTop}>
											<span>{item.event}</span>
											<strong>${item.amount.toLocaleString("en-US")}</strong>
										</div>
										<div className={styles.revenueTrack}>
											<span
												className={styles.revenueFill}
												style={{ width: `${(item.amount / maxEventRevenue) * 100}%` }}
											/>
										</div>
									</li>
								))}
							</ul>
						</div>
					</section>

					<section className={styles.operationsCard}>
						<div className={styles.sectionHeader}>
							<h2>Operacion en tiempo real</h2>
						</div>
						<div className={styles.opsGrid}>
							{realtimeOps.map((item) => (
								<article key={item.label} className={styles.opCard}>
									<p className={styles.metricLabel}>{item.label}</p>
									<p className={styles.metricValue}>{item.value}</p>
									<p className={styles.metricDelta}>{item.delta}</p>
								</article>
							))}
						</div>
					</section>

					<section className={styles.rankingsGrid}>
						<article className={styles.rankingCard}>
							<h3>Top eventos por ventas</h3>
							<ol>
								{topEvents.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ol>
						</article>
						<article className={styles.rankingCard}>
							<h3>Top equipos</h3>
							<ol>
								{topTeams.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ol>
						</article>
						<article className={styles.rankingCard}>
							<h3>Productos mas vendidos</h3>
							<ol>
								{topProducts.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ol>
						</article>
						<article className={styles.rankingCard}>
							<h3>Top de clientes</h3>
							<ol>
								{topCustomers.map((item) => (
									<li key={item}>{item}</li>
								))}
							</ol>
						</article>
					</section>
				</section>
			</main>
		</div>
	);
}
