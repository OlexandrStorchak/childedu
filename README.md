React Next TypeScript App for child educational process

## Environment setup

Create a `.env.local` file with the following variables to enable Google login
and Firebase activity tracking:

```
GOOGLE_CLIENT_ID=your-google-client-id
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
ADMIN_ROUTE=your-admin-route
ADMIN_PASSWORD=your-admin-password
ADMIN_EMAIL=your-admin-email
```

`GOOGLE_CLIENT_ID` is consumed by `GoogleOAuthProvider` in
`src/pages/_app.tsx`. The Firebase variables configure the Firestore database
used to log user activity and progress. `ADMIN_ROUTE` rewrites to the admin
page, `ADMIN_PASSWORD` protects access to the login logs, and `ADMIN_EMAIL`
controls whether the logged-in user sees a link to the admin page.
