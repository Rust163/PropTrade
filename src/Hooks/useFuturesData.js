import { useState, useEffect } from "react";
import mmvbApi from "../Components/Services/mmvbApi";

export const useFuturesData = () => {
    const[futures, setFutures] = useState([]);
    const[loadingFutures, setLoading] = useState(true);
    const[errorFutures, setError] = useState(null);

    const fetchFuturesData = async() =>{
        try {
            const responseFuturesApi = await mmvbApi.getFutures();
            console.log("Полный ответ API фьючи:", responseFuturesApi);
            if(!responseFuturesApi?.securities?.data){
                throw new Error("Данные не получены или имеют неверный формат");
            }

            const securities = responseFuturesApi.securities.data.map((row, index) => {
                const item = {};
                responseFuturesApi.securities.columns.forEach((col, i) => {
                    item[col] = row[i];
                });

                if(responseFuturesApi.marketdata?.data?.[index]){
                    responseFuturesApi.marketdata.columns.forEach((col, i) => {
                        item[col] = responseFuturesApi.marketdata.data[index][i];
                    });
                }
                /*console.log("Ответ айтома", item);*/
                return item;
            })

            setFutures(securities.slice(0, 100));
        } catch (err) {
            console.error("Ошибка получения данных:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
        useEffect(() => {
            fetchFuturesData();
        }, []);
        return{futures, loadingFutures, errorFutures, refetchFutures: fetchFuturesData};
    
}