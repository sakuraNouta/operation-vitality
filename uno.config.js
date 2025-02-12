import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  rules: [['c-ruby', { color: '#e64566' }]],
  safelist: [
    'i-mdi-pig-variant',
    'i-mdi-cow',
    'i-simple-icons-happycow',
    'i-mdi-snake',
    'c-pink',
    'c-gray',
    'c-amber',
    'c-ruby',
  ],
})
