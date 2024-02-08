import Image from "next/image";
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <html lang="en">
    <body>
      <style>
        {`
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
        `}
      </style>
      <main>
        <div className="container">
          <div className="flex-container">
            <Image
              src="https://cocola.vercel.app/white_logo.svg"
              alt="Company Logo"
              className="logo"
              width={100}
              height={100}
            />
            <h1 className="company-name">Cocola</h1>
          </div>
          <p className="code">Your 2FA Code is :-</p>
          <code>132123</code>
        </div>
      </main>
    </body>
  </html>
);
