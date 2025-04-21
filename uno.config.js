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
    ['c-bronze', { color: '#a18072' }],
    [
      'shadow-bronze',
      {
        '--un-shadow-opacity': 1,
        '--un-shadow-color': '#a18072',
      },
    ],
  ],
  safelist: [
    'i-mdi-pig-variant',
    'i-mdi-cow',
    'i-simple-icons-happycow',
    'i-mdi-snake',
    'i-mdi-rabbit-variant-outline',
    'i-mdi-duck',
    ...['pink', 'gray', 'amber-500', 'ruby', 'bronze', 'yellow'].flatMap(c => [`c-${c}`, `shadow-${c}`]),
  ],
})
