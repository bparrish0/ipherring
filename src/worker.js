const SOURCE_IMAGES = [
  { key: 'source/1.png', people: 1 },
  { key: 'source/2.jpg', people: 1 },
  { key: 'source/3.jpg', people: 1 },
  { key: 'source/4.jpeg', people: 2 },
  { key: 'source/5.jpeg', people: 1 },
  { key: 'source/6.jpeg', people: 1, subject: 'evan' },
];

const SCENES = [
  'riding a giant rubber duck through outer space with stars and planets in the background',
  'teaching a yoga class to a group of confused penguins on an iceberg',
  'conducting a full orchestra made entirely of cats in a grand concert hall',
  'arm wrestling a sasquatch at a roadside diner while onlookers cheer',
  'surfing a massive wave on a surfboard shaped like a slice of pizza',
  'sitting on the Iron Throne from Game of Thrones looking confused',
  'piloting a tiny biplane doing loops around the Eiffel Tower',
  'floating in zero gravity inside the International Space Station eating a taco',
  'standing on top of a T-Rex like a rodeo cowboy in a prehistoric jungle',
  'competing in a hot dog eating contest against a bear at a county fair',
  'DJing a massive music festival from behind giant turntables',
  'leading a team of sled dogs across the frozen tundra during a blizzard',
  'sitting in a barber chair getting a haircut from an octopus in an underwater salon',
  'wrestling an alligator in a swamp while wearing a business suit',
  'doing karaoke on stage at a packed arena with dramatic lighting',
  'parachuting out of an airplane holding a boombox over a cityscape',
  'exploring a cave full of glowing crystals with a tiny headlamp',
  'riding a shopping cart down a massive hill in a parking lot at full speed',
  'having a tea party with Bigfoot in a fancy English garden',
  'standing on the moon planting a flag with Earth in the background',
  'driving a monster truck over a row of crushed cars at a rally',
  'in a boxing ring facing off against a kangaroo with boxing gloves',
  'waterskiing behind a speedboat while being chased by dolphins',
  'sitting at a poker table in Las Vegas playing cards against robots',
  'climbing the side of a skyscraper like King Kong',
  'racing go-karts on Rainbow Road from Mario Kart',
  'herding cats across an open prairie on horseback',
  'at a tiki bar on a tropical island being served by a parrot bartender',
  'bungee jumping off a bridge over a massive canyon',
  'in a sumo wrestling ring facing a much larger opponent',
];

const STYLES = [
  'photorealistic, high detail, dramatic lighting',
  'Pixar-style 3D animation render, vibrant colors',
  'anime style, dynamic action pose, cel-shaded',
  'classic oil painting style, renaissance composition',
  'retro comic book style with halftone dots and bold outlines',
  'claymation style, textured clay figures',
  'watercolor painting with soft edges and flowing colors',
  'vaporwave aesthetic with neon pinks and purples and retro elements',
  'Studio Ghibli style, whimsical and detailed',
  'pop art style like Andy Warhol with bold colors',
  'noir style, black and white with dramatic shadows',
  'low-poly 3D render with geometric shapes',
  'vintage 1950s postcard illustration style',
  'stained glass window style with bold outlines and rich colors',
  'ukiyo-e Japanese woodblock print style',
];

const HOLIDAYS = [
  { month: 1, day: 1, name: "New Year's Day", scene: "celebrating New Year's at a wild party with confetti, champagne, and fireworks at midnight" },
  { month: 2, day: 2, name: 'Groundhog Day', scene: 'dressed as a groundhog popping out of a hole looking for his shadow' },
  { month: 2, day: 14, name: "Valentine's Day", scene: "surrounded by giant hearts and cupid arrows, holding a comically oversized box of chocolates" },
  { month: 3, day: 17, name: "St. Patrick's Day", scene: 'at the end of a rainbow fighting a leprechaun for a pot of gold' },
  { month: 4, day: 1, name: "April Fools' Day", scene: 'setting up an elaborate prank with buckets of slime and whoopee cushions everywhere' },
  { month: 5, day: 5, name: 'Cinco de Mayo', scene: 'at a huge fiesta with a mariachi band, wearing a giant sombrero' },
  { month: 5, day: 26, name: 'Memorial Day', scene: 'at a massive backyard BBQ cookout grilling burgers with American flags everywhere' },
  { month: 7, day: 4, name: 'Independence Day', scene: 'lighting a comically large firework with a huge American flag cape flowing behind him' },
  { month: 9, day: 1, name: 'Labor Day', scene: 'lounging in a hammock between two palm trees refusing to do any work' },
  { month: 10, day: 31, name: 'Halloween', scene: 'in a haunted house surrounded by ghosts and jack-o-lanterns wearing a ridiculous costume' },
  { month: 11, day: 27, name: 'Thanksgiving', scene: 'at a Thanksgiving dinner table arm wrestling a giant turkey' },
  { month: 12, day: 25, name: 'Christmas', scene: "stuck in a chimney dressed as Santa with reindeer on the roof looking down at him" },
  { month: 12, day: 31, name: "New Year's Eve", scene: 'at a rooftop New Year\'s Eve party with the ball dropping in Times Square behind him' },
];

