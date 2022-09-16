import { useEffect, useState } from "react";


export function useRemoteCountiesList() {
    const [counties, setCounties] = useState([
        '基隆市', 
        '臺北市', 
        '新北市', 
        '桃園市', 
        '新竹縣', 
        '新竹市', 
        '苗栗縣', 
        '臺中市', 
        '彰化縣', 
        '南投縣', 
        '雲林縣', 
        '嘉義市', 
        '嘉義縣', 
        '臺南市', 
        '高雄市', 
        '屏東縣', 
        '宜蘭縣', 
        '花蓮縣', 
        '臺東縣', 
        '金門縣', 
        '澎湖縣', 
        '連江縣'
    ]);

    // useEffect(() => {
    //     async function fetchCounties() {
    //         try {
    //             const res = await fetch('https://api.nlsc.gov.tw/other/ListCounty');
    //             const data = await res.text();

    //             const xmlDoc = (new DOMParser()).parseFromString(data, "text/xml");
    //             const list = [...xmlDoc.querySelectorAll('countyname')].map(dom => dom.textContent);

    //             setCounties(list);
    //         }
    //         catch (err) {

    //         }
    //     }

    //     fetchCounties();
    // }, [])

    return counties;
}