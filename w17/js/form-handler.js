const budgetForm = document.getElementById('budgetForm');
const entryIdInput = budgetForm.querySelector('#entryId');
const submitButton = budgetForm.querySelector('button[type="submit"]');
const experienceRadios = budgetForm.querySelectorAll('input[name="experience"]');
const genreInput = budgetForm.querySelector('#genre');
const performanceRadios = budgetForm.querySelectorAll('input[name="performance"]');
const existingGearCostInput = budgetForm.querySelector('#existingGearCost');

const getSelectedRadioValue = (radioButtons) => {
    for (const radio of radioButtons) {
        if (radio.checked) return radio.value;
    }
    return null;
};

const setSelectedRadioValue = (radioButtons, value) => {
    for (const radio of radioButtons) {
        if (radio.value === value) {
            radio.checked = true;
            return;
        }
    }
};

// "subtractedCurrency" is the new input for typing in existing gear dollar amount.
const subtractedCurrency = (value) => {
    if (!value) return 0;
    // 8a/8b. This uses a regular expression to remove all characters from the input.
    const subtractedValue = value.toString().replace(/[^0-9.]/g, '');
    return parseFloat(subtractedValue) || 0;
};

export const getFormInputs = () => {
    return {
        id: entryIdInput.value || null,
        experienceLevel: getSelectedRadioValue(experienceRadios),
        genre: genreInput.value,
        performanceType: getSelectedRadioValue(performanceRadios),
        existingGearCost: subtractedCurrency(existingGearCostInput.value),
    };
};

export const populateFormForEdit = (entry) => {
    entryIdInput.value = entry.id;
    setSelectedRadioValue(experienceRadios, entry.experienceLevel.value);
    genreInput.value = entry.genre.value;
    setSelectedRadioValue(performanceRadios, entry.performanceType.value);
    existingGearCostInput.value = entry.existingGearCost || 0;
    submitButton.textContent = 'Update Entry';
    console.log(`Form populated for editing entry ID: ${entry.id}`);
};

export const clearForm = () => {
    budgetForm.reset();
    entryIdInput.value = '';
    existingGearCostInput.value = '0';
    submitButton.textContent = 'Calculate Budget';
    console.log('Form cleared and ready for new entry.');
};