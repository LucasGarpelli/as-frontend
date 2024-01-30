import Link from 'next/link';
import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    IconElement: IconType;
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    replace?: boolean;
}
const ItemButton = ({ IconElement, label, onClick, href, target, replace }: Props) => {
    const context = (
        <div className='p-3 flex flex-col justify-center items-center gap-2  md:flex-row'>
            <div><IconElement /></div>
            {label && <div>{label}</div>}
        </div>
    )
    return (
        <div className='rounded hover:bg-gray-800'>
            {href && !onClick &&
                <Link
                    href={href}
                    target={target}
                    replace={replace}
                >{context}</Link>
            }
            {!href && onClick &&
                <div onClick={onClick} className='cursor-pointer'>{context}</div>
            }
        </div>
    )
}

export default ItemButton