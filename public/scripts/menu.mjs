// @ts-check

import { getElement } from "./dom.mjs";

export function setupMenu() {
  const toggle = /** @type {HTMLButtonElement} */ (getElement("#menu-toggle"));
  const menu = /** @type {HTMLElement} */ (getElement("#menu"));

  /** @param {boolean} open @param {boolean} [returnFocus] */
  const setOpen = (open, returnFocus = false) => {
    menu.dataset.open = String(open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.dataset.menuOpen = String(open);
    if (returnFocus) toggle.focus();
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      toggle.getAttribute("aria-expanded") === "true"
    ) {
      setOpen(false, true);
    }
  });

  document.addEventListener("click", (event) => {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      event.target instanceof Node &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setOpen(false);
    }
  });

  const desktopViewport = window.matchMedia("(min-width: 48rem)");
  desktopViewport.addEventListener("change", (event) => {
    if (event.matches) setOpen(false);
  });
}
