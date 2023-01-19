import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import AboutText from "./About.md";
import { useEffect, useState } from "react";

export const AboutContainer = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    fetch(AboutText)
      .then((response) => response.text())
      .then((content) => {
        setContent(content);
      });
  }, []);

  return <ReactMarkdown>{content}</ReactMarkdown>;
};
