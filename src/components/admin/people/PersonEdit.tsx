import { PersonComplete } from '@/types/PersonComplete'
import React, { useEffect, useState } from 'react'
import * as api from '@/api/admin'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import InputField from '../InputField'
import escapeCPF from '@/utils/escapeCPF'
import Button from '../Button'
import { z } from 'zod'
type Props = {
    person: PersonComplete
    refreshAction: () => void
}
const PersonEdit = ({ person, refreshAction }: Props) => {
    const [nameField, setNameField] = useState(person.name);
    const [cpfField, setCpfField] = useState(person.cpf);
    const [errors, setErrors] = useState<ErrorItem[]>([]);
    const [loading, setLoading] = useState(false);

    const personSchema = z.object({
        nameField: z.string().min(1, 'Preencha o nome'),
        cpfField: z.string().length(11, ' CPF invalido')
    })

    useEffect(() => {
        setErrors([]);
        const data = personSchema.safeParse({ nameField, cpfField });
        if (!data.success) return setErrors(getErrorFromZod(data.error))
    }, [nameField, cpfField])

    const handleSaveButton = async () => {
        if (errors.length > 0) return;

        setLoading(true);
        const updatedPerson = await api.updatePerson(
            person.id_event, person.id_group, person.id, { name: nameField, cpf: cpfField }
        )
        setLoading(false);
        if (updatedPerson) {
            refreshAction()
        } else {
            alert('ocorreu um erro')
        }
    }
    return (
        <div>
            <h4 className='text-xl'>Editar Pessoa</h4>
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
            <div className='flex gap-3'>
                <Button
                    value='Cancelar'
                    onCkick={refreshAction}
                    disabled={loading}
                />
                <Button
                    value={loading ? 'Salvando' : 'Salvar'}
                    onCkick={handleSaveButton}
                    disabled={loading}
                />
            </div>

        </div>
    )
}

export default PersonEdit