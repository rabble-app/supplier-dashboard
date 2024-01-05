/** @format */
'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import SearchIcon from './svgs/SearchIcon';

interface ISearchInput {
  placeholder: string;
}

const SearchInput = ({ placeholder }: ISearchInput) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(`${searchParams}`);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className='relative'>
      <SearchIcon className='absolute top-3 left-5' stroke='#667085' />
      <input
        className='border-grey-4 border-[1px] h-12 rounded-lg pl-[50px] placeholder:text-grey-5 placeholder:font-medium focus:outline-primary-light-1 w-full'
        type='text'
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
};

export default SearchInput;
