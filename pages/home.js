import Head from "next/head";
import styles from "./index.module.css";
import { useState } from "react";
import Link from "next/link";
import { useSession, getSession, signOut } from "next-auth/react";
import { saveAs } from "file-saver";

export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();

  const downloadFile = () => {
    const fileContent = result;

    const file = new Blob([fileContent], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(file, "example.txt");
  };

  function handleSignOut() {
    signOut();
  }

  function User({ session, handleSignOut }) {
    return (
      // Need to connect Sign out button to main page below
      <main>
        <div className="details">
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSignOut}
            className="mt-2 px-10 py-10 rounded-sm bg-gray-50 "
          >
            Sign Out
          </button>
        </div>
      </main>
    );
  }

  {
    session ? User({ session, handleSignOut }) : null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    // New: Create a new FormData instance
    const formData = new FormData();

    // New: Append the file and description to the form data
    formData.append("resume", event.target.resume.files[0]);
    formData.append("description", event.target.description.value);

    try {
      // New: Send formData in the body instead of a JSON string
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
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
      <div className="details">
        <h5>{session.user.name}</h5>
        
      </div>
      <div className="flex justify-center">
        <h5 className="absolute left-1 mt-24">{session.user.email}</h5>
        <button
          onClick={handleSignOut}
          className="absolute left-1 mt-32 px-10 py-1 font-medium rounded-lg text-sm bg-green-500 text-white dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 hover:no-underline"
        >
          Sign Out
        </button>
      </div>

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
          <input type="submit" value="Generate" />
        </form>
        {loading && <p>Loading ...</p>}
        {!loading && result && (
          <button onClick={downloadFile}>Download File</button>
        )}
      </main>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanenet: false,
      },
    };
  }

  return {
    props: { session },
  };
}
