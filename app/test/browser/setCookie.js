export function request() {
    window.fetch('https://www.namie.cc/api/cookie/', {
        method: 'POST',
        body: JSON.stringify({

        }),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}
