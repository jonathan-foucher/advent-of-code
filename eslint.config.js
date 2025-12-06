import { defineConfig } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'

export default defineConfig([
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    files: ['**/*.js'],
    plugins: {
      js,
    },
    extends: ['js/recommended'],
  },
])
