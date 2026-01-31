import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-10">
      <h1>Home Page</h1>
      <Link href="/login" className="text-blue-500 underline">
        Go to Login Page
      </Link>
    </div>
  )
}