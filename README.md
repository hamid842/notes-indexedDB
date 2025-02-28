# IndexedDB Notes

This is a simple note-taking application that allows users to create and manage notes. The application leverages **IndexedDB** for local storage. If your browser supports IndexedDB, it will automatically store your notes locally. Otherwise, you will be notified with a warning.

## Tech Stack

- **React** - A JavaScript library for building user interfaces.
- **Vite** - A modern build tool that provides fast and optimized development experience.
- **Tailwind CSS** - A utility-first CSS framework for creating responsive and modern designs.
- **Shadcn UI** - A component library used for building UI elements.
- **TypeScript** - A superset of JavaScript that provides optional static typing, interfaces, and other features for better development.

## Features

- **Create Notes** - Add new notes with title and content.
- **Edit Notes** - Modify existing notes.
- **Delete Notes** - Remove notes from the list.
- **Optimistic UI Updates** - Updates are shown immediately while interacting with the application for a seamless user experience.
- **IndexedDB Storage** - Notes are saved locally in the browser, so they persist even when the page is refreshed (if supported by the browser).
- **Dark/Light Theme** - stored into localStorage

## Getting Started

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/hamid842/notes-indexedDB.git
cd notes-indexedDB
```

### 2. Install Dependencies

You can choose your preferred package manager:

**With npm:**
```bash
npm install
```
**with yarn:**
```bash
yarn or yarn install
```
**with pnpm**
```
pnpm install
```

Once the server starts, open your browser and navigate to `http://localhost:3000` to see the app in action.

### Building the Project
To create a production build, use the following commands:

**With npm:**
```bash
npm run build
```
**with yarn:**
```bash
yarn build
```
**with pnpm**
```
pnpm build
```

The build will be output to the `dist/` directory, and you can deploy the static files to your hosting service of choice.

### Browser Support
This application uses IndexedDB for local note storage. The majority of modern browsers support this feature, but if your browser doesn’t, you will receive a warning message.

