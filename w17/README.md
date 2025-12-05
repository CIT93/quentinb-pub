# Personal Decision Making App - Step 1: UI Setup, Basic Input Handling & Modular Output

## Description

This app will determine what your budget will be when it comes to obtaining music gear. 
There are three categories to determine your budget.
Experience level, genre, and what your performance environment, or type, will be.
At the end, a recommended dollar amount will be given on how much you should spend when it comes to acquiring your music gear.

## My Decision Focus

This app is designed for people who may not know where to start or where to continue with their music gear needs.
As a musician myself, I have fallen into the trap of wanting the biggest and best gear out there when in reality, I probably don't need it even though I might want it. 
I want to be able to help people with their goals and show that it is possible to get the most out of the least amount possible.

## Decision Logic
This app is using a series of factors when choosing what your budget would be when it comes to accquiring music equipment.

### How The Code Works
Each logic category is employed by an arrow function. This takes a labeled value as input and returns an object with the same label (ex. "beginner" or "jazz"). The label: "None" would be returned in the instance of no output. This should be a rarity.
Along with the arrow functions, there is also a priceMatrix. This acts as a table that maps each category label to a specific price value.
Once that is run, the calculateBudget function mixes it all together and outputs the final decision for your budget based on your choices.

### Where The Code Comes From
You'll find the respective code stored in the decision.js file available for viewing.
Some work had to be done to assemble the code, specifically with the priceMatrix, so I utilized the resources of Google research and generative AI for help.
Once I was able to observe the code in its full form, I was satisified with what I came up with and it made the most sense for what I was wanting with this web page.

### Experience Level Logic
This is to determine what level of musician you are at. The values below represent this logic.

- If Experience Level is "Beginner", there is 1 point.
- If Experience Level is "Intermediate", there are 2 points.
- If Experience Level is "Professional", there are 3 points.
- If no Experience Level is given, there are 0 points.

### Genre Logic
This is to determine what genre of music you would be performing. This function is supported by the following values.

- If Genre is "Rock", there is 5 point.
- If Genre is "Jazz", there are 10 points.
- If Genre is "Country", there are 15 points.
- If Genre is "Hip-Hop", there are 20 points.
- If Genre is "Pop", there are 25 points.
- If no Genre is given, there are 0 points.

### Peformance Type Logic
This function represents the atmosphere and or where you would be peforming. Here are the values for this function.

- If Performance Type is "Bedroom Musician" there is 50 point.
- If Performance Type is "Garage Band" there are 100 points.
- If Performance Type is "Club Artist" there are 150 points.
- If Performance Type is "Arena Act" there are 200 points.

### Final Decision
Once all of the total points are added together, the app will use the information given for each function and will output a suggestion of a budget for your music equipment needs. 
A dollar amount will represent the amount of points that are given specifically from each function.

- If the score is 228 points, you would be given the maximum budget ($150,000).
- If the score is 56 points, you would be given the minimum budget ($500).

## Example Outputs

**Example 1**

Experience Level: Intermediate
Genre: Country
Performance Type: Club Artist
Result: 167 points. Output is $30,000

**Example 2**

Experience Level: Beginner
Genre: Hip-Hop
Performance Type: Garage Band
Result: 121 points. Output is $750

**Example 3**

Experience Level: Professional
Genre: Pop
Performance Type: Arena Act
Result: 228 points. Output is $150,000

## Input Types Used

The primary and single input type that I used for this page was radio buttons.
For example, the first question asks "What is your experience level?". The corresponding options are "Beginner", "Intermediate", and "Professional".

## Color Palette

I decided to go with the "Classic Red Palette" from Coolors.co.
There are many red, gray, and black palettes in this group.
Examples include  #A4161A; #161A1D; #E5383B; and  #B1A7A6;
I wanted something that I felt would stand out without being too striking of a color pattern.
It also helps that red is my favorite color and I wanted to incorporate it into this page.

## Step 4 Additions

- 1. Functionality of incorporating the user's current gear and what that gear might already cost is now an included in the app.
- 2. A numerical input representing a dollar amount of previously owned gear is subtracted from the total that is given from the decision app. This is done by using a text input with currency parsing making the experience more streamlined and easier for the user.
- 3. A new fieldset has been added to "index.html". The getFormInputs function in "form-handler.js" has been updated to accommodate for this. "decision.js" has been modified with the new calculateBudgetLogic function. The handleFormSubmit function in "app.js" has been updated. "table-renderer.js" now includes the exisiting gear value in with the saved entries. Lastly, the displayResults function in "ui.js" now shows the results of everything correctly.

## Step 5 Rules

Here are the new rules that I will be applying for Step 5.

- 1. **Existing Gear Cost Below 0**
    Rule Explanation: The HTML input will be updated with the `min="0"` attribute. This prevents the user from entering a negative dollar amount when it comes to `existingGearCost`.

- 2. **Professional Experience Without a Genre (Multiple Logic Checks)**
    Rule Explanation: A professional musician usually has a primary genre. If **Experience Level** is **Professional** AND **Genre** is **None**, the base budget used in the calculation will be set to a low default value (such as $500 for example) to flag that a necessary factor is missing for a high-tier calculation, regardless of the performance type. This requires checking two inputs (`experienceValue` and `genreValue`) within the budget calculation logic.

- 3. **Maximum Existing Gear Cap (New Functionality)**
    Rule Explanation: The cost of existing gear that can be applied to the budget reduction is capped based on the user's experience level. For example, if **Experience Level** is set to **Beginner**, the max amount you can put is capped at $1,000. For **Intermediate**, the cap is $5,000. If **Professional** is what is set for **Experience Level**, no cap is enforced. A new function or logic branch will be added to `decision.js` to check the `experienceLevel` and apply the corresponding cap to the `existingGearCost` before it is subtracted from the `baseBudget`.

## Insert for new rules coded and tested

## Sources for Additional Code

**1**. Javascript: Guard Clauses - https://medium.com/@timothydan/javascript-guard-clauses-64b999e3240
**2**. Boolean - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean
**3**. console:error() static method - Web APIs | MDN - https://developer.mozilla.org/en-US/docs/Web/API/console/error_static
**4**. A Guide to Getting Started Quickly With JavaScript Feature Flags - https://www.cloudbees.com/blog/started-quickly-javascript-feature-flags
**5**. Matrix math for the web - Web APIs | MDN - https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Matrix_math_for_the_web
**6**. Math.max() - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
Property accessors - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors
**7**. Optional chaining (?.) - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
**8a**. Regular expressions - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
**8b**. Regex whole dollar amount with optional dollar sign - stack Overflow - https://stackoverflow.com/questions/15916601/regex-whole-dollar-amount-with-optional-dollar-sign
String.prototype.replace() - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
**9**. Callback function - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
**10a**. Date.prototype.toLocaleDateString() - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
**10b**. Number.prototype.toLocaleString() - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
**11**. Infinity - Javascript | MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity