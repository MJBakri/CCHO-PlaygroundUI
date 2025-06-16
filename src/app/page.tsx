import Image from "next/image"
import Link from "next/link"
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            CCHO Playground UI
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Upload medical surveys and process the document to start a survey
            session with AI.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/survey-library"
              className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Upload Survey
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
