The project is a responsive call management application with an administrator, technician, and customer dashboard.

This is a practical challenge of fullstack training.

Front-end:

Tailwindcss for style (with an index.css for styles and variables): -[x] LogIn.tsx (login with your account created) -[x] SignIn.tsx (create your account)
-[]

-authService.ts:

Responsibility: managing user registration and login.

Security: never stores passwords in plain text, generates a JWT token for authentication.

Flexibility: allows different roles (ADMIN, TEC, CLIENT).

Database integration: Prisma Client handles all database manipulation.
