const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: { 
            'Content-type': 'application/json'
        },
        body: data
    });
    
    return await res.json();
};
// Функция настраивает и делает запрос от сервера, получает данные и трансформирует в json
// Однако без async/await это все асинхронный код, код может идти дальше, не дождавшись ответа от сервера!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!



async function getResource(url) {
    const res = await fetch(url);

    // Но проблемы со стороны сервера не будут обрабатываться промисами, блок кода catch не будет отрабатываться и выдавать ошибку даже там, где это необходимо, поэтому делаем следующее:
    if (!res.ok) {
        throw new Error(`could not fetch ${url}, status: ${res.status}`);
    }
    
    return await res.json();
}

export {postData};
export {getResource};