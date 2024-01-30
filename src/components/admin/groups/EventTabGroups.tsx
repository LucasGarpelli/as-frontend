'use client'
import { Group } from '@/types/Group'
import React, { useEffect, useState } from 'react'
import * as api from '@/api/admin'
import { GroupItem, GroupItemNotFound, GroupItemPlaceholder } from './GroupItem'
import GroupAdd from './GroupAdd'
import GroupEdit from './GroupEdit'
type Props = {
    eventId: number
}
const EventTabGroups = ({ eventId }: Props) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectGroup, setSelectGroup] = useState<Group | null>(null);

    const handleEditButton = (group: Group) => {
        setSelectGroup(group);
    }

    const loadGroups = async () => {
        setSelectGroup(null);
        setLoading(true);
        const groupList = await api.getGroups(eventId)
        setLoading(false);
        setGroups(groupList);
    }

    useEffect(() => {
        loadGroups();
    }, [])

    return (
        <div>
            <div className='border border-dashed p-3 my-3'>
                {!selectGroup && <GroupAdd eventId={eventId} refreshAction={loadGroups} />}
                {selectGroup && <GroupEdit group={selectGroup} refreshAction={loadGroups}/>}
            </div>
            {!loading && groups.length > 0 && groups.map(group => (
                <GroupItem
                key={group.id} 
                item={group}
                refreshAction={loadGroups}
                onEdit={handleEditButton}
                />
            ))}
            {loading &&
                <>
                    <GroupItemPlaceholder />
                    <GroupItemPlaceholder />
                </>
            }
            {!loading && groups.length === 0 && <GroupItemNotFound />}
        </div>
    )
}

export default EventTabGroups