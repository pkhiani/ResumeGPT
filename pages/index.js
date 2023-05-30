import Head from "next/head";
import styles from "./index.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: event.target.resume.value,
          description: event.target.description.value,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error || new Error(`Request failed with status ${data.status}`)
        );
      }
      setLoading(false);
      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>ResumeGPT</title>
      </Head>

      <main className={styles.main}>
        <h3>Tailor My Resume</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="resume">Upload your resume (.doc, .docx, .pdf)</label>
          <input
            name="resume"
            type="file"
            id="resume"
            accept=".doc,.docx,.pdf"
            required
          />
          <textarea
            name="description"
            id="description"
            cols="40"
            rows="10"
            placeholder="Paste your job description"
            required
          ></textarea>
          {loading && (
            <FontAwesomeIcon icon="fa-regular fa-circle-notch" spin />
          )}
          <input type="submit" value="Generate" />
        </form>
        <p>{result}</p>
      </main>
    </div>
  );
}
