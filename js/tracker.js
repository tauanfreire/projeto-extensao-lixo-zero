// js/tracker.js

(function() {
   
    function generateUniqueId() {
        return 'user-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
    }

    let visitorId = localStorage.getItem('visitorId');

    if (!visitorId) {
      
        visitorId = generateUniqueId();
        localStorage.setItem('visitorId', visitorId);

       
        localStorage.setItem('visitCount', '1');

        
        localStorage.setItem('firstVisitDate', new Date().toISOString());

        console.log('Novo visitante detectado. ID:', visitorId);
    } else {
        
        let count = parseInt(localStorage.getItem('visitCount'), 10) || 0;
        count++;
        localStorage.setItem('visitCount', count.toString());
        console.log('Visitante recorrente. ID:', visitorId, 'Visita número:', count);
    }

   
    let pageViews = JSON.parse(localStorage.getItem('pageViews')) || [];
    pageViews.push({
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('pageViews', JSON.stringify(pageViews));
})();