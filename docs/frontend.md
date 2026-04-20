# Frontend Technical Design

The StyleVault frontend is a **Vite + React (JavaScript)** ecosystem meticulously designed to mimic a high-fidelity mobile application.

## State Management

We use the native `React Context API` inside `src/store/GameContext.jsx`.
This handles:

- Fetching user details and initial balance upon launch.
- "Optimistic Updating", immediately deducting the R20 the moment `Buy` is clicked so the UI feels incredibly responsive without waiting for backend resolution.

## Component Flow

- **`App.jsx`**: Bootstraps the application, lays out the header, manages the loading spinner.

- **`PackOpening.jsx`**: The core component that interacts with the backend. It contains delays (`setTimeout`) carefully paced to simulate suspense while the physical pack visually transforms into 3 cards.

- **`Card.jsx`**: Strictly presentational. Using CSS `transform-style: preserve-3d`, it renders both the back (vault icon) and front (rarity colors and values) simultaneously, relying on state toggles to transition the `rotateY(180deg)` property.

## Styling System

Vanilla CSS merged with **Bootstrap 5 grid/tools**.
Centralized in `index.css`:

- `max-width: 500px` root forces a consistent mobile-like column on widescreen desktops.
- Backgrounds use deep dark gradients to make the Rarity colors pop.
