import axios from "axios";

function useListmonk() {
  const handleSubscribe = async (data) => {
    const { email, name, list_ids, attribs } = data;
    const postData = {
      email,
      name,
      status: "enabled",
      listIds: list_ids ?? [2],
    };
    if (attribs) {
      postData.attribs = attribs;
    }
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/listmonk/user/waitlist`,
        postData,
        { withCredentials: true }
      );
    } catch (err) {
      console.log("Error sending email:", err);
    }
  };
  return { handleSubscribe };
}

export default useListmonk;
