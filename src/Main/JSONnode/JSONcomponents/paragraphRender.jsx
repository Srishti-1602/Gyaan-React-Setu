import React, { useEffect } from "react";

function MathJax(props) {
    useEffect(() => {
      // Load MathJax script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        window.MathJax.Hub.Config({
          extensions: ["tex2jax.js", "autoMath2.js"],
          jax: ["input/TeX", "output/HTML-CSS"],
          tex2jax: {
            inlineMath: [["$", "$"],
                          ['\\(\\', '\\)\\'],
                          ["\\[", "\\]"],
                      ],
            displayMath: [["$$", "$$"], ["\\[", "\\]"]],
          },
          TeX: {
            extensions: ["AMSmath.js", "AMSsymbols.js"],
          },
        });
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]);
      };
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/MathJax.js?config=TeX-AMS_HTML";
      document.head.appendChild(script);
  
      return () => {
        // Unload MathJax script
        document.head.removeChild(script);
      };
    }, []);
  
    return <span dangerouslySetInnerHTML={{ __html: props.children }} />;
}
  
const Paragraph = ({ value }) => {
  const paragraphs = Array.isArray(value)
    ? value.map((paragraph, index) => {
        if (paragraph.startsWith("IMAGE_URL: ")) {
          const imageUrl = paragraph.substring("IMAGE_URL: ".length);
          return <img key={index} src={imageUrl} alt="embedded" style={{ backgroundColor: "white" }} />;
        } else if (paragraph.startsWith("LIST_TEXT: ")) {
          const listText = paragraph.substring("LIST_TEXT: ".length);
          return <li key={index} style={{ color: "white", fontSize: "16px" }}>{listText}</li>;
        } else {
          return (
            <MathJax key={index}>
              {paragraph}
            </MathJax>
          );
        }
      })
    : value;

  return (
    <span style={{ color: "white", fontSize: "16px", paddingLeft: "1em" }}>
      {paragraphs.map((paragraph, index) => (
        <React.Fragment key={index}>
          {paragraph}
          <br />
        </React.Fragment>
      ))}
    </span>
  );
};

export default Paragraph;




