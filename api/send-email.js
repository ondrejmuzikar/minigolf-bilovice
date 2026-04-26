export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
  
    const { to, nick, message } = req.body;
  
    try {
      const r = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_69zehax",
          template_id: "template_rfxyntm",
          user_id: "Q8fPVr7d3xnfuxPdT",
          accessToken: "Q8fPVr7d3xnfuxPdT",
          template_params: { to_email: to, nick, message },
        }),
      });
      const text = await r.text();
      res.status(r.ok ? 200 : 400).json({ ok: r.ok, text });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }