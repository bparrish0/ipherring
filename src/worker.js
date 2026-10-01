const SOURCE_IMAGES = [
  { key: 'source/1.png', people: 1 },
  { key: 'source/2.jpg', people: 1 },
  { key: 'source/3.jpg', people: 1 },
  { key: 'source/4.jpeg', people: 2 },
  { key: 'source/5.jpeg', people: 1 },
  { key: 'source/6.jpeg', people: 1, subject: 'evan' },
];

// Defaults use solo Andy references; Evan and duo photos remain for custom requests.
const ANDY_SOURCE_INDICES = SOURCE_IMAGES
  .map((source, index) => ({ source, index }))
  .filter(({ source }) => source.people === 1 && source.subject !== 'evan')
  .map(({ index }) => index);

const SCENES = [
  "repairing a towering server rack in a medieval dungeon while tiny dragons warm the blinking equipment",
  "sitting at a help-desk counter on a cloud, troubleshooting a thunderstorm with an oversized multimeter",
  "untangling a mountain of Ethernet cables that has arranged itself into a giant knitted sweater",
  "installing a wireless access point on a giraffe-shaped ladder in an impossibly tall living room",
  "sternly rebooting a refrigerator-sized computer while its exhaust blows his beard sideways",
  "using a magnifying glass to investigate a trail of escaped keyboard keys across a dusty office",
  "standing inside a gigantic desktop computer, replacing a glowing processor with a cast-iron waffle maker",
  "patiently explaining a printer jam to a flock of pigeons sitting on an office copier",
  "balancing on a mountain of obsolete monitors, holding a single working mouse like a priceless artifact",
  "walking through a desert with a satellite dish umbrella that casts a tiny patch of Wi-Fi-shaped shade",
  "operating a roadside biscuit stand where the biscuits float gently above their baking trays",
  "wearing a beekeeper veil while inspecting a hive built entirely from miniature pickup truck beds",
  "trying to fold a fitted sheet the size of a football field in an empty stadium",
  "assembling flat-pack furniture that has turned into a magnificent wooden drawbridge in his driveway",
  "standing proudly beside a mailbox converted into a tiny lighthouse that beams across a suburban street",
  "using a leaf blower to inflate an enormous inflatable sofa on a perfectly ordinary front porch",
  "carefully pressure-washing a muddy statue of himself in a backyard full of sparkling clean garden gnomes",
  "building a luxurious treehouse around a single ridiculously short sapling, with an elevator and balcony",
  "measuring an enormous sandwich with a surveying instrument in the middle of a picnic field",
  "standing ankle-deep in packing peanuts while unboxing a single teaspoon delivered in a warehouse-sized crate",
  "commanding a submarine shaped like a mason jar through a reef of glowing soda bottles",
  "operating a lighthouse whose rotating lamp is a gigantic flaming marshmallow",
  "guiding a hot-air balloon made from patchwork denim over a valley of enormous sunflowers",
  "wearing a practical work vest inside a crystal palace while fixing a leaky faucet made of ice",
  "paddling a bathtub with claw feet across a perfectly still lake at sunrise",
  "camping inside a colossal hollow pumpkin with a rocking chair and a small wood stove",
  "navigating a maze of corn stalks using a satellite dish mounted on a wheelbarrow",
  "exploring a miniature canyon formed between gigantic slices of freshly baked bread",
  "standing on an enormous floating lily pad, repairing a brass telescope pointed at fireflies",
  "operating an old-fashioned railway switch that redirects a train of clouds across a pink evening sky",
  "trying to barbecue one absurdly long asparagus spear stretched across an entire backyard",
  "carving an elegant ice sculpture of a possum while wearing oven mitts in a walk-in freezer",
  "making pancakes on a griddle that doubles as an enormous round shield, with syrup splashing in midair",
  "inspecting a prize-winning watermelon displayed on a forklift in an empty exhibition hall",
  "rolling a giant wheel of cheese up a gentle country lane using an elaborate pulley system",
  "sitting inside a transparent vending machine, meticulously restocking shelves with miniature rocking chairs",
  "repairing a waffle iron that produces perfectly formed golden roof shingles",
  "presenting a single immaculate deviled egg under a glass dome on a velvet pedestal",
  "stirring a cauldron of alphabet soup whose letters hover above the pot like confused moths",
  "using a fishing net to catch popcorn bursting from a cornfield under a dramatic sunset",
  "operating a moon rover assembled from a lawn chair, wagon wheels, and a polished metal cooler",
  "wearing a scuba helmet in a room full of floating jellybeans, collecting samples with kitchen tongs",
  "repairing a leaking spaceship with a toolbox while bolts drift around his unmistakably recognizable face",
  "standing on a tiny asteroid equipped with a porch swing, checking its satellite internet connection",
  "piloting a rocket-powered recliner through a tunnel of glowing geometric shapes",
  "watching an eclipse through an enormous welding mask beside a homemade cardboard observatory",
  "installing a ceiling fan in a gravity-free workshop while every loose screw floats in formation",
  "collecting cosmic dust in an old shop vacuum beside a spectacular ringed planet",
  "operating a control panel made of antique doorbells inside a sleek futuristic spaceport",
  "walking through a greenhouse on Mars, proudly tending a single gigantic okra plant",
  "wearing a jeweled crown while inspecting a kingdom made entirely from stacked cinder blocks",
  "carrying a toolbox through an enchanted forest where mushrooms illuminate his path like work lights",
  "hammering a tiny horseshoe onto the hoof of a patient mechanical unicorn in a rustic workshop",
  "repairing the hinge on a gigantic treasure chest while golden butterflies flutter around his head",
  "standing in a wizard tower, using a level to straighten a crooked floating staircase",
  "reading an enormous spellbook that has accidentally transformed his boots into flowerpots",
  "trimming the beard of a moss-covered stone guardian with gigantic hedge clippers",
  "unlocking an ancient temple door with an ordinary house key on a comically overloaded key ring",
  "tuning a brass weather machine that produces perfectly square rain clouds over an empty field",
  "wearing a cape made from a quilt while organizing enchanted tools that hover above his workbench",
  "sitting in a museum display labeled only with blank plaques, posed like a priceless archaeological discovery",
  "carefully hanging a portrait of himself inside a gallery where every frame is slightly crooked",
  "sculpting a masterpiece from mashed potatoes using a masonry trowel in an elegant studio",
  "performing a dramatic solo on an accordion made from corrugated air-conditioning ductwork",
  "balancing on a giant paint roller while covering the side of a barn with a rainbow mural",
  "posing for a grand marble monument while holding a cordless drill and wearing muddy work boots",
  "restoring an antique chandelier constructed entirely from polished socket wrenches",
  "creating a sand sculpture of an elaborate server room on an otherwise empty beach",
  "arranging garden hoses into an intricate geometric masterpiece on a freshly mowed lawn",
  "making a delicate origami swan from a tarp the size of a warehouse floor",
  "serving as the sole referee at a championship match between two remote-controlled vacuum cleaners",
  "curling an enormous polished bowling ball across a frozen farm pond toward brightly colored milk cans",
  "practicing a golf swing with a shovel on a miniature course built inside a greenhouse",
  "standing on a winners podium after a competition to stack the tallest tower of empty coolers",
  "performing a flawless balance-beam routine on a suspended wooden fence rail above a padded gym floor",
  "playing table tennis against a robotic leaf blower in a brightly lit garage",
  "lifting a barbell made from two enormous pumpkins while seated on a hay bale",
  "racing a pedal-powered armchair around a velodrome with his beard streaming backward",
  "training for a javelin event using a pool noodle in a windswept open field",
  "preparing to pole-vault over a low picket fence with a ridiculously long bamboo cane",
  "trying to check into an elegant hotel with luggage consisting entirely of nested plastic buckets",
  "standing on a baggage carousel while his lone suitcase circles him on a miniature conveyor belt",
  "photographing a mountain vista with a camera built from an oversized cardboard box",
  "wearing a bathrobe aboard a luxurious train whose interior is entirely upholstered in camouflage fabric",
  "waiting at a bus shelter shaped like a giant boot during a gentle rain of colorful feathers",
  "unfolding a road map so enormous it covers the whole hood of a parked tractor",
  "steering a narrowboat through a canal lined with towering shelves of antique tools",
  "checking the oil in a steam-powered automobile in front of a magnificent clockwork city",
  "driving a street-sweeper-sized bumper car through a deserted amusement arcade",
  "navigating a staircase of floating suitcases with a modest travel mug in one hand",
  "negotiating with a raccoon perched on his toolbox for the return of a shiny socket wrench",
  "patiently giving a tortoise a tune-up at a garage workbench outfitted with miniature ramps",
  "standing beside a gigantic snail fitted with a solar panel and a comfortable little porch",
  "training a flock of origami cranes to carry tiny hardware-store bags through his workshop",
  "inspecting a squirrel-operated conveyor belt that delivers acorns into an immaculate filing cabinet",
  "wearing rain boots while persuading a stubborn flamingo to step off a freshly painted deck",
  "sharing his porch with a dignified capybara that has taken over the best rocking chair",
  "using a stethoscope to diagnose a mechanical rooster whose alarm bell is stuck open",
  "measuring a very tall ostrich for a custom-made raincoat in a rustic sewing workshop",
  "standing proudly behind a lemon-powered generator while a row of tiny desk fans blows his beard upward",
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

function getDailyConfig(date) {
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
  const sourceIndex = ANDY_SOURCE_INDICES[dayOfYear % ANDY_SOURCE_INDICES.length];
  const sceneIndex = dayOfYear % SCENES.length;
  const styleIndex = dayOfYear % STYLES.length;
  return {
    sourceIndex,
    scene: SCENES[sceneIndex],
    style: STYLES[styleIndex],
    holidayName: null,
  };
}

function getRandomConfig() {
  const sourceIndex = ANDY_SOURCE_INDICES[Math.floor(Math.random() * ANDY_SOURCE_INDICES.length)];
  const scene = SCENES[Math.floor(Math.random() * SCENES.length)];
  const style = STYLES[Math.floor(Math.random() * STYLES.length)];
  return {
    sourceIndex,
    scene,
    style,
    holidayName: null,
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
    intro = 'This photo shows a man named Andy. Feature only Andy as the main subject; do not add a second featured person.';
  }

  let prompt = `${intro} Extract the people/person from this photo preserving their faces, beards, glasses, hair, build, and general clothing style. `;
  prompt += `Do NOT keep any of the original background, surroundings, or setting. `;
  prompt += `IMPORTANT: Do NOT reproduce any organization logos, emblems, patches, badges, uniform insignia, name tags, department names, agency markings, or other identifying text or symbols that may appear on clothing in the source photo. Keep the clothing color and general style, but render shirts as plain (no chest logo, no patches), and omit any badges entirely. `;
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

async function generateImage(env, config, context = {}) {
  const startTime = Date.now();
  const source = SOURCE_IMAGES[config.sourceIndex];
  const sourceObj = await env.BUCKET.get(source.key);
  if (!sourceObj) {
    await logEvent(env, {
      event: 'image_generation_failed',
      ...context,
      source: source?.key,
      error: `Source image not found in R2: ${source?.key}`,
      durationMs: Date.now() - startTime,
    });
    throw new Error(`Source image not found in R2: ${source.key}`);
  }

  const sourceBytes = await sourceObj.arrayBuffer();
  const sourceBlob = new Blob([sourceBytes], { type: sourceObj.httpMetadata?.contentType || 'image/png' });

  const prompt = config.rawPrompt ?? buildPrompt(config.scene, config.style, config.holidayName, source);
  console.log(`Generating - Source: ${source.key} (${source.people} people), Prompt: "${prompt.substring(0, 200)}"`);

  const formData = new FormData();
  formData.append('model', 'gpt-image-2.5-sunburst');
  formData.append('image[]', sourceBlob, 'source.png');
  formData.append('prompt', prompt);
  formData.append('n', '1');
  formData.append('size', '1024x1024');
  formData.append('quality', 'high');
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
    await logEvent(env, {
      event: 'image_generation_failed',
      ...context,
      source: source.key,
      scene: config.scene || null,
      style: config.style || null,
      holiday: config.holidayName || null,
      rawPrompt: config.rawPrompt || null,
      fullPrompt: prompt,
      error: `OpenAI ${response.status}: ${errorText.substring(0, 500)}`,
      openaiErrorCode: code || null,
      durationMs: Date.now() - startTime,
    });
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

  await logEvent(env, {
    event: 'image_generated',
    ...context,
    source: source.key,
    scene: config.scene || null,
    style: config.style || null,
    holiday: config.holidayName || null,
    rawPrompt: config.rawPrompt || null,
    fullPrompt: prompt,
    archiveKey,
    imageBytes: imageBytes.length,
    durationMs: Date.now() - startTime,
  });
}

async function generateDailyImage(env, randomize = false, context = {}) {
  const config = randomize ? getRandomConfig() : getDailyConfig(new Date());
  await generateImage(env, config, { trigger: context.trigger || 'daily', ...context });
}

const NO_LOGO_SUFFIX =
  ' IMPORTANT: Do NOT reproduce any organization logos, emblems, patches, badges, uniform insignia, name tags, department names, agency markings, ID badges, or lanyards that may appear on clothing or around necks in the source photo. Keep the clothing color and general style, but render shirts as plain (no chest logo, no patches), remove any lanyards or badges entirely, and do not add any replacement logos or emblems.';

async function regenerateFromCurrent(env, context = {}) {
  const head = await env.BUCKET.head('daily.webp');
  if (!head) throw new Error('No current daily image to regenerate from');
  const meta = head.customMetadata || {};
  const sourceIndex = SOURCE_IMAGES.findIndex((s) => s.key === meta.source);
  if (sourceIndex < 0) throw new Error('Unknown source key in metadata: ' + meta.source);
  const config = meta.style
    ? {
        sourceIndex,
        scene: meta.scene || '',
        style: meta.style,
        holidayName: meta.holiday || null,
      }
    : { sourceIndex, rawPrompt: (meta.scene || '') + NO_LOGO_SUFFIX };
  await generateImage(env, config, { trigger: 'regen_current', ...context });
}

async function logEvent(env, entry) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const key = `logs/${dateStr}/${now.toISOString().replace(/[:.]/g, '-')}-${Math.random().toString(36).slice(2, 8)}.json`;
  const data = { timestamp: now.toISOString(), ...entry };
  try {
    await env.BUCKET.put(key, JSON.stringify(data, null, 2), {
      httpMetadata: { contentType: 'application/json' },
    });
  } catch (e) {
    console.error('log write failed:', e && e.message);
  }
  try {
    console.log(JSON.stringify(data));
  } catch {}
}

function getRequestContext(request) {
  const cf = request.cf || {};
  return {
    ip: request.headers.get('CF-Connecting-IP') || null,
    userAgent: request.headers.get('User-Agent') || null,
    referer: request.headers.get('Referer') || null,
    acceptLanguage: request.headers.get('Accept-Language') || null,
    country: cf.country || null,
    city: cf.city || null,
    region: cf.region || null,
    regionCode: cf.regionCode || null,
    postalCode: cf.postalCode || null,
    timezone: cf.timezone || null,
    asn: cf.asn || null,
    asOrganization: cf.asOrganization || null,
    colo: cf.colo || null,
    httpProtocol: cf.httpProtocol || null,
    tlsVersion: cf.tlsVersion || null,
  };
}

function expandIPv6(ip) {
  const parts = ip.split('::');
  const head = parts[0] ? parts[0].split(':') : [];
  const tail = parts.length > 1 && parts[1] ? parts[1].split(':') : [];
  const missing = 8 - head.length - tail.length;
  if (missing < 0) return null;
  const middle = Array(missing).fill('0');
  return [...head, ...middle, ...tail].map((g) => g.padStart(4, '0')).join('');
}

function ipToReverseName(ip) {
  if (!ip) return null;
  if (ip.includes(':')) {
    const hex = expandIPv6(ip);
    if (!hex || hex.length !== 32) return null;
    return hex.split('').reverse().join('.') + '.ip6.arpa';
  }
  const octets = ip.split('.');
  if (octets.length !== 4) return null;
  return octets.slice().reverse().join('.') + '.in-addr.arpa';
}

async function reverseDns(ip) {
  const name = ipToReverseName(ip);
  if (!name) return null;
  try {
    const resp = await fetch(
      `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(name)}&type=PTR`,
      { headers: { Accept: 'application/dns-json' }, signal: AbortSignal.timeout(3000) }
    );
    if (!resp.ok) return null;
    const data = await resp.json();
    if (!data.Answer || !data.Answer.length) return null;
    const ptrs = data.Answer
      .filter((a) => a.type === 12)
      .map((a) => String(a.data).replace(/\.$/, ''));
    return ptrs.length ? ptrs : null;
  } catch {
    return null;
  }
}

async function getRequestContextWithDns(request) {
  const ctx = getRequestContext(request);
  ctx.reverseDns = await reverseDns(ctx.ip);
  return ctx;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

const DAILY_CUSTOM_LIMIT = 2;
const BYPASS_IPS = new Set(['74.95.107.65']);
const LOGS_KEY = 'b1130p';

function isBypassIP(request) {
  return BYPASS_IPS.has(request.headers.get('CF-Connecting-IP') || '');
}

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

async function generateCustom(env, userPrompt, context = {}) {
  const sourceIndex = pickSourceForPrompt(userPrompt);
  await generateImage(env, { sourceIndex, rawPrompt: userPrompt }, { trigger: 'custom', ...context });
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
\t\twidth: 45%;
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
\t#ip-box{ margin: 4px 0 24px; }
\t#ipv4{ font-size: 1.5em; font-weight: 500; color: #404040; margin: 0; }
\t#ipv6{ font-size: 0.95em; color: #808080; margin: 4px 0 0; font-family: ui-monospace, Menlo, Consolas, monospace; min-height: 1em; }
\t#ip-info{ margin-top: 10px; font-size: 0.8em; color: #707070; line-height: 1.7; }
\t#ip-info > div:empty{ display: none; }
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
<div id="ip-box">
\t<div id="ipv4">%%IPV4%%</div>
\t<div id="ipv6">%%IPV6%%</div>
\t<div id="ip-info">
\t\t<div id="dns">%%DNS%%</div>
\t\t<div id="location">%%LOCATION%%</div>
\t\t<div id="isp">%%ISP%%</div>
\t</div>
</div>
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
\tvar ipv4El = document.getElementById('ipv4');
\tvar ipv6El = document.getElementById('ipv6');
\tvar haveV4 = ipv4El.textContent.trim().length > 0;
\tvar haveV6 = ipv6El.textContent.trim().length > 0;
\tif (!haveV4) {
\t\tfetch('https://api.ipify.org?format=json')
\t\t\t.then(function(r){ return r.json(); })
\t\t\t.then(function(d){ if (d && d.ip) ipv4El.textContent = d.ip; else ipv4El.textContent = '(no IPv4)'; })
\t\t\t.catch(function(){ ipv4El.textContent = '(no IPv4)'; });
\t}
\tif (!haveV6) {
\t\tfetch('https://api6.ipify.org?format=json')
\t\t\t.then(function(r){ return r.json(); })
\t\t\t.then(function(d){ if (d && d.ip) ipv6El.textContent = d.ip; })
\t\t\t.catch(function(){});
\t}

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
\t\t\tif (d.bypass) {
\t\t\t\tsubmit.disabled = false;
\t\t\t} else {
\t\t\t\tsubmit.disabled = d.remaining <= 0;
\t\t\t\tif (d.remaining <= 0) {
\t\t\t\t\tstatus.textContent = 'Daily custom limit reached. Try again tomorrow.';
\t\t\t\t}
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
  async fetch(request, env, ctx) {
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
        bypass: isBypassIP(request),
      });
    }

    if (url.pathname === '/custom' && request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return Response.json({ error: 'Invalid JSON' }, { status: 400 }); }
      const userPrompt = (body.prompt || '').toString().trim();
      if (!userPrompt) return Response.json({ error: 'Prompt required' }, { status: 400 });
      if (userPrompt.length > 500) return Response.json({ error: 'Prompt too long (max 500 chars)' }, { status: 400 });

      const reqCtx = await getRequestContextWithDns(request);
      const bypass = isBypassIP(request);
      await logEvent(env, {
        event: 'custom_requested',
        ...reqCtx,
        bypass,
        userPrompt,
      });

      if (!bypass) {
        const count = await getCustomCount(env);
        if (count >= DAILY_CUSTOM_LIMIT) {
          return Response.json({ error: 'Daily custom limit reached. Try again tomorrow.' }, { status: 429 });
        }
        await adjustCustomCount(env, 1);
      }

      try {
        await generateCustom(env, userPrompt, { ...reqCtx, bypass, userPrompt });
        return Response.json({ ok: true });
      } catch (err) {
        console.error(err);
        if (err.moderation) {
          if (!bypass) await adjustCustomCount(env, -1);
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
      await generateDailyImage(env, true, { trigger: 'manual_generate', ...(await getRequestContextWithDns(request)) });
      return new Response('Generated');
    }

    if (url.pathname === '/logs') {
      const key = url.searchParams.get('key') || (request.headers.get('Authorization') || '').replace(/^Bearer\s+/, '');
      if (key !== LOGS_KEY) {
        return new Response('Unauthorized', { status: 401 });
      }
      const dateParam = url.searchParams.get('date') || '';
      const limit = Math.max(1, Math.min(500, parseInt(url.searchParams.get('limit') || '100', 10)));
      const eventFilter = url.searchParams.get('event') || '';
      const format = url.searchParams.get('format') || 'html';
      const prefix = dateParam ? `logs/${dateParam}/` : 'logs/';

      const list = await env.BUCKET.list({ prefix, limit: 1000 });
      const objects = list.objects.slice().reverse();
      const entries = [];
      for (const obj of objects) {
        if (entries.length >= limit) break;
        try {
          const body = await env.BUCKET.get(obj.key);
          if (!body) continue;
          const entry = await body.json();
          if (eventFilter && entry.event !== eventFilter) continue;
          entries.push({ _key: obj.key, ...entry });
        } catch {}
      }

      if (format === 'json') return Response.json(entries);

      const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
      const eventTypes = ['page_view', 'cron_triggered', 'cron_failed', 'image_generated', 'image_generation_failed', 'custom_requested'];
      const rows = entries.map((e) => {
        const summary = [];
        if (e.ip) summary.push('IP: ' + esc(e.ip));
        if (e.reverseDns) summary.push('DNS: ' + esc(Array.isArray(e.reverseDns) ? e.reverseDns.join(', ') : e.reverseDns));
        if (e.path) summary.push('Path: ' + esc(e.path));
        if (e.country) summary.push(esc([e.city, e.region, e.country].filter(Boolean).join(', ')));
        if (e.asOrganization) summary.push('ISP: ' + esc(e.asOrganization));
        if (e.userAgent) summary.push('UA: ' + esc(e.userAgent));
        if (e.userPrompt) summary.push('User prompt: ' + esc(e.userPrompt));
        if (e.fullPrompt) summary.push('Full prompt: ' + esc(e.fullPrompt));
        if (e.source) summary.push('Source: ' + esc(e.source));
        if (e.scene) summary.push('Scene: ' + esc(e.scene));
        if (e.style) summary.push('Style: ' + esc(e.style));
        if (e.holiday) summary.push('Holiday: ' + esc(e.holiday));
        if (e.bypass) summary.push('BYPASS');
        if (e.error) summary.push('Error: ' + esc(e.error));
        if (e.durationMs != null) summary.push(e.durationMs + 'ms');
        if (e.imageBytes != null) summary.push(e.imageBytes + ' bytes');
        if (e.cron) summary.push('cron: ' + esc(e.cron));
        if (e.trigger) summary.push('trigger: ' + esc(e.trigger));
        return `<div class="entry event-${esc(e.event || 'unknown')}">
<div class="hd">${esc(e.timestamp || '')} · <strong>${esc(e.event || 'unknown')}</strong></div>
<div class="meta">${summary.join('<br>')}</div>
<details><summary>full JSON</summary><pre>${esc(JSON.stringify(e, null, 2))}</pre></details>
</div>`;
      }).join('\n');

      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>IP Herring logs</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:-apple-system,system-ui,sans-serif;padding:20px;max-width:1200px;margin:0 auto;background:#fafafa;color:#202020}
h1{font-size:18px;margin:0 0 12px}
.filters{margin-bottom:16px;font-size:14px;background:#fff;padding:10px;border:1px solid #ddd;border-radius:4px;display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.filters input,.filters select{padding:4px 6px;font-size:13px;border:1px solid #ccc;border-radius:3px}
.filters button{padding:5px 12px;font-size:13px;border:1px solid #2563eb;background:#2563eb;color:#fff;border-radius:3px;cursor:pointer}
.entry{border:1px solid #ddd;border-radius:4px;padding:10px;margin-bottom:8px;font-size:13px;background:#fff;border-left:4px solid #888}
.entry .hd{margin-bottom:4px}
.entry .meta{color:#444;font-size:12px;margin-bottom:4px;word-break:break-word;line-height:1.5}
.entry pre{background:#f5f5f5;padding:8px;overflow-x:auto;margin:4px 0 0;font-size:12px;white-space:pre-wrap;word-break:break-word}
.entry details summary{cursor:pointer;color:#666;font-size:12px}
.event-cron_triggered{border-left-color:#2563eb}
.event-image_generated{border-left-color:#16a34a}
.event-image_generation_failed,.event-cron_failed{border-left-color:#dc2626}
.event-custom_requested{border-left-color:#ca8a04}
</style></head><body>
<h1>IP Herring logs <span style="color:#888;font-weight:400">(${entries.length} shown, newest first)</span></h1>
<form class="filters" method="get" action="/logs">
<input type="hidden" name="key" value="${esc(key)}">
<label>Date: <input type="text" name="date" value="${esc(dateParam)}" placeholder="YYYY-MM-DD"></label>
<label>Event:
<select name="event">
<option value="">all</option>
${eventTypes.map((t) => `<option value="${t}"${eventFilter === t ? ' selected' : ''}>${t}</option>`).join('')}
</select></label>
<label>Limit: <input type="number" name="limit" value="${limit}" min="1" max="500" style="width:70px"></label>
<button type="submit">Filter</button>
<a href="/logs?key=${esc(key)}&format=json${dateParam ? '&date=' + esc(dateParam) : ''}${eventFilter ? '&event=' + esc(eventFilter) : ''}&limit=${limit}" style="margin-left:8px;font-size:12px">JSON</a>
</form>
${rows || '<p>No entries.</p>'}
</body></html>`;
      return new Response(html, { headers: { 'Content-Type': 'text/html;charset=utf-8' } });
    }

    if (url.pathname === '/regen-current' && request.method === 'POST') {
      const auth = request.headers.get('Authorization');
      if (auth !== `Bearer ${env.OPENAI_API_KEY}`) {
        return new Response('Unauthorized', { status: 401 });
      }
      try {
        await regenerateFromCurrent(env, await getRequestContextWithDns(request));
        return new Response('Regenerated');
      } catch (err) {
        console.error(err);
        return new Response('Regen failed: ' + err.message, { status: 500 });
      }
    }

    const ip = request.headers.get('CF-Connecting-IP') || '';
    const isV6 = ip.includes(':');
    const cf = request.cf || {};
    const ptr = await reverseDns(ip);

    ctx.waitUntil((async () => {
      const reqCtx = getRequestContext(request);
      reqCtx.reverseDns = ptr;
      await logEvent(env, {
        event: 'page_view',
        path: url.pathname,
        method: request.method,
        ...reqCtx,
      });
    })());

    const dnsStr = ptr && ptr.length ? ptr.join(', ') : '';
    const locStr = [cf.city, cf.region, cf.country].filter(Boolean).join(', ');
    const ispStr = cf.asOrganization || '';
    const html = HTML
      .replace('%%IPV4%%', isV6 ? '' : escapeHtml(ip))
      .replace('%%IPV6%%', isV6 ? escapeHtml(ip) : '')
      .replace('%%DNS%%', escapeHtml(dnsStr))
      .replace('%%LOCATION%%', escapeHtml(locStr))
      .replace('%%ISP%%', escapeHtml(ispStr))
      .replace('%%TS%%', Date.now().toString());
    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' },
    });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil((async () => {
      await logEvent(env, { event: 'cron_triggered', cron: event.cron, scheduledTime: new Date(event.scheduledTime).toISOString() });
      try {
        await generateDailyImage(env, false, { trigger: 'cron', cron: event.cron });
      } catch (err) {
        await logEvent(env, { event: 'cron_failed', cron: event.cron, error: err && err.message, stack: err && err.stack });
        throw err;
      }
    })());
  },
};
