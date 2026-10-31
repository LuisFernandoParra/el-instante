import { useEffect, useRef, type RefObject } from 'react';
import { useLocation } from 'react-router-dom';

/** Al cambiar de ruta vuelve arriba y lleva el foco al contenido, para teclado y lector de pantalla. */
export function useRouteFocus<T extends HTMLElement>(): RefObject<T> {
  const ref = useRef<T>(null);
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    window.scrollTo(0, 0);
    ref.current?.focus({ preventScroll: true });
  }, [pathname]);

  return ref;
}
