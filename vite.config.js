import { defineConfig } from 'vite';
import monkey, { cdn } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      imports: {
        jquery: [['default', '$'],
        ['default', 'jquery']],
      },
    }),
    monkey({
      entry: 'src/main.js',
      userscript: {
        name: '云展网PDF下载 YunZhanDownloader',
        description: '从云展网下载PDF书籍',
        icon: 'https://book.yunzhan365.com/favicon.ico',
        author: 'lcandy2',
        namespace: 'https://github.com/lcandy2/YunZhanDownloader',
        match: ['*://book.yunzhan365.com/*/*/mobile/*'],
        "run-at": 'document-end',
        license: 'MIT',
      },
      build: {
        externalGlobals: {
          jspdf: cdn.npmmirror('jspdf', 'dist/jspdf.umd.min.js'),
          jquery: cdn.npmmirror('jQuery', 'dist/jquery.min.js'),
        },
      },
    }),
  ],
});
