import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'antd/dist/reset.css'; // Importa o reset CSS do Ant Design
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#39ff14',
          colorText: '#39ff14',
          colorBgBase: '#000',
          fontFamily: 'Fira Mono, Consolas, Courier New, monospace',
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)
