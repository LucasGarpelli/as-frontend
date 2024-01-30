import React, { useEffect, useState } from 'react'
import * as api from '@/api/admin'
import { Group } from '@/types/Group'
import { GroupItemNotFound, GroupItemPlaceholder } from '../groups/GroupItem'
import { PersonComplete } from '@/types/PersonComplete'
import { PersonItem, PersonItemNotFound, PersonItemPlaceholder } from './PersonItem'
import PersonAdd from './PersonAdd'
import PersonEdit from './PersonEdit'
type Props = {
    eventId: number
}
const EventTabPeople = ({ eventId }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState(0);
    const [groupLoading, setGroupLoading] = useState(true);

    const loadGroups = async () => {
        setSelectedGroupId(0)
        setGroupLoading(true);
        const groupList = await api.getGroups(eventId);
        setGroupLoading(false);
        setGroups(groupList);
    }
    useEffect(() => {
        loadGroups();
    }, [])
    //People
    const [people, setPeople] = useState<PersonComplete[]>([]);
    const [peopleLoading, setPeopleLoading] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState<PersonComplete | null>( null);

    const loadPeople = async () => {
        if (selectedGroupId <= 0) return;
        setSelectedPerson(null)
        setPeople([]);
        setPeopleLoading(true);
        const people = await api.getPeople(eventId, selectedGroupId);
        setPeopleLoading(false);
        setPeople(people);
    }
    const handleEditButton =  (person: PersonComplete) => {
        setSelectedPerson(person);

    }

    useEffect(() => {
        loadPeople();
    }, [selectedGroupId])


    return (
        <div>
            <div className='my-3'>
                {!groupLoading && groups.length > 0 &&
                    <select
                        onChange={e => setSelectedGroupId(parseInt(e.target.value))}
                        className='w-full bg-transparent text-white text-xl p-3 outline-none  '
                    >
                        <option value={0} className='bg-gray-800'>Selecione um Grupo</option>
                        {groups.map(group => (
                            <option className='bg-gray-800' key={group.id} value={group.id} >{group.name}</option>
                        ))}
                    </select>
                }
                {groupLoading && <GroupItemPlaceholder />}
                {!groupLoading && groups.length === 0 && <GroupItemNotFound />}
            </div>
            {selectedGroupId > 0 &&
                <>
                    <div className='border border-dashed p-3 my-3'>
                        {!selectedPerson && <PersonAdd
                            eventId={eventId}
                            groupId={selectedGroupId}
                            refreshAction={loadPeople}
                        />}
                        {selectedPerson && 
                        <PersonEdit
                            person={selectedPerson}
                            refreshAction={loadPeople}
                        />}
                    </div>
                    {!peopleLoading && people.length > 0 &&
                        people.map(person => (
                            <PersonItem
                                key={person.id}
                                item={person}
                                onEdit={handleEditButton}
                                refreshAction={loadPeople}
                            />
                        ))
                    }
                    {peopleLoading && people.length > 0 &&
                        <>
                            <PersonItemPlaceholder />
                            <PersonItemPlaceholder />
                        </>
                    }
                    {peopleLoading && people.length === 0 && <PersonItemNotFound />}
                </>
            }
        </div>
    )
}

export default EventTabPeople