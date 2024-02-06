"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, lazy } from "react";
import Spinner from "./Spinner";
import useSWR from "swr";

const SidebarFilter = lazy(() => import("@components/AdvanceSearch/SidebarFilter"));
const MoleculeGallery = lazy(() => import("@components/MolGallery"));

const fetchMolecules = async (url) => {
  const response = await fetch(url);

  
  if (!response.ok) {
    throw new Error("Failed to fetch molecules");
  }

  return response.json();
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchPageContent />
    </Suspense>
  );
};

const SearchPageContent = () => {
  const router = useRouter();
  const search = useSearchParams();
  const queryParameters = {
    name: search.get("name"),
    kingdom: search.get("kingdom"),
    bioactivity: search.get("bioactivity"),
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

  const { data, error, isLoading } = useSWR(
    typeof window !== 'undefined' ? `/api/search${query}` : null,
    fetchMolecules,
    {
      revalidateOnFocus: false,
    }
  );

  const itemsPerPage = 20;

  useEffect(() => {
    if (!query) {
      router.push("/");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="self-center my-50">
        Loading...
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
        <div>
        <div className="right-0 ml-80 pl-80 top-8 mt-20">
          <span className="text-xl">
            Showing results for:{" "}
            <span className="font-semibold">{searchQuery}</span>
          </span>
        </div>
        <div className="grid justify-center grid-cols-2" style={{ gridTemplateColumns: '600px 1fr' }}>
          <div className="justify-center py-6 pl-8">
              <SidebarFilter />
        </div>
          <Suspense>
            <MoleculeGallery itemsPerPage={itemsPerPage} data={data?.molecules} />
          </Suspense>        
        </div>
      </div>
    
  );
};

export default SearchPage;
