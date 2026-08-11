// @ts-check

export class ApiError extends Error {
  /** @param {string} message @param {number} [status] */
  constructor(message, status = 0) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/**
 * @template T
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<T>}
 */
export async function fetchJson(url, options = {}) {
  let response;

  try {
    response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError(
      "Não foi possível conectar ao servidor. Tente novamente.",
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  let data = null;

  if (contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      throw new ApiError(
        "O servidor enviou uma resposta inválida.",
        response.status,
      );
    }
  }

  if (!response.ok) {
    const message =
      data &&
      typeof data === "object" &&
      "error" in data &&
      typeof data.error === "string"
        ? data.error
        : "Não foi possível concluir a solicitação.";
    throw new ApiError(message, response.status);
  }

  if (data === null) {
    throw new ApiError(
      "O servidor enviou uma resposta inválida.",
      response.status,
    );
  }

  return /** @type {T} */ (data);
}

/** @template T @param {string} url @param {Record<string, unknown>} payload */
export function postJson(url, payload) {
  return fetchJson(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
