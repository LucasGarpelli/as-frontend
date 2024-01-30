import { getCookie } from "cookies-next";
import { cookies } from 'next/headers'
import {req} from '@/api/axios' 
export const pingAdmin = async () => {
    try {
        const token = getCookie('token', { cookies })
        await req.get('admin/ping', {
            headers: {'Authorization': `token ${token}` }})
        return true;
    } catch (error) {
        return false;
    }
}