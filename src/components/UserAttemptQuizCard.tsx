import { UserQuiz } from "../../types";

export default function UserAttemptQuizCard({ quizzes }: { quizzes: UserQuiz[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
            Score: {quiz.score}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
