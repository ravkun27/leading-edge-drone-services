// app/api/submit-application/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const resumeFile = formData.get('resume') as File;

    if (!name || !email || !message || !resumeFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Convert file to buffer for attachment
    const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer());

    // Create transporter for Hostinger email
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // your-email@yourdomain.com
        pass: process.env.EMAIL_PASS, // your email password
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // your email to receive applications
      subject: `New Job Application from ${name}`,
      html: `
        <h2>New Job Application Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Resume attached as PDF</em></p>
      `,
      attachments: [
        {
          filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
          content: resumeBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Application submitted successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Email sending failed:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}