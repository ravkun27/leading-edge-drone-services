import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { handlePreflight, withCORS } from "@/lib/cors";

export async function OPTIONS(req: NextRequest) {
  return handlePreflight(req);
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, service, projectDetails } = await req.json();

    if (!name || !email || !service || !projectDetails) {
      return withCORS(
        req,
        NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      );
    }

    const { EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL } = process.env;
    if (!EMAIL_USER || !EMAIL_PASS || !RECIPIENT_EMAIL) {
      console.error("Missing email environment variables.");
      return withCORS(
        req,
        NextResponse.json(
          { error: "Email configuration is incomplete." },
          { status: 500 }
        )
      );
    }

    const serviceLabels: Record<string, string> = {
      "aerial-photography": "Aerial Photography",
      inspection: "Inspection Services",
      mapping: "3D Mapping & Modeling",
      surveying: "Land Surveying",
      "real-estate": "Real Estate Photography",
      construction: "Construction Monitoring",
      agriculture: "Agricultural Analysis",
      other: "Other Services",
    };

    const serviceName = serviceLabels[service] || service;

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
      from: `"Quote Request" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `📩 New Quote Request: ${serviceName} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; margin-bottom: 24px;">💰 New Quote Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Service Requested:</strong> ${serviceName}</p>
            <hr style="margin: 20px 0;" />
            <p><strong>Project Details:</strong></p>
            <p style="white-space: pre-wrap;">${projectDetails}</p>
            <hr style="margin: 20px 0;" />
            <p>This quote request was submitted from your website.</p>
          </div>
        </div>
      `,
      text: `
New Quote Request

Name: ${name}
Email: ${email}
Service: ${serviceName}

Project Details:
${projectDetails}

---
This quote request was submitted from your website.
      `,
    };

    await transporter.sendMail(mailOptions);

    return withCORS(
      req,
      NextResponse.json(
        { message: "Quote request sent successfully!" },
        { status: 200 }
      )
    );
  } catch (error) {
    console.error("Quote request email failed:", error);
    return withCORS(
      req,
      NextResponse.json(
        { error: "Failed to send quote request" },
        { status: 500 }
      )
    );
  }
}
