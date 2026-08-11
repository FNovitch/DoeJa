import assert from "node:assert/strict";
import test from "node:test";

import {
  formatCpf,
  formatPhone,
  isValidCpf,
  onlyDigits,
} from "../../public/scripts/validation.mjs";

test("normaliza e formata identificadores sem alterar os dados", () => {
  assert.equal(onlyDigits("(61) 99999-0000"), "61999990000");
  assert.equal(formatCpf("52998224725"), "529.982.247-25");
  assert.equal(formatPhone("61999990000"), "(61) 99999-0000");
});

test("valida os dígitos verificadores do CPF", () => {
  assert.equal(isValidCpf("529.982.247-25"), true);
  assert.equal(isValidCpf("123.456.789-00"), false);
  assert.equal(isValidCpf("111.111.111-11"), false);
});
