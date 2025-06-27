// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Handle CORS preflight request
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // Change to your frontend domain in prod
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (
      !process.env.EMAIL_USER ||
      !process.env.EMAIL_PASS ||
      !process.env.RECIPIENT_EMAIL
    ) {
      console.warn("Missing email credentials in environment variables.");
      return NextResponse.json(
        { error: "Email configuration is missing." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `📩 New Contact Form Submission from ${name}`,
      html: `
        <h2 style="margin-bottom: 1rem;">New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <pre>${message}</pre>
      `,
      text: `New message from ${name} (${email}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return new NextResponse(
      JSON.stringify({ message: "Message sent successfully!" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Change this in production!
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Contact form error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to send message" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }
}
