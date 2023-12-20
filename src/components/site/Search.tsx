'use client'
import { SearchResult } from '@/types/SearchResult';
import React, { useState } from 'react'
import SearchForm from './SearchForm';
import SearchReveal from './SearchReveal';
import { searchCPF } from '@/api/site';

type Props = {
    id: number;
}
const Search = ({ id }: Props) => {
    const [results, setResults] = useState<SearchResult>();
    const [loading, setloading] = useState(false);

    const handleSearchButton = async (cpf: string) => {
        if (!cpf  ) return
        setloading(true);
        const result = await searchCPF(id,cpf);
        setloading(false);
        if (!result) return alert("Desculpe,não encotramos o seu CPF");

        setResults(result);

    }
    return (
        <section className='bg-gray-900 p-5 rounded'>
            {!results && <SearchForm 
             onSearchButton={handleSearchButton}
             loading={loading}
             />}
            {results && <SearchReveal results={results}/>}
        </section>
    )
}

export default Search