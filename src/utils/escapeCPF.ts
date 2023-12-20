import React from 'react'

const escapeCPF = (cpf: string) => {
    return cpf.replace(/\.|-/gm, '')
}

export default escapeCPF