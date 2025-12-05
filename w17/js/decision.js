import * as storage from './data-store.js';
import { getCurrentWeatherRisk } from './weather-integrator.js'; 

const getExperienceLevel = value => {
    if (value === "beginner") return { label: "Beginner", value: "beginner" };
    if (value === "intermediate") return { label: "Intermediate", value: "intermediate" };
    if (value === "professional") return { label: "Professional", value: "professional" };
    return { label: "None", value: null };
};

const getGenre = value => {
    if (value === "hip-hop") return { label: "Hip-Hop", value: "hip-hop" };
    if (value === "rock") return { label: "Rock", value: "rock" };
    if (value === "country") return { label: "Country", value: "country" };
    if (value === "jazz") return { label: "Jazz", value: "jazz" };
    if (value === "pop") return { label: "Pop", value: "pop" };
    return { label: "None", value: null };
};

const getPerformanceType = value => {
    if (value === "bedroomMusician") return { label: "Bedroom Musician", value: "bedroomMusician" };
    if (value === "garageBand") return { label: "Garage Band", value: "garageBand" };
    if (value === "clubArtist") return { label: "Club Artist", value: "clubArtist" };
    if (value === "arenaAct") return { label: "Arena Act", value: "arenaAct" };
    return { label: "None", value: null };
};

const getExistingGearCost = value => {
    // 8a/8b. This uses a regular expression to remove all characters from the input.
    const currency = value.toString().replace(/[^0-9.]/g, '');
    return parseFloat(currency) || 0;
};

const priceMatrix = {
    "beginner": {
        "hip-hop": { bedroomMusician: 500, garageBand: 2000, clubArtist: 5000, arenaAct: 10000 },
        "rock": { bedroomMusician: 1000, garageBand: 3000, clubArtist: 6000, arenaAct: 12000 },
        "country": { bedroomMusician: 800, garageBand: 2500, clubArtist: 5500, arenaAct: 11000 },
        "jazz": { bedroomMusician: 1200, garageBand: 4000, clubArtist: 7000, arenaAct: 14000 },
        "pop": { bedroomMusician: 700, garageBand: 2200, clubArtist: 5200, arenaAct: 10500 },
    },
    "intermediate": {
        "hip-hop": { bedroomMusician: 5000, garageBand: 15000, clubArtist: 30000, arenaAct: 50000 },
        "rock": { bedroomMusician: 6000, garageBand: 18000, clubArtist: 35000, arenaAct: 55000 },
        "country": { bedroomMusician: 5500, garageBand: 16000, clubArtist: 32000, arenaAct: 52000 },
        "jazz": { bedroomMusician: 7000, garageBand: 20000, clubArtist: 40000, arenaAct: 60000 },
        "pop": { bedroomMusician: 5200, garageBand: 15500, clubArtist: 30500, arenaAct: 51000 },
    },
    "professional": {
        "hip-hop": { bedroomMusician: 20000, garageBand: 50000, clubArtist: 100000, arenaAct: 150000 },
        "rock": { bedroomMusician: 25000, garageBand: 60000, clubArtist: 120000, arenaAct: 200000 },
        "country": { bedroomMusician: 22000, garageBand: 55000, clubArtist: 110000, arenaAct: 170000 },
        "jazz": { bedroomMusician: 30000, garageBand: 70000, clubArtist: 150000, arenaAct: 250000 },
        "pop": { bedroomMusician: 25000, garageBand: 50000, clubArtist: 100000, arenaAct: 150000 },
    }
};

const calculateBudgetLogic = (experienceValue, genreValue, performanceValue, existingGearCost) => {
    let baseBudget = 0;

    if (!experienceValue || !performanceValue) {
        return 0;
    }

    if (experienceValue === 'professional' && !genreValue) {
        baseBudget = 500; 
    } 
    else if (genreValue) {
        baseBudget = priceMatrix[experienceValue]?.[genreValue]?.[performanceValue] || 0;
    } 
    
    const weatherRisk = getCurrentWeatherRisk();
    let weatherAdjustment = 0;

    // Applies a safety buffer if weather risk is high or medium for possible outdoor performances.
    const isOutdoorType = performanceValue === 'clubArtist' || performanceValue === 'arenaAct';

    if (weatherRisk.risk === 'high' && isOutdoorType) {
    // Adds a safety buffer for heavy duty weather protection.
        weatherAdjustment = 200; 
        console.log(`Weather risk is HIGH for an outdoor performance (${performanceValue}). Adding $${weatherAdjustment} to budget for protection.`);
    } else if (weatherRisk.risk === 'medium' && isOutdoorType) {
    // Adds a smaller buffer for moderate risk/light covers.
        weatherAdjustment = 50; 
        console.log(`Weather risk is MEDIUM for an outdoor performance (${performanceValue}). Adding $${weatherAdjustment} to budget for light protection.`);
    }

    baseBudget += weatherAdjustment; 

    // 7. '?.' Optional chaining accessess an object's property or calls a funciton.
    const finalBudget = Math.max(0, baseBudget - existingGearCost);

    return finalBudget;
};

//"rawInputs" acts as transformation layer between data from the form and the budget logic calculation and display.
export const processFormInputs = rawInputs => {
    const experienceLevel = getExperienceLevel(rawInputs.experienceLevel);
    const genre = getGenre(rawInputs.genre);
    const performanceType = getPerformanceType(rawInputs.performanceType);
    
    let actualGearCost = getExistingGearCost(rawInputs.existingGearCost);
    let maxCap = Infinity;

    if (experienceLevel.value === 'beginner') {
        maxCap = 1000;
    } else if (experienceLevel.value === 'intermediate') {
        maxCap = 5000;
    }

    const finalCappedGearCost = Math.min(actualGearCost, maxCap);

    const budgetDollars = calculateBudgetLogic(
        experienceLevel.value, 
        genre.value, 
        performanceType.value,
        finalCappedGearCost
    );

    return {
        id: rawInputs.id,
        timeStamp: rawInputs.id ? rawInputs.timeStamp : storage.generateUniqueId(), 
        experienceLevel,
        genre,
        performanceType,
        existingGearCost: finalCappedGearCost,
        budgetDollars,
        weatherRisk: getCurrentWeatherRisk(), 
    };
};