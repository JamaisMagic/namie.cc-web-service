export function requestWithPreflight() {
    window.fetch('https://sv.ksmobile.net/video/feature?pageSize=10&page=1&tuid=1543562235123', {
        method: 'GET',
        headers: {
            'Authorization': new Date().toString(),
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.log(error));
}

export function requestwithoutPreflight() {
    window.fetch('https://sv.ksmobile.net/video/feature?pageSize=10&page=1&tuid=1543562235123', {
        method: 'GET',
        headers: {

        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

