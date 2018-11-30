export function requestWithoutPreflight() {
    window.fetch('https://www.namie.cc/api/shorten/', {
        method: 'POST',
        body: new URLSearchParams({
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
        }).toString(),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export function requestWithPreflight() {
    // Please unable the disabled cache options in developer tools.
    window.fetch('https://www.namie.cc/api/shorten/', {
        method: 'POST',
        body: JSON.stringify({
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': new Date().toString(),
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}

export function requestWithCrediential() {
    window.fetch('https://www.namie.cc/api/shorten/', {
        method: 'POST',
        body: JSON.stringify({
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
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
