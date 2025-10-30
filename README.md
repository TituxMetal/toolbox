# Developer Toolbox PWA

A comprehensive Progressive Web Application (PWA) built with React, TypeScript, and Tailwind CSS,
featuring essential development tools including a fully-featured Pomodoro timer for productivity and
focus.

## 🚀 Features

### 🍅 Pomodoro Timer

- **Complete Timer System**: 25-minute work sessions, 5-minute short breaks, 15-minute long breaks
- **Session Management**: Automatic transitions between work and break sessions
- **Audio Notifications**: Different sounds for session start/end with volume control
- **Browser Notifications**: Desktop notifications with permission handling
- **Background Timer**: Continues running when browser tab is not active using Page Visibility API
- **Data Persistence**: Timer state, preferences, and session history saved to localStorage
- **Statistics Tracking**: Session counts, streaks, total time, and daily progress
- **Responsive Design**: Optimized for iPad, iPhone SE, and desktop
- **PWA Support**: Offline functionality and installable as a native app

### 🎨 Modern UI/UX

- **Dark Theme**: Zinc-700 background with complementary colors
- **Color-Coded Sessions**: Indigo for work, green for short breaks, purple for long breaks
- **Smooth Animations**: Tailwind CSS transitions and hover effects
- **Accessible Design**: WCAG compliance with proper ARIA labels and keyboard navigation
- **Glass Effect**: Modern backdrop blur and transparency effects

## 🛠️ Tech Stack

- **Frontend**: React 19.2.0 with TypeScript
- **Styling**: Tailwind CSS V4 (CSS-first approach, no config file)
- **Build Tool**: Vite 7.1.12
- **Package Manager**: Bun
- **Routing**: React Router DOM 7.9.4
- **PWA**: vite-plugin-pwa with Workbox
- **Testing**: Vitest, React Testing Library, @testing-library/jest-dom
- **Audio**: HTML5 Audio API with Web Audio API fallback
- **Notifications**: Web Notifications API
- **Storage**: localStorage for data persistence

## 📱 Target Devices

- **iPad**: Optimized for tablet usage
- **iPhone SE**: Mobile-first responsive design
- **ArchLinux Desktop**: Desktop experience with Brave Browser

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── tools/           # Tool-specific components
│   │   ├── PomodoroTimer.tsx
│   │   └── PomodoroSettings.tsx
│   ├── Button.tsx       # Button variants and groups
│   ├── Card.tsx         # Card components
│   ├── ProgressCircle.tsx # Circular progress indicators
│   └── StatCard.tsx     # Statistics display cards
├── hooks/               # Custom React hooks
│   └── usePomodoro.ts   # Pomodoro timer logic
├── pages/               # Page components
│   └── Home.tsx         # Main landing page
├── types/               # TypeScript type definitions
│   └── index.ts         # Pomodoro and UI types
├── utils/               # Utility functions
│   ├── audio.ts         # Audio management
│   ├── notifications.ts # Browser notifications
│   ├── storage.ts       # localStorage operations
│   └── time.ts          # Time formatting
└── test/                # Test configuration
    └── setup.ts         # Vitest setup
```

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- Node.js 18+ (for compatibility)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd toolbox
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
bun run build
```

### Running Tests

```bash
# Run all tests
bun run test

# Run tests in watch mode
bun run test:ui

# Run tests once
bun run test:run

# Run tests with coverage
bun run test:coverage
```

## 🧪 Testing

The project includes comprehensive test coverage:

- **Unit Tests**: Individual components and hooks
- **Integration Tests**: Component interactions and user flows
- **Mocked APIs**: Web APIs (Audio, Notifications, localStorage) for reliable testing
- **Timer Logic**: Comprehensive testing of Pomodoro timer state management

## 📦 PWA Features

- **Offline Support**: Works without internet connection
- **Installable**: Can be installed as a native app
- **Background Sync**: Timer continues running in background
- **Push Notifications**: Desktop notifications for session changes
- **Responsive**: Adapts to different screen sizes and orientations

## 🎯 Usage

### Pomodoro Timer

1. **Start a Session**: Click the play button to begin a 25-minute work session
2. **Take Breaks**: Timer automatically transitions to breaks after work sessions
3. **Track Progress**: View daily statistics, session counts, and streaks
4. **Customize Settings**: Access settings to modify timer durations and preferences
5. **Stay Focused**: Audio and visual notifications keep you on track

### Navigation

- **Home**: Overview of available tools
- **Pomodoro Timer**: Full timer interface with controls and statistics
- **Settings**: Customize timer preferences and notifications

## 🔧 Configuration

The application uses a CSS-first approach with Tailwind CSS V4. Custom theme variables are defined
in `src/index.css`:

```css
@theme {
  --color-primary: #3f3f46;
  --color-secondary: #6366f1;
  --color-accent: #8b5cf6;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pomodoro Technique](https://francescocirillo.com/pages/pomodoro-technique) by Francesco Cirillo
- [React](https://reactjs.org/) for the component framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Vite](https://vitejs.dev/) for the build tool
- [Bun](https://bun.sh/) for the fast runtime and package manager
