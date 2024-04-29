"use client"

import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input';

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(query){
        const newUrl = formUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: query,
        })

        router.push(newUrl, { scroll: false});

      } else {
        const newUrl = removeKeysFromQuery({
          searchParams: searchParams.toString(),
          keysToRemove: ["query"],
        })
        router.push(newUrl, { scroll: false});
      }
    }, 300);
  
    return () => clearTimeout(delayDebounceFn);
  }, [router, searchParams, query])
  

  return (
    <div className='search'>
      <Image
        src="assets/icons/search.svg"
        alt="search"
        height={24}
        width={24}
      />
      <Input
       className='search-field'
       placeholder='Search'
       onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

export default Search