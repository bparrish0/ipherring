import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

function loadWorker(overrides = {}) {
  const code = readFileSync(new URL('../src/worker.js', import.meta.url), 'utf8');
  const context = vm.createContext({
    Date, Blob, FormData, Response, Request, URL, Uint8Array, atob,
    console: { log() {}, error() {} },
    Math: Object.create(Math),
    ...overrides,
  });
  vm.runInContext(code.replace('export default {', 'globalThis.worker = {') + `
    globalThis.api = { SOURCE_IMAGES, getDailyConfig, getRandomConfig, buildPrompt,
      generateDailyImage, generateCustom, pickSourceForPrompt };
  `, context);
  return context;
}

function generationFixture() {
  const requests = [];
  const writes = [];
  const context = loadWorker({
    fetch: async (url, options) => {
      requests.push({ url, options });
      // A small explicit fixture tests request construction and storage, not image quality.
      return Response.json({ data: [{ b64_json: 'AQID' }] });
    },
  });
  const env = {
    OPENAI_API_KEY: 'unit-test-key',
    BUCKET: {
      get: async key => ({
        httpMetadata: { contentType: 'image/png' },
        arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
      }),
      put: async (key, body, options) => { writes.push({ key, body, options }); },
    },
  };
  return { context, env, requests, writes };
}

test('image edit requests use the latest Sunburst model with supported WebP settings', async () => {
  const { context, env, requests, writes } = generationFixture();
  await context.api.generateDailyImage(env);
  assert.equal(requests.length, 1);
  const { url, options } = requests[0];
  assert.equal(url, 'https://api.openai.com/v1/images/edits');
  assert.equal(options.method, 'POST');
  assert.equal(options.body.get('model'), 'gpt-image-2.5-sunburst');
  assert.equal(options.body.get('quality'), 'high');
  assert.equal(options.body.get('size'), '1024x1024');
  assert.equal(options.body.get('output_format'), 'webp');
  assert.equal(options.body.get('output_compression'), '80');
  assert.equal(options.body.has('input_fidelity'), false);
  assert.ok(options.body.get('image[]') instanceof Blob);
  const daily = writes.find(write => write.key === 'daily.webp');
  assert.ok(daily);
  assert.equal(daily.options.httpMetadata.contentType, 'image/webp');
});

function assertAndyOnly(context, config) {
  const source = context.api.SOURCE_IMAGES[config.sourceIndex];
  assert.equal(source.people, 1, `default selected a group photo: ${source.key}`);
  assert.notEqual(source.subject, 'evan', `default selected Evan: ${source.key}`);
  const prompt = context.api.buildPrompt(config.scene, config.style, config.holidayName, source);
  assert.match(prompt, /Andy/);
  assert.match(prompt, /Feature only Andy as the main subject/);
  assert.doesNotMatch(prompt, /\bEvan\b/i);
}

test('every default daily configuration uses an Andy-only source, including leap years and holidays', () => {
  const context = loadWorker();
  const selected = new Set();
  for (const year of [2026, 2028]) {
    for (let date = new Date(Date.UTC(year, 0, 1)); date.getUTCFullYear() === year;
      date = new Date(date.getTime() + 86400000)) {
      const config = context.api.getDailyConfig(date);
      assertAndyOnly(context, config);
      selected.add(config.sourceIndex);
    }
  }
  assert.deepEqual([...selected].sort(), [0, 1, 2, 4]);
});

test('random default generation never selects Evan or the duo photo', () => {
  const context = loadWorker();
  for (let i = 0; i <= 100; i++) {
    context.Math.random = () => i / 101;
    assertAndyOnly(context, context.api.getRandomConfig());
  }
});

test('custom requests can still explicitly select Evan or both people', () => {
  const context = loadWorker();
  const { SOURCE_IMAGES, pickSourceForPrompt } = context.api;
  assert.equal(SOURCE_IMAGES[pickSourceForPrompt('Evan fishing')].subject, 'evan');
  assert.equal(SOURCE_IMAGES[pickSourceForPrompt('Andy and Evan fishing')].people, 2);
  assert.equal(SOURCE_IMAGES[pickSourceForPrompt('both fishing')].people, 2);
});
