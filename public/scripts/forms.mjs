// @ts-check

import { postJson } from "./api.mjs";
import { clearFieldErrors, getElement, setFieldError } from "./dom.mjs";
import {
  formatCpf,
  formatPhone,
  onlyDigits,
  validateField,
} from "./validation.mjs";

/**
 * @typedef {Object} FormConfig
 * @property {string} formSelector
 * @property {string} feedbackSelector
 * @property {string} endpoint
 * @property {string} successMessage
 * @property {(data: FormData) => Record<string, unknown>} serialize
 * @property {() => void | Promise<void>} [onSuccess]
 */

/** @param {HTMLFormElement} form @returns {boolean} */
function validateForm(form) {
  clearFieldErrors(form);
  const fields = [...form.querySelectorAll("input, textarea")].filter(
    (field) =>
      field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement,
  );
  let firstInvalid = null;

  for (const field of fields) {
    const message = validateField(field);
    setFieldError(field, message);
    if (message && !firstInvalid) firstInvalid = field;
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }

  return true;
}

/** @param {HTMLFormElement} form @param {HTMLElement} feedback @param {"idle" | "loading" | "success" | "error"} state @param {string} [message] */
function setFormState(form, feedback, state, message = "") {
  const button = /** @type {HTMLButtonElement} */ (
    getElement("button[type='submit']", form)
  );
  const isLoading = state === "loading";

  form.dataset.state = state;
  button.disabled = isLoading;
  button.textContent = isLoading
    ? (button.dataset.loadingLabel ?? "Enviando…")
    : (button.dataset.idleLabel ?? "Enviar");
  feedback.dataset.state = state;
  feedback.textContent = message;
}

/** @param {FormConfig} config */
export function setupForm(config) {
  const form = /** @type {HTMLFormElement} */ (getElement(config.formSelector));
  const feedback = /** @type {HTMLElement} */ (
    getElement(config.feedbackSelector)
  );

  form.addEventListener("input", (event) => {
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    ) {
      setFieldError(event.target, "");
      if (form.dataset.state !== "loading")
        setFormState(form, feedback, "idle");
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (form.dataset.state === "loading" || !validateForm(form)) return;

    setFormState(form, feedback, "loading", "Enviando cadastro…");

    try {
      await postJson(config.endpoint, config.serialize(new FormData(form)));
      form.reset();
      clearFieldErrors(form);
      setFormState(form, feedback, "success", config.successMessage);
      feedback.focus();
      await config.onSuccess?.();
    } catch (error) {
      setFormState(
        form,
        feedback,
        "error",
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o cadastro.",
      );
      feedback.focus();
    }
  });
}

export function setupInputMasks() {
  const cpf = /** @type {HTMLInputElement} */ (getElement("#benef-cpf"));
  const phones = document.querySelectorAll("input[name='telefone']");

  cpf.addEventListener("input", () => {
    cpf.value = formatCpf(cpf.value);
  });

  phones.forEach((phone) => {
    if (!(phone instanceof HTMLInputElement)) return;
    phone.addEventListener("input", () => {
      phone.value = formatPhone(phone.value);
    });
  });
}

/** @param {FormDataEntryValue | null} value */
function trimmed(value) {
  return String(value ?? "").trim();
}

export const formConfigs = {
  donor: {
    formSelector: "#form-doador",
    feedbackSelector: "#feedback-doador",
    endpoint: "/api/doadores",
    successMessage: "Cadastro de doador enviado com sucesso.",
    serialize: /** @param {FormData} data */ (data) => {
      return {
        nome: trimmed(data.get("nome")),
        email: trimmed(data.get("email")),
        telefone: onlyDigits(data.get("telefone")),
        cidade: trimmed(data.get("cidade")),
        observacoes: trimmed(data.get("observacoes")),
        consentimento: data.get("consentimento") === "on",
      };
    },
  },
  beneficiary: {
    formSelector: "#form-beneficiario",
    feedbackSelector: "#feedback-beneficiario",
    endpoint: "/api/beneficiarios",
    successMessage: "Pedido de apoio enviado com sucesso.",
    serialize: /** @param {FormData} data */ (data) => {
      const familySize = trimmed(data.get("familia_tamanho"));
      return {
        nome: trimmed(data.get("nome")),
        cpf: onlyDigits(data.get("cpf")),
        telefone: onlyDigits(data.get("telefone")),
        endereco: trimmed(data.get("endereco")),
        familia_tamanho: familySize ? Number(familySize) : null,
        necessidade: trimmed(data.get("necessidade")),
        consentimento: data.get("consentimento") === "on",
      };
    },
  },
};
