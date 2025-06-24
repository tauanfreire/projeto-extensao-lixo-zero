document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    const resultadoContainer = document.getElementById('resultado');
    const quizForm = document.getElementById('quiz-form');
    const hiddenInputsContainer = document.getElementById('hidden-inputs');

    const minhasPerguntas = [
      {
        pergunta: "Onde você deve descartar cascas de frutas e restos de vegetais?",
        opcoes: {
          a: "Lixo reciclável",
          b: "Lixo orgânico",
          c: "Lixo comum (rejeito)"
        },
        respostaCorreta: "b"
      },
      {
        pergunta: "Pilhas e baterias devem ser descartadas em:",
        opcoes: {
          a: "Lixo comum",
          b: "Lixo reciclável",
          c: "Pontos de coleta específicos para lixo eletrônico/perigoso"
        },
        respostaCorreta: "c"
      },
      {
        pergunta: "Qual item NÃO é reciclável?",
        opcoes: {
          a: "Garrafa PET",
          b: "Papel higiênico usado",
          c: "Lata de alumínio"
        },
        respostaCorreta: "b"
      }
    ];

    function montarQuiz() {
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
        event.preventDefault(); // Impede o envio imediato do formulário

        const respostasContainers = quizContainer.querySelectorAll('.opcoes');
        let numCorretas = 0;
        
        hiddenInputsContainer.innerHTML = ''; // Limpa os campos escondidos antigos

        minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
            const respostaContainer = respostasContainers[numeroPergunta];
            const selector = `input[name=pergunta${numeroPergunta}]:checked`;
            const respostaUsuario = (respostaContainer.querySelector(selector) || {}).value;

            // Feedback visual
            if (respostaUsuario === perguntaAtual.respostaCorreta) {
                numCorretas++;
            }

            // Cria um campo escondido para cada resposta para ser enviado por e-mail
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = `Resposta_Pergunta_${numeroPergunta + 1}`;
            hiddenInput.value = `Sua resposta: ${perguntaAtual.opcoes[respostaUsuario] || 'N/A'}. Correta: ${perguntaAtual.opcoes[perguntaAtual.respostaCorreta]}.`;
            hiddenInputsContainer.appendChild(hiddenInput);
        });

        // Adiciona o placar final como um campo escondido
        const scoreInput = document.createElement('input');
        scoreInput.type = 'hidden';
        scoreInput.name = 'Placar_Final';
        scoreInput.value = `${numCorretas} de ${minhasPerguntas.length}`;
        hiddenInputsContainer.appendChild(scoreInput);

        resultadoContainer.innerHTML = `Você acertou ${numCorretas} de ${minhasPerguntas.length} perguntas! Os dados serão enviados.`;

        // Agora, envia o formulário com os dados escondidos
        setTimeout(() => {
            quizForm.submit();
        }, 1500); // Espera 1.5 segundos para o usuário ver a mensagem
    }

    montarQuiz();
    quizForm.addEventListener('submit', mostrarResultadosEPrepararEnvio);
});