/**
 * AdFlow — видео-рекламная сеть для сайтов
 * Документация: https://ad-flow.github.io/adflow-html/
 */

(function() {
    const config = window.AdFlow || {};
    const apiKey = config.apiKey || 'fca26dc62445a72a282aeb5f145ef9b3';
    const apiUrl = config.apiUrl || 'http://144.31.199.202:5000/api/ad/html';
    const containerId = config.containerId || 'adflow-ad';

    function init() {
        const container = document.getElementById(containerId);
        if (!container) {
            console.warn('AdFlow: контейнер #' + containerId + ' не найден');
            return;
        }

        container.innerHTML = '<div style="text-align:center;color:#888;padding:10px;">Загрузка рекламы...</div>';

        fetch(apiUrl, {
            headers: { 'X-API-Key': apiKey }
        })
        .then(r => r.json())
        .then(data => {
            container.innerHTML = data.html || '<div style="text-align:center;color:#999;padding:10px;">Реклама не найдена</div>';
        })
        .catch(() => {
            container.innerHTML = '<div style="text-align:center;color:#999;padding:10px;">Ошибка загрузки рекламы</div>';
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
