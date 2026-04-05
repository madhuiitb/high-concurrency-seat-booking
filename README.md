
# High Concurrency Seat Booking Simulator

A frontend-focused system design project that simulates
a real-world ticket booking experience under high concurrency conditions.

This project demonstrates how modern booking platforms
prevent double booking,
manage temporary seat reservations, and
handle seat conflicts when multiple users attempt to reserve the same seats simultaneously.

🔗 Live Demo:
https://high-concurrency-seat-booking.vercel.app/seat-map

---

## Features

- Interactive seat map UI
- Seat selection & deselection flow
- Temporary seat reservation logic
- Conflict detection simulation (multi-user scenario)
- Reservation expiration handling
- Checkout confirmation workflow
- Optimistic UI updates
- Polling-based server-state sync simulation
- Toast-based real-time conflict feedback
- Responsive UI

---

## System Design Concepts Demonstrated

This project focuses on frontend architecture patterns used in high-concurrency booking systems such as:

- Temporary seat locking
- Conflict resolution handling
- Preventing double booking scenarios
- Client-side optimistic updates
- Reservation timeout simulation
- Server-state synchronization via polling
- Separation of UI state vs server state

These patterns are commonly used in:

- Movie ticket booking platforms
- Flight reservation systems
- Concert ticketing platforms
- Stadium seat allocation systems

---

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- React Query
- Context API + useReducer
- Sonner (toast notifications)
- Mock reservation API simulation

---

## 📂 Project Architecture

```

src/
├── app/
| ├── api/
| |  ├── book-seats
| |  ├── release-seat
| |  ├── reserve-seat
| |  ├── seats
│ ├── seat-map/
│ ├── checkout/
│ └── confirmation/
│
├── components/
│ ├── SeatGrid/
| |  ├── SeatGrid.tsx
| |  ├── SeatCell.tsx
| |  ├── SeatSelectionSummary.tsx
| |  ├── SeatLegend.tsx
│ └── common/
|    ├── ReservationTimer.tsx
│
├── mocks/
│ ├── concurrencyEnginge.ts
│ ├──  generateSeats.ts
│ ├──  mockSeatsAPI.ts
│ └── seatStore.ts
|
├── state/
│ ├── seatReducer.ts
│ └── useSeatState.ts
│
├── hooks/
│ └── useSelectedSeats.ts
│
├── services/
│ └── polling-engine.ts

```

Architecture highlights:

- Reducer-driven seat state management
- Polling-based concurrency simulation
- Optimistic reservation flow
- Conflict recovery logic

---

## Booking Flow

```

Seat Map
↓
Select seats
↓
Temporary reservation
↓
Checkout confirmation
↓
Booking success

```

Conflict scenario simulation:

```

User A selects seat A7
User B selects seat A7
↓
Polling detects conflict
↓
Seat removed from User B selection
↓
Toast warning displayed

```

---

##  Reservation Conflict Simulation

The system simulates real-world concurrency conditions by:

- polling seat availability periodically
- detecting conflicting reservations
- removing unavailable seats from local state
- notifying users instantly

This mirrors production seat-locking strategies used in large-scale booking platforms.

---

##  Local Development

Clone the repository:

```

git clone [https://github.com/madhuiitb/high-concurrency-seat-booking.git](https://github.com/madhuiitb/high-concurrency-seat-booking.git)

```

Install dependencies:

```

npm install

```

Run development server:

```

npm run dev

```

Visit:

```

[http://localhost:3000](http://localhost:3000)

```

---

##  Deployment

Deployed using Vercel:

```

[https://high-concurrency-seat-booking.vercel.app](https://high-concurrency-seat-booking.vercel.app)

```

---

##  Learning Goals of This Project

This project demonstrates:

- frontend system-design thinking
- concurrency-safe UI architecture
- reducer-based state modeling
- scalable component structure
- real-world booking workflow simulation

---

##  Future Improvements

Possible production-ready extensions:

- WebSocket-based real-time updates
- Redis-backed seat locking service
- Payment integration simulation
- Multi-user session simulator
- Reservation countdown timer UI
- Backend API integration

---