function getHolidayScene(month, day) {
  for (const h of HOLIDAYS) {
    const diff = (month === h.month) ? Math.abs(day - h.day) : -1;
    if (diff >= 0 && diff <= 2) {
      return { name: h.name, scene: h.scene };
    }
  }
  return null;
}

function getDailyConfig(date) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  const sourceIndex = dayOfYear % SOURCE_IMAGES.length;
  const sceneIndex = dayOfYear % SCENES.length;
  const styleIndex = dayOfYear % STYLES.length;
  const holiday = getHolidayScene(date.getMonth() + 1, date.getDate());
  return {
    sourceIndex,
    scene: holiday ? holiday.scene : SCENES[sceneIndex],
    style: STYLES[styleIndex],
    holidayName: holiday ? holiday.name : null,
  };
}

function getRandomConfig() {
  const sourceIndex = Math.floor(Math.random() * SOURCE_IMAGES.length);
  const scene = SCENES[Math.floor(Math.random() * SCENES.length)];
  const style = STYLES[Math.floor(Math.random() * STYLES.length)];
  const now = new Date();
  const holiday = getHolidayScene(now.getMonth() + 1, now.getDate());
  return {
    sourceIndex,
    scene: holiday ? holiday.scene : scene,
    style,
    holidayName: holiday ? holiday.name : null,
  };
}

function buildPrompt(scene, style, holidayName, source) {
  let intro;
  if (source.people === 2) {
    intro =
      "This photo shows two men: Andy on the RIGHT (heavier build, light blue button-up shirt, khaki pants) " +
      "and Evan on the LEFT (lighter build, maroon/brown zip jacket, red beard, glasses).";
  } else if (source.subject === 'evan') {
    intro = 'This photo shows Evan, a man with a red beard, glasses, and a maroon zip jacket.';
  } else {
    intro = 'This photo shows a man named Andy.';
  }

  let prompt = `${intro} Extract the people/person from this photo preserving their faces, beards, glasses, hair, build, and clothing. `;
  prompt += `Do NOT keep any of the original background, surroundings, or setting. `;
  prompt += `Place them into this completely new scene: ${scene}. `;
  if (source.people === 2) {
    prompt += `If the scene mentions only one of them by name, include only that person. If it mentions both or neither, include both Andy and Evan together. `;
  }
  if (holidayName) {
    prompt += `Today is ${holidayName}, so make the scene festive and themed for the holiday. `;
  }
  prompt += `Render the final image in this artistic style: ${style}. `;
  prompt += `The result should be funny, absurd, and visually striking. Make sure the face(s) are clearly recognizable.`;
  return prompt;
}

