import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text,
      html: params.html,
    });
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendWelcomeEmail(userEmail: string, username: string): Promise<boolean> {
  const emailParams: EmailParams = {
    to: userEmail,
    from: 'noreply@foretoken.com', // You may need to verify this domain in SendGrid
    subject: 'Welcome to Foretoken - Account Created Successfully!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #8B5CF6; font-size: 32px; margin: 0;">Foretoken</h1>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px; border-left: 4px solid #8B5CF6;">
          <h2 style="color: #333; margin-top: 0;">Welcome to Foretoken, ${username}!</h2>
          
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Thank you for creating your account with Foretoken. Your account has been successfully created and you're now ready to explore our comprehensive financial education platform.
          </p>
          
          <div style="margin: 25px 0;">
            <h3 style="color: #333; margin-bottom: 15px;">What's next?</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Explore our RWA 101 educational content</li>
              <li>Listen to our latest podcast episodes</li>
              <li>Browse our comprehensive financial glossary</li>
              <li>Check out our library of resources</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` : 'http://localhost:5173'}" 
               style="background-color: #8B5CF6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Start Exploring
            </a>
          </div>
          
          <p style="color: #888; font-size: 14px; margin-top: 30px;">
            If you have any questions, feel free to reach out to our support team.
          </p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; color: #888; font-size: 12px;">
          <p>© 2025 Foretoken. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
Welcome to Foretoken, ${username}!

Thank you for creating your account with Foretoken. Your account has been successfully created and you're now ready to explore our comprehensive financial education platform.

What's next?
- Explore our RWA 101 educational content
- Listen to our latest podcast episodes
- Browse our comprehensive financial glossary
- Check out our library of resources

Visit us at: ${process.env.REPLIT_DOMAINS ? `https://${process.env.REPLIT_DOMAINS.split(',')[0]}` : 'http://localhost:5173'}

If you have any questions, feel free to reach out to our support team.

© 2025 Foretoken. All rights reserved.
    `
  };

  return await sendEmail(emailParams);
}