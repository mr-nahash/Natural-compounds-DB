"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "./Spinner";
import useSWR from "swr";
import MoleculeInfo from "@components/MoleculePrisma";

const fetchMolecules = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch molecules");
  }

  return response.json();
};

const SearchPage = () => {
  const router = useRouter();
  const search = useSearchParams();
  const name = search.get("name");
  const kingdom = search.get("kingdom");
  const searchQuery = name || kingdom || "";

  const encodedName = encodeURI(name || "");
  const encodedKingdom = encodeURI(kingdom || "")
  const query = `name=${encodedName}&kingdom=${encodedKingdom}`;


  const { data, isLoading } = useSWR(`/api/search?${query}`,fetchMolecules,
    { revalidateOnFocus: false }
  );

  if (!query) {
    router.push("/");
  }

  if (isLoading) {
    return (<div>loading...<Spinner /></div>);
  }

  if (!data?.molecules) {
    return null;
  }

  return (
    <div className="mx-50">
      <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>
      <span><MoleculeInfo molecules={data.molecules} /></span>
      </div>
     );
};

export default SearchPage;