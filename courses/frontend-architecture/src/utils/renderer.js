export const create = (element, props = {}, children = []) => {
  const elementEl = document.createElement(element);
  Object.keys(props).forEach((propKey) => {
    elementEl[propKey] = props[propKey];
  });

  children.forEach((child) => {
    elementEl.appendChild(child);
  });

  return elementEl;
};
