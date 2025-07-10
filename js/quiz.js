document.addEventListener("DOMContentLoaded", function () {
  const quizContainer = document.getElementById("quiz-container");
  const resultadoContainer = document.getElementById("resultado");
  const quizForm = document.getElementById("quiz-form");
  const hiddenInputsContainer = document.getElementById("hidden-inputs");
  const submitButton = document.getElementById("submit-btn");

  function getOrCreateVisitorId() {
    let visitorId = localStorage.getItem("lixoZeroVisitorId");
    if (!visitorId) {
      visitorId = "user-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
      localStorage.setItem("lixoZeroVisitorId", visitorId);
    }
    return visitorId;
  }
  const visitorId = getOrCreateVisitorId();

  // const minhasPerguntas = [
  //   {
  //     pergunta: "Onde você deve descartar cascas de frutas e restos de vegetais?",
  //     opcoes: { a: "Lixo reciclável", b: "Lixo orgânico", c: "Lixo comum (rejeito)" },
  //     respostaCorreta: "b"
  //   },
  //   {
  //     pergunta: "Pilhas e baterias devem ser descartadas em:",
  //     opcoes: { a: "Lixo comum", b: "Lixo reciclável", c: "Pontos de coleta específicos para lixo eletrônico/perigoso" },
  //     respostaCorreta: "c"
  //   },
  //   {
  //     pergunta: "Qual item NÃO é reciclável?",
  //     opcoes: { a: "Garrafa PET", b: "Papel higiênico usado", c: "Lata de alumínio" },
  //     respostaCorreta: "b"
  //   },

  //   {
  //     pergunta: "Onde devemos descartar óleo de cozinha usado?",
  //     opcoes: { a: "Na pia", b: "No lixo comum", c: "Em pontos de coleta específicos para óleo" },
  //     respostaCorreta: "c"
  //   },
  //   {
  //     pergunta: "Vidros quebrados devem ser descartados em:",
  //     opcoes: { a: "Lixo reciclável, bem embalados", b: "Lixo comum (rejeito), bem embalados", c: "Pontos de coleta de eletrônicos" },
  //     respostaCorreta: "b"
  //   },
  //   {
  //     pergunta: "Restos de comida devem ser descartados em qual tipo de lixo?",
  //     opcoes: { a: "Orgânico", b: "Reciclável", c: "Eletrônico" },
  //     respostaCorreta: "a"
  //   },
  //   {
  //     pergunta: "Papel com muita gordura (como caixa de pizza suja) deve ir para:",
  //     opcoes: { a: "Lixo reciclável", b: "Lixo orgânico", c: "Lixo comum (rejeito)" },
  //     respostaCorreta: "c"
  //   },
  //   {
  //     pergunta: "Qual desses itens é reciclável?",
  //     opcoes: { a: "Caixa de papelão limpa", b: "Guardanapo sujo", c: "Bituca de cigarro" },
  //     respostaCorreta: "a"
  //   },
  //   {
  //     pergunta: "Lâmpadas fluorescentes devem ser descartadas em:",
  //     opcoes: { a: "Lixo comum", b: "Coleta especial de materiais perigosos", c: "Lixo reciclável" },
  //     respostaCorreta: "b"
  //   },
  //   {
  //     pergunta: "Embalagens de vidro (como potes de conserva) devem ir para:",
  //     opcoes: { a: "Lixo orgânico", b: "Coleta de vidro reciclável", c: "Lixo comum" },
  //     respostaCorreta: "b"
  //   }

  // ];

  const minhasPerguntas = [
    {
      pergunta:
        "Qual é a melhor forma de descartar cascas de frutas e restos de vegetais em casa, segundo o conceito Lixo Zero?",
      opcoes: {
        a: "Misturando ao lixo comum",
        b: "Jogando na pia com triturador",
        c: "Separando como orgânico ou compostando",
      },
      respostaCorreta: "c",
    },
    {
      pergunta:
        "Por que pilhas e baterias não devem ser jogadas no lixo comum?",
      opcoes: {
        a: "Porque contêm metais pesados que contaminam o solo e a água",
        b: "Porque ocupam muito espaço",
        c: "Porque são recicláveis normalmente",
      },
      respostaCorreta: "a",
    },
    {
      pergunta:
        "Entre os itens abaixo, qual não pode ser reciclado mesmo que pareça papel?",
      opcoes: {
        a: "Papel higiênico usado",
        b: "Folha de caderno",
        c: "Caixa de sapato",
      },
      respostaCorreta: "a",
    },
    {
      pergunta:
        "Qual das alternativas representa o descarte correto de óleo de cozinha usado?",
      opcoes: {
        a: "Despejar no vaso sanitário",
        b: "Levar a um ponto de coleta específico para reciclagem",
        c: "Misturar com restos de comida",
      },
      respostaCorreta: "b",
    },
    {
      pergunta: "Vidros quebrados devem ser descartados como?",
      opcoes: {
        a: "Coleta de eletrônicos",
        b: "Reciclável, sem proteção",
        c: "Rejeito, bem embalado para não ferir os coletores",
      },
      respostaCorreta: "c",
    },
    {
      pergunta: "Restos de comida e cascas de legumes devem ser:",
      opcoes: {
        a: "Misturados ao lixo reciclável",
        b: "Compostados ou destinados ao lixo orgânico",
        c: "Levados a coleta seletiva de papel",
      },
      respostaCorreta: "b",
    },
    {
      pergunta: "Por que caixas de pizza sujas não devem ser recicladas?",
      opcoes: {
        a: "Porque a gordura contamina o material e prejudica o processo de reciclagem",
        b: "Porque são de papelão grosso",
        c: "Porque são misturadas com plástico",
      },
      respostaCorreta: "a",
    },
    {
      pergunta: "Qual dessas opções é reciclável se estiver limpa e seca?",
      opcoes: {
        a: "Guardanapo usado",
        b: "Bituca de cigarro",
        c: "Caixa de papelão",
      },
      respostaCorreta: "c",
    },
    {
      pergunta:
        "O que pode acontecer se lâmpadas fluorescentes forem descartadas incorretamente?",
      opcoes: {
        a: "Nada, são inofensivas",
        b: "Podem liberar mercúrio e contaminar o ambiente",
        c: "Apenas quebram com facilidade",
      },
      respostaCorreta: "b",
    },
    {
      pergunta:
        "Potes de vidro de alimentos (como de azeitona ou palmito) devem ser:",
      opcoes: {
        a: "Misturados com plásticos",
        b: "Jogados no lixo orgânico",
        c: "Lavados e levados à coleta de vidro reciclável",
      },
      respostaCorreta: "c",
    },
    {
      pergunta:
        "Qual dessas atitudes contribui mais para uma rotina lixo zero?",
      opcoes: {
        a: "Levar sacola reutilizável ao mercado",
        b: "Separar o lixo só quando der tempo",
        c: "Jogar tudo no reciclável",
      },
      respostaCorreta: "a",
    },
    {
      pergunta: "O que é o “rejeito” no contexto do lixo?",
      opcoes: {
        a: "Resíduos que não têm mais uso e não podem ser reciclados",
        b: "Resíduos alimentares",
        c: "Todo lixo doméstico",
      },
      respostaCorreta: "a",
    },
    {
      pergunta:
        "Qual alternativa ajuda a reduzir a geração de lixo no dia a dia?",
      opcoes: {
        a: "Comprar alimentos embalados em porções individuais",
        b: "Usar copos descartáveis",
        c: "Recusar embalagens desnecessárias",
      },
      respostaCorreta: "c",
    },
    {
      pergunta: "Qual o destino ideal para remédios vencidos?",
      opcoes: {
        a: "Farmácias que aceitam medicamentos vencidos",
        b: "Lixo reciclável",
        c: "Descarte no vaso sanitário",
      },
      respostaCorreta: "a",
    },
    {
      pergunta:
        "Por que é importante lavar embalagens recicláveis antes de descartá-las?",
      opcoes: {
        a: "Para não atrair insetos e evitar contaminação dos outros materiais",
        b: "Para deixá-las mais leves",
        c: "Porque molhadas ocupam menos espaço",
      },
      respostaCorreta: "a",
    },
  ];

  function montarQuiz() {
    const output = [];
    minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
      const opcoes = [];
      for (const letraOpcao in perguntaAtual.opcoes) {
        opcoes.push(
          // O elemento <label> envolve o input para podermos colorir o fundo todo
          `<label>
              <input type="radio" name="pergunta${numeroPergunta}" value="${letraOpcao}">
              <span>${letraOpcao.toUpperCase()}: ${
            perguntaAtual.opcoes[letraOpcao]
          }</span>
            </label>`
        );
      }
      output.push(
        `<div class="pergunta">
            <p>${numeroPergunta + 1}. ${perguntaAtual.pergunta}</p>
            <div class="opcoes">${opcoes.join("")}</div>
          </div>`
      );
    });
    quizContainer.innerHTML = output.join("");
  }

  function mostrarResultadosEPrepararEnvio(event) {
    // 1. Impede o envio padrão do formulário, para que possamos controlar o processo
    event.preventDefault();

    const respostasContainers = quizContainer.querySelectorAll(".opcoes");
    let numCorretas = 0;

    hiddenInputsContainer.innerHTML = ""; // Limpa os inputs ocultos para garantir que não haja duplicatas

    const visitorIdInput = document.createElement("input");
    visitorIdInput.type = "hidden";
    visitorIdInput.name = "ID_do_Visitante";
    visitorIdInput.value = visitorId;
    hiddenInputsContainer.appendChild(visitorIdInput);

    // 2. Itera sobre cada pergunta para verificar as respostas
    minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
      const respostaContainer = respostasContainers[numeroPergunta];
      const selector = `input[name=pergunta${numeroPergunta}]:checked`;
      const inputUsuario = respostaContainer.querySelector(selector) || {};
      const respostaUsuario = inputUsuario.value;

      // 3. Encontra o <label> da resposta CORRETA e aplica a classe 'correta' (verde)
      const inputCorreto = respostaContainer.querySelector(
        `input[value=${perguntaAtual.respostaCorreta}]`
      );
      if (inputCorreto) {
        inputCorreto.parentElement.classList.add("correta");
      }

      // 4. Verifica se a resposta do usuário está certa ou errada
      if (respostaUsuario === perguntaAtual.respostaCorreta) {
        numCorretas++;
      } else if (respostaUsuario) {
        // Se o usuário respondeu e a resposta está errada, aplica a classe 'incorreta' (vermelho)
        inputUsuario.parentElement.classList.add("incorreta");
      }

      // (A lógica de criar os inputs ocultos para envio continua a mesma)
      const hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = `Resposta_Pergunta_${numeroPergunta + 1}`;
      hiddenInput.value = `Sua resposta: ${
        perguntaAtual.opcoes[respostaUsuario] || "N/A"
      }. Correta: ${perguntaAtual.opcoes[perguntaAtual.respostaCorreta]}.`;
      hiddenInputsContainer.appendChild(hiddenInput);
    });

    const scoreInput = document.createElement("input");
    scoreInput.type = "hidden";
    scoreInput.name = "Placar_Final";
    scoreInput.value = `${numCorretas} de ${minhasPerguntas.length}`;
    hiddenInputsContainer.appendChild(scoreInput);

    // 5. Exibe a pontuação final na tela
    resultadoContainer.innerHTML = `Você acertou ${numCorretas} de ${minhasPerguntas.length} perguntas!`;

    // 6. Desabilita o botão para impedir múltiplos envios
    submitButton.disabled = true;
    submitButton.textContent = "Resultados Enviados!";

    // 7. Envia o formulário após um tempo para que o usuário possa ver as cores
    setTimeout(() => {
      quizForm.submit();
    }, 2500); // 2.5 segundos de espera antes de enviar

     // Redireciona após 3 segundos (3000 milissegundos)
  setTimeout(function () {
    window.location.href = "formulario.html"; // troque pelo nome da sua página
  }, 3000);
  }

  montarQuiz();
  quizForm.addEventListener("submit", mostrarResultadosEPrepararEnvio);
});
