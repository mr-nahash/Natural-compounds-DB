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
  const queryParameters = {
    name: search.get("name"),
    kingdom: search.get("kingdom"),
    minMW: search.get("minMW"),
    maxMW: search.get("maxMW"),
    minLogP: search.get("minLogP"),
    maxLogP: search.get("maxLogP"),
    minHBD: search.get("minHBD"),
    maxHBD: search.get("maxHBD"),
    minHBA: search.get("minHBA"),
    maxHBA: search.get("maxHBA"),
    minTPSA: search.get("minTPSA"),
    maxTPSA: search.get("maxTPSA"),
    minRB: search.get("minRB"),
    maxRB: search.get("maxRB"),
  };

  const queryParams = Object.entries(queryParameters)
  .map(([param, value]) => `${param}=${encodeURI(value)}`)
  .join("&");

  const query = queryParams ? `?${queryParams}` : "";

  const searchQuery = Object.values(queryParameters)
  .filter((value) => value)
  .join(", ");
  const { data, isLoading } = useSWR(`/api/search${query}`, fetchMolecules, {
    revalidateOnFocus: false,
  });

  if (!query) {
    router.push("/");
  }

  if (isLoading) {
    return (
      <div>
        loading...
        <Spinner />
      </div>
    );
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
      <span>
        <MoleculeInfo molecules={data.molecules} />
      </span>
    </div>
  );
};

export default SearchPage;
