"use client";
import ManageProperty from "./index";

export default async function Page({ params }) {
  return <ManageProperty slug={params.slug} />;
}
