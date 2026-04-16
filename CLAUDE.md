# First Step AI

An AI-powered onboarding agent for e-commerce sellers. Users answer 
8-10 questions about their business and receive a personalized AI 
Action Plan — a downloadable PDF with one specific automation 
recommendation tailored to their store.

## Tech Stack
- React + Vite
- Tailwind CSS
- Anthropic Claude API (claude-sonnet-4-6)
- Supabase (database + email capture)
- Vercel (deployment)

## Project Structure
- /src/components — React components
- /src/pages — Page-level views
- /src/api — Claude API calls and PDF generation
- /src/data — Automation pattern definitions (20-30 e-commerce scenarios)

## Commands
- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Conventions
- Use Tailwind utility classes for all styling — no separate CSS files
- Component files use PascalCase (e.g. IntakeForm.jsx)
- Keep Claude API calls in /src/api only — not inside components
- Mobile-first responsive design on all components

## Current Focus
Building the conversational intake flow — the question-by-question 
UI that walks a seller through their business profile.
## Available Skills
- /new-pattern — creates a new automation pattern 
  in src/data/patterns/
- /build-intake-question — creates a new intake 
  question component and updates questions.js