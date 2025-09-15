# Personal Decision Making App - Step 1: UI Setup, Basic Input Handling & Modular Output

## Description

This app will determine what your budget will be when it comes to obtaining music gear. 
There are three catagories to determine your budget.
Experience level, genre, and wether or not you're going to be playing live shows.
At the end, a recommended estimation will be given on how much you should spend when it comes to acquiring your music gear.

## My Decision Focus

This app is designed for people who may not know where to start or where to continue with their music gear needs.
As a musician myself, I have fallen into the trap of wanting the biggest and best gear out there when in reality, I probably don't need it even though I might want it. 
I want to be able to help people with their goals and show that it is possible to get the most out of the least amount possible.

## Decision Logic
This app is using a series of factors when choosing what your budget would be when it comes to accquiring music equipment.

### Experience Level Logic
This is to determine what level of musician you are at. The values below represent this logic.

- If Experience Level is "Beginner", there is 1 point.
- If Experience Level is "Intermediate", there are 2 points.
- If Experience Level is "Professional", there are 3 points.
- If no Experience Level is given, there are 0 points.

### Genre Logic
This is to determine what genre of music you would be performing. This function is supported by the following values.

- If Genre is "Rock", there is 1 point.
- If Genre is "Jazz", there are 2 points.
- If Genre is "Country", there are 3 points.
- If Genre is "Hip-Hop", there are 4 points.
- If Genre is "Pop", there are 5 points.
- If no Genre is given, there are 0 points.

### Peformance Type Logic
This function represents the atmosphere and or where you would be peforming. Here are the values for this function.

- If Performance Type is "Bedroom Musician" there is 1 point.
- If Performance Type is "Garage Band" there are 2 points.
- If Performance Type is "Club Artist" there are 3 points.
- If Performance Type is "Arena Act" there are 4 points.

### Final Decision
Once all of the total points are added together, the app will use the information given for each function and present a suggestion of a budget for your music equipment needs. At the time of writing, the output is still a work in progress but it will look something like this.

- If the score is 12 points, you would be given the maximum budget.
- If the score is 3 points, you would be given the minimum budget.

A dollar amount will represent the amount of points that are given specifically from each function.

## Example Outputs

**Example 1**

Experience Level: Intermediate
Genre: Country
Performance Type: Club Artist
Result: 8 points

**Example 2**

Experience Level: Beginner
Genre: Hip-Hop
Performance Type: Garage Band
Result: 7 points

**Example 3**

Experience Level: Professional
Genre: Pop
Performance Type: Arena Act
Result: 12 points

## Input Types Used

The primary and single input type that I used for this page was radio buttons.
For example, the first question asks "What is your experience level?". The corresponding options are "Beginner", "Intermediate", and "Professional".

## Color Palette

I decided to go with the "Classic Red Palette" from Coolors.co.
There are many red, gray, and black palettes in this group.
Examples include  #A4161A; #161A1D; #E5383B; and  #B1A7A6;
I wanted something that I felt would stand out without being too striking of a color pattern.
It also helps that red is my favorite color and I wanted to incorporate it into this page.