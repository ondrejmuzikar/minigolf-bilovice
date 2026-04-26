import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { to, nick, message } = req.body;
  if (!to || !nick || !message) return res.status(400).json({ error: 'Missing fields' });
  try {
    await resend.emails.send({
      from: 'Minigolf Bílovice <onboarding@resend.dev>',
      to,
      subject: 'Minigolf Bílovice — upozornění',
      text: `Ahoj ${nick}!\n\n${message}\n\n— Minigolf Bílovice`,
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}