import axios from "axios";

export default function useRevalidate() {
  const handleRevalidate = async (paths = []) => {
    if (paths.length === 0) {
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/revalidate`,
        {
          paths,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return { handleRevalidate };
}
