export default class Popup {
    constructor(selectorPopup) {
        this._element = document.querySelector(selectorPopup)
    }
        open() {
            this._element.classList.add('popup_opened');
            window.addEventListener('keydown', this._handleEscClose)
        };


        close() {
            this._element.classList.remove('popup_opened');
            window.removeEventListener('keydown', this._handleEscClose);
        };

        _handleEscClose = (evt) => {
            if (evt.key === 'Escape') {
                this.close();
            }
        }

        setEventListeners() {
            this._element.querySelector('.popup__close').addEventListener ('click', () => {
                this.close();
            })

            this._element.addEventListener('mousedown', (evt) => {
                if (evt.target !== evt.currentTarget) {return}
                this.close();
            })
        }
    }






