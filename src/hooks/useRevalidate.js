import axios from "axios";

export default function useRevalidate() {
  const handleRevalidate = async (path) => {
    if (!path) {
      return;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/revalidate`,
        {
          path,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return { handleRevalidate };
}
