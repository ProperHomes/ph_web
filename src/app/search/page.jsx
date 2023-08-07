import { Suspense } from "react";
import SearchMain from ".";
import Loading from "@/components/Loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <SearchMain />
    </Suspense>
  );
}
