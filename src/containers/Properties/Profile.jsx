import HomeLayout from "@/components/Layouts/HomeLayout";

function PropertyProfile({ data }) {
  const { title, description } = data;
  return (
    <HomeLayout>
      <h2>{title}</h2>
      <p>{description}</p>
    </HomeLayout>
  );
}

export default PropertyProfile;
