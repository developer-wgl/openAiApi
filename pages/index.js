import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [result, setResult] = useState();
  var outResult = ''

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  async function onChatSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chat: chatInput }),
      });


      console.log("response: " + response)
      
      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      outResult += data.result
      console.log(data)
      setResult(outResult);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI API Test </title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Chat </h3>
        <form onSubmit={onChatSubmit}>
          <input
            type="text"
            name="chat"
            placeholder="Enter an chat"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <input type="submit" value="Generate cahts" />
        </form>
        <br/>
        <h4>输入动物，返回动物的描述</h4>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
        <br/>
        <br/>
        <br/>
        <div>Github地址：<a href="https://github.com/developer-wgl/openAiApi/">https://github.com/developer-wgl/openAiApi</a></div>
      </main>
    </div>
  );
}
