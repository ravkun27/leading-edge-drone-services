import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { handlePreflight, withCORS } from "@/lib/cors";

export async function OPTIONS(request: NextRequest) {
  return handlePreflight(request);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const resumeFile = formData.get("resume") as File;

    if (!name || !email || !message || !resumeFile) {
      return withCORS(
        request,
        NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      );
    }

    const { EMAIL_USER, EMAIL_PASS, RECIPIENT_EMAIL } = process.env;

    if (!EMAIL_USER || !EMAIL_PASS || !RECIPIENT_EMAIL) {
      console.warn("Missing email credentials or recipient email in env.");
      return withCORS(
        request,
        NextResponse.json(
          { error: "Email configuration is missing." },
          { status: 500 }
        )
      );
    }

    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

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
      from: `"Application Form" <${EMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      subject: `📄 New Application from ${name}`,
      html: `
        <h2>New Job Application</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>
        <p>📎 Resume attached as PDF</p>
      `,
      attachments: [
        {
          filename: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
          content: resumeBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    return withCORS(
      request,
      new NextResponse(
        JSON.stringify({ message: "Application submitted successfully!" }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
  } catch (error) {
    console.error("Application submission failed:", error);
    return withCORS(
      request,
      new NextResponse(
        JSON.stringify({ error: "Failed to submit application" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    );
  }
}
