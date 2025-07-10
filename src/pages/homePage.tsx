import { useEffect, useState } from "react";
import { Layout } from "antd";
import GithubStatusCard from '../components/GithubStatusCard';
import BibleVerseCard from '../components/BibleVerseCard';


const TYPEWRITER_TEXT = "Aquino Dev";
const TYPE_SPEED = 120; // ms per character
const RESTART_DELAY = 25000; // ms

const HomePage = () => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: number;
    const cursorInterval: number = setInterval(() => setShowCursor(c => !c), 500);
    let index = 0;
    function type() {
      if (index <= TYPEWRITER_TEXT.length) {
        setDisplayed(TYPEWRITER_TEXT.slice(0, index));
        index++;
        timeout = window.setTimeout(type, TYPE_SPEED);
      } else {
        // Wait, then restart
        timeout = window.setTimeout(() => {
          setDisplayed("");
          index = 0;
          type();
        }, RESTART_DELAY);
      }
    }
    type();
    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <Layout style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', margin: 0, padding: 0, background: '#000' }}>
      <Layout.Header
        style={{ backgroundColor: '#000', color: '#39ff14', textAlign: 'center', width: '100%', margin: 0, padding: 0 }}
      >
        <h1 className="crt-glow" style={{ display: 'inline-block' }}>
          {displayed}
          <span className="crt-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </h1>
      </Layout.Header>
      <Layout.Content style={{ padding: '20px', background: '#000', width: '100%', height: '100%', margin: 0, color: '#39ff14' }}>
        <p className="crt-glow">Bem-vindo à página inicial do Aquino Dev!</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
          <GithubStatusCard />
          <BibleVerseCard />
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default HomePage;