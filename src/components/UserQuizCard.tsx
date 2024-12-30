import Link from "next/link";
import { UserQuiz } from "../../types";

export default function UserQuizCard({ quizzes, handleDelete }: { quizzes: UserQuiz[], handleDelete: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4 p-4">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4"
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold">{quiz.title}</h3>
            <p className="mt-2 text-sm text-gray-500 leading-relaxed">
              {quiz.description}
            </p>
            <div className="mt-4">
              <Link href={`/en/quiz-edit/${quiz.id}`}>
                <button className="mr-12 mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-blue-600 hover:bg-blue-700">
                  Edit
                </button>
              </Link>
                <button onClick={() => {handleDelete(quiz.id)}} className="mt-4 px-5 py-2.5 rounded-lg text-white text-sm tracking-wider border-none outline-none bg-red-600 hover:bg-red-700">
                  Delete
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
