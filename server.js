const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
1) Crie uma função com uma closure para fazer com que o endereço /random
devolva numeros aleatorios na seguinte lógica:
- Você deve gerar números aleatórios inteiros entre 0 e 10
- Guarde o último número aleatório gerado em um estado dentro da closure
- A função interna, quando invocada, deve retornar um objeto no seguinte formato:
{ ultimoNumero: N_AQUI: numeroAtual: N_AQUI }
Acesse a página /random e atualize-a para testar sua lógica
*/

function criaGeradorDeNumeros() {
  let ultimoNumero = null;
  return function gerarNumero() {
    const numeroAtual = Math.floor(Math.random() * 11);
    const resultado = { ultimoNumero, numeroAtual };
    ultimoNumero = numeroAtual;
    return resultado;
  };
}

const gerarNumero = criaGeradorDeNumeros();

app.get("/random", (req, res) => {
    const {ultimoNumero, numeroAtual} = gerarNumero();
    res.render("random", {
    ultimoNumero,
    numeroAtual,
  });
});

/*
2) Crie uma função recursiva para inverter uma palavra
- A palavra que deve ser invertida chegará na variável "palavraParaInverter"
- A palavra que você inverteu deve ser passada para a variável "invertida"
Seu programa deve funcionar de modo que, ao acessar o endereço /random,
você deve ser capaz de digitar uma palavra, apertar o botão de enviar e
receber a palavra invertida no alert.
*/
app.get("/inverter", (req, res) => {
  res.render("inverter");
});

app.get("/api/inverter/:palavraParaInverter", (req, res) => {
  const palavraParaInverter = req.params.palavraParaInverter;
  const invertida = function inverterPalavra(palavra) {
    if (palavra.length === 0) {
      return "";
    }
    return palavra[palavra.length - 1] + inverterPalavra(palavra.slice(0, -1));
  }(palavraParaInverter);
  res.json(invertida);
});

/*
3) A função pegaCorDeFundo é uma função de alta ordem que recebe três funções como parâmetro:
- pegaVermelho: retorna a faixa de vermelho da cor aleatória, deve retornar um inteiro entre 0 e 255
- pegaVerde: pegaVerde: retorna a faixa de verde da cor aleatória, deve retornar um inteiro entre 0 e 255
- pegaAzul: retorna a faixa de azul da cor aleatória, deve retornar um inteiro entre 0 e 255
Utilizando essas funções, pegaCorDeFundo retorna uma string no formato: rgb(n, n, n), que
é então passada para o endereço /cores como cor de fundo.
No entanto, esse código está com erro, pois as funções anteriores não foram implementadas.
Você deve então implementá-las para corrigir o programa, de modo /cores deve mostrar uma cor aleatória a cada acesso.
*/
function pegaCorDeFundo(pegaVermelho, pegaVerde, pegaAzul) {
  const r = pegaVermelho();
  const g = pegaVerde();
  const b = pegaAzul();
  return `rgb(${r}, ${g}, ${b})`;
}

function pegaVermelho() {
  return Math.floor(Math.random() * 256);
}

function pegaVerde() {
  return Math.floor(Math.random() * 256);
}

function pegaAzul() {
  return Math.floor(Math.random() * 256);
}

app.get("/cores", (req, res) => {
  const corDeFundo = pegaCorDeFundo(pegaVermelho, pegaVerde, pegaAzul);
  res.render("cores", { corDeFundo });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
