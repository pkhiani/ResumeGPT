import Head from "next/head";
import styles from "./index.module.css";
import { useState } from "react";
import Link from 'next/link'
import { useSession, getSession, signOut } from "next-auth/react"


export default function Home() {
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const {data: session} = useSession()

  function handleSignOut(){
    signOut()
  }

  function User({session, handleSignOut}){
    return (
      // Need to connect Sign out button to main page below
      <main>
        <div className='details'>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
        </div>

        <div className="flex justify-center">
          <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-gray-50">
            Sign Out
          </button>
        </div>
      </main>
    )
  }

  {session ? User({session, handleSignOut}) : null}

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
      console.log(data);
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
      <div className='details'>
          <h5>{session.user.name}</h5>
          <h5>{session.user.email}</h5>
      </div>
      <div className="flex justify-center">
          <button onClick={handleSignOut} className="absolute left-0 px-10 py-1 rounded-sm bg-green-300">
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
        <p>{result}</p>
      </main>
    </div>
  );
}

export async function getServerSideProps({req}){
  const session = await getSession({ req })

  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanenet: false
      }
    }
  }

  return {
    props: { session }
  }
}
