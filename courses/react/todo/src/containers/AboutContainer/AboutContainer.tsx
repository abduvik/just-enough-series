import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

export const AboutContainer = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    // @ts-ignore
    import("./About.md").then((module) => {
      fetch(module.default).then((response) => {
        response.text().then((text) => {
          setContent(text);
        });
      });
    });
  }, []);

  return <ReactMarkdown>{content}</ReactMarkdown>;
};
