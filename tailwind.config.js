module.exports = {
  content: [],
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}
