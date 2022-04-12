export const Button = (text) => {
    const buttonEl = document.createElement('button');
    buttonEl.innerText = text;

    return buttonEl;
}