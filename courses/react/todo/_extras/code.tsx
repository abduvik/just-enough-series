import { useEffect, useState } from "react";

/**
 * This is a code to find all anchor elements on a page and convert them to be like react-router
 */
const useRouting = () => {
  const [location, setLocation] = useState(window.location.pathname);

  useEffect(() => {
    document.querySelectorAll("a").forEach((el) => {
      el.addEventListener("click", (event) => {
        event.preventDefault();
        const link = (event.target as HTMLAnchorElement).href;
        if (link && window.history.state.currentPage !== link) {
          window.history.pushState({ currentPage: link }, "", link);
          setLocation(window.location.pathname);
        }
      });
    });

    window.addEventListener("popstate", (event) => {
      setLocation((event.target as Window).location.pathname);
    });
  }, []);

  console.log(location);
};

/**
 * This code will change the TodoContainer to be loaded async and will show a loading indicator
 * while the component is loading
 * @constructor
 */
export const AsyncTodoContainer = () => {
  const [Component, setComponent] = useState<any>(() => "");

  useEffect(() => {
    import("../src/containers/TodoContainer").then((module) => {
      setComponent(module.default);
    });
  });

  return <div>{Component}</div>;
};

/**
 * This is the same but more generic and will work very similar to React.lazy
 * @param importFn
 */
export const withAsync = (importFn: any) => {
  return () => {
    const [Component, setComponent] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      importFn().then((module: any) => {
        setComponent(() => module.default);
        setIsLoaded(true);
      });
    }, []);

    return isLoaded ? <Component /> : null;
  };
};
