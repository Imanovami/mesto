export default class Section {
    constructor({ item, renderer }, containerSelector) {
        this._renderedItems = item;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(element) {
        this._container.prepend(element);
    }
    renderItems() {
        this._renderedItems.reverse().forEach(item => {
            this._renderer(item);
        })
    }
}

