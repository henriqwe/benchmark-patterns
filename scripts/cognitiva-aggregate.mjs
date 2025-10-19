// scripts/cognitiva-aggregate.mjs
import fs from "fs";
const SRC = "reports/cognitiva.json";
const OUT = "reports";

if (!fs.existsSync(SRC)) {
  console.error("Relatório não encontrado:", SRC);
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
for (const f of data) {
  const filePath = String(f.filePath || "").replace(/\\/g, "/");
  const short = filePath.includes("/src/")
    ? filePath.split("/src/")[1]
    : filePath;

  for (const m of f.messages || []) {
    if (m.ruleId !== "sonarjs/cognitive-complexity") continue;
    const msg = String(m.message || "");
    // pega o PRIMEIRO número da mensagem (valor calculado)
    const num = Number((msg.match(/(\d+)/) || [])[1]);
    if (!Number.isFinite(num)) continue;

    // nome da função (se disponível)
    const fn =
      (msg.match(/Function '([^']+)'/i) || [])[1] ||
      (msg.toLowerCase().includes("function") ? "(função)" : "(desconhecido)");

    rows.push({
      padrao: classify(filePath),
      arquivo: short,
      funcao: fn,
      cognitiva: num,
    });
  }
}

fs.mkdirSync(OUT, { recursive: true });
const head1 = "padrao,arquivo,funcao,cognitiva\n";
fs.writeFileSync(
  `${OUT}/cognitiva_funcoes.csv`,
  head1 +
    rows
      .map((r) => `${r.padrao},${r.arquivo},${r.funcao},${r.cognitiva}`)
      .join("\n")
);

const groups = rows.reduce((acc, r) => {
  (acc[r.padrao] ||= []).push(r.cognitiva);
  return acc;
}, {});
const stats = (arr) => {
  const s = arr.slice().sort((a, b) => a - b),
    n = s.length;
  const mean = +(s.reduce((a, b) => a + b, 0) / n).toFixed(2);
  const med = +(n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2).toFixed(
    2
  );
  return { n, mean, med, min: s[0], max: s[n - 1] };
};
const head2 =
  "padrao,Cognitiva_média,Cognitiva_mediana,Cognitiva_mínima,Cognitiva_máxima,N_funções\n";
const lines = Object.entries(groups)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([k, arr]) => {
    const { n, mean, med, min, max } = stats(arr);
    return `${k},${mean},${med},${min},${max},${n}`;
  });
fs.writeFileSync(`${OUT}/cognitiva_resumo.csv`, head2 + lines.join("\n"));

console.log("✔ Gerado:");
console.log(" - reports/cognitiva_funcoes.csv");
console.log(" - reports/cognitiva_resumo.csv");
