document.addEventListener('DOMContentLoaded', function() {
    const cisLanguages = ['ru', 'uk', 'be', 'kk', 'uz', 'tk', 'ky', 'tg', 'hy', 'az', 'ro'];

    function checkBrowserLanguage() {
        const userLanguage = navigator.language || navigator.languages[0];
        const languageCode = userLanguage.split('-')[0];
        
        if (cisLanguages.includes(languageCode)) {
            showNotification();
        }
    }

    function showNotification() {
        const notification = document.createElement('div');
        notification.className = 'modern-notification';
        
        notification.innerHTML = `
            <div class="notification-content">
                <button class="close-btn" aria-label="Закрыть">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M13 1L1 13M1 1L13 13" stroke="currentColor" stroke-width="2"/>
                    </svg>
                </button>
                <div class="notification-icon">⚠️</div>
                <div class="notification-text">
                    <h3>Доступ ограничен</h3>
                    <p>Для доступа к сайту требуется VPN. Пожалуйста, включите VPN и обновите страницу (Ctrl + F5)</p>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .modern-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                max-width: 420px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 0;
                border-radius: 16px;
                box-shadow: 
                    0 10px 30px rgba(0, 0, 0, 0.2),
                    0 0 0 1px rgba(255, 255, 255, 0.1);
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                animation: slideIn 0.3s ease-out;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .notification-content {
                position: relative;
                padding: 24px;
                padding-top: 40px;
            }

            .close-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                width: 28px;
                height: 28px;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s ease;
            }

            .close-btn:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }

            .notification-icon {
                font-size: 24px;
                margin-bottom: 12px;
            }

            .notification-text h3 {
                margin: 0 0 8px 0;
                font-size: 18px;
                font-weight: 600;
            }

            .notification-text p {
                margin: 0;
                line-height: 1.5;
                opacity: 0.9;
                font-size: 14px;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @media (max-width: 480px) {
                .modern-notification {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(notification);

        // Добавляем обработчик закрытия
        notification.querySelector('.close-btn').addEventListener('click', function() {
            notification.style.animation = 'slideIn 0.3s ease-out reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 250);
        });

        // Автозакрытие через 10 секунд
        setTimeout(() => {
            if (notification.parentNode) {
                notification.querySelector('.close-btn').click();
            }
        }, 10000);
    }

    checkBrowserLanguage();
});
