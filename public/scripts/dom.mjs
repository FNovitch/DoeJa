// @ts-check

/** @template {Element} T @param {string} selector @param {ParentNode} [root] @returns {T} */
export function getElement(selector, root = document) {
  const element = root.querySelector(selector);
  if (!element)
    throw new Error(`Elemento obrigatório não encontrado: ${selector}`);
  return /** @type {T} */ (element);
}

/** @param {HTMLInputElement | HTMLTextAreaElement} field @param {string} message */
export function setFieldError(field, message) {
  const describedBy = field.getAttribute("aria-describedby")?.split(" ") ?? [];
  const errorId = describedBy.find((id) => id.endsWith("-erro"));
  const error = errorId ? document.getElementById(errorId) : null;

  field.setAttribute("aria-invalid", String(Boolean(message)));
  if (error) error.textContent = message;
}

/** @param {HTMLFormElement} form */
export function clearFieldErrors(form) {
  form
    .querySelectorAll("[aria-invalid]")
    .forEach((field) => field.removeAttribute("aria-invalid"));
  form.querySelectorAll(".field-error").forEach((error) => {
    error.textContent = "";
  });
}
