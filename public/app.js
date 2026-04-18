document.addEventListener("DOMContentLoaded", () => {
  carregarDoadores();
  carregarBeneficiarios();
  configurarFormularioDoador();
  configurarFormularioBeneficiario();
  configurarBuscaDoador();
  configurarMenuMobile();
  configurarFechamentoDoMenu();
});

function configurarFormularioDoador() {
  const formulario = document.getElementById("form-doador");
  if (!formulario) return;

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("doador-nome").value.trim();
    const email = document.getElementById("doador-email").value.trim();

    if (!nome || !email) {
      mostrarFeedback("feedback-doador", "Preencha nome e email.", false);
      return;
    }

    const payload = {
      nome,
      email,
      telefone: document.getElementById("doador-telefone").value.trim(),
      cidade: document.getElementById("doador-cidade").value.trim(),
      observacoes: document.getElementById("doador-observacoes").value.trim(),
    };

    try {
      const resposta = await fetch("/api/doadores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        mostrarFeedback(
          "feedback-doador",
          "Doador cadastrado com sucesso!",
          true,
        );
        formulario.reset();
        carregarDoadores();
        return;
      }

      mostrarFeedback(
        "feedback-doador",
        data.error || "Erro ao cadastrar.",
        false,
      );
    } catch {
      mostrarFeedback("feedback-doador", "Erro de conexão.", false);
    }
  });
}

function configurarFormularioBeneficiario() {
  const formulario = document.getElementById("form-beneficiario");
  if (!formulario) return;

  formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("benef-nome").value.trim();
    const cpf = document.getElementById("benef-cpf").value.trim();

    if (!nome || !cpf) {
      mostrarFeedback("feedback-beneficiario", "Preencha nome e CPF.", false);
      return;
    }

    const payload = {
      nome,
      cpf,
      telefone: document.getElementById("benef-telefone").value.trim(),
      endereco: document.getElementById("benef-endereco").value.trim(),
      familia_tamanho: document.getElementById("benef-familia").value,
      necessidade: document.getElementById("benef-necessidade").value.trim(),
    };

    try {
      const resposta = await fetch("/api/beneficiarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        mostrarFeedback(
          "feedback-beneficiario",
          "Beneficiário cadastrado com sucesso!",
          true,
        );
        formulario.reset();
        carregarBeneficiarios();
        return;
      }

      mostrarFeedback(
        "feedback-beneficiario",
        data.error || "Erro ao cadastrar.",
        false,
      );
    } catch {
      mostrarFeedback("feedback-beneficiario", "Erro de conexão.", false);
    }
  });
}

function configurarBuscaDoador() {
  const busca = document.getElementById("busca-doador");
  if (!busca) return;

  busca.addEventListener("input", (event) => {
    carregarDoadores(event.target.value);
  });
}

function configurarMenuMobile() {
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const aberto = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-active", aberto);
    toggle.setAttribute("aria-expanded", String(aberto));
    document.body.classList.toggle("menu-open", aberto);
  });
}

function configurarFechamentoDoMenu() {
  const links = document.querySelectorAll("#menu a");
  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (!menu || !toggle) return;
      menu.classList.remove("is-open");
      toggle.classList.remove("is-active");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

function mostrarFeedback(id, mensagem, sucesso) {
  const elemento = document.getElementById(id);
  if (!elemento) return;

  elemento.textContent = mensagem;
  elemento.className = `feedback${sucesso ? " sucesso" : ""}`;

  setTimeout(() => {
    elemento.textContent = "";
  }, 4000);
}

async function carregarDoadores(filtroNome = "") {
  const loading = document.getElementById("loading-doadores");
  const tabela = document.getElementById("tabela-doadores");
  if (!loading || !tabela) return;

  tabela.style.display = "none";
  loading.style.display = "block";
  loading.textContent = "Carregando...";

  let url = "/api/doadores";
  if (filtroNome) {
    url += `?nome=${encodeURIComponent(filtroNome)}`;
  }

  try {
    const resposta = await fetch(url);
    const doadores = await resposta.json();
    const tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    if (!doadores.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5">Nenhum doador encontrado no momento.</td>
        </tr>
      `;
    } else {
      doadores.forEach((doador) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${doador.nome}</td>
          <td>${doador.email}</td>
          <td>${doador.telefone || ""}</td>
          <td>${doador.cidade || ""}</td>
          <td>${doador.observacoes || ""}</td>
        `;
        tbody.appendChild(linha);
      });
    }

    tabela.style.display = "table";
    loading.style.display = "none";
  } catch {
    loading.textContent = "Erro ao carregar doadores.";
  }
}

async function carregarBeneficiarios() {
  const loading = document.getElementById("loading-beneficiarios");
  const tabela = document.getElementById("tabela-beneficiarios");
  if (!loading || !tabela) return;

  tabela.style.display = "none";
  loading.style.display = "block";
  loading.textContent = "Carregando...";

  try {
    const resposta = await fetch("/api/beneficiarios");
    const beneficiarios = await resposta.json();
    const tbody = tabela.querySelector("tbody");

    tbody.innerHTML = "";

    if (!beneficiarios.length) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6">Nenhum beneficiário encontrado no momento.</td>
        </tr>
      `;
    } else {
      beneficiarios.forEach((beneficiario) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
          <td>${beneficiario.nome}</td>
          <td>${beneficiario.cpf}</td>
          <td>${beneficiario.telefone || ""}</td>
          <td>${beneficiario.endereco || ""}</td>
          <td>${beneficiario.familia_tamanho || ""}</td>
          <td>${beneficiario.necessidade || ""}</td>
        `;
        tbody.appendChild(linha);
      });
    }

    tabela.style.display = "table";
    loading.style.display = "none";
  } catch {
    loading.textContent = "Erro ao carregar beneficiários.";
  }
}
