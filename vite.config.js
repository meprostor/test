import { defineConfig } from 'vite';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const temporaryRoot = join(tmpdir(), 'proste-drevo');

export default defineConfig({
  cacheDir: join(temporaryRoot, 'vite-cache'),
  build: {
    emptyOutDir: true,
    outDir: join(temporaryRoot, 'dist'),
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
  },
});
