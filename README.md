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

## Features in Detail

### Authentication

The application uses Convex Auth for user authentication, supporting:
- Email/password registration and login
- Anonymous authentication
- Session persistence
- Secure token management

### Real-time Messaging

Messages are delivered in real-time using Convex's reactive queries:
- Instant updates across all connected clients
- Message persistence
- Optimistic updates for better UX
- Automatic reconnection handling

### AI Integration

The AI assistant is powered by OpenAI's GPT models:
- Contextual understanding of conversations
- Natural language processing
- Quick response generation
- Error handling and fallbacks

## Development

### Adding New Features

1. Backend Functions:
   - Add new functions in the `convex/` directory
   - Update schema in `convex/schema.ts`
   - Use appropriate Convex decorators (`query`, `mutation`, `action`)

2. Frontend Components:
   - Create new components in `src/components/`
   - Use Tailwind CSS for styling
   - Follow the existing component patterns

### Best Practices

- Use TypeScript for type safety
- Follow the existing code style
- Write meaningful commit messages
- Test thoroughly before deploying

## Deployment

The application can be deployed using any static hosting service (Vercel, Netlify, etc.) for the frontend, while the backend is automatically handled by Convex.

1. Build the application:
```bash
npm run build
```

2. Deploy the frontend to your hosting service
3. Ensure environment variables are set in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Convex](https://convex.dev)
- UI components inspired by modern chat applications
- OpenAI for AI capabilities

## Link

- https://rugged-cow-426.convex.app/
