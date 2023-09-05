import axios from "axios";

export default function useRevalidate() {
  const handleRevalidate = async (paths = []) => {
    if (paths.length === 0) {
      return;
    }
    try {
      await Promise.all(
        paths.map(async (p) => {
          await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/revalidate`,
            {
              path: p,
            },
            { withCredentials: true }
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  return { handleRevalidate };
}
