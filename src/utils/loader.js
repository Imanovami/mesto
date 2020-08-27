export const loader = (value, form) => {
    const formElement = form.querySelector('.popup__save');
    if (value) {
        formElement.textContent = 'Сохраняется...';
    } else {
        formElement.textContent = 'Сохранить';
    }
}