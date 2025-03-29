import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import rehypeHighlight from "rehype-highlight"

import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown"
import axios from 'axios'
import './App.css'

function App() {
  
  const [ code, setCode ] = useState(` function sum() {
  return 1 + 1
}`)

  const [ review, setReview ] = useState(``)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post("http://localhost:3001/ai/get-review", { code });
  
      console.log("Response Data:", response.data); // Debugging: Check API response
  
      // If API returns an object, extract the correct field (assuming { response: "some text" })
      setReview(response.data.response || "No review available");
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("Error fetching review.");
    }
  }
  

  return (
    <>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: "1px solid #ddd",
                borderRadius: "5px",
                height: "100%",
                width: "100%"
              }}
            />
          </div>
          <div
            onClick={reviewCode}
            className="review">Review</div>
        </div>
        <div className="right">
          <Markdown

            rehypePlugins={[ rehypeHighlight ]}

          >{review}</Markdown>
        </div>
      </main>
    </>
  )
}



export default App
