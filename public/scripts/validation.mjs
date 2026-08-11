// @ts-check

/** @param {unknown} value */
export function onlyDigits(value) {
  return String(value ?? "").replace(/\D/g, "");
}

/** @param {string} value */
export function isValidCpf(value) {
  const cpf = onlyDigits(value);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  /** @param {number} length */
  const calculateDigit = (length) => {
    let sum = 0;
    for (let index = 0; index < length; index += 1) {
      sum += Number(cpf[index]) * (length + 1 - index);
    }
    const remainder = (sum * 10) % 11;
    return remainder === 10 ? 0 : remainder;
  };

  return (
    calculateDigit(9) === Number(cpf[9]) &&
    calculateDigit(10) === Number(cpf[10])
  );
}

/** @param {string} value */
export function formatCpf(value) {
  return onlyDigits(value)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/** @param {string} value */
export function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{2})(\d+)/, "($1) $2");
  if (digits.length <= 10)
    return digits.replace(/(\d{2})(\d{4})(\d+)/, "($1) $2-$3");
  return digits.replace(/(\d{2})(\d{5})(\d+)/, "($1) $2-$3");
}

/** @param {HTMLInputElement | HTMLTextAreaElement} field */
export function validateField(field) {
  const value =
    field instanceof HTMLInputElement && field.type === "checkbox"
      ? field.checked
      : field.value.trim();

  if (field.required && !value) return "Este campo é obrigatório.";
  if (!value) return "";

  if (field.type === "email" && !field.validity.valid)
    return "Informe um e-mail válido.";
  if (field.name === "cpf" && !isValidCpf(String(value)))
    return "Informe um CPF válido.";
  if (field.name === "telefone") {
    const length = onlyDigits(value).length;
    if (length !== 10 && length !== 11) return "Informe um telefone com DDD.";
  }
  if (field.name === "familia_tamanho" && !field.validity.valid) {
    return "Informe um número entre 1 e 30.";
  }

  return "";
}
