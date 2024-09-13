import { useTokenStore } from "@/stores/tokenManager";
import type { emissionDetails } from "@/types/backend";

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

export async function addReceipt(emissionId: string){
    const tokenStore = useTokenStore();
    const { token } = tokenStore;
    const path = "/receiptscan";
    const data = {itemId: emissionId};
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(`${BASE_URL}${path}`, {method: "POST", body: JSON.stringify(data), headers});
    if (!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    return response.json() as unknown as emissionDetails;
}

export async function ProcessData(statement: string){
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

export async function GetAdvices(){
    const tokenStore = useTokenStore();
    const { token } = tokenStore;
    const path = "/advices";
    const headers = { 
        Authorization: `Bearer ${token}`,
    };
    const response = await fetch(`${BASE_URL}${path}`, {
        headers,
        method: 'POST',
    });
    if (!response.ok){
        throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
}