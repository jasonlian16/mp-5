"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult("");

    const res = await fetch("/api/shortener", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, alias }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setResult(`${window.location.origin}/${alias}`);
  }

  return (
    <main className="flex items-center justify-center p-10">
      <div className="flex flex-col w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center" >URL Shortener</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            placeholder="Enter URL"
            className="border p-2"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <input
            placeholder="Enter Alias"
            className="border p-2"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />

          <button className="bg-blue-600 text-white p-2 rounded cursor-pointer">
            Shorten URL
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {result && (
          <div className="border border-black border-solid rounded p-4 mt-4 bg-green-300">
            <p>
              Short URL:{" "}
              <a className="text-blue-600 underline" href={result}>
                {result}
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}