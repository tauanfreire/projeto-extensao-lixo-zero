document.addEventListener('DOMContentLoaded', function () {
  const quizContainer = document.getElementById('quiz-container');
  const resultadoContainer = document.getElementById('resultado');
  const quizForm = document.getElementById('quiz-form');
  const hiddenInputsContainer = document.getElementById('hidden-inputs');

  // --- NOVO: LÓGICA DO ID DE VISITANTE ---
  function getOrCreateVisitorId() {
    let visitorId = localStorage.getItem('lixoZeroVisitorId');
    if (!visitorId) {
      // Se não existe ID, cria um novo e o salva no navegador do usuário
      visitorId = 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      localStorage.setItem('lixoZeroVisitorId', visitorId);
    }
    return visitorId;
  }
  const visitorId = getOrCreateVisitorId();
  // --- FIM DA NOVA LÓGICA ---

  const minhasPerguntas = [
    {
      pergunta: "Onde você deve descartar cascas de frutas e restos de vegetais?",
      opcoes: { a: "Lixo reciclável", b: "Lixo orgânico", c: "Lixo comum (rejeito)" },
      respostaCorreta: "b"
    },
    {
      pergunta: "Pilhas e baterias devem ser descartadas em:",
      opcoes: { a: "Lixo comum", b: "Lixo reciclável", c: "Pontos de coleta específicos para lixo eletrônico/perigoso" },
      respostaCorreta: "c"
    },
    {
      pergunta: "Qual item NÃO é reciclável?",
      opcoes: { a: "Garrafa PET", b: "Papel higiênico usado", c: "Lata de alumínio" },
      respostaCorreta: "b"
    },

    {
      pergunta: "Onde devemos descartar óleo de cozinha usado?",
      opcoes: { a: "Na pia", b: "No lixo comum", c: "Em pontos de coleta específicos para óleo" },
      respostaCorreta: "c"
    },
    {
      pergunta: "Vidros quebrados devem ser descartados em:",
      opcoes: { a: "Lixo reciclável, bem embalados", b: "Lixo comum (rejeito), bem embalados", c: "Pontos de coleta de eletrônicos" },
      respostaCorreta: "b"
    },
    {
      pergunta: "Restos de comida devem ser descartados em qual tipo de lixo?",
      opcoes: { a: "Orgânico", b: "Reciclável", c: "Eletrônico" },
      respostaCorreta: "a"
    },
    {
      pergunta: "Papel com muita gordura (como caixa de pizza suja) deve ir para:",
      opcoes: { a: "Lixo reciclável", b: "Lixo orgânico", c: "Lixo comum (rejeito)" },
      respostaCorreta: "c"
    },
    {
      pergunta: "Qual desses itens é reciclável?",
      opcoes: { a: "Caixa de papelão limpa", b: "Guardanapo sujo", c: "Bituca de cigarro" },
      respostaCorreta: "a"
    },
    {
      pergunta: "Lâmpadas fluorescentes devem ser descartadas em:",
      opcoes: { a: "Lixo comum", b: "Coleta especial de materiais perigosos", c: "Lixo reciclável" },
      respostaCorreta: "b"
    },
    {
      pergunta: "Embalagens de vidro (como potes de conserva) devem ir para:",
      opcoes: { a: "Lixo orgânico", b: "Coleta de vidro reciclável", c: "Lixo comum" },
      respostaCorreta: "b"
    }

  ];

  function montarQuiz() {
    // (O código desta função não muda)
    const output = [];
    minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
      const opcoes = [];
      for (const letraOpcao in perguntaAtual.opcoes) {
        opcoes.push(
          `<label>
              <input type="radio" name="pergunta${numeroPergunta}" value="${letraOpcao}">
              <span>${letraOpcao.toUpperCase()}: ${perguntaAtual.opcoes[letraOpcao]}</span>
            </label>`
        );
      }
      output.push(
        `<div class="pergunta">
            <p>${numeroPergunta + 1}. ${perguntaAtual.pergunta}</p>
            <div class="opcoes">${opcoes.join('')}</div>
          </div>`
      );
    });
    quizContainer.innerHTML = output.join('');
  }

  function mostrarResultadosEPrepararEnvio(event) {
    event.preventDefault();

    const respostasContainers = quizContainer.querySelectorAll('.opcoes');
    let numCorretas = 0;

    hiddenInputsContainer.innerHTML = '';

    // --- NOVO: ADICIONA O ID DE VISITANTE AO FORMULÁRIO ---
    const visitorIdInput = document.createElement('input');
    visitorIdInput.type = 'hidden';
    visitorIdInput.name = 'ID_do_Visitante';
    visitorIdInput.value = visitorId;
    hiddenInputsContainer.appendChild(visitorIdInput);
    // --- FIM DA NOVA ADIÇÃO ---

    minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
      const respostaContainer = respostasContainers[numeroPergunta];
      const selector = `input[name=pergunta${numeroPergunta}]:checked`;
      const respostaUsuario = (respostaContainer.querySelector(selector) || {}).value;

      if (respostaUsuario === perguntaAtual.respostaCorreta) {
        numCorretas++;
      }

      const hiddenInput = document.createElement('input');
      hiddenInput.type = 'hidden';
      hiddenInput.name = `Resposta_Pergunta_${numeroPergunta + 1}`;
      hiddenInput.value = `Sua resposta: ${perguntaAtual.opcoes[respostaUsuario] || 'N/A'}. Correta: ${perguntaAtual.opcoes[perguntaAtual.respostaCorreta]}.`;
      hiddenInputsContainer.appendChild(hiddenInput);
    });

    const scoreInput = document.createElement('input');
    scoreInput.type = 'hidden';
    scoreInput.name = 'Placar_Final';
    scoreInput.value = `${numCorretas} de ${minhasPerguntas.length}`;
    hiddenInputsContainer.appendChild(scoreInput);

    resultadoContainer.innerHTML = `Você acertou ${numCorretas} de ${minhasPerguntas.length} perguntas! Os dados serão enviados.`;

    setTimeout(() => {
      quizForm.submit();
    }, 1500);
  }

  montarQuiz();
  quizForm.addEventListener('submit', mostrarResultadosEPrepararEnvio);
});