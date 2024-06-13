import antfu from '@antfu/eslint-config'

export default antfu({
  // enable UnoCSS support
  // https://unocss.dev/integrations/vscode
  unocss: true,

  rules: {
    // eslintimport/order
    'import/order': 'off',
  },

  formatters: {
    css: true,
  },

  ignores: [
    '.github/**',
    'scripts/**',
    'lurelog-server/**',
  ],
})
