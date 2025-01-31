import React, {useState} from 'react';
import Registration from '../Pages/Registration';

const RegistrationService = () => {
    
    
    /*const [user ,setUser] = useState({
        FirtsName:'',
        LastName:'',
        MiddleName:'',
        Email:'',
        Phone:'',
        Coutry:'',
        PassportSeries:'',
        PassportNumber:'',
        PassportIssued:'',
        DocumentPicturePath: null,
        HashPassword:'',
        ProfilePicturePath: null
    });*/

    const[message, setMessage] = useState(null);

    const handleInput = (event) => {
        const {name, value, files} = event.target;
        if(name === 'ProfilePicturePath'){
            setUser(prevValues => ({
                ...prevValues,
                [name]: files ? files[0] : null,
            }));
        } else {
            setUser(prevValues => ({
                ...prevValues,
                [name]: value,
            }));
        }
    }

    const handleSubmit = async(data) => {
        try{
            const response = await fetch('https://172.20.10.14/api/register',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({data})
            });
            const result = await response.json();
            setMessage(result.message);
            alert('Вы успешно зарегестрировались!');
        } catch(errorReg) {
            console.error(errorReg);
            setMessage('Что то пошло не так, произошла ошибка!');
        }
    }
    return(
        <>
            <h1>Форма регистрации</h1>
            <Registration onSubmit={handleSubmit}/>
            {message && <div>{message}</div>}
        </>
    )
};

export default RegistrationService;