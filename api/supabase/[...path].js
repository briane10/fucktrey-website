export default async function handler(req, res) {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

  // Remove the leading "/api/supabase/" from the path
  const targetPath = req.url.replace(/^\/api\/supabase\//, "");
  const targetUrl = `${supabaseUrl}/${targetPath}`;

  try {
    const response = await fetch(targetUrl + (req._parsedUrl.search || ""), {
      method: req.method,
      headers: {
        ...req.headers,
        host: new URL(supabaseUrl).host,
        authorization: req.headers.authorization || `Bearer ${supabaseKey}`,
      },
      body: req.method === "GET" || req.method === "HEAD" ? undefined : req,
    });

    // Copy status and headers
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    // Stream the response body
    const arrayBuffer = await response.arrayBuffer();
    res.end(Buffer.from(arrayBuffer));
  } catch (error) {
    res.statusCode = 500;
    res.json({ error: error.message });
  }
}
