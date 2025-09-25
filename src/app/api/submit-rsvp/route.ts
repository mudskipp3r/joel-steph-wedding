import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const submission = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string || 'Not provided',
      attendance: formData.get('attendance') as string,
      hasPlusOne: formData.get('hasPlusOne') as string || 'no',
      plusOneCode: formData.get('plusOneCode') as string || 'N/A',
      dietaryRestrictions: formData.get('dietaryRestrictions') as string || 'None specified',
      message: formData.get('message') as string || 'No message provided',
      submittedAt: new Date().toISOString()
    };

    // Submit to Netlify Forms via their API
    const netlifyFormData = new URLSearchParams();
    netlifyFormData.append('form-name', 'wedding-rsvp');
    Object.entries(submission).forEach(([key, value]) => {
      if (key !== 'submittedAt') {
        netlifyFormData.append(key, value);
      }
    });

    const netlifyResponse = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: netlifyFormData.toString(),
    });

    // Log for debugging
    console.log('RSVP Submission received:', submission);
    console.log('Netlify response status:', netlifyResponse.status);

    // Return success with redirect
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You!</title>
        <meta http-equiv="refresh" content="0;url=/?rsvp=success">
      </head>
      <body>
        <p>Thank you for your RSVP! Redirecting...</p>
      </body>
      </html>`,
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Error</title>
        <meta http-equiv="refresh" content="3;url=/?rsvp=error">
      </head>
      <body>
        <p>There was an error submitting your RSVP. Redirecting back...</p>
      </body>
      </html>`,
      {
        status: 500,
        headers: {
          'Content-Type': 'text/html',
        },
      }
    );
  }
}