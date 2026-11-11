# Authentication System

A full-stack authentication application built using **Next.js, TypeScript, MongoDB, and Tailwind CSS**. It provides user registration, login, email verification, and secure password recovery through email.

## Features

- **User Registration** – Create an account with username, email, and password.
- **User Login** – Authenticate existing users.
- **Email Verification** – Verify registered email addresses through a verification link.
- **Forgot Password** – Request a password reset link through email.
- **Reset Password** – Reset passwords using a time-limited token.
- **Password Hashing** – Securely hash passwords using bcrypt.
- **Email Notifications** – Send verification and password reset emails using Nodemailer.
- **Toast Notifications** – Display success and error messages.
- **Responsive UI** – Clean interface built with Tailwind CSS.

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack React framework |
| TypeScript | Type safety |
| React.js | Frontend UI |
| Tailwind CSS | Styling |
| MongoDB | Database |
| Mongoose | Database modeling |
| bcryptjs | Password hashing |
| Nodemailer | Email delivery |
| Axios | HTTP requests |
| React Hot Toast | Notifications |

## Authentication Flow

1. User registers with their details.
2. A verification email is sent to the registered email address.
3. User verifies their email through the verification link.
4. User logs in using their credentials.
5. If the user forgets their password, they can request a reset link.
6. A secure, time-limited token is used to reset the password.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Navigate to the project directory

```bash
cd authproject2/my-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add:

```env
MONGO_URI=your_mongodb_connection_string

TOKEN_SECRET=your_token_secret

DOMAIN=http://localhost:3000

NODEMAILER_USER=your_mailtrap_username
NODEMAILER_PASS=your_mailtrap_password
```

Replace the placeholder values with your actual credentials.

**Important:** Never commit your `.env.local` file or expose your database and email credentials publicly.

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
my-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       ├── signup/
│   │   │       ├── login/
│   │   │       ├── verifyemail/
│   │   │       ├── forgotpassword/
│   │   │       └── resetpassword/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── profile/
│   │   ├──
