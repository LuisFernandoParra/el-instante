// Publica dist/ en la rama gh-pages del remoto origin. Esa rama solo contiene el sitio compilado.
import { execFileSync } from 'node:child_process';
import { rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const git = (cwd, ...args) =>
  execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit'] }).trim();

const origin = git(root, 'remote', 'get-url', 'origin');
const source = git(root, 'rev-parse', '--short', 'HEAD');

writeFileSync(join(dist, '.nojekyll'), '');

try {
  git(dist, 'init', '-b', 'gh-pages');
  git(dist, 'add', '-A');
  git(dist, 'commit', '-m', `Publica el sitio desde ${source}`);
  git(dist, 'push', '--force', origin, 'gh-pages');
} finally {
  rmSync(join(dist, '.git'), { recursive: true, force: true });
}
