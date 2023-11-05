import axios from "axios";

export default function useRevalidate() {
  const handleRevalidate = async (tag, paths) => {
    try {
      // Todo: use server actions when it is stable and then make use of secrets using dynamic import and sst config.
      await axios({
        method: "post",
        url: `/api/revalidate`,
        data: { tag, paths },
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { handleRevalidate };
}
