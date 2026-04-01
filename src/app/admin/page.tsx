"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "./page.module.css";

type Metric = {
	label: string;
	value: string;
	delta: string;
	icon: string;
};

type TopCustomer = {
	name: string;
	initials: string;
	purchases: number;
	totalSpent: string;
};

const metrics: Metric[] = [
	{ label: "Ganancias Totales", value: "$328,600", delta: "+12.5%", icon: "$" },
	{ label: "Paquetes Vendidos", value: "1,247", delta: "+8.3%", icon: "[]" },
	{ label: "Clientes Activos", value: "342", delta: "+15.2%", icon: "o" },
	{ label: "Tasa de Conversion", value: "3.2%", delta: "+2.1%", icon: "/" },
];

const topCustomers: TopCustomer[] = [
	{ name: "Maria Garcia", initials: "MG", purchases: 24, totalSpent: "$18,400" },
	{ name: "Carlos Rodriguez", initials: "CR", purchases: 19, totalSpent: "$15,200" },
	{ name: "Ana Martinez", initials: "AM", purchases: 17, totalSpent: "$13,600" },
	{ name: "Juan Lopez", initials: "JL", purchases: 15, totalSpent: "$12,000" },
	{ name: "Sofia Hernandez", initials: "SH", purchases: 14, totalSpent: "$11,200" },
];

const navItems = ["Inicio", "Ordenes", "Productos", "Clientes", "Reportes", "Configuracion"];

export default function AdminDashboardPage() {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className={styles.page}>
			<AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} items={navItems} activeItem="Dashboard" />

			<main className={styles.main}>
				<header className={styles.topHeader}>
					<button type="button" className={styles.menuButton} onClick={() => setIsSidebarOpen(true)} aria-label="Abrir menu">
						<span />
						<span />
						<span />
					</button>
				</header>

				<section className={styles.content}>
					<h1>Inicio</h1>
					<p className={styles.subtitle}>
						Bienvenido al panel de administracion. Aqui puedes ver las metricas de tu negocio.
					</p>

					<div className={styles.metricsGrid}>
						{metrics.map((metric) => (
							<article key={metric.label} className={styles.metricCard}>
								<div>
									<p className={styles.metricLabel}>{metric.label}</p>
									<p className={styles.metricValue}>{metric.value}</p>
								</div>
								<span className={styles.metricIcon}>{metric.icon}</span>
							</article>
						))}
					</div>

					<section className={styles.topCustomersCard}>
						<div className={styles.topCustomersHeader}>
							<h2>Top Clientes</h2>
							<p>Ordenado por numero de compras</p>
						</div>

						<ul className={styles.customerList}>
							{topCustomers.map((customer, index) => (
								<li key={customer.name} className={styles.customerRow}>
									<div className={styles.customerLeft}>
										<span className={styles.customerAvatar}>{customer.initials}</span>
										<div>
											<p className={styles.customerName}>{customer.name}</p>
											<p className={styles.customerMeta}>{customer.purchases} compras realizadas</p>
										</div>
									</div>

									<div className={styles.customerRight}>
										<p className={styles.customerAmount}>{customer.totalSpent}</p>
										<p className={styles.customerTotalLabel}>Total gastado</p>
										<p className={styles.customerRank}>#{index + 1}</p>
									</div>
								</li>
							))}
						</ul>
					</section>
				</section>
			</main>
		</div>
	);
}
