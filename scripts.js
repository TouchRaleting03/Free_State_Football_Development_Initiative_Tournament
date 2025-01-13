
function updateScore(matchId) {
    const scoreElement = document.getElementById(`score-${matchId}`);
    let [teamAScore, teamBScore] = scoreElement.innerText.split(" - ").map(Number);
    
    // Simulate score change by randomizing the score
    teamAScore += Math.floor(Math.random() * 2);
    teamBScore += Math.floor(Math.random() * 2);
    
    // Update the score display on the page
    scoreElement.innerText = `${teamAScore} - ${teamBScore}`;
  }
  
  // Event listener for updating scores (used only on the Fixtures page)
  function setupLiveScores() {
    const updateButtons = document.querySelectorAll('.update-score');
    updateButtons.forEach(button => {
      button.addEventListener('click', () => {
        const matchId = button.getAttribute('data-match');
        updateScore(matchId);
      });
    });
  }
  
  // Function to show a success message after registration (used on registration page)
  function showRegistrationSuccess() {
    const registrationForm = document.getElementById('registration-form');
    const successMessage = document.createElement('p');
    successMessage.innerText = "Registration successful! We'll contact you soon.";
    successMessage.classList.add('success-message');
    registrationForm.appendChild(successMessage);
  }
  
  // Initialize the scripts when the DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    // If on the fixtures page, set up live score functionality
    if (window.location.pathname.includes('fixtures.html')) {
      setupLiveScores();
    }
  
    // If on the registration page, show the success message after form submission
    if (window.location.pathname.includes('register.html')) {
      const registrationForm = document.getElementById('registration-form');
      registrationForm && registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        showRegistrationSuccess();
      });
    }
  });
  