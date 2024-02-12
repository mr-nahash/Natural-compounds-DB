"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Suspense, lazy } from "react";
import Spinner from "./Spinner";
import useSWR from "swr";
import React from "react";
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

  const getSearchDescription = (queryParameters) => {
    const searchDescriptions = [];
  
    // Add individual parameters
    if (queryParameters.name) {
      searchDescriptions.push(`name: ${queryParameters.name}`);
    }
    if (queryParameters.kingdom) {
      searchDescriptions.push(`kingdom: ${queryParameters.kingdom}`);
    }
    if (queryParameters.bioactivity) {
      searchDescriptions.push(`bioactivity: ${queryParameters.bioactivity}`);
    }
    // Add other non-range parameters in a similar manner
  
    // Add 'min' and 'max' parameters
    const rangeParameters = {
      MW: 'molecular weight',
      LogP: 'LogP',
      HBD: 'hydrogen bond donors',
      HBA: 'hydrogen bond acceptors',
      TPSA: 'topological polar surface area',
      RB: 'rotatable bonds',
    };
  
    Object.entries(rangeParameters).forEach(([param, description]) => {
      const minParam = `min${param}`;
      const maxParam = `max${param}`;
      
      if (queryParameters[minParam] && queryParameters[maxParam]) {
        searchDescriptions.push(<div key={param}>{`${description}: ${queryParameters[minParam]} to ${queryParameters[maxParam]}`}</div>);
      } else if (queryParameters[minParam]) {
        searchDescriptions.push(<div key={param}>{`${description} (min): ${queryParameters[minParam]}`}</div>);
      } else if (queryParameters[maxParam]) {
        searchDescriptions.push(<div key={param}>{`${description} (max): ${queryParameters[maxParam]}`}</div>);
      }
    });
    
    return (
      <div className="flex-left">
        {searchDescriptions.map((el, index) => (
          <React.Fragment key={index}>
            {el}
            {index < searchDescriptions.length - 7 && <br style={{ lineHeight: 0.1 }} />}
          </React.Fragment>
        ))}
      </div>
    );  };
  
  const searchQueryMessage = getSearchDescription(queryParameters);

  return (
        <div>
        <div className="right-0 ml-80 pl-80 top-8 mt-20">
        <span className="text-xl">
         Results for {" "} <br></br> {searchQueryMessage}
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
