export const App = () : HTMLElement => {
    const container = document.createElement('div');
    
    const title = document.createElement('h1');
    title.innerText = 'Colorful Tree';
    container.appendChild(title);

    return container;
}