#!/usr/bin/env node
/**
 * `npm run dev` entrypoint: runs the Foundations nav watcher and the
 * static file server side by side, so publishing a new foundations/*.html
 * page updates the sidebar without any extra command.
 */
'use strict';

const { spawn } = require('child_process');
const { watch } = require('./build-foundations-nav');

watch();

const server = spawn('npx', ['serve', '-l', '5173', '.'], {
  stdio: 'inherit',
  shell: process.platform === 'win32'
});

server.on('exit', function (code) { process.exit(code === null ? 0 : code); });
process.on('SIGINT', function () { server.kill('SIGINT'); });
process.on('SIGTERM', function () { server.kill('SIGTERM'); });
