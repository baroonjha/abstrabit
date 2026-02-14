'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const error_description = searchParams.get('error_description')
  const error_code = searchParams.get('error_code')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h1>
        <p className="text-gray-700 mb-2">Something went wrong during the sign-in process.</p>
        
        {error && (
          <div className="bg-red-50 p-4 rounded-md text-left mb-6 text-sm">
            <p><strong>Error:</strong> {error}</p>
            {error_description && <p className="mt-1"><strong>Description:</strong> {error_description}</p>}
            {error_code && <p className="mt-1"><strong>Code:</strong> {error_code}</p>}
          </div>
        )}

        <Link 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
