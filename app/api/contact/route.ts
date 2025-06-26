// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create transporter for Hostinger email
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        ciphers: 'SSLv3'
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px;">
              💬 New Contact Form Message
            </h2>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0;">Contact Details:</h3>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
            </div>
            
            <div style="background-color: #fefefe; padding: 20px; border-left: 4px solid #2563eb; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #f3f4f6; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This message was sent from your website contact form
              </p>
            </div>
          </div>
        </div>
      `,
      // Also send a plain text version
      text: `
        New Contact Form Message
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
        
        ---
        This message was sent from your website contact form.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Message sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form email failed:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}