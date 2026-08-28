export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("Missing QR code");
  }

  const response = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/qr_codes?code=eq.${code}&active=eq.true&select=destination_url&limit=1`,
    {
      headers: {
        apikey: process.env.SUPABASE_SECRET_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (!data || data.length === 0) {
    return res.status(404).send("QR not found");
  }

  return res.redirect(302, data[0].destination_url);
}
