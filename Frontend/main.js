// Function to fetch poll data from the server and populate options
async function fetchPollData() {
  try {
    const response = await fetch("http://localhost:3000/poll");
    const pollData = await response.json();

    const optionsContainer = document.getElementById('optionsContainer');
 
    // Populate options
    pollData.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.className = 'option';
      optionElement.innerText = option.label;
      optionElement.setAttribute('data-option', option.label);

      // Attach event listener to handle option selection
      optionElement.addEventListener('click', function() {
        selectOption(optionElement);
      });

      optionsContainer.appendChild(optionElement);
    });

    // Check if a vote has been submitted
    if (sessionStorage.getItem('voteSubmitted')) {
      // If a vote has been submitted, fetch updated poll data
      sessionStorage.removeItem('voteSubmitted'); // Clear the flag
      await fetchPollData(); // Fetch updated poll data
    }
  } catch (error) {
    console.error('Error fetching poll data:', error);
  }
}

// Function to mark selected option
function selectOption(optionElement) {
  const selectedOption = document.querySelector('.option.selected');
  if (selectedOption) {
    selectedOption.classList.remove('selected');
  }
  optionElement.classList.add('selected');
}

// Function to submit the vote
async function submitVote() {
  const selectedOption = document.querySelector('.option.selected');
  if (!selectedOption) {
    alert('Please select an option before submitting.');
    return;
  }

  const optionLabel = selectedOption.getAttribute('data-option');

  try {
    await fetch('http://localhost:3000/poll', {
      method: 'POST',
      body: JSON.stringify({ add: optionLabel }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Redirect to results page after successful submission
    window.location.href = 'results.html';
  } catch (error) {
    console.error('Error submitting vote:', error);
    alert('Failed to submit vote. Please try again later.');
  }
}


// Fetch poll data when the page loads
window.onload = fetchPollData;

