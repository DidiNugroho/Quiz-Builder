import Link from "next/link";

export default function Quiz() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Quiz Builder</h1>
      <div className="space-y-4">
        <Link
          href="/quiz-creation"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200 text-lg"
        >
          Create a New Quiz
        </Link>
        <Link
          href="/quiz-list"
          className="bg-green-500 ml-4 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition-all duration-200 text-lg"
        >
          Quiz List
        </Link>
      </div>
    </div>
  );
}
