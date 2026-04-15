const images = [
  '99d84276-1907-4f2c-b8f9-d0d3cbdec80d.png',
  '2124b1d8-1a0a-4c67-9257-45b745f759b2.png',
  'bc79b2f9-3395-4ba2-b7d5-e6ba547a71b9.png',
  'c676298f-b92c-4fd2-82e8-0780f91976ea.png',
];

export function onRequest(context) {
  const ip = context.request.headers.get('CF-Connecting-IP') || 'Unknown';
  const image = images[Math.floor(Math.random() * images.length)];

  return new Response(`<!DOCTYPE html>
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
        width: 25%;
    }
</style>
</head>
<body>
<img src="/andy-random/${image}" alt="IP Herring">
<center>
        <h2>${ip}</h2>
    </center>
</body>
</html>`, {
    headers: { 'Content-Type': 'text/html;charset=utf-8' },
  });
}
