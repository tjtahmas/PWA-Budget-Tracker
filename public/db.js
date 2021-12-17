console.log('IN DB!!!')

let database;

const request = indexedDB.open('TransactionHistory', 1);

request.onupgradeneeded = event => {
    let db = event.target.result;

    db.createObjectStore('pending', { autoIncrement: true });
}

request.onsuccess = (event) => {
    database = event.target.result;

    if (navigator.onLine) {
        addToDatabase();
    }
}

request.onerror = (event) => {
    console.log('this is error', event.target.errorCode);
}

function addToDatabase() {
    console.log('IN ADDTODATABASE!!!')
    const transaction = database.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending')
    const getAllTransaction = store.getAll();
    getAllTransaction.onsuccess = () => {
        console.log(getAllTransaction.result)
        if (getAllTransaction.result.length > 0) {
            fetch("/api/transaction/bulk", {
                method: 'POST',
                body: JSON.stringify(getAllTransaction.result),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                }
            }).then(response => {
                return response.json();
            }).then(() => {
                const transaction = database.transaction(['pending'], 'readwrite');
                const store = transaction.objectStore('pending')
                store.clear();
            })
        }
    }
}

saveRecord = (input) => {
    const transaction = database.transaction(['pending'], 'readwrite');
    const store = transaction.objectStore('pending')
    store.add(input);
}

window.addEventListener('online', addToDatabase);

