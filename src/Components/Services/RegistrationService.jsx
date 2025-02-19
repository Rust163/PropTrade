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

    /*const handleInput = (event) => {
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
    }*/

    const handleSubmit = async (data) => {
        /*console.log("Отправка данных на сервер:", data);*/
        try{
            const response = await fetch('https://localhost:7098/api/User/register',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });
            console.log("Ответ сервера получен:", response);

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
            const result = await response.json();
            console.log("Ответ сервера:", result);
            setMessage(result.message);
            alert('Вы успешно зарегестрировались!');
        } catch(errorReg) {
            console.error(errorReg);
            setMessage('Что то пошло не так, произошла ошибка!');
        }
    }
    console.log("Передача onSubmit в Registration:", handleSubmit);
    console.log("Компонент RegistrationService отрендерился!");
    console.log("handleSubmit в RegistrationService:", handleSubmit);
    return(
        <>
            <h1>Форма регистрации</h1>
            <Registration onSubmit={handleSubmit || (() => console.log("Функция onSubmit не передана"))} />
            {message && <div>{message}</div>}
        </>
    )
};

export default RegistrationService;