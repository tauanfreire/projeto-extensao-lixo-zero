// js/tracker.js

(function() {
    // Função para gerar um ID único simples
    function generateUniqueId() {
        return 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }

    // Verifica se já existe um ID de visitante no localStorage
    let visitorId = localStorage.getItem('visitorId');

    if (!visitorId) {
        // Se não existe, é um novo visitante
        visitorId = generateUniqueId();
        localStorage.setItem('visitorId', visitorId);

        // Inicia o contador de visitas para este novo usuário
        localStorage.setItem('visitCount', '1');

        // Registra a data do primeiro acesso
        localStorage.setItem('firstVisitDate', new Date().toISOString());

        console.log('Novo visitante detectado. ID:', visitorId);
    } else {
        // Se já existe, é um visitante retornando
        let count = parseInt(localStorage.getItem('visitCount'), 10) || 0;
        count++;
        localStorage.setItem('visitCount', count.toString());
        console.log('Visitante recorrente. ID:', visitorId, 'Visita número:', count);
    }

    // Registra cada visualização de página
    let pageViews = JSON.parse(localStorage.getItem('pageViews')) || [];
    pageViews.push({
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
})();