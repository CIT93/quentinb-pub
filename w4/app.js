console.log('Hello from app.js! Your JavaScript is connected and running!');

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("the-greeting");
  const nameInput = document.getElementById("name-input");
  const nameDisplay = document.getElementById("name-display");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = nameInput.value.trim();
    if (name) {
      nameDisplay.textContent = name;
    } else {
      nameDisplay.textContent = "Friend";
    }
  });
});
    // Asked AI "Why am I not getting anything regarding a way to include names for my code?" Saw that my form was empty and that I had a typo and invalid structure for h2.
    // In the same prompt, the AI output some code, but I wanted to understand how it got to where it ended up.
    // I said "Help me understand each part of the process" and was given explanations on what each part of the code does and why it does so.
    // It helped refresh my memory on things such as <form>, <input-type>, and <button-type>.