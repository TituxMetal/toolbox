# Audio Assets for Pomodoro Timer

This directory contains audio files used for Pomodoro timer notifications.

## Required Audio Files

The following audio files should be placed in this directory:

### Core Notification Sounds

- `work-start.mp3` - Played when a work session begins
- `work-end.mp3` - Played when a work session ends
- `break-start.mp3` - Played when a break session begins
- `break-end.mp3` - Played when a break session ends
- `tick.mp3` - Optional tick sound for each second (if enabled)

## Audio Requirements

- **Format**: MP3 or OGG for broad browser compatibility
- **Duration**: 1-3 seconds for notification sounds
- **Volume**: Pre-normalized to consistent levels
- **Quality**: 44.1kHz, 16-bit minimum
- **File Size**: Keep under 100KB each for fast loading

## Recommended Sound Types

- **Work Start**: Gentle, motivating tone (e.g., soft chime)
- **Work End**: Completion sound (e.g., bell or ding)
- **Break Start**: Relaxing, softer tone
- **Break End**: Gentle reminder to return to work
- **Tick**: Subtle, non-intrusive sound

## Fallback Behavior

If audio files are not found, the application will:

1. Use Web Audio API to generate simple beep sounds
2. Show visual notifications only
3. Continue functioning without audio feedback

## Adding Custom Sounds

To add custom notification sounds:

1. Place audio files in this directory
2. Update the `AUDIO_FILES` constant in `src/utils/audio.ts`
3. Ensure files are accessible via the public URL path

## Browser Compatibility

- Modern browsers support MP3 and OGG formats
- Some browsers require user interaction before playing audio
- The app handles audio permission requests gracefully
