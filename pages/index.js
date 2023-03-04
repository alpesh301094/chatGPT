import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setUserInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Ask Me AnyThink</title>
      </Head>

      <main className={styles.main}>
        <h3>Ask Me AnyThink</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="userInput"
            placeholder="Enter an input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate Response" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
