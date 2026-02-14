'use client'

import { createClient } from '@/utils/supabase/client'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AddBookmark({ user }: { user: any }) {
  const supabase = createClient()
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url || !title) return

    setLoading(true)
    const { error } = await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id,
    })

    if (error) {
      console.error('Error adding bookmark:', error.message)
      toast.error('Error adding bookmark: ' + error.message)
    } else {
      setUrl('')
      setTitle('')
      toast.success('Bookmark added successfully!')
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Add New Bookmark</h2>
      <div className="flex flex-col gap-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            type="text"
            placeholder="e.g., My Favorite Blog"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-gray-800 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="text-gray-800 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : <><Plus size={18} /> Add Bookmark</>}
        </button>
      </div>
    </form>
  )
}
