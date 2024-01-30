import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod';
import React, { useState } from 'react'
import InputField from '../InputField';
import escapeCPF from '@/utils/escapeCPF';
import Button from '../Button';
import { z } from 'zod';
import * as api from '@/api/admin'

type Props = {
    eventId: number;
    groupId: number;
    refreshAction: () => void;
}
const PersonAdd = ({ eventId, groupId, refreshAction }: Props) => {
    const [nameField, setNameField] = useState('');
    const [cpfField, setCpfField] = useState('');
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);


    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        cpfField: z.string().length(11, ' CPF invalido')
    })

    const handleSaveButton = async () => {
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErrors(getErrorFromZod(data.error))
        setLoading(true);
        const newPerson = await api.addPerson(eventId, groupId, {
            name: nameField,
            cpf: cpfField
        })
        setLoading(false);
        if(newPerson) {
            setNameField('');
            setCpfField('');
            refreshAction();
        } else {
            alert('Ocoreu um error')
        }

    }
    return (
        <div>
            <h4 className='text-xl'>Nova Pessoa</h4>
            <InputField
                value={nameField}
                onChange={e => setNameField(e.target.value)}
                placeholder='Digite o nome da Pessoa'
                disabled={loading}
                errorMessage={errors.find(item => item.field === 'nameField')?.message}
            />
            <InputField
                value={cpfField}
                onChange={e => setCpfField(escapeCPF(e.target.value))}
                placeholder='Digite o cpf da Pessoa'
                disabled={loading}
                errorMessage={errors.find(item => item.field === 'cpfField')?.message}
            />
            <div>
                <Button
                    value={loading ? 'adcionando' : 'adicionar'}
                    onCkick={handleSaveButton}
                    disabled={loading}
                />
            </div>

        </div>
    )
}

export default PersonAdd