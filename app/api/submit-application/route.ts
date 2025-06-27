import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// CORS preflight (optional if accessed cross-origin from another domain)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*", // Replace with your site domain in prod
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;
    const resumeFile = formData.get("resume") as File;

    if (!name || !email || !message || !resumeFile) {
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
      console.warn("Missing email credentials or recipient email in env.");
      return NextResponse.json(
        { error: "Email configuration is missing." },
        { status: 500 }
      );
    }

    // Convert the resume to a Buffer
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

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
      from: `"Application Form" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
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

    return new NextResponse(
      JSON.stringify({ message: "Application submitted successfully!" }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Replace in prod
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error: any) {
    console.error("Application submission failed:", error);
    return new NextResponse(
      JSON.stringify({ error: "Failed to submit application" }),
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
