// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, service, projectDetails } = await request.json();

    if (!name || !email || !service || !projectDetails) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Service labels mapping
    const serviceLabels: { [key: string]: string } = {
      'aerial-photography': 'Aerial Photography',
      'inspection': 'Inspection Services',
      'mapping': '3D Mapping & Modeling',
      'surveying': 'Land Surveying',
      'real-estate': 'Real Estate Photography',
      'construction': 'Construction Monitoring',
      'agriculture': 'Agricultural Analysis',
      'other': 'Other Services'
    };

    const serviceName = serviceLabels[service] || service;

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
      subject: `New Quote Request: ${serviceName} - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #2563eb; text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 15px;">
              💰 New Quote Request
            </h2>
            
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0;">Client Information:</h3>
              <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #2563eb;">${email}</a></p>
              <p style="margin: 10px 0;"><strong>Service Requested:</strong> <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-weight: 500;">${serviceName}</span></p>
            </div>
            
            <div style="background-color: #fefefe; padding: 20px; border-left: 4px solid #10b981; margin-bottom: 20px;">
              <h3 style="color: #374151; margin-top: 0;">Project Details:</h3>
              <p style="line-height: 1.6; color: #4b5563; white-space: pre-wrap;">${projectDetails}</p>
            </div>
            
            <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border: 1px solid #d1fae5;">
              <h3 style="color: #065f46; margin-top: 0;">Next Steps:</h3>
              <ul style="color: #047857; margin: 0; padding-left: 20px;">
                <li>Review project requirements</li>
                <li>Prepare detailed quote</li>
                <li>Contact client within 24 hours</li>
                <li>Schedule consultation if needed</li>
              </ul>
            </div>
            
            <div style="text-align: center; padding: 20px; background-color: #f3f4f6; border-radius: 8px; margin-top: 20px;">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                This quote request was submitted from your website
              </p>
            </div>
          </div>
        </div>
      `,
      // Also send a plain text version
      text: `
        New Quote Request
        
        Client Information:
        Name: ${name}
        Email: ${email}
        Service: ${serviceName}
        
        Project Details:
        ${projectDetails}
        
        ---
        This quote request was submitted from your website.
        Please respond within 24 hours.
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Quote request sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Quote request email failed:', error);
    return NextResponse.json(
      { error: 'Failed to send quote request' },
      { status: 500 }
    );
  }
}