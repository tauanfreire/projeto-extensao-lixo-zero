document.addEventListener('DOMContentLoaded', function () {
    const quizContainer = document.getElementById('quiz-container');
    const submitButton = document.getElementById('submit-btn');
    const resultadoContainer = document.getElementById('resultado');

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

    function mostrarResultados() {
      const respostasContainers = quizContainer.querySelectorAll('.opcoes');
      let numCorretas = 0;
      
      const quizReport = {
          date: new Date().toISOString(),
          answers: [],
          score: ''
      };

      minhasPerguntas.forEach((perguntaAtual, numeroPergunta) => {
        const respostaContainer = respostasContainers[numeroPergunta];
        const selector = `input[name=pergunta${numeroPergunta}]:checked`;
        const respostaUsuario = (respostaContainer.querySelector(selector) || {}).value;

        quizReport.answers.push({
            question: perguntaAtual.pergunta,
            userAnswer: perguntaAtual.opcoes[respostaUsuario] || "Não respondida",
            correctAnswer: perguntaAtual.opcoes[perguntaAtual.respostaCorreta],
            isCorrect: respostaUsuario === perguntaAtual.respostaCorreta
        });

        if (respostaUsuario === perguntaAtual.respostaCorreta) {
          numCorretas++;
        }
      });
      
      quizReport.score = `${numCorretas} de ${minhasPerguntas.length}`;
      resultadoContainer.innerHTML = `Você acertou ${numCorretas} de ${minhasPerguntas.length} perguntas! Enviando resultado...`;
      
      // Envia os dados para o nosso backend no Render
      const backendUrl = 'https://lixo-zero-backend.onrender.com/submit'; // <-- IMPORTANTE!

      fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizReport)
      })
      .then(response => response.json())
      .then(data => {
        console.log('Sucesso:', data);
        resultadoContainer.innerHTML += '<br><small style="color: green;">Seu resultado foi salvo!</small>';
      })
      .catch((error) => {
        console.error('Erro:', error);
        resultadoContainer.innerHTML += '<br><small style="color: red;">Ocorreu um erro ao salvar seu resultado.</small>';
      });
    }

    montarQuiz();
    submitButton.addEventListener('click', mostrarResultados);
});