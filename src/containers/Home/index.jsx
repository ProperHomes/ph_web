import Stack from "@mui/material/Stack";
import PropertyList from "../Properties/List";
import AuthModal from "../Auth";
import HomeLayout from "@/components/Layouts/HomeLayout";

export default function Home() {
  return (
    <HomeLayout>
      <PropertyList />
    </HomeLayout>
  );
}
