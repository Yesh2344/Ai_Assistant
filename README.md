# AI Assistant Chat Application

A real-time chat application with AI responses built using React, Convex, and OpenAI. This application provides an interactive chat interface where users can have conversations with an AI assistant.

## Features

- 🔐 **User Authentication**
  - Email/Password login
  - Anonymous login support
  - Secure session management

- 💬 **Real-time Chat**
  - Instant message delivery
  - Message history
  - Typing indicators
  - Message status indicators

- 🤖 **AI Integration**
  - Powered by OpenAI's GPT models
  - Contextual responses
  - Natural conversation flow

- ✨ **Modern UI**
  - Clean, responsive design
  - Dark/Light theme support
  - Loading states and animations
  - Toast notifications

## Tech Stack

- **Frontend**
  - React 19
  - TailwindCSS
  - Lucide Icons
  - TypeScript

- **Backend**
  - Convex (Backend as a Service)
  - Real-time data sync
  - Serverless functions

- **AI**
  - OpenAI GPT-4.1-nano
  - Chat Completions API

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A Convex account
- An OpenAI API key (optional - built-in key provided for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```env
VITE_CONVEX_URL=<your-convex-deployment-url>
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
├── convex/                 # Backend functions and schema
│   ├── _generated/        # Generated types and APIs
│   ├── auth.config.ts     # Auth configuration
│   ├── messages.ts        # Message handling functions
│   └── schema.ts          # Database schema
├── src/
│   ├── components/        # React components
│   ├── lib/              # Utility functions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
└── public/               # Static assets
```

