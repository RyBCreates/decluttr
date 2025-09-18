# Decluttr — Code Jam Edition

Turning tidying into a game you’ll actually want to play.

## What is Decluttr?

Decluttr takes the everyday act of cleaning and turns it into a game. Every time you tidy up; whether it’s picking up litter, organizing your desk, or cleaning your room, you earn points that level up your profile. Those points can be spent in a virtual shop on fun cosmetics like profile colors and badges. Daily tasks, streak bonuses, and achievements keep you motivated, so staying consistent feels less like a chore and more like a quest.

## Live demo

- Homepage: https://decluttr.mycityulife.com

## Why it matters

Habits stick when progress is visible and rewards feel immediate. Decluttr lowers the barrier to starting, then keeps momentum with streaks, gems, levels, and achievements—small wins that add up to real-life cleanliness.

## Highlights (MVP scope)

- Daily task list with one-tap completion and satisfying feedback
- Gamification system: XP, Levels, Gems, Streaks, multipliers, level thresholds
- Achievements and badges that unlock as you build consistency
- Quiz mini-game with daily rewards for variety and fun
- Collapsible right sidebar with User Stats and Achievements; main area expands when collapsed
- Mobile responsive layout; accessible tooltips and keyboard interactions

## Quick tour for judges

- Home: Add and complete tasks, watch your gems/XP grow, maintain streaks
- Quiz: Answer a few questions, claim rewards, repeat daily
- Profile: See badges/achievements, adjust settings, personalize your profile banner
- Shop (MVP scaffolding): Preview the economy for cosmetics and boosters

## Tech stack

- React 19 + Vite 7 (fast dev server, production build)
- React Router (hash-based routing for static hosting)
- Plain CSS per component (responsive, accessible)
- ESLint for basic code quality

## Project structure (high level)

- `src/components/` — feature and UI components
  - `pages/Home` — tasks list and interactions
  - `pages/Quiz` — daily quiz and rewards
  - `pages/Profile` — badges, achievements, items, settings
  - `RightSideBar` — user stats + achievements (collapsible)
  - `LeftSideBar` — main navigation (desktop + bottom bar behavior on mobile)
  - `TaskCard`, `ShopItem`, `StoreMenu`, etc.
- `src/contexts/` — `CurrentUserContext` for app-wide user state
- `src/utils/` — APIs, game logic (XP, streaks), constants, and mock data
- `public/` — static assets

## Architecture and game logic

- State: React state + Context for the current user; some preferences persisted to `localStorage` (e.g., right sidebar open/closed)
- Layout: CSS grid; the right sidebar slides out of view and the main column expands using `:has(.right-sidebar--closed)`
- Accessibility: keyboard focus for tooltips, ARIA labeling for controls, no horizontal scroll on small screens
- Game mechanics:
  - XP/Levels: thresholds computed in `utils/gameLogic/levelSystem.js`
  - Streaks: daily streak handling in `utils/gameLogic/streakSystem.js`
  - Rewards: tasks and quizzes grant gems and XP; future boosts and perks planned

## Design decisions

- Mobile-first vertical stat cards across all screen sizes
- Sidebar overlays visually without causing layout shifts; main content expands when collapsed
- Tooltip for Level shows detailed XP progress, positioned to avoid viewport overflow

## Roadmap

Near-term

- Recurring tasks and reminders
- XP progress bar and level-up animations
- Achievement detail views with filtering
- Shop MVP polish: inventory and boost consumption

Mid-term

- PWA (offline support, install prompts) and notifications
- Internationalization and localization (i18n)
- Leaderboards/friends (privacy-first)

Long-term

- Admin content tools (achievements, quiz, items)
- Performance budgets and CI checks

## Contributing

We welcome focused, well-described PRs. Please include:

- What/why of the change
- Any visual or interaction changes (with screenshots/gifs)
- Tests if logic is affected

## License

This code is for the Decluttr project; licensing to be finalized for post–code jam publication.

- `src/utils/` – constants, API helpers, game logic, and mock data
- `public/` – static assets

## Roadmap (high level)

- Recurring tasks, reminders, and calendar-friendly planning
- XP progress bar and level-up animations
- Achievement detail views and better filters
- Shop and inventory improvements (boosts, cosmetics)
- PWA and offline support; notifications

## Contributing

Issues and PRs are welcome. Please keep changes focused and include a brief description of intent and scope.
