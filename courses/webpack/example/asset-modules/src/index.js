import CodeImageUrl from "./assets/code.jpg";
import NyanCatImageBase64 from "./assets/nyancat.svg";
import DockerImageUrl from "./assets/docker.png";
import DataTxt from "./assets/data.txt";

const App = () => {
  const Container = document.createElement("div");

  const CodeImage = document.createElement("img");
  Container.appendChild(CodeImage);
  CodeImage.src = CodeImageUrl;
  CodeImage.width = "500";

  const NyanCatImage = document.createElement("img");
  Container.appendChild(NyanCatImage);
  NyanCatImage.src = NyanCatImageBase64;
  NyanCatImage.width = "200";

  const DockerImage = document.createElement("img");
  Container.appendChild(DockerImage);
  DockerImage.src = DockerImageUrl;
  DockerImage.width = "200";

  const CommandsElement = document.createElement("pre");
  Container.appendChild(CommandsElement);
  CommandsElement.innerText = DataTxt;

  return Container;
};

document.body.appendChild(App());
