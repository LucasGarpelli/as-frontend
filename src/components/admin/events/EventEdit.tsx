'use client'
import { Event } from '@/types/Event';
import React, { useState } from 'react'
import EventTabInfo from './EventTabInfo';
import EventTabGroups from '../groups/EventTabGroups';
import EventTabPeople from '../people/EventTabPeople';

type Props = {
    event: Event | undefined
    refreshActions: () => void;
}
type TabNames = 'info' | 'groups' | 'people'
const EventEdit = ({ refreshActions, event }: Props) => {
    if (!event) return;
    const [tab, setTab] = useState<TabNames>('info');

    return (
        <div className='p-3'>
            <div className='flex text-center border-b border-gray-500 cursor-pointer '>
                <div onClick={() => setTab('info')} className={`flex-1 p-3 hover:bg-gray-700 ${tab === 'info' ? 'bg-gray-600' : ''}`}>Informações</div>
                <div onClick={() => setTab('groups')} className={`flex-1 p-3 hover:bg-gray-700 ${tab === 'groups' ? 'bg-gray-600' : ''}`}>Grupos</div>
                <div onClick={() => setTab('people')} className={`flex-1 p-3 hover:bg-gray-700 ${tab === 'people' ? 'bg-gray-600' : ''}`}>Pessoas</div>
            </div>
            <div>
                {tab === 'info' && <EventTabInfo event={event} refreshAction={refreshActions}/>}
                {tab === 'groups' && <EventTabGroups eventId={event.id} />}
                {tab === 'people' && <EventTabPeople eventId={event.id} />}
            </div>
        </div>
    )
}

export default EventEdit