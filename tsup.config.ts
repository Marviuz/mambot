import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['./src'],
  bundle: true,
  outDir: './dist',
  platform: 'node',
  format: 'esm',
});
