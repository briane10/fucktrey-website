export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  // Construct the target URL by stripping the /api/supabase prefix
  const targetUrl = supabaseUrl + req.url.replace(/^\/api\/supabase/, "");

  try {
    const response = await fetch(targetUrl, {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(supabaseUrl).host,
        authorization: req.headers.authorization || `Bearer ${supabaseKey}`,
      },
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
    });

    // Forward status and headers
    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    // Pipe the response body
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: error.message });
  }
}
