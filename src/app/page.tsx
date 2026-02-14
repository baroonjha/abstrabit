import { createClient } from '@/utils/supabase/server'
import AuthButton from '@/components/AuthButton'
import AddBookmark from '@/components/AddBookmark'
import BookmarkList from '@/components/BookmarkList'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 pb-24 sm:pb-10">
      <div className="w-full max-w-4xl space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900">Smart Bookmarks</h1>
            <p className="text-gray-500 text-sm">Organize your links securely</p>
          </div>
          <AuthButton user={user} />
        </div>

        {user ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <AddBookmark user={user} />
            </div>
            <div className="md:col-span-2 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Bookmarks</h2>
              <BookmarkList user={user} />
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Smart Bookmarks</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto px-4">
              A private, real-time bookmark manager. Sign in with Google to start saving your favorite links and access them from anywhere.
            </p>
            <div className="inline-block px-6 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm">
                Secure & Real-time
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
