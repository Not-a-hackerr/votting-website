document.addEventListener('DOMContentLoaded', () => {
  fetchPollOptions(); // Fetch poll options data when the page loads
});

function fetchPollOptions() {
  fetch('http://localhost:3000/poll') // Send GET request to /poll endpoint
    .then(response => response.json())
    .then(data => {
      console.log('Poll options:', data);
      renderOptions(data); // Call renderOptions function with received data
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function renderOptions(data) {
  // Sort the options array in descending order based on the percentage
  data.sort((a, b) => b.percentage - a.percentage);

  const optionsContainer = document.querySelector('.answers');


  // Iterate over each option in the sorted data array
  data.forEach(option => {
    // Create a container for each option
    const optionContainer = document.createElement('div');
    optionContainer.classList.add('answer');

    // Create a label element for the option text
    const labelElement = document.createElement('span');
    labelElement.textContent = option.label;
    labelElement.classList.add('answer__label');

    // Create a percentage element to display the percentage
    const percentageElement = document.createElement('span');
    percentageElement.textContent = `${option.percentage}%`;
    percentageElement.classList.add('answer__percentage');

    // Create a bar element for the purple bar
    const barElement = document.createElement('div');
    barElement.classList.add('answer__bar');
    barElement.style.width = `${option.percentage }%`; // Set width based on the percentage

    // Append label, percentage, and bar elements to the option container
    optionContainer.appendChild(barElement); // Append the bar first
    optionContainer.appendChild(labelElement);
    optionContainer.appendChild(percentageElement);

    // Append the option container to the optionsContainer
    optionsContainer.appendChild(optionContainer);
  });
}


