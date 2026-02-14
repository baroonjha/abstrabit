'use client'

import { createClient } from '@/utils/supabase/client'
import { Trash2, ExternalLink, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

type Bookmark = {
  id: number
  created_at: string
  title: string
  url: string
  user_id: string
}

export default function BookmarkList({ user }: { user: any }) {
  const [supabase] = useState(() => createClient())
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookmarks = async () => {
      const { data, error } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching bookmarks:', error.message)
      } else {
        setBookmarks(data || [])
      }
      setLoading(false)
    }

    fetchBookmarks()

    const channel = supabase
      .channel('realtime-bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Realtime update received:', payload)
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((bookmark) => bookmark.id !== payload.old.id))
          } else if (payload.eventType === 'UPDATE') {
            setBookmarks((prev) =>
              prev.map((bookmark) =>
                bookmark.id === payload.new.id ? (payload.new as Bookmark) : bookmark
              )
            )
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user.id, supabase])

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from('bookmarks').delete().eq('id', id)
    if (error) {
      console.error('Error deleting bookmark:', error)
      toast.error('Error deleting bookmark')
    } else {
      toast.success('Bookmark deleted')
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-500">Loading bookmarks...</div>
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
        <Globe className="mx-auto h-12 w-12 text-gray-300 mb-3" />
        <h3 className="text-lg font-medium text-gray-900">No bookmarks yet</h3>
        <p className="text-gray-500 mt-1">Add your first bookmark to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="bg-blue-50 p-2 rounded-full hidden sm:block">
              <Globe size={20} className="text-blue-500" />
            </div>
            <div className="min-w-0">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-gray-900 hover:text-blue-600 truncate block flex items-center gap-2 group-hover:underline"
              >
                {bookmark.title}
                <ExternalLink size={14} className="opacity-0 group-hover:opacity-50 transition-opacity" />
              </a>
              <p className="text-sm text-gray-500 truncate">{bookmark.url}</p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(bookmark.id)}
            className="text-gray-400 hover:text-red-500 p-3 rounded-full hover:bg-red-50 transition-all -mr-2"
            title="Delete bookmark"
            aria-label="Delete bookmark"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  )
}
