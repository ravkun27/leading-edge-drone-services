import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { handlePreflight, withCORS } from "@/lib/cors";

// Handle CORS preflight request
export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return withCORS(
        request,
        NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      );
    }

    const { EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS || !RECIPIENT_EMAIL) {
      console.warn("Missing email credentials in environment variables.");
      return withCORS(
        request,
        NextResponse.json(
          { error: "Email configuration is missing." },
          { status: 500 }
        )
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <pre style="font-family: inherit; white-space: pre-wrap;">${message}</pre>
      `,
      text: `New message from ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return withCORS(
      request,
      new NextResponse(
        JSON.stringify({ message: "Message sent successfully!" }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return withCORS(
      request,
      new NextResponse(JSON.stringify({ error: "Failed to send message" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    );
  }
}
