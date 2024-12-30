import getUserData from "./getUserData";
import getUserQuizAttemptsData from "./getUserQuizAttemptsData";
import getUserQuizData from "./getUserQuizData";

// This function fetches the necessary data before rendering the component
export async function getServerSideProps() {
    const user = await getUserData();
  
    if (!user) {
      return { redirect: { destination: '/login', permanent: false } };
    }
  
    const userQuizData = await getUserQuizData(user.id);
    const userQuizAttemptsData = await getUserQuizAttemptsData(user.id);
  
    return {
      props: {
        user,
        userQuizData,
        userQuizAttemptsData,
      },
    };
  }