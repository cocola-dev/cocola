import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

// export const sendTwoFactorTokenEmail = async (
//   email: string,
//   token: string
// ) => {
//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "2FA Code",
//     html: `<p>Your 2FA code: ${token}</p>`
//   });
// };
export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const template = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>2FA Code</title>
      <style>
        body {
          background-color: #121212;
          font-family: Arial, sans-serif;
        }
        main {
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          background-color: #131313;
          border-radius: 10px;
          width: 400px;
          border: solid 1px #2e2e2e;
          padding: 20px;
          text-align: center;
          color: #fff;
          margin-bottom: 10px;
        }
        .flex-container {
          display: flex;
          justify-content: center;
          height: 100px;
        }
        .logo {
          width: 100px;
          height: 100px;
        }
        .company-name {
          font-size: 36px;
          font-weight: bold;
        }
        .code {
          font-weight: bold;
          margin-bottom: 20px;
        }
        .icons {
          display: flex;
          justify-content: center;
        }
        .icon {
          margin: 5px;
          width: 30px;
          height: 30px;
        }
        code {
          background-color: #2e2e2e;
          padding: 10px;
          border-radius: 5px;
          display: block;
          margin: 0 auto;
          width: 200px;
          font-size: 24px;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <main>
        <div class="container">
          <div class="flex-container">
            <img
              src="https://cocola.vercel.app/white_logo.svg"
              alt="Company Logo"
              class="logo"
            />
            <h1 class="company-name">Cocola</h1>
          </div>
          <p class="code">Your 2FA Code is :-</p>
          <code>${token}</code>
        </div>
      </main>
    </body>
  </html>
  
  `;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "2FA Code",
    html: template,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};
