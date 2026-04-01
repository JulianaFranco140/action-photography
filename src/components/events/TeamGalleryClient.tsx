"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "@/app/events/[slug]/team/[teamSlug]/page.module.css";

type Team = {
  name: string;
  city: string;
  category: string;
};

type Event = {
  slug: string;
  name: string;
};

type Photo = {
  id: string;
  src: string;
  title: string;
  price: number;
};

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};

type TeamGalleryClientProps = {
  event: Event;
  team: Team;
  photos: Photo[];
};

function formatCop(value: number) {
  return `${value.toLocaleString("es-CO")} COP`;
}

export default function TeamGalleryClient({ event, team, photos }: TeamGalleryClientProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = useMemo(
    () => cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0),
    [cartItems],
  );

  const addToCart = (photo: Photo) => {
    setCartItems((previous) => {
      const existing = previous.find((item) => item.id === photo.id);
      if (existing) {
        return previous.map((item) =>
          item.id === photo.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...previous, { id: photo.id, title: photo.title, price: photo.price, quantity: 1 }];
    });
  };

  const clearCart = () => setCartItems([]);

  return (
    <div className={styles.page}>
      <main className={styles.container}>
        <section className={styles.topBar}>
          <div>
            <Link href={`/events/${event.slug}`} className={styles.backLink}>
              ← Volver a equipos
            </Link>
            <h1>{team.name}</h1>
            <p>
              {event.name} · {team.city} · {team.category}
            </p>
          </div>

          <button
            type="button"
            className={styles.cartButton}
            aria-label="Abrir carrito de compras"
            onClick={() => setCartOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 4H5L7.2 14.4C7.29 14.84 7.53 15.23 7.89 15.5C8.25 15.77 8.7 15.9 9.15 15.86H17.72C18.17 15.86 18.61 15.71 18.96 15.43C19.31 15.15 19.54 14.76 19.61 14.31L21 7H6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z" fill="currentColor" />
              <path
                d="M18 20C18.5523 20 19 19.5523 19 19C19 18.4477 18.5523 18 18 18C17.4477 18 17 18.4477 17 19C17 19.5523 17.4477 20 18 20Z"
                fill="currentColor"
              />
            </svg>
            {cartCount > 0 ? <span className={styles.cartBadge}>{cartCount}</span> : null}
          </button>
        </section>

        <section className={styles.grid}>
          {photos.map((photo) => (
            <article className={styles.card} key={photo.id}>
              <img src={photo.src} alt={photo.title} />
              <div className={styles.cardBody}>
                <h2>{photo.title}</h2>
                <div className={styles.cardFooter}>
                  <span>{formatCop(photo.price)}</span>
                  <button type="button" onClick={() => addToCart(photo)}>
                    Agregar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div
        className={`${styles.cartOverlay} ${cartOpen ? styles.cartOverlayVisible : ""}`}
        onClick={() => setCartOpen(false)}
      />

      <aside className={`${styles.cartPanel} ${cartOpen ? styles.cartPanelOpen : ""}`}>
        <div className={styles.cartHeader}>
          <h2>Carrito de compra</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">
            x
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className={styles.emptyState}>Tu carrito esta vacio. Agrega fotos para comenzar tu compra.</p>
        ) : (
          <ul className={styles.cartList}>
            {cartItems.map((item) => (
              <li key={item.id} className={styles.cartItem}>
                <div>
                  <p className={styles.cartItemTitle}>{item.title}</p>
                  <p className={styles.cartItemMeta}>Cantidad: {item.quantity}</p>
                </div>
                <p className={styles.cartItemPrice}>{formatCop(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>
        )}

        <div className={styles.cartFooter}>
          <div className={styles.cartTotalRow}>
            <span>Total</span>
            <strong>{formatCop(cartTotal)}</strong>
          </div>

          <div className={styles.cartActions}>
            <button type="button" className={styles.clearButton} onClick={clearCart}>
              Vaciar carrito
            </button>
            <button type="button" className={styles.checkoutButton} disabled={cartItems.length === 0}>
              Finalizar compra
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
