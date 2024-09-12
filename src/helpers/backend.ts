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