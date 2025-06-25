document.addEventListener('DOMContentLoaded', function () {
  const quizContainer = document.getElementById('quiz-container');
  const resultadoContainer = document.getElementById('resultado');
  const quizForm = document.getElementById('quiz-form');
  const hiddenInputsContainer = document.getElementById('hidden-inputs');
  const submitButton = document.getElementById('submit-btn');


  function getOrCreateVisitorId() {
    let visitorId = localStorage.getItem('lixoZeroVisitorId');
    if (!visitorId) {
    
      visitorId = 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
      localStorage.setItem('lixoZeroVisitorId', visitorId);
    }
    return visitorId;
  }
  const visitorId = getOrCreateVisitorId();


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
    const output = [];
    minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
      const opcoes = [];
      for (const letraOpcao in perguntaAtual.opcoes) {
        opcoes.push(
          // O elemento <label> envolve o input para podermos colorir o fundo todo
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
    // 1. Impede o envio padrão do formulário, para que possamos controlar o processo
    event.preventDefault();

    const respostasContainers = quizContainer.querySelectorAll('.opcoes');
    let numCorretas = 0;

    hiddenInputsContainer.innerHTML = ''; // Limpa os inputs ocultos para garantir que não haja duplicatas
    
    const visitorIdInput = document.createElement('input');
    visitorIdInput.type = 'hidden';
    visitorIdInput.name = 'ID_do_Visitante';
    visitorIdInput.value = visitorId;
    hiddenInputsContainer.appendChild(visitorIdInput);
   
    // 2. Itera sobre cada pergunta para verificar as respostas
    minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
      const respostaContainer = respostasContainers[numeroPergunta];
      const selector = `input[name=pergunta${numeroPergunta}]:checked`;
      const inputUsuario = (respostaContainer.querySelector(selector) || {});
      const respostaUsuario = inputUsuario.value;

      // 3. Encontra o <label> da resposta CORRETA e aplica a classe 'correta' (verde)
      const inputCorreto = respostaContainer.querySelector(`input[value=${perguntaAtual.respostaCorreta}]`);
      if (inputCorreto) {
        inputCorreto.parentElement.classList.add('correta');
      }

      // 4. Verifica se a resposta do usuário está certa ou errada
      if (respostaUsuario === perguntaAtual.respostaCorreta) {
        numCorretas++;
      } else if (respostaUsuario) { 
        // Se o usuário respondeu e a resposta está errada, aplica a classe 'incorreta' (vermelho)
        inputUsuario.parentElement.classList.add('incorreta');
      }

      // (A lógica de criar os inputs ocultos para envio continua a mesma)
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

    // 5. Exibe a pontuação final na tela
    resultadoContainer.innerHTML = `Você acertou ${numCorretas} de ${minhasPerguntas.length} perguntas!`;
    
    // 6. Desabilita o botão para impedir múltiplos envios
    submitButton.disabled = true;
    submitButton.textContent = 'Resultados Enviados!';

    // 7. Envia o formulário após um tempo para que o usuário possa ver as cores
    setTimeout(() => {
      quizForm.submit();
    }, 2500); // 2.5 segundos de espera antes de enviar
  }

  montarQuiz();
  quizForm.addEventListener('submit', mostrarResultadosEPrepararEnvio);
});