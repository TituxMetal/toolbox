# Quick Reference Guide

**Toolbox PWA - React + TypeScript with Bun**

---

## One-Command Setup

```bash
bun create vite . --template react-ts && bun install && bun add tailwindcss@next @tailwindcss/vite@next && bun add -D vite-plugin-pwa workbox-window
```

---

## Essential Commands

```bash
bun install              # Install dependencies
bun run dev              # Start dev server
bun run build            # Build for production
bun run preview          # Preview production build
bun run tsc              # Type check
```

---

## File Checklist

**Configuration:**

- [ ] vite.config.ts
- [ ] tsconfig.json
- [ ] package.json
- [ ] index.html

**Source Code:**

- [ ] src/types/index.ts
- [ ] src/hooks/usePomodoro.ts
- [ ] src/components/Layout.tsx
- [ ] src/components/tools/PomodoroTimer.tsx
- [ ] src/App.tsx
- [ ] src/main.tsx
- [ ] src/index.css

**Assets:**

- [ ] public/favicon.ico
- [ ] public/pwa-64x64.png
- [ ] public/pwa-192x192.png
- [ ] public/pwa-512x512.png
- [ ] public/maskable-icon-512x512.png
- [ ] public/apple-touch-icon.png

---

## Tailwind CSS V4 Utilities

```css
.btn-primary          /* Indigo button */
/* Indigo button */
.btn-secondary        /* Zinc button */
.btn-outline          /* Outlined button */
.card                 /* Card container */
.glass-effect         /* Glass-morphism effect */
.animate-fade-in      /* Fade in animation */
.animate-slide-in     /* Slide in animation */
.animate-pulse-glow; /* Pulse glow animation */
```

---

## TypeScript Types

```typescript
type SessionType = 'work' | 'shortBreak' | 'longBreak'

interface PomodoroState {
  timeLeft: number
  isRunning: boolean
  sessionType: SessionType
  sessionsCompleted: number
  totalSessions: number
}

interface PomodoroConfig {
  workDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  sessionsBeforeLongBreak: number
}
```

---

## Component Patterns

**Functional Component:**

```typescript
export const MyComponent = () => <div>Content</div>
```

**Component with Props:**

```typescript
interface Props {
  title: string
  children: ReactNode
}

export const MyComponent = ({ title, children }: Props) => (
  <div>
    <h1>{title}</h1>
    {children}
  </div>
)
```

**Custom Hook:**

```typescript
export const useMyHook = () => {
  const [state, setState] = useState(initialValue)
  return { state, setState }
}
```

---

## PWA Installation

**iOS (iPad, iPhone SE):**

1. Open Safari
2. Navigate to app URL
3. Tap Share button
4. Tap "Add to Home Screen"
5. Name the app and tap "Add"

**Android:**

1. Open Chrome/Brave
2. Navigate to app URL
3. Tap menu (three dots)
4. Tap "Install app"
5. Confirm installation

**Desktop (ArchLinux):**

1. Open Brave Browser
2. Navigate to app URL
3. Click menu (three dots)
4. Click "Install Toolbox"
5. Confirm installation

---

## Testing Checklist

- [ ] `bun run dev` starts without errors
- [ ] App loads at localhost:5173
- [ ] Tailwind styles are applied (dark background)
- [ ] Pomodoro timer displays correctly
- [ ] Buttons are clickable
- [ ] Timer counts down when started
- [ ] Service worker registers successfully
- [ ] App works offline

---

## Troubleshooting

| Issue                          | Solution                                             |
| ------------------------------ | ---------------------------------------------------- |
| Port 5173 already in use       | Kill process or use different port                   |
| TypeScript errors              | Run `bun run tsc` to check                           |
| Tailwind not working           | Verify @tailwindcss/vite is installed                |
| Service worker not registering | Check browser console for errors                     |
| PWA not installable            | Ensure HTTPS (or localhost) and manifest.json exists |
| Icons not showing              | Verify icon files exist in public/ folder            |

---

## Pro Tips

1. Use `bun run tsc` before building to catch type errors
2. Test PWA locally with `bun run preview`
3. Use browser DevTools to inspect service worker
4. Check Application tab in DevTools for manifest and cache
5. Use Chrome DevTools Lighthouse for PWA audit
6. Test on actual devices before deployment

---

## Deployment Options

**Vercel:**

```bash
npm install -g vercel
vercel
```

**Netlify:**

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**Self-hosted:**

```bash
bun run build
# Deploy dist/ folder to your server
```

---

## Resources

- Bun Documentation: [bun.sh](https://bun.sh)
- Vite Documentation: [vitejs.dev](https://vitejs.dev)
- React Documentation: [react.dev](https://react.dev)
- Tailwind CSS: [tailwindcss.com](https://tailwindcss.com)
- PWA Documentation: [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps)

---

**Version:** 1.0 | **Created:** October 26, 2025
