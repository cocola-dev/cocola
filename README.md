<p style="font-size:30px" align="center">
🌟 Welcome to Cocola 🌟
</p>

<p align="center">
   <img src="https://github.com/cocola-dev/cocola/blob/main/assets/images/logo.png?raw=true" alt="Cocola Logo" width="100"/>
</p>

Cocola isn't just another tech platform; it's a dynamic community hub where developers converge, code collaboratively, and breathe life into their projects with unparalleled ease. 🚀

## What is Cocola?

Cocola stands at the forefront of next-generation tech platforms, revolutionizing your development workflow. Much like GitHub, it provides an array of tools for code management, PR creation, and issue tracking. But hold onto your hats because there's more excitement ahead! 🎉

## Key Features

### 🛠️ Code Management

- Effortlessly manage your code with our user-friendly version control tools.
- Seamlessly create and review Pull Requests, facilitating smooth integration of changes.

![Code Management](https://github.com/cocola-dev/cocola/assets/142723369/35a9508e-8564-4816-8420-b248d972b89c)

![Code Management](https://github.com/cocola-dev/cocola/assets/142723369/f2bae9b3-a0fd-4412-b198-b56c1a2de1d5)

![Code Management](https://github.com/cocola-dev/cocola/assets/142723369/dd95f88c-d746-4aac-8288-ca22431ded22)

### 💬 AI Friend

- Say hello to your newest companion in the chat section – your very own AI buddy! 🤖
- Gain valuable insights, receive helpful suggestions, and perhaps even share a laugh or two.

![AI Friend](https://github.com/cocola-dev/cocola/assets/142723369/e76b1f7d-2ec3-4780-bac9-2432e4bcd29d)

### 🚧 CI/CD Integration

- Say goodbye to manual processes with our robust CI/CD pipelines.
- Deploy your projects with the click of a button, as if by sheer magic! ✨

### 🤝 Collaboration

- Engage in real-time collaboration with your team through one-on-one chats and team meetings.
- Contribute to repositories and cultivate an environment of mutual learning and growth.

### 💰 Sponsorship

- Support your favorite projects by sponsoring them directly through Cocola.
- Empower creators and drive innovation within the community.

## Under Development & Open Source

Cocola is more than just a project; it's a labor of love that continues to evolve. Our commitment to transparency and collaboration is evident in our decision to keep Cocola open source. Come join us in shaping the future of technology! 🌈

## Quick Start Guide for Developers

Are you ready to take your tech journey to new heights? Dive headfirst into Cocola today and experience a development bliss like never before. Join our vibrant community, contribute to projects, and together, let's build the future! 🚀

## Step 1: Clone the Repository

```sh
git clone https://github.com/cocola-dev/cocola.git
```

## Step 2: Install Dependencies

```sh
npm install
```

## Step 3: Configure Environment Variables

🔧 Find the `.env.example` file in the project's root directory.

📝 Duplicate `.env.example` and rename the copy to `.env`.

```sh
cp .env.example .env
```

🔑 Fill in the following information in the `.env` file:

```env
# MONGODB URL
MONGODB_URL=your_mongodb_url_here

# Auth secret with 64 characters
AUTH_SECRET=your_auth_secret_here

# RESEND API KEY
RESEND_API_KEY=your_resend_api_key_here

# Client URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Your Google Gemini API key (optional)
GENERATIVE_API_KEY=your_generative_api_key_here

# Google Cloud Storage bucket name
BUCKET_NAME=your_bucket_name_here

# serviceAccountKey.json as base64 encoded
GCP_CRED_FILE=your_base64_encoded_serviceAccountKey.json_here
```

## Step 4: Run the Application

```sh
npm run dev
```

🚀 The application should now be running locally. Access it by navigating to `http://localhost:3000` in your web browser.
