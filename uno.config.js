import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno(), presetIcons()],
  rules: [
    ['c-ruby', { color: '#e64566' }],
    [
      'shadow-ruby',
      {
        '--un-shadow-opacity': 1,
        '--un-shadow-color': '#e64566',
      },
    ],
  ],
  safelist: [
    'i-mdi-pig-variant',
    'i-mdi-cow',
    'i-simple-icons-happycow',
    'i-mdi-snake',
    'c-pink',
    'c-gray',
    'c-amber',
    'c-ruby',
    'shadow-pink',
    'shadow-gray',
    'shadow-amber',
    'shadow-ruby',
  ],
})
