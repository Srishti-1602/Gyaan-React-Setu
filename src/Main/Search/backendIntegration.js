export default async function apiComm(query) {
    // Call the query_input function
    try {
        const response = await fetch('https://gyaansetuapi-web-mzudn63mqq-ue.a.run.app/api/function', { //https://gyaan-setu-webapp.azurewebsites.net/api/function, https://gyaansetuapi-web-mzudn63mqq-ue.a.run.app/api/function, http://127.0.0.1:8080/api/function
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                function: 'query_input',
                value: query,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            const jsonData = JSON.stringify(data)
            console.log(jsonData);
            return {data: jsonData};
        } else {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}
