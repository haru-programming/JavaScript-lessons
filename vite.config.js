import { defineConfig } from 'vite';
const { resolve } = require('path');

const root = 'src';

export default defineConfig({
  root: root,
  publicDir: '../public',
  build: {
    outDir: '../dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          if (extType === 'css') {
            return `assets/css/[name].css`;
          }
          return `assets/${extType}/[name][extname]`;
        },
        chunkFileNames: `assets/js/[name].js`,
        entryFileNames: `assets/js/[name].js`,
      },
      input: {
        main: resolve(__dirname, root, 'index.html'),
        index: resolve(__dirname, root, 'lesson32/index.html'),
        archive: resolve(__dirname, root, 'lesson32/archive-news.html'),
        forgotPassword: resolve(__dirname, root, 'lesson32/forgotpassword.html'),
        login: resolve(__dirname, root, 'lesson32/login.html'),
        notAuth: resolve(__dirname, root, 'lesson32/notautherize.html'),
        registerDone: resolve(__dirname, root, 'lesson32/register-done.html'),
        register: resolve(__dirname, root, 'lesson32/register.html'),
        resetEmailDone: resolve(__dirname, root, 'lesson32/reset-email-done.html'),
        resetEmail: resolve(__dirname, root, 'lesson32/reset-email.html'),
        resetPasswordDone: resolve(__dirname, root, 'lesson32/reset-password-done.html'),
        resetPassword: resolve(__dirname, root, 'lesson32/reset-password.html'),
      },
    },
  },
});
