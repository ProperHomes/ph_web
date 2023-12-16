import axios from "axios";

export default function useRevalidate() {
  const handleRevalidate = async (paths = []) => {
    if (paths.length === 0) {
      return;
    }
    try {
      await axios.post(
        `/api/revalidate`,
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
