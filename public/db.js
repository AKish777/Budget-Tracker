let db;
let budgetVersion;

const request = indexDB.open("BudgetDB", budgetVersion || 21);

request.onupgradeneeded = function (event) {
    console.log("Upgrade needed in IndexDB!");

    const { oldVersion } = event;
    const newVersion = event.newVersion || db.version;

    console.log(`DataBase update from ${oldVersion} to ${newVersion}`);

    db = event.target.result;

    if (db.objectStoreNames.length === 0) {
        db.createObjectStore("BudgetStore", { autoIncrement: true });
    }
};

request.onerror = function (event) {
    console.log(`Error! ${event.target.errorCode}`);
};