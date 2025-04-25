import { useState, useEffect } from "react";
import mmvbApi from "../Components/Services/mmvbApi";

export const useCurrencyData = () => {
    const [currency, setCurrency] = useState([]);
    const [loadingCurrency, setLoadingCurrency] = useState(true);
    const [errorCurrency, setError] = useState(null)

    const fetchCurrencyData = async() => {
        try {
            const responseCurrencyApi = await mmvbApi.getCurrency();
            console.log("Полный ответ валютного API: ", responseCurrencyApi);
            if(!responseCurrencyApi?.securities?.data){
                throw new Error("Данные не полученны или имеют не верный формат");
            }
            const securities = responseCurrencyApi.securities.data.map((row, index) =>{
                const item = {};
                responseCurrencyApi.securities.columns.forEach((col, i) => {
                    item[col] = row[i];
                });

                if(responseCurrencyApi.marketdata?.data?.[index]){
                    responseCurrencyApi.marketdata.columns.forEach((col, i) =>{
                        item[col] = responseCurrencyApi.marketdata.data[index][i];
                    });
                }
                return item;
            });
            setCurrency(securities.slice(0, 20));
        } catch (err) {
            console.error("Ошибка получения данных:", err);
            setError(err.message);
        } finally{
            setLoadingCurrency(false);
        }
    };
    useEffect(() => {
        fetchCurrencyData();
    }, []);
    return{currency, loadingCurrency, errorCurrency, refetchCurrency: fetchCurrencyData};
}