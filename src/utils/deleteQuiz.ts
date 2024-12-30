export async function deleteQuiz(quizId: string) {
  const response = await fetch(`/api/quizzes/${quizId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to delete quiz");
  }

  return response.json();
}