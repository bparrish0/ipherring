export function onRequest(context) {
  const ip = context.request.headers.get('CF-Connecting-IP') || 'Unknown';
  return new Response(ip, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
