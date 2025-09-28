// scripts/cc-aggregate.mjs
import fs from "fs";
const SRC = "reports/cc-report.json";
const OUT_DIR = "reports";

if (!fs.existsSync(SRC)) {
  console.error(`Arquivo não encontrado: ${SRC}. Rode antes: npm run cc:raw`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(SRC, "utf8"));

const classify = (p) => {
  if (p.includes("/components/CompositionPattern/")) return "Composição";
  if (p.includes("/components/PresentationalAndContainerPattern/"))
    return "Apresentação e contêiner";
  if (p.includes("/components/HOC/")) return "Componentes de ordem superior";
  if (p.includes("/components/RenderProps/"))
    return "Propriedades de renderização";
  if (p.includes("/components/CompoundComponents/"))
    return "Componentes Compostos";
  return "Geral";
};

const rows = [];
for (const file of data) {
  const filePath = file.filePath || "";
  for (const m of file.messages || []) {
    if (m.ruleId !== "complexity") continue;
    const msg = m.message || "";
    const fnMatch = msg.match(/Function '([^']+)'/i);
    const func = fnMatch
      ? fnMatch[1]
      : msg.includes("Arrow function")
      ? "(arrow)"
      : "";
    const ccMatch = msg.match(/complexity\s*of\s*(\d+)/i);
    const cc = ccMatch ? Number(ccMatch[1]) : NaN;

    rows.push({
      padrao: classify(filePath),
      arquivo: filePath.split("/tcc/")[1] || filePath,
      funcao: func,
      "complexidade ciclomática": cc,
    });
  }
}

if (!rows.length) {
  console.error(
    "Nenhuma mensagem de complexidade encontrada. Verifique se a regra está com max=0 e se o glob inclui seus arquivos."
  );
  process.exit(1);
}

const toCSV = (arr) => {
  const headers = Object.keys(arr[0]);
  return [
    headers.join(","),
    ...arr.map((r) =>
      headers.map((h) => String(r[h]).replaceAll(",", " ")).join(",")
    ),
  ].join("\n");
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(`${OUT_DIR}/cc_funcoes.csv`, toCSV(rows), "utf8");

// agrega por padrão
const by = rows.reduce((acc, r) => {
  (acc[r.padrao] ||= []).push(r.cc);
  return acc;
}, {});

const stats = (nums) => {
  const s = nums.slice().sort((a, b) => a - b);
  const n = s.length;
  const mean = s.reduce((a, b) => a + b, 0) / n;
  const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
  return {
    n,
    mean: +mean.toFixed(2),
    median: +med.toFixed(2),
    min: s[0],
    max: s[n - 1],
  };
};

const resumo = Object.entries(by)
  .map(([padrao, arr]) => {
    const { n, mean, median, min, max } = stats(arr);
    return {
      padrao,
      CC_média: mean,
      CC_mediana: median,
      CC_mínima: min,
      CC_máxima: max,
      N_funções: n,
    };
  })
  .sort((a, b) => a.padrao.localeCompare(b.padrao));

fs.writeFileSync(`${OUT_DIR}/cc_resumo.csv`, toCSV(resumo), "utf8");

console.log("✔ Gerado:");
console.log(" - reports/cc_funcoes.csv (detalhado por função)");
console.log(" - reports/cc_resumo.csv (agregado por padrão)");
