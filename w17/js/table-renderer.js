const budgetTable = document.getElementById('budgetTable');
let budgetTableBody = null;
const noEntriesMessage = document.getElementById('noEntriesMessage');
const clearAllDataButton = document.getElementById('clearAllDataButton');

let _currentCallbacks = {};

let currentConfirmingRowElement = null;

let currentConfirmTimeoutId = null;

const resetRowConfirmationState = () => {
    if (currentConfirmingRowElement) {
        const deleteButton = currentConfirmingRowElement.querySelector('.delete');
        if (deleteButton) {
            deleteButton.textContent = 'Delete';
            deleteButton.classList.remove('confirm-state');
            deleteButton.classList.add('danger-button');
        }
        if (currentConfirmTimeoutId) {
            clearTimeout(currentConfirmTimeoutId);
            currentConfirmTimeoutId = null;
        }
        currentConfirmingRowElement = null;
        console.log('Row Delete confirmation state reset.');
    }
};
// 9. "setTableCallbacks" allows 'app.js' to pass callback functions into this module.
export const setTableCallbacks = (callbacks) => {
    _currentCallbacks = callbacks;
};
//Updated formatDateForDisplay function as original funciton showed invalid dates.
//Runs the same as older date function.
// 10a and 10b sources
const formatDateForDisplay = (timestamp) => {
    if (!timestamp || typeof timestamp === 'object') {
        return 'N/A';
    }
    const date = new Date(isNaN(parseInt(timestamp)) ? timestamp : parseInt(timestamp));
    if (isNaN(date.getTime())) {
        return 'Invalid Date';
    }
    return date.toLocaleDateString();
};

const createTableRow = (entry) => {
    const row = document.createElement('tr');
    row.dataset.id = entry.id;
    row.innerHTML = `
        <td data-label="Date">${formatDateForDisplay(entry.timeStamp)}</td>
        <td data-label="Experience Level">${entry.experienceLevel.label}</td>
        <td data-label="Genre">${entry.genre.label}</td>
        <td data-label="Performance Type">${entry.performanceType.label}</td>
        <td data-label="Existing Gear Value ($)">$${entry.existingGearCost.toLocaleString()}</td>
        <td data-label="Budget ($)">$${entry.budgetDollars.toLocaleString()}</td>
        <td data-label="Actions" class="action-cell">
            <button class="edit action-button" data-id="${entry.id}">Edit</button>
            <button class="delete danger-button action-button" data-id="${entry.id}">Delete</button>
        </td>
    `;
    return row;
};

export const renderTable = (entries) => {
    if (!budgetTableBody) {
        budgetTableBody = budgetTable?.querySelector('tbody');
    }
    if (!budgetTableBody) return;

    budgetTableBody.innerHTML = '';

    if(entries.length === 0) {
        budgetTable.style.display = 'none';
        noEntriesMessage.style.display = 'block';
        clearAllDataButton.style.display = 'none';
        console.log('No entries to display. Table hidden');
        resetRowConfirmationState();
        return;
    } else {
        budgetTable.style.display = 'table';
        noEntriesMessage.style.display = 'none';
        clearAllDataButton.style.display = 'block';
    }

    const sortedEntries = [...entries].sort((a, b) => {
        const timeA = new Date(isNaN(parseInt(a.timeStamp)) ? a.timeStamp : parseInt(a.timeStamp));
        const timeB = new Date(isNaN(parseInt(b.timeStamp)) ? b.timeStamp : parseInt(b.timeStamp));
        return timeB - timeA;
    });

    for (const entry of sortedEntries) {
        const rowElement = createTableRow(entry);
        budgetTableBody.appendChild(rowElement);
    }
};

const handleTableClick = (event) => {
    const target = event.target;
    const id = target.dataset.id;
    const actionCell = target.closest('td');

    if (currentConfirmingRowElement && actionCell !== currentConfirmingRowElement) {
         resetRowConfirmationState();
    }

    if (!id) return;

    if (target.classList.contains('edit') && typeof _currentCallbacks.onEdit === 'function') {
        if (currentConfirmingRowElement === actionCell) {
             resetRowConfirmationState();
        }
        _currentCallbacks.onEdit(id);
        console.log(`Edit button clicked for ID: ${id}. Calling onEdit callback.`);
        return;
    }

    if (target.classList.contains('delete') && typeof _currentCallbacks.onDelete === 'function') {
        event.preventDefault();

        if (currentConfirmingRowElement === actionCell) {
            resetRowConfirmationState();
            console.log(`Delete confirmed for ID: ${id}. Calling onDelete callback.`);
            _currentCallbacks.onDelete(id);
        } else {
            currentConfirmingRowElement = actionCell;
            const deleteButton = target;
            deleteButton.textContent = 'Are you sure?';
            deleteButton.classList.remove('danger-button');
            deleteButton.classList.add('confirm-state');

            currentConfirmTimeoutId = setTimeout( () => {
                resetRowConfirmationState();
            }, 3000);

            console.log(`Delete confirmation initiated for ID: ${id}`);
        }
    }
};

export const initTableEvents = () => {
    budgetTableBody = budgetTable?.querySelector('tbody');

    if (budgetTableBody) {
        budgetTableBody.addEventListener('click', handleTableClick);
        console.log("Table event listener attached.");
    } else {
        console.error("budgetTableBody element not found. Table events not attached.");
    }
};