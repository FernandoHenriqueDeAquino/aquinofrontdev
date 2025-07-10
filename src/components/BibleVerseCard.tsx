import React, { useEffect, useState } from "react";

const VERSE_API = "https://beta.ourmanna.com/api/v1/get/?format=json";

const BibleVerseCard: React.FC = () => {
  const [verse, setVerse] = useState<string>("");
  const [reference, setReference] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVerse() {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(VERSE_API);
        if (!resp.ok) throw new Error("Failed to fetch verse of the day");
        const data = await resp.json();
        const verseText = data.verse.details.text;
        const verseRef = data.verse.details.reference;
        setVerse(verseText || "Verse not found");
        setReference(verseRef || "Reference not found");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message || "Failed to fetch verse of the day");
      } finally {
        setLoading(false);
      }
    }
    fetchVerse();
  }, []);

  return (
    <div className="crt-glow" style={{
      background: '#111',
      border: '2px solid #39ff14',
      borderRadius: 8,
      padding: 24,
      color: '#39ff14',
      fontFamily: 'Fira Mono, Consolas, Courier New, monospace',
      maxWidth: 400,
      margin: '32px auto',
      boxShadow: '0 0 16px #39ff14',
      textAlign: 'left',
    }}>
      <h2 style={{marginTop:0}}>Verse of the Day</h2>
      {loading ? <p>Loading...</p> : error ? (
        <p style={{ color: '#ff5555' }}>{error}</p>
      ) : (
        <>
          <p style={{ fontStyle: 'italic' }}>&ldquo;{verse}&rdquo;</p>
          <p style={{ textAlign: 'right', marginTop: 8 }}>{reference}</p>
        </>
      )}
    </div>
  );
};

export default BibleVerseCard;
