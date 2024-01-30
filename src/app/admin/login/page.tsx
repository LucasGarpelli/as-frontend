'use client'
import Button from '@/components/admin/Button'
import InputField from '@/components/admin/InputField'
import * as api from '@/api/admin'
import React, { useState } from 'react'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter();
  const [passwordInput, setPasswordInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState('')
  const handleLoginButton = async () => {
    if (passwordInput) {
      setLoading(true)
      setWarning('')
      const token = await api.login(passwordInput)
      setLoading(false)

      if (!token) {
        setWarning('Acesso negado')
      } else {
        setCookie('token', token)
        router.push('/admin')
      }
    }

  }
  return (
    <div className='text-center py-4'>
      <p className='text-lg'>Qual é a senha?</p>
      <div className='mx-auto max-w-lg'>
        <InputField
          type='password'
          value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
          placeholder='Digite a Senha'
          disabled={loading}
        />
        <Button
          value={loading ? 'Carregando..' : 'Entrar'}
          onCkick={handleLoginButton}
          disabled={loading}
        />
        {warning &&
          <div className='border border-dashed border-gray-400 p-3 '>{warning}</div>
        }
      </div>
    </div>

  )
}

export default page