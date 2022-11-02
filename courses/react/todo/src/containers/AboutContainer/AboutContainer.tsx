export const AboutContainer = () => {
  // @ts-ignore
  // @todo: fix this
  import("./About.md").then((module) => {
    fetch(module.default).then((response) => {
      response.text().then((text) => {
        document.getElementById("about")!.innerHTML = text;
      });
    });
  });

  return <div id={"about"}>About</div>;
};
