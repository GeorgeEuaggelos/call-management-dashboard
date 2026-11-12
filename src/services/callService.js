export const BASE_URL = 'https://call-center-mu.vercel.app'
export const USER_ID = 'george';

export async function getCalls() {
    const response = await fetch(BASE_URL + '/calls', {
        method: "GET",
        headers: {
            "X-User-Id": USER_ID
        }
    });

    if (!response.ok) {
        const error = new Error('Request failed');
        error.status = response.status;
        throw error;
    }

    const data = await response.json();
    return data.calls;
}

export async function getCallById(id) {
    const response = await fetch(BASE_URL + "/calls/" + id, {
        method: "GET",
        headers: {
            "X-User-Id": USER_ID,
        },
    });

    if (!response.ok) {
        const dataErr = await response.json();
        const error = new Error(dataErr.error);
        error.status = response.status;
        throw error;
    } 

    const data = await response.json();
    return data;
}

export async function archiveCall(id) {
    const response = await fetch(BASE_URL + "/calls/" + id + '/archive', {
        method: "PATCH",
        headers: {
            "X-User-Id": USER_ID,
        },
    });

    if (!response.ok) {
        const dataErr = await response.json();
        const error = new Error(dataErr.error);
        error.status = response.status;
        throw error;
    } 

    const data = await response.json();
    return data;
}