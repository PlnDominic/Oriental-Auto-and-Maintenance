import nodemailer from "nodemailer";

interface InvoiceRequestBody {
  name: string;
  email: string;
  phone: string;
  message?: string;
  vehicleName: string;
  variant: string;
  year: number;
  price: number;
  colorHex: string;
}

export async function POST(request: Request) {
  const body: InvoiceRequestBody = await request.json();
  const { name, email, phone, message, vehicleName, variant, year, price, colorHex } = body;

  if (!name || !email || !phone) {
    return Response.json({ error: "Name, email, and phone are required." }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const recipient = process.env.SMTP_TO ?? process.env.SMTP_USER ?? "";

  const businessEmail = {
    from: `"Oriental Auto Configurator" <${process.env.SMTP_USER}>`,
    to: recipient,
    subject: `Invoice Request — ${vehicleName} ${year} (${variant})`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <div style="border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 32px;">
          <h1 style="font-size: 22px; font-weight: 700; letter-spacing: -0.02em; margin: 0;">
            ORIENTAL AUTO & MAINTENANCE
          </h1>
          <p style="font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #777; margin: 6px 0 0;">
            New Invoice Request
          </p>
        </div>

        <h2 style="font-size: 18px; font-weight: 600; margin: 0 0 4px;">${vehicleName} ${year}</h2>
        <p style="font-size: 14px; color: #555; margin: 0 0 24px;">${variant}</p>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #777; width: 40%;">Colour</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 500;">
              <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: ${colorHex}; border: 1px solid #ddd; margin-right: 8px; vertical-align: middle;"></span>
              ${colorHex}
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #777;">Price</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 600;">USD ${price.toLocaleString()}</td>
          </tr>
        </table>

        <h3 style="font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #777; margin: 0 0 16px;">Customer Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #777; width: 40%;">Name</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 500;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #777;">Email</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 500;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #777;">Phone</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; font-weight: 500;">${phone}</td>
          </tr>
          ${message ? `
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px; color: #777; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-size: 13px;">${message}</td>
          </tr>
          ` : ""}
        </table>
      </div>
    `,
  };

  const confirmationEmail = {
    from: `"Oriental Auto & Maintenance" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `Your Invoice Request — ${vehicleName} ${year}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
        <div style="border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 32px;">
          <h1 style="font-size: 22px; font-weight: 700; letter-spacing: -0.02em; margin: 0;">
            ORIENTAL AUTO & MAINTENANCE
          </h1>
        </div>

        <p style="font-size: 16px; margin: 0 0 8px;">Hello ${name},</p>
        <p style="font-size: 14px; color: #555; margin: 0 0 32px; line-height: 1.6;">
          Thank you for your interest. We've received your invoice request for the
          <strong>${vehicleName} ${year} — ${variant}</strong>
          and will be in touch within 24 hours.
        </p>

        <div style="background: #f8f8f8; padding: 20px 24px; margin-bottom: 32px;">
          <p style="font-size: 12px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #777; margin: 0 0 12px;">Your Configuration</p>
          <p style="font-size: 16px; font-weight: 700; margin: 0 0 4px;">${vehicleName} ${year}</p>
          <p style="font-size: 13px; color: #555; margin: 0 0 12px;">${variant}</p>
          <p style="font-size: 18px; font-weight: 600; margin: 0;">USD ${price.toLocaleString()}</p>
        </div>

        <p style="font-size: 12px; color: #999; border-top: 1px solid #eee; padding-top: 24px; margin: 0;">
          Oriental Auto &amp; Maintenance &mdash; Ghana
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(businessEmail);
    await transporter.sendMail(confirmationEmail);
    return Response.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    return Response.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }
}
