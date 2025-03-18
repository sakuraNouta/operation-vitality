import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'virtual:uno.css'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import 'animate.css'
import '@unocss/reset/tailwind-compat.css'

(function() {
  // 检查 URL 中是否包含 debug 参数
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('debug')) {
    // 动态加载 Eruda 脚本
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/eruda';
    // eslint-disable-next-line no-undef
    script.onload = () => eruda.init(); // 脚本加载完成后初始化
    document.head.appendChild(script);
  }
})();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>
)
