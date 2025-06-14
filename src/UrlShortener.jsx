import React, { useState } from "react";
import axios from "axios";

// const SHORTIO_API_KEY = "sk_vTsaBtEa9gNkKutZ";
// const SHORTIO_DOMAIN = "gautamahuja.me";

const UrlShortener = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      console.log(import.meta.env.VITE_SHORTIO_DOMAIN);
      const response = await axios.post(
        "https://api.short.io/links",
        {
          originalURL: originalUrl,
          domain: import.meta.env.VITE_SHORTIO_DOMAIN,
        },
        {
          headers: {
            authorization: import.meta.env.VITE_SHORTIO_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      //   return response.data.shortURL;
      setShortUrl(response.data.shortURL);
    } catch (err) {
      setError("Something went wrong. Try again.");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl space-y-4">
        <input
          type="url"
          required
          placeholder="Paste your long URL here..."
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Shorten URL
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 flex items-center gap-3">
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-lg"
          >
            {shortUrl}
          </a>
          <button
            onClick={handleCopy}
            className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default UrlShortener;
