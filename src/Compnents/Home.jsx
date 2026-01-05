import React, { useState } from "react";

const Home = () => {
  const [emailText, setEmailText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const checkSpam = async () => {
    if (!emailText.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch(
        "https://wilton-gadgety-boozily.ngrok-free.dev/spam_prediction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: emailText }),
        }
      );

      const data = await res.json();
      setResult(data.Prediction);
    } catch (err) {
      setResult("Error checking email");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full relative bg-black overflow-hidden">

      {/* Prismatic Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
            radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
            radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
            #000000
          `,
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen text-white">

        {/* Navbar */}
       <nav className="w-[90%] m-auto px-6 py-4 bg-black/30 backdrop-blur-md border-b border-white/10">
  <div className="max-w-6xl mx-auto flex justify-center sm:justify-between items-center">
    
    {/* Title */}
    <h1 className="text-lg font-semibold text-center sm:text-left">
      Spam Mail Detection
    </h1>

    {/* Links (hidden on mobile) */}
    <div className="hidden sm:flex gap-6 text-sm text-gray-300">
      <a href="https://drive.google.com/file/d/1uzbhec5TW_OjFr4UUZkoMm0rpyvYdhZw/view" className="hover:text-white">Dataset</a>
      <a href="https://github.com/BalueswarMeduri/Spam-Mail-Prediction.git" className="hover:text-white">GitHub</a>
    </div>

  </div>
</nav>


        {/* Hero Section (API here) */}
        <section className="pt-20 flex flex-col items-center justify-center flex-grow px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Spam Mail Detection System
          </h2>

          <p className="text-gray-300 max-w-xl mb-6">
            Paste your email content below to instantly check whether it is spam or safe.
          </p>

          <textarea
            className="w-full max-w-2xl h-40 p-4 rounded-lg bg-white/10 backdrop-blur-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
            placeholder="Paste email content here..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />

          <button
            onClick={checkSpam}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            {loading ? "Checking..." : "Check Spam"}
          </button>

         {result && (
  <div
    className={`mt-6 px-6 py-3 rounded-xl text-lg font-semibold ${
      result.toLowerCase().startsWith("this email is spam")
        ? "bg-red-500/20 text-red-300 border border-red-400"
        : "bg-green-500/20 text-green-300 border border-green-400"
    }`}
  >
    {result}
  </div>
)}
        </section>

        {/* Resources Section */}
        <section className="px-6 py-16">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-pink-400 transition">
              <h3 className="text-lg font-semibold mb-2">Dataset</h3>
              <p className="text-gray-400 mb-4">
                Dataset used to train the spam mail detection model.
              </p>
              <a href="https://drive.google.com/file/d/1uzbhec5TW_OjFr4UUZkoMm0rpyvYdhZw/view" className="text-pink-400 hover:underline">
                View Dataset →
              </a>
            </div>

            <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-400 transition">
              <h3 className="text-lg font-semibold mb-2">GitHub Repository</h3>
              <p className="text-gray-400 mb-4">
                Complete source code for ML model, API, and frontend.
              </p>
              <a href="https://github.com/BalueswarMeduri/Spam-Mail-Prediction.git" className="text-cyan-400 hover:underline">
                View GitHub →
              </a>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 py-6 border-t border-white/10">
          © 2026 Spam Mail Detection System | Built with React & FastAPI
        </footer>

      </div>
    </div>
  );
};

export default Home;
