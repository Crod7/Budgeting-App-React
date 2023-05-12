import { generateDateId } from "./GenerateDateId"


export const FetchMonthlyNetBalance = async () => {
    const currentDateId = generateDateId()
    
    const response = await fetch(`/api/monthlyNetBalance/`, {})
    const json = await response.json()
    if (response.ok){
        for (let i = 0; i < json.length; i++){
            if (currentDateId === json[i].dateId){
                console.log(json[i])
                return json[i]
            }
        }
    }
}