import { getEvent } from '@/api/site';
import Search from '@/components/site/Search';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = { params: { id: string; } }

const page = async ({ params }: Props) => {
    const eventItem = await getEvent(parseInt(params.id))
    if (!eventItem || !eventItem.status ) return redirect('/')

    return (
        <main className='text-center mx-auto max-w-lg p-5'>
            <header>
                <h2 className='text-2xl text-yellow-400'>Amigo Secreto</h2>
                <h1 className='text-3xl mt-5 mb-2'>{eventItem.title}</h1>
                <p className='text-sm mb-5'>{eventItem.description}</p>
            </header>
            <Search id={eventItem.id}/>
            <footer className='text-sm mt-5 '>Criado por Lucas Delazari Garpelli</footer>
        </main>
    )
}

export default page