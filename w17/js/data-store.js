const LOCAL_STORAGE_KEY = 'budgetEntries';

export const saveEntries = (entries) => {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(entries));
        console.log('Data saved to localStorage successfully!');    
    } catch (error) {
        console.error(`Error saving data to localStorage: ${error}`);
    }
};

export const generateUniqueId = () => {
    return Date.now().toString();
};

export const loadEntries = () => {
    try {
        const dataString = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (dataString) {
            return JSON.parse(dataString);
        }
        return [];
    } catch (e) {
        console.error(`Error loading entries from localStorage: ${e}`);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
        return [];
    }
};

export const clearAllEntries = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    console.log('All entries cleared from localStorage');
};