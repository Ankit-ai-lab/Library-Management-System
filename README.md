# Library-Management-System
Library Management System in this backend and frontend full stack website

## Backedn File Structure
library-management-system-backend/
│── config/                # Configurations like DB connection & env variables
│   └── db.js              # MongoDB connection setup
│
│── controllers/           # Business logic for API routes
│   ├── authController.js  # Register/Login, password hashing, JWT generation
│   ├── bookController.js  # CRUD for books, search, filter
│   ├── borrowController.js# Borrow/return books, due dates, notifications
│   ├── userController.js  # Profile update, activity tracking
│   └── adminController.js # Librarian/admin actions (add/remove books, reports)
│
│── middlewares/           # Middleware functions
│   ├── authMiddleware.js  # Protect routes using JWT/session
│   └── roleMiddleware.js  # Check user roles (user/librarian)
│
│── models/                # MongoDB schemas (Mongoose)
│   ├── User.js            # Users & librarians
│   ├── Book.js            # Book inventory
│   ├── Borrow.js          # Borrowing tracking
│   ├── Reservation.js     # Reservations system
│   ├── Review.js          # Reviews & ratings
│   └── Event.js           # Library events
│
│── routes/                # API endpoints
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── borrowRoutes.js
│   ├── userRoutes.js
│   └── adminRoutes.js
│
│── utils/                 # Helper utilities
│   ├── emailService.js    # Email notifications
│   └── fineCalculator.js  # Fine calculation helper
│
│── .env                   # DB_URI, JWT_SECRET, email config, etc.
│── server.js              # Main server entry point
│── package.json
