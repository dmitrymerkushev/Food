import {closeModal, openModal} from "./modal";
import { postData } from "../services/services";


function forms(formSelector, modalTimertId) {
    // Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        // loading: 'Загрузка', - поменяли на спиннер
        loading: 'img/form/spinner.svg',
        succes: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            

            // С помощью Fetch API!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            // 2) JSON-формат данных

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));    
            // formData превращаем в массив массивов, потом в классический объект и потом в json

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.succes);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);   // Не сработает при обычной ошибке (при некорректной url сервера или подобное), т.к. по логике fetch нормально выполнил resolve, он смог сделать запрос
                // Это будет выполняться при сбое сети или подобном
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimertId);
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }
}

export default forms;