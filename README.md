# Smart Bookmark App

This is a simple bookmark manager built with Next.js, Supabase, and Tailwind CSS. The app features:

- **Google Authentication**: Secure login without passwords.
- **Private Bookmarks**: Each user has their own isolated list.
- **Real-time Updates**: Changes reflect instantly across tabs/devices.
- **Delete Functionality**: Remove unwanted bookmarks easily.

## Deployment

### Prerequisites
- Node.js 18+
- Supabase Account
- Google Cloud Console Project (for OAuth)

### Setup
1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables in `.env.local` (see `SUPABASE_SETUP.md`).
4.  Run the development server:
    ```bash
    npm run dev
    ```

