console.log('Hello from app.js! Your JavaScript is connected and running!');

import { getFormInputs, populateFormForEdit, clearForm } from './form-handler.js';
import { processFormInputs } from './decision.js';
import { displayResults, hideResults } from './ui.js';
import { saveEntries, generateUniqueId, loadEntries, clearAllEntries } from './data-store.js';
import { setTableCallbacks, renderTable, initTableEvents } from './table-renderer.js';
import { loadAndDisplayWeather } from './weather-integrator.js';

const budgetEntries = [];

const budgetForm = document.getElementById('budgetForm');
const clearFormButton = document.getElementById('clearFormButton');
const clearAllDataButton = document.getElementById('clearAllDataButton');

const experienceError = budgetForm.querySelector('#experienceError');
const genreError = budgetForm.querySelector('#genreError');
const performanceError = budgetForm.querySelector('#performanceError');
const existingGearCostError = budgetForm.querySelector('#existingGearCostError');

let isConfirmingClearAll = false;
let clearAllTimeoutId = null;

const clearErrorMessages = () => {
    experienceError.textContent = '';
    genreError.textContent = '';
    performanceError.textContent = '';
    existingGearCostError.textContent = '';
    console.log('All error messages cleared.');
};

const resetClearAllButton = () => {
    if(clearAllTimeoutId) clearTimeout(clearAllTimeoutId);
    isConfirmingClearAll = false;
    clearAllDataButton.textContent = 'Clear All Saved Data';
    clearAllDataButton.classList.remove('confirm-state');
    clearAllDataButton.classList.add('danger-button');
};

const resetAllUIStates = () => {
    resetClearAllButton();
};

const handleEditEntry = (id) => {
    const entryToEdit = budgetEntries.find(entry => entry.id === id);
    // 1. "Guard Clause" If no entry is found, we exit the function to prevent errors.
    // 2. '!' makes it a boolean
    if (!entryToEdit) {
    // 3. "console.error" logs a failure message to the console as opposed to a regular 'console.log'
        console.error(`Entry with ID ${id} not found for editing.`);
        return;
    }

    populateFormForEdit(entryToEdit);
    clearErrorMessages();
    hideResults();
    resetAllUIStates();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleDeleteEntry = (id) => {
    const indexToDelete = budgetEntries.findIndex(entry => entry.id === id);

    if (indexToDelete > -1) {
        budgetEntries.splice(indexToDelete, 1);

        saveEntries(budgetEntries);

        renderTable(budgetEntries);

        console.log(`Entry ID: ${id} deleted successfully.`);
        clearForm();
        clearErrorMessages();
        hideResults();
        resetAllUIStates();
    } else {
        console.error(`Entry with ID ${id} not found for deletion.`);
    }
};

const performClearAllData = () => {
    clearAllEntries();
    budgetEntries.length = 0;
    renderTable(budgetEntries);
    resetAllUIStates();
    clearForm(); 
    clearErrorMessages();
    hideResults();
    console.log('All saved data successfully cleared.');
};


const validateInputs = (inputs) => {
    let isValid = true;

    clearErrorMessages();

    if(!inputs.experienceLevel) {
        experienceError.textContent = 'Please select an experience level.';
        isValid = false;
    }

    if ((!inputs.genre || inputs.genre === "") && inputs.experienceLevel !== 'professional') {
        genreError.textContent = 'Please select a genre.';
        isValid = false;
    }

    if(!inputs.performanceType) {
        performanceError.textContent = 'Please select a performance type.';
        isValid = false;
    }

    if (inputs.existingGearCost < 0) {
        existingGearCostError.textContent = "You can't have a negative number.";
        isValid = false;
    } else {
        // 11. Infinity is a property of the global object. In other words, it is a variable in global scope.
        let maxCap = Infinity;

        if (inputs.experienceLevel) {
            switch (inputs.experienceLevel) {
                case 'beginner':
                    maxCap = 1000;
                    break;
                case 'intermediate':
                    maxCap = 5000;
                    break;
            }

            if (inputs.existingGearCost > maxCap) {
                existingGearCostError.textContent = `Existing Gear Credit cannot exceed $${maxCap.toLocaleString()} for your experience level.`;
                isValid = false;
            }
        }
    }

    return isValid;
}


const handleFormSubmit = (event) => {
    event.preventDefault();
    const rawInputs = getFormInputs();

    if(!validateInputs(rawInputs)) {
        console.log('Form validation failed. Stopping submission.');
        return;
    }

    const newEntry = processFormInputs(rawInputs);
    // 4. isEditing "Feature Flag" tracks if the user is editing or not
    let isEditing = false;

    if (rawInputs.id) {
        const indexToUpdate = budgetEntries.findIndex(entry => entry.id === rawInputs.id);

        if (indexToUpdate !== -1) {
            const originalEntry = budgetEntries[indexToUpdate];
            budgetEntries[indexToUpdate] = {
                ...newEntry,
                id: originalEntry.id,
                timeStamp: originalEntry.timeStamp,
            };
            isEditing = true;
        } else {
            console.error(`Attempted to update non-existent entry ID: ${rawInputs.id}. Creating new entry instead.`);
        }
    }

    if (!isEditing) {
        newEntry.id = generateUniqueId();
        newEntry.timeStamp = new Date().getTime().toString();
        budgetEntries.unshift(newEntry);
    }

    saveEntries(budgetEntries);
    renderTable(budgetEntries);
    displayResults(newEntry);
    clearForm();
};


const init = () => {
    console.log('App initialized: DOM is ready! Try submitting the form or clearing it.');
    budgetForm.addEventListener('submit', handleFormSubmit);

    clearFormButton.addEventListener('click', () => {
        clearForm();
        clearErrorMessages();
    });

    setTableCallbacks({
        onEdit: handleEditEntry,
        onDelete: handleDeleteEntry,
    });

    initTableEvents();

    hideResults();
    const loadedEntries = loadEntries();
    if(loadedEntries.length > 0) {
        budgetEntries.push(...loadedEntries);
        console.log('Entries loaded from localStorage');
    } else {
        console.log('No entries found in localStorage. Starting fresh.');
    }

    renderTable(budgetEntries);

    loadAndDisplayWeather();
    
    clearAllDataButton.addEventListener('click', (event) => {
        event.stopPropagation();
        if(isConfirmingClearAll) {
            performClearAllData();
        } else {
            isConfirmingClearAll = true;
            clearAllDataButton.textContent = 'Are you sure? Click again';
            clearAllDataButton.classList.add('confirm-state');
            clearAllTimeoutId = setTimeout(() => {
                resetClearAllButton();
                console.log('Clear All confirmation timed out');
            }, 3000);
        }
    });

    document.addEventListener('click', (event) => {
        if(isConfirmingClearAll && event.target !== clearAllDataButton) {
            resetClearAllButton();
        }
    });
};

document.addEventListener('DOMContentLoaded', init);