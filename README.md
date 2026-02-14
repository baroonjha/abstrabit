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
3.  Set up environment variables in `.env.local`
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase-anon-key
    ```
4.  Run the development server:
    ```bash
    npm run dev
    ```

## Challenges & Solutions

### 1. Real-time Subscription with RLS
**Problem**: Initially, listening to `postgres_changes` on the 'bookmarks' table didn't work as expected because RLS policies were blocking standard subscriptions.
**Solution**: I ensured that the Supabase client was authenticated properly on the client-side (`createBrowserClient`) and that the RLS policies explicitly allowed `select` for the `auth.uid()`. I also made sure to enable Realtime for the `bookmarks` table in the Supabase Replication settings (via SQL `alter publication`).

### 2. Hydration Mismatch
**Problem**: Rendering user-specific data on the server and then re-fetching on the client caused hydration errors.
**Solution**: I separated the sensitive logic into client components (`BookmarkList`, `AddBookmark`) that handle their own data fetching and state, while the server component (`page.tsx`) handles the initial session check.

### 3. Server-Side Cookie Handling
**Problem**: Synchronizing auth state between Server Components and Client Components.
**Solution**: Used `@supabase/ssr` with a robust middleware that refreshes the session on every request, ensuring `auth.getUser()` in Server Components is always up-to-date.