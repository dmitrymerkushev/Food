import 'es6-promise-polyfill';
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimertId = setTimeout(() => openModal('.modal', modalTimertId), 30000); 


    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); 
    modal('[data-modal]', '.modal', modalTimertId);
    timer('.timer', '2023-02-30');
    cards();
    calc(); 
    forms('form', modalTimertId); 
    slider({
        container: '.offer__slider', 
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev', 
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

});





