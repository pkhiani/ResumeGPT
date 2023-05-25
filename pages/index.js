import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resume,
          jobDescription: jobDescription,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }

      setResult(data.result);
      setResume("");
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
        <script
          src="https://kit.fontawesome.com/e5790a7f1d.js"
          crossorigin="anonymous"
        ></script>
      </Head>

      <main className={styles.main}>
        <i className="fa-light fa-file"></i>

        <h3>Tailor My Resume</h3>
        <form onSubmit={onSubmit}>
          <label for="resume_upload">
            Upload your resume (.doc, .docx, .pdf)
          </label>
          <input
            type="file"
            id="resume_upload"
            accept=".doc,.docx,.pdf"
            name="resume"
            required
            value={resume}
            onChange={(e) => setResume(e.target.value)}
          />
          {/* TODO: create the textarea wider */}
          <textarea
            name="jobDescription"
            id="description_upload"
            cols="40"
            rows="10"
            required
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          ></textarea>
          <input type="submit" value="Generate" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
