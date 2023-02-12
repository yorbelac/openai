import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const API_KEY = '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'
  
  async function callAPI() {
    console.log("Calling the OpenAI API");


    const APIBody = {
      "model": "text-davinci-003",
      "prompt": prompt + ' explain in a cowboy voice.',
      "temperature": 0,
      "max_tokens": 60,
      "top_p": 1.0,
      "frequency_penalty": 0.0,
      "presence_penalty": 0.0
    }

    await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + API_KEY
      },
      body: JSON.stringify(APIBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setResponse(data.choices[0].text.trim());
    });
  }

  return (
    <div className="App">
      <div>
        <textarea
        onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter prompt here."
          cols={50}
          rows={10}
        />
      </div>
      <div>
        <button onClick={callAPI}>Submit</button>
        <h3>{response}</h3>
      </div>

    </div>
  )
}

export default App
