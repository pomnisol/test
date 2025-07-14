// Получаем объект WebApp из глобального объекта window
const tg = window.Telegram.WebApp;

document.addEventListener("DOMContentLoaded", function() {
    // Раскрываем приложение на всю высоту
    tg.expand();

    const userDataElement = document.getElementById("user-data");
    const sendDataBtn = document.getElementById("send-data-btn");
    const closeAppBtn = document.getElementById("close-app-btn");
    const textInput = document.getElementById("text-input");

    // Показываем информацию о пользователе
    if (tg.initDataUnsafe.user) {
        const user = tg.initDataUnsafe.user;
        userDataElement.innerHTML = `
            <b>ID:</b> ${user.id}<br>
            <b>Имя:</b> ${user.first_name} ${user.last_name || ''}<br>
            <b>Юзернейм:</b> @${user.username || 'отсутствует'}<br>
            <b>Язык:</b> ${user.language_code}
        `;
    } else {
        userDataElement.innerText = "Информация о пользователе недоступна.";
    }

    // Обработчик кнопки "Отправить данные"
    sendDataBtn.addEventListener("click", () => {
        const text = textInput.value;
        if (text.trim().length > 0) {
            // Отправляем данные в бот
            tg.sendData(text);
            // Закрываем Web App после отправки
            tg.close();
        } else {
            // Показываем уведомление, если поле пустое
            tg.showAlert("Пожалуйста, введите какой-нибудь текст.");
        }
    });

    // Обработчик кнопки "Закрыть"
    closeAppBtn.addEventListener("click", () => {
        // Закрываем Web App
        tg.close();
    });
});
