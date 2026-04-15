const SOURCE_IMAGES = [
  'source/1.png',
  'source/2.jpg',
  'source/3.jpg',
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

  const scene = holiday ? holiday.scene : SCENES[sceneIndex];
  const style = STYLES[styleIndex];
  const holidayName = holiday ? holiday.name : null;

  return { sourceIndex, scene, style, holidayName };
}

function buildPrompt(scene, style, holidayName) {
  let prompt = `This photo contains a man. Extract ONLY the man (his face, body, and clothing) from this photo. `;
  prompt += `Do NOT keep any of the original background, surroundings, or setting. `;
  prompt += `Place him into this completely new scene: ${scene}. `;
  if (holidayName) {
    prompt += `Today is ${holidayName}, so make the scene festive and themed for the holiday. `;
  }
  prompt += `Render the final image in this artistic style: ${style}. `;
  prompt += `The result should be funny, absurd, and visually striking. Make sure his face is clearly recognizable.`;
  return prompt;
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

async function generateDailyImage(env, randomize = false) {
  const now = new Date();
  const config = randomize ? getRandomConfig() : getDailyConfig(now);
  const sourceKey = SOURCE_IMAGES[config.sourceIndex];

  const sourceObj = await env.BUCKET.get(sourceKey);
  if (!sourceObj) {
    console.error(`Source image not found in R2: ${sourceKey}`);
    return;
  }

  const sourceBytes = await sourceObj.arrayBuffer();
  const sourceBlob = new Blob([sourceBytes], { type: sourceObj.httpMetadata?.contentType || 'image/png' });

  const prompt = buildPrompt(config.scene, config.style, config.holidayName);
  console.log(`Generating image - Source: ${sourceKey}, Scene: "${config.scene}", Style: "${config.style}"`);

  const formData = new FormData();
  formData.append('model', 'gpt-image-1');
  formData.append('image[]', sourceBlob, 'source.png');
  formData.append('prompt', prompt);
  formData.append('n', '1');
  formData.append('size', '1024x1024');
  formData.append('quality', 'low');

  const response = await fetch('https://api.openai.com/v1/images/edits', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`OpenAI API error: ${response.status} ${error}`);
    return;
  }

  const result = await response.json();
  const b64 = result.data[0].b64_json;
  const imageBytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

  const dateStr = now.toISOString().split('T')[0];
  const metadata = {
    date: dateStr,
    scene: config.scene,
    style: config.style,
    source: sourceKey,
    holiday: config.holidayName || '',
  };

  await env.BUCKET.put('daily.png', imageBytes, {
    httpMetadata: { contentType: 'image/png' },
    customMetadata: metadata,
  });

  await env.BUCKET.put(`archive/${dateStr}.png`, imageBytes, {
    httpMetadata: { contentType: 'image/png' },
    customMetadata: metadata,
  });

  console.log(`Generated and stored daily image for ${dateStr}`);
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
\timg{
        width: 40%;
    }
</style>
</head>
<body>
<img src="/daily.png" alt="IP Herring">
<center>
        <h2>%%IP%%</h2>
    </center>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/daily.png') {
      const obj = await env.BUCKET.get('daily.png');
      if (!obj) {
        return new Response('No image generated yet', { status: 404 });
      }
      return new Response(obj.body, {
        headers: {
          'Content-Type': obj.httpMetadata?.contentType || 'image/png',
          'Cache-Control': 'no-cache',
        },
      });
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
    const html = HTML.replace('%%IP%%', ip);
    return new Response(html, {
      headers: { 'Content-Type': 'text/html;charset=utf-8' },
    });
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(generateDailyImage(env));
  },
};
