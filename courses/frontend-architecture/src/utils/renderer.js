export const onMountedFactory = () => {
  let isCalled = false;
  return (fun) => {
    if (!isCalled) {
      isCalled = true;
      return fun();
    }
  };
};

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

export const rerender = () => {
  const event = new CustomEvent('rerenderView');
  document.dispatchEvent(event);
};
