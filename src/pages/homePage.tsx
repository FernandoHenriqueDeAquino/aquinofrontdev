import { useEffect, useState } from "react";
import { Layout, Switch } from "antd"; // Importe o Switch
import GithubStatusCard from '../components/GithubStatusCard';
import BibleVerseCard from '../components/BibleVerseCard';


const TYPEWRITER_TEXT = "Aquino Dev";
const TYPE_SPEED = 120; // ms per character
const RESTART_DELAY = 25000; // ms

const HomePage = () => {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
  const [glowEnabled, setGlowEnabled] = useState(true); // Novo estado para o efeito de glow

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

  // Efeito para adicionar/remover a classe 'scanlines-active' do body
  useEffect(() => {
    if (scanlinesEnabled) {
      document.body.classList.add('scanlines-active');
    } else {
      document.body.classList.remove('scanlines-active');
    }
    return () => {
      document.body.classList.remove('scanlines-active');
    };
  }, [scanlinesEnabled]);

  const handleScanlinesToggle = (checked: boolean) => {
    setScanlinesEnabled(checked);
  };

  const handleGlowToggle = (checked: boolean) => {
    setGlowEnabled(checked);
  };

  const workbenchFont = 'Workbench, monospace, sans-serif';

  return (
    <Layout style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', margin: 0, padding: 0, background: '#000' }}>
      <Layout.Header
        style={{
          backgroundColor: '#000',
          color: '#39ff14',
          textAlign: 'center',
          width: '100%',
          margin: 0,
          padding: '0 15vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 className={glowEnabled ? "crt-glow" : ""} // Condicionalmente aplica crt-glow
            style={{
              display: 'inline-block',
              margin: 0,
              fontFamily: workbenchFont
            }}>
          {displayed}
          <span className="crt-cursor" style={{ opacity: showCursor ? 1 : 0 }}>|</span>
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}> {/* Aumentei o gap para acomodar dois switches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#39ff14', fontSize: '14px', fontFamily: workbenchFont }}>Scanlines</span>
            <Switch
              checked={scanlinesEnabled}
              onChange={handleScanlinesToggle}
              checkedChildren={<span style={{ fontFamily: workbenchFont }}>ON</span>}
              unCheckedChildren={<span style={{ fontFamily: workbenchFont }}>OFF</span>}
              style={{ backgroundColor: scanlinesEnabled ? '#39ff14' : '#555' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#39ff14', fontSize: '14px', fontFamily: workbenchFont }}>Glow</span> {/* Novo texto para o toggle de Glow */}
            <Switch
              checked={glowEnabled}
              onChange={handleGlowToggle}
              checkedChildren={<span style={{ fontFamily: workbenchFont }}>ON</span>}
              unCheckedChildren={<span style={{ fontFamily: workbenchFont }}>OFF</span>}
              style={{ backgroundColor: glowEnabled ? '#39ff14' : '#555' }}
            />
          </div>
        </div>
      </Layout.Header>
      <Layout.Content style={{ padding: '20px', background: '#000', width: '100%', height: '100%', margin: 0, color: '#39ff14' }}>
        <p className={glowEnabled ? "crt-glow" : ""} // Condicionalmente aplica crt-glow
           style={{ fontFamily: workbenchFont }}>
          I'm Fernando Henrique de Aquino, a Front End Dev
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32 }}>
          <GithubStatusCard glowEnabled={glowEnabled} /> {/* Passando a prop glowEnabled */}
          <BibleVerseCard glowEnabled={glowEnabled} /> {/* Passando a prop glowEnabled */}
        </div>
      </Layout.Content>
    </Layout>
  );
}

export default HomePage;