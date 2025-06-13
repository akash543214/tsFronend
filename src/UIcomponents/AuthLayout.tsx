import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import { RootState } from "../store/store"; 
import {useNavigate} from 'react-router-dom';
import LoadScreen from './Assets/LoadScreen';
import Layout from '@/pages/Layout';

import { ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
    authentication?: boolean;
}

export default function AuthLayout({ children, authentication = true }: AuthLayoutProps) {
    
        const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector((state:RootState) => state.auth.status);

    useEffect(() => {

        if(authentication && authStatus !== authentication){
            navigate("/")

        } else if(!authentication && authStatus !== authentication){
            navigate("/home")
        }
        setLoader(false)


    }, [authStatus, authentication])
     
    if(!authStatus)
    {
        return children
    }

    return loader ? <LoadScreen /> : <>
    <Layout>
    {children}
    </Layout>
    </>

}