async function generateImage(env, config) {
  const source = SOURCE_IMAGES[config.sourceIndex];
  const sourceObj = await env.BUCKET.get(source.key);
  if (!sourceObj) {
    throw new Error(`Source image not found in R2: ${source.key}`);
  }

  const sourceBytes = await sourceObj.arrayBuffer();
  const sourceBlob = new Blob([sourceBytes], { type: sourceObj.httpMetadata?.contentType || 'image/png' });

  const prompt = config.rawPrompt ?? buildPrompt(config.scene, config.style, config.holidayName, source);
  console.log(`Generating - Source: ${source.key} (${source.people} people), Prompt: "${prompt.substring(0, 200)}"`);

  const formData = new FormData();
  formData.append('model', 'gpt-image-1');
  formData.append('image[]', sourceBlob, 'source.png');
  formData.append('prompt', prompt);
  formData.append('n', '1');
  formData.append('size', '1024x1024');
  formData.append('quality', 'low');
  formData.append('output_format', 'webp');
  formData.append('output_compression', '80');

  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.OPENAI_API_KEY}` },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let parsed;
    try { parsed = JSON.parse(errorText); } catch {}
    const code = parsed?.error?.code;
    if (code === 'moderation_blocked') {
      const err = new Error('Nobody wants to see that!');
      err.moderation = true;
      throw err;
    }
    throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
  }

  const result = await response.json();
  const b64 = result.data[0].b64_json;
  const imageBytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const metadata = {
    date: dateStr,
    scene: (config.scene || config.rawPrompt || '').substring(0, 1024),
    style: config.style || '',
    source: source.key,
    holiday: config.holidayName || '',
  };

  await env.BUCKET.put('daily.webp', imageBytes, {
    httpMetadata: { contentType: 'image/webp' },
    customMetadata: metadata,
  });

  const archiveKey = `archive/${dateStr}-${now.getTime()}.webp`;
  await env.BUCKET.put(archiveKey, imageBytes, {
    httpMetadata: { contentType: 'image/webp' },
    customMetadata: metadata,
  });

  console.log(`Stored daily image for ${dateStr}`);
}

async function generateDailyImage(env, randomize = false) {
  const config = randomize ? getRandomConfig() : getDailyConfig(new Date());
  await generateImage(env, config);
}

const DAILY_CUSTOM_LIMIT = 2;

function getCounterKey() {
  return `custom:${new Date().toISOString().split('T')[0]}`;
}

async function getCustomCount(env) {
  const val = await env.RATE_LIMIT.get(getCounterKey());
  return val ? parseInt(val, 10) : 0;
}

async function adjustCustomCount(env, delta) {
  const key = getCounterKey();
  const current = await getCustomCount(env);
  const next = current + delta;
  await env.RATE_LIMIT.put(key, String(next), { expirationTtl: 172800 });
  return next;
}

function pickSourceForPrompt(userPrompt) {
  const mentionsEvan = /\bevan\b/i.test(userPrompt);
  const mentionsAndy = /\bandy\b/i.test(userPrompt);
  const mentionsBoth = /\b(both|together|duo|the pair|the guys|the two guys|the two of them)\b/i.test(userPrompt);

  if ((mentionsEvan && mentionsAndy) || mentionsBoth) {
    const idx = SOURCE_IMAGES.findIndex((s) => s.people === 2);
    if (idx >= 0) return idx;
  }
  if (mentionsEvan) {
    const idx = SOURCE_IMAGES.findIndex((s) => s.subject === 'evan');
    if (idx >= 0) return idx;
  }
  const andyIndices = SOURCE_IMAGES
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.people === 1 && s.subject !== 'evan')
    .map(({ i }) => i);
  if (andyIndices.length) {
    return andyIndices[Math.floor(Math.random() * andyIndices.length)];
  }
  return Math.floor(Math.random() * SOURCE_IMAGES.length);
}

async function generateCustom(env, userPrompt) {
  const sourceIndex = pickSourceForPrompt(userPrompt);
  await generateImage(env, { sourceIndex, rawPrompt: userPrompt });
}

const HTML = `<!DOCTYPE html>
<html>
<head><meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no" />
<title>IP Herring</title>
<style type="text/css">
\thtml,body{
\t\tborder:none; padding:0; margin:0;
\t\tbackground:#FFFFFF;
\t\tcolor:#202020;
\t}
\tbody{
\t\ttext-align:center;
\t\tfont-family:"Roboto",sans-serif;
\t}
\th1{
\t\tcolor:#404040;
\t}
\t#herring{
\t\twidth: 40%;
\t\tcursor: pointer;
\t\ttransition: opacity 0.2s;
\t}
\t#herring:hover{
\t\topacity: 0.85;
\t}
\t#modal{
\t\tdisplay: none;
\t\tposition: fixed;
\t\ttop: 0; left: 0; right: 0; bottom: 0;
\t\tbackground: rgba(0,0,0,0.6);
\t\tz-index: 10;
\t\talign-items: center;
\t\tjustify-content: center;
\t}
\t#modal.open{ display: flex; }
\t.modal-box{
\t\tbackground: #fff;
\t\tborder-radius: 8px;
\t\tpadding: 24px;
\t\twidth: 90%;
\t\tmax-width: 480px;
\t\tbox-shadow: 0 10px 40px rgba(0,0,0,0.3);
\t\ttext-align: left;
\t}
\t.modal-box h3{ margin: 0 0 12px 0; color: #202020; }
\t.modal-box textarea{
\t\twidth: 100%;
\t\tmin-height: 80px;
\t\tbox-sizing: border-box;
\t\tpadding: 10px;
\t\tfont-family: inherit;
\t\tfont-size: 14px;
\t\tborder: 1px solid #ccc;
\t\tborder-radius: 4px;
\t\tresize: vertical;
\t}
\t.modal-buttons{
\t\tmargin-top: 12px;
\t\tdisplay: flex;
\t\tgap: 8px;
\t\tjustify-content: flex-end;
\t}
\t.modal-buttons button{
\t\tpadding: 8px 16px;
\t\tfont-size: 14px;
\t\tborder-radius: 4px;
\t\tcursor: pointer;
\t\tborder: 1px solid #ccc;
\t\tbackground: #fff;
\t}
\t.modal-buttons button.primary{
\t\tbackground: #2563eb;
\t\tcolor: #fff;
\t\tborder-color: #2563eb;
\t}
\t.modal-buttons button:disabled{ opacity: 0.5; cursor: not-allowed; }
\t#status{
\t\tmargin-top: 12px;
\t\tfont-size: 14px;
\t\tcolor: #606060;
\t\tmin-height: 20px;
\t}
\t#status.error{ color: #b91c1c; }
\t.spinner{
\t\tdisplay: inline-block;
\t\twidth: 14px;
\t\theight: 14px;
\t\tborder: 2px solid #ccc;
\t\tborder-top-color: #2563eb;
\t\tborder-radius: 50%;
\t\tanimation: spin 0.8s linear infinite;
\t\tvertical-align: middle;
\t\tmargin-right: 6px;
\t}
\t@keyframes spin { to { transform: rotate(360deg); } }
\t.remaining{ font-size: 12px; color: #888; margin-top: 6px; }
</style>
</head>
<body>
<img id="herring" src="/daily.webp?t=%%TS%%" alt="IP Herring" title="Click to request a custom image">
<center>
\t<h2>%%IP%%</h2>
</center>
<div id="modal" role="dialog" aria-modal="true">
\t<div class="modal-box">
\t\t<h3>What would you like Andy, Evan, or both, to do today?</h3>
\t\t<textarea id="userPrompt" placeholder="e.g. riding a unicycle through a hurricane" maxlength="500"></textarea>
\t\t<div id="status"></div>
\t\t<div class="modal-buttons">
\t\t\t<button id="cancelBtn" type="button">Cancel</button>
\t\t\t<button id="submitBtn" type="button" class="primary">Generate</button>
\t\t</div>
\t\t<div class="remaining" id="remaining"></div>
\t</div>
</div>
<script>
(function(){
\tvar modal = document.getElementById('modal');
\tvar img = document.getElementById('herring');
\tvar submit = document.getElementById('submitBtn');
\tvar cancel = document.getElementById('cancelBtn');
\tvar promptBox = document.getElementById('userPrompt');
\tvar status = document.getElementById('status');
\tvar remaining = document.getElementById('remaining');

\tfunction refreshRemaining(){
\t\tfetch('/custom/status').then(function(r){ return r.json(); }).then(function(d){
\t\t\tremaining.textContent = d.remaining + ' custom request' + (d.remaining === 1 ? '' : 's') + ' left today';
\t\t\tsubmit.disabled = d.remaining <= 0;
\t\t\tif (d.remaining <= 0) {
\t\t\t\tstatus.textContent = 'Daily custom limit reached. Try again tomorrow.';
\t\t\t}
\t\t}).catch(function(){});
\t}

\tfunction openModal(){
\t\tstatus.textContent = '';
\t\tstatus.className = '';
\t\tpromptBox.value = '';
\t\tsubmit.disabled = false;
\t\tmodal.classList.add('open');
\t\tpromptBox.focus();
\t\trefreshRemaining();
\t}

\tfunction closeModal(){
\t\tmodal.classList.remove('open');
\t}

\tfunction submitPrompt(){
\t\tvar text = promptBox.value.trim();
\t\tif (!text) { promptBox.focus(); return; }
\t\tsubmit.disabled = true;
\t\tcancel.disabled = true;
\t\tstatus.className = '';
\t\tstatus.innerHTML = '<span class="spinner"></span>Generating... this may take up to a minute';
\t\tfetch('/custom', {
\t\t\tmethod: 'POST',
\t\t\theaders: { 'Content-Type': 'application/json' },
\t\t\tbody: JSON.stringify({ prompt: text })
\t\t}).then(function(r){
\t\t\treturn r.json().then(function(d){ return { ok: r.ok, status: r.status, body: d }; });
\t\t}).then(function(res){
\t\t\tif (res.ok) {
\t\t\t\tstatus.textContent = 'Done! Reloading...';
\t\t\t\tsetTimeout(function(){ window.location.href = window.location.pathname + '?t=' + Date.now(); }, 500);
\t\t\t} else {
\t\t\t\tstatus.className = 'error';
\t\t\t\tstatus.textContent = res.body.error || 'Something went wrong';
\t\t\t\tsubmit.disabled = false;
\t\t\t\tcancel.disabled = false;
\t\t\t}
\t\t}).catch(function(err){
\t\t\tstatus.className = 'error';
\t\t\tstatus.textContent = 'Network error: ' + err.message;
\t\t\tsubmit.disabled = false;
\t\t\tcancel.disabled = false;
\t\t});
\t}

\timg.addEventListener('click', openModal);
\tcancel.addEventListener('click', closeModal);
\tsubmit.addEventListener('click', submitPrompt);
\tpromptBox.addEventListener('keydown', function(e){
\t\tif (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitPrompt(); }
\t\tif (e.key === 'Escape') closeModal();
\t});
\tmodal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
})();
</script>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/daily.webp') {
      const obj = await env.BUCKET.get('daily.webp');
      if (!obj) return new Response('No image generated yet', { status: 404 });
      return new Response(obj.body, {
        headers: {
          'Content-Type': obj.httpMetadata?.contentType || 'image/webp',
          'Cache-Control': 'no-cache',
        },
      });
    }

    if (url.pathname === '/custom/status') {
      const count = await getCustomCount(env);
      return Response.json({
        remaining: Math.max(0, DAILY_CUSTOM_LIMIT - count),
        limit: DAILY_CUSTOM_LIMIT,
      });
    }

    if (url.pathname === '/custom' && request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
      const userPrompt = (body.prompt || '').toString().trim();
      if (!userPrompt) return Response.json({ error: 'Prompt required' }, { status: 400 });
      if (userPrompt.length > 500) return Response.json({ error: 'Prompt too long (max 500 chars)' }, { status: 400 });

      const count = await getCustomCount(env);
      if (count >= DAILY_CUSTOM_LIMIT) {
        return Response.json({ error: 'Daily custom limit reached. Try again tomorrow.' }, { status: 429 });
      }

      await adjustCustomCount(env, 1);

      try {
        await generateCustom(env, userPrompt);
        return Response.json({ ok: true });
      } catch (err) {
        console.error(err);
        if (err.moderation) {
          await adjustCustomCount(env, -1);
          return Response.json({ error: 'Nobody wants to see that!' }, { status: 400 });
        }
        return Response.json({ error: 'Image generation failed. Try again.' }, { status: 500 });
      }
    }

    if (url.pathname === '/generate' && request.method === 'POST') {
      const auth = request.headers.get('Authorization');
      if (auth !== `Bearer ${env.OPENAI_API_KEY}`) {
        return new Response('Unauthorized', { status: 401 });
      }
      await generateDailyImage(env, true);
      return new Response('Generated');
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'Unknown';
    const html = HTML.replace('%%IP%%', ip).replace('%%TS%%', Date.now().toString());
    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' },
    });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(generateDailyImage(env));
  },
};
