import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import LoadScreen from './Assets/LoadScreen';

export default function AuthLayout({children, authentication = true}) {
        const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {

        if(authentication && authStatus !== authentication){
            navigate("/")

        } else if(!authentication && authStatus !== authentication){
            navigate("/home")
        }
        setLoader(false)


    }, [authStatus, authentication])

    return loader ? <LoadScreen /> : <>{children}</>

}
