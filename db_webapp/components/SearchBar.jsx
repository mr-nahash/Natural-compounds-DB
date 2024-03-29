import { Suspense, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchBar = () => {
  const clickPoint = useRef();
  const [searchQuery, setSearchQuery] = useState(useSearchParams()?.get('name') ?? '');
  const router = useRouter();

  const handleFocus = () => {
    clickPoint.current.style.display = 'none';
  };

  const handleBlur = () => {
    clickPoint.current.style.display = 'block';
  };

  const onSearch = (event) => {
    event.preventDefault();

    if (typeof searchQuery !== 'string') {
      return;
    }

    const encodedSearchQuery = encodeURIComponent(searchQuery);
    router.push(`/search?name=${encodedSearchQuery}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="items-center flex justify-center">
      <div className="relative mr-0 w-full">
        <div className="absolute top-3 left-3" ref={clickPoint}>
          <svg
            className="w-5 h-5 text-gray-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <form onSubmit={onSearch} className="flex justify-center w-50">
          <input
            type="text"
            className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:pl-3"
            placeholder="Search by Name"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchQuery || ''}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </form>
      </div>
    </div>
    </Suspense>
  );
};

export default SearchBar;
