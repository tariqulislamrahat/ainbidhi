# AINBIDHI - AI Legal Assistant for Bangladesh

**AINBIDHI (আইনবিধি)** is a compassionate, knowledgeable, and purpose-driven AI legal assistant designed to democratize legal knowledge and make justice accessible for the citizens of Bangladesh. This project was developed as an entry for the **PTIB Civic Tech Challenge 2025** in the "Legal and Justice Access" category.

Our mission is to bridge the gap between complex legal systems and ordinary people, providing clear, actionable, and empathetic guidance in both English and Bengali.

## Table of Contents

- [Core Mission](#core-mission)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [AI and Genkit](#ai-and-genkit)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Core Mission

AINBIDHI was created with a clear purpose: to serve underserved communities by making legal information accessible and understandable. Our AI embodies the following values:

- **Empowerment-Focused**: We provide complete, step-by-step instructions to help users take action themselves.
- **Comprehensive**: We aim to answer questions fully in the first response, including necessary details like timelines, costs, and procedures.
- **Actionable**: Every response is designed to lead to immediate, practical action.
- **Culturally Grounded**: We use familiar local examples and references relevant to Bangladesh.
- **Ethical and Responsible**: We prioritize accuracy, maintain neutrality, respect user privacy, and acknowledge our limitations by directing users to human professionals when a case is too complex.

## Key Features

- **Bilingual Chat Interface**: Seamlessly interact with the AI in either **English** or **Bengali**.
- **AI-Powered Legal Guidance**: Leverages Google's Gemini models via Genkit to provide detailed, context-aware, and empathetic responses based on a carefully trained persona.
- **Conversation History**: Your chat sessions are automatically saved to your browser's local storage for future reference.
- **Legal Aid Directory**: An integrated, searchable directory of verified NGOs and Government legal aid services across various districts in Bangladesh.
- **Quick Actions**: A set of common legal questions to help users get started quickly.
- **Responsive Design**: Fully accessible and functional across desktop and mobile devices.

## Technology Stack

This project is built with a modern, robust, and scalable technology stack:

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **AI Integration**: [Genkit (Firebase Genkit)](https://firebase.google.com/docs/genkit)
- **AI Model**: [Google Gemini](https://ai.google.dev/)
- **State Management**: [Jotai](https://jotai.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Project Structure

The codebase is organized to be clean, modular, and easy to navigate:

```
.
├── src
│   ├── app                 # Next.js App Router: pages, layouts, and server actions
│   │   ├── (main)          # Main application pages (chat interface)
│   │   ├── actions.ts      # Next.js server actions
│   │   └── layout.tsx
│   ├── ai                  # All Genkit-related code
│   │   ├── flows           # Genkit flows for different AI tasks
│   │   └── genkit.ts       # Genkit initialization and configuration
│   ├── components          # Reusable React components
│   │   └── ui              # ShadCN UI components
│   ├── hooks               # Custom React hooks
│   ├── lib                 # Utility functions, state management, and data
│   └── public              # Static assets
├── .env.example            # Environment variable template
├── next.config.ts          # Next.js configuration
├── package.json
└── tailwind.config.ts      # Tailwind CSS configuration
```

## AI and Genkit

This project uses **Genkit** to define and manage interactions with the Google Gemini large language model.

-   **Flows (`src/ai/flows`):** Each major AI capability is defined as a "flow." A flow is a server-side function that orchestrates prompts, data processing, and calls to the AI model.
-   **Prompts:** We use structured prompts with Zod schemas for type-safe inputs and outputs. The AI's core identity and response guidelines are embedded within the `generateResponseAlternatives` prompt to ensure consistent, high-quality answers.
-   **Configuration (`src/ai/genkit.ts`):** This file initializes Genkit with the necessary plugins (like `googleAI`) and sets the default model.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- This project was made possible by the **PTIB Civic Tech Challenge 2025**.
- We are grateful for the support of our partners and mentors.
- Developed with passion by **KINGSMEN**.
