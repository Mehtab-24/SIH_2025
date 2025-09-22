const { generateQRCodeDataURL } = require('../utils/qrcode');

exports.getQRCode = async (req, res) => {
  const { id } = req.params;
  try {
    // For demo, payload is just the record ID string
    const qrData = `healthrecord:${id}`;
    const qrCodeUrl = await generateQRCodeDataURL(qrData);
    res.json({ qrCodeUrl });
  } catch (err) {
    res.status(500).json({ error: 'QR code generation failed' });
  }
};
