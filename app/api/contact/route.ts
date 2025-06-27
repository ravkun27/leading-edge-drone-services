// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { handlePreflight, withCORS } from "@/lib/cors";

// Handle CORS preflight request
export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    console.log("Received data:", { name, email, message }); // Debug log

    if (!name || !email || !message) {
      const errorResponse = NextResponse.json(
        {
          error: "Missing required fields",
          received: { name: !!name, email: !!email, message: !!message },
        },
        { status: 400 }
      );
      return withCORS(request, errorResponse);
    }

    const { EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL } = process.env;

    console.log("Environment check:", {
      EMAIL_USER: !!EMAIL_USER,
      EMAIL_PASS: !!EMAIL_PASS,
      RECIPIENT_EMAIL: !!RECIPIENT_EMAIL,
    }); // Debug log

    if (!EMAIL_USER || !EMAIL_PASS || !RECIPIENT_EMAIL) {
      console.error("Missing email credentials in environment variables.");
      const errorResponse = NextResponse.json(
        { error: "Email configuration is missing." },
        { status: 500 }
      );
      return withCORS(request, errorResponse);
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
      debug: true, // Enable debug logs
      logger: true, // Enable logger
    });

    // Verify transporter
    try {
      await transporter.verify();
      console.log("SMTP connection verified");
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError);
      const errorResponse = NextResponse.json(
        { error: "Email server configuration error" },
        { status: 500 }
      );
      return withCORS(request, errorResponse);
    }

    const mailOptions = {
      from: `"Contact Form" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `📩 New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      `,
      text: `New message from ${name} (${email}):\n\n${message}`,
    };

    console.log("Attempting to send email..."); // Debug log
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);

    const successResponse = NextResponse.json(
      {
        message: "Message sent successfully!",
        messageId: info.messageId,
      },
      { status: 200 }
    );

    return withCORS(request, successResponse);
  } catch (error) {
    console.error("Contact form error:", error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    const errorResponse = NextResponse.json(
      {
        error: "Failed to send message",
        details:
          process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );

    return withCORS(request, errorResponse);
  }
}
