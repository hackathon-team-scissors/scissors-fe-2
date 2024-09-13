import { useTokenStore } from "@/stores/tokenManager";

const BASE_URL = "https://hackathon-scissors.hasura.app/api/rest";

export async function getLoginToken(){
    const path = "/login";
    const data = { token: "mocked" };
    const response = await fetch(`${BASE_URL}${path}`, { body: JSON.stringify(data), method: 'POST'});
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}

export async function getArrayOfEmissions(){
    const tokenStore = useTokenStore();
    const { token } = tokenStore;
    const path = "/co2";
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(`${BASE_URL}${path}`, {headers});
    if (!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}


export async function ProcessData(statement){
    const tokenStore = useTokenStore();
    const { token } = tokenStore;
    const path = "/processdata";
    const headers = { 
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
    };
    const response = await fetch(`${BASE_URL}${path}`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            statement
        })
    });
    if (!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}