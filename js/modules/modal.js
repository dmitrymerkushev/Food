function openModal(modalSelector, modalTimertId) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    console.log(modalTimertId);
    if (modalTimertId) {
        clearInterval(modalTimertId);
    }
    // window.removeEventListener('scroll', showModalByScroll); - предотвращало повторное открывание окна при скорлле, но при использовании модулей перестало работать
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimertId) {
    // Modal

    const modalTrigger = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);
    // const modalCloseBtn = document.querySelector('[data-close]'); - изменяем, т.к. не сработает на динамически появляющихся элементах

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimertId));                              // Нужно ля того, чтобы корректно передать функцию, а не сразу ее вызвать
    });
    
    // modalCloseBtn.addEventListener('click', closeModal); - убираем из-за динамически изменяющегося окна modal

    modal.addEventListener('click', (e) => {
        if (e.target && e.target === modal || e.target.getAttribute('data-close') == '') {  // Добавили строчку || e.target.getAttribute('data-close') == '' для того, чтобы использовать делегирование событий (из-за динамически изменяющегося окна modal)
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimertId);
            // window.removeEventListener('scroll', showModalByScroll);                     - Тут неправилно ставить это, потому что если открыть модальное окно и потом пролистать вниз страницы, то оно снова откроется
        }
    }

    window.addEventListener('scroll', showModalByScroll/* , {once: true} - не сработает, т.к. addEventListener работает сразу же при скролле*/);
}

export default modal;
export {closeModal};
export {openModal};