const resultsContainer = document.getElementById('results');

const totalBudgetDisplay = document.getElementById('budgetResult');
const experienceLevelDisplay = document.getElementById('experienceResult');
const genreDisplay = document.getElementById('genreResult');
const performanceTypeDisplay = document.getElementById('performanceTypeResult');
const existingGearResultDisplay = document.getElementById('existingGearResult');

export const displayResults = (results) => {
    totalBudgetDisplay.textContent = `Recommended Budget: $${results.budgetDollars.toLocaleString()}`;
    experienceLevelDisplay.textContent = `Experience: ${results.experienceLevel.label}`;
    genreDisplay.textContent = `Genre: ${results.genre.label}`;
    performanceTypeDisplay.textContent = `Performance: ${results.performanceType.label}`;
    existingGearResultDisplay.textContent = `Existing Gear Credit: $${results.existingGearCost.toLocaleString()} (Subtracted)`; 
    
    resultsContainer.style.display = 'block';
};

export const hideResults = () => {
    resultsContainer.style.display = 'none';
};