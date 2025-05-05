import { useRef } from "react";
import Header from "../components/Header";
import "./About.css";

export default function About() {
  const dialogRef = useRef();

  const handleQuote = async () => {
    try {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": "Aip1ZKfkzYzmqOA2PrQC+w==f7sSoMhAOA552E5r" },
      });
      const data = await res.json();
      console.log(data);
      const quote = data[0]?.quote;
      const author = data[0]?.author;

      dialogRef.current.querySelector(".quote").innerText = `"${quote}"`;
      dialogRef.current.querySelector(".author").innerText = `— ${author}`;
      dialogRef.current.showModal();
    } catch (err) {
      dialogRef.current.querySelector(".quote").innerText =
        "Couldn't fetch a quote.";
      dialogRef.current.querySelector(".author").innerText = "";
      dialogRef.current.showModal();
    }
  };

  const closeDialog = () => dialogRef.current.close();

  return (
    <>
      <Header />
      <main className="about">
        <h2>About Habit Tracker</h2>
        <section>
          <p>
            Habit Tracker helps you stay on top of your daily goals. Check off
            habits, see progress, and stay motivated!
          </p>
        </section>

        <section>
          <h3>How to Use:</h3>
          <ul>
            <li>Add your habits</li>
            <li>Check them off as you complete</li>
            <li>Track your progress daily</li>
            <li>Delete habits you no longer want</li>
          </ul>
        </section>

        <button onClick={handleQuote}>Get a Random Quote</button>

        <dialog ref={dialogRef} className="custom-alert">
          <h3>✨ Quote of the Moment ✨</h3>
          <p className="quote"></p>
          <p className="author"></p>
          <button onClick={closeDialog}>Close</button>
        </dialog>
      </main>
    </>
  );
}
