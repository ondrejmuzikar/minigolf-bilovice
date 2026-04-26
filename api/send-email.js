import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ondrej.muzikar21@gmail.com',
    pass: 'pfqcmomongrctmlb',
  },
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { to, nick, message } = req.body;
  if (!to || !nick || !message) return res.status(400).json({ error: 'Missing fields' });
  try {
    await transporter.sendMail({
      from: '"Minigolf Bílovice" <ondrej.muzikar21@gmail.com>',
      to,
      subject: 'Minigolf Bílovice — upozornění',
      text: `Ahoj ${nick}!\n\n${message}\n\n— Minigolf Bílovice`,
    });
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}