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

// Fetch fixtures from the backend and display them
document.addEventListener("DOMContentLoaded", async () => {
  fetch("http://localhost:3000/api/fixtures")
      .then((response) => response.json())
      .then((fixtures) => {
          const fixturesContainer = document.getElementById("fixtures");

          if (fixturesContainer) {
              fixtures.forEach((fixture) => {
                  const fixtureItem = document.createElement("div");
                  fixtureItem.className = "fixture";
                  fixtureItem.innerHTML = `
                      <p><strong>${fixture.home}</strong> vs <strong>${fixture.away}</strong></p>
                      <p>Date: ${fixture.date}</p>
                      <p>Score: ${fixture.score}</p>
                  `;
                  fixturesContainer.appendChild(fixtureItem);
              });
          }
      })
      .catch((error) => console.error("Error fetching fixtures:", error));
});

document.addEventListener("DOMContentLoaded", () => {
  // Fetch fixtures from the backend
  fetch("http://localhost:3000/api/fixtures")
      .then((response) => response.json())
      .then((fixtures) => {
          const tableBody = document.getElementById("fixtures-table-body");

          // Loop through each fixture and create table rows
          fixtures.forEach((fixture) => {
              const row = document.createElement("tr");

              row.innerHTML = `
                  <td>${fixture.date}</td>
                  <td>${fixture.home}</td>
                  <td>${fixture.away}</td>
                  <td>${fixture.time}</td>
                  <td>${fixture.location}</td>
                  <td>
                      <span id="score-${fixture.id}">${fixture.score}</span>
                      <button class="update-score" data-match="${fixture.id}">Update Score</button>
                  </td>
              `;

              tableBody.appendChild(row);
          });
      })
      .catch((error) => console.error("Error fetching fixtures:", error));
});

document.getElementById('registration-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Gather form data
  const formData = {
    managerName: document.getElementById("manager-name").value,
    numPlayers: document.getElementById("num-players").value,
    team: document.getElementById("team").value,
    teamColor: document.getElementById("team-color").value,
    techTeamMembers: document.getElementById("tech-team-members").value,
    headCoachName: document.getElementById("head-coach-name").value,
    headCoachContact: document.getElementById("head-coach-contact").value,
    terms: document.getElementById("terms").checked,
  };

  // Validate the terms checkbox
  if (!formData.terms) {
    alert("You must agree to the terms and conditions.");
    return;
  }

  // Send the form data to the backend using fetch API
  try {
    const response = await fetch("https://soccer-site.glitch.me/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), // Convert form data to JSON format
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('message').textContent = 'Registration successful!';
      form.reset();
    } else {
      document.getElementById('message').textContent = `Error: ${data.message || "Registration failed."}`;
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById('message').textContent = 'An error occurred. Please try again.';
  }
});

// Fetch fixtures and update the table
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://soccer-site.glitch.me/fixtures')
    .then((response) => response.json())
    .then((fixtures) => {
      const tableBody = document.getElementById('fixtures-table-body');
      tableBody.innerHTML = '';

      fixtures.forEach((fixture) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${fixture.home}</td>
          <td>${fixture.away}</td>
          <td>${fixture.date}</td>
          <td><span id="score-${fixture.id}">${fixture.score}</span>
            <button class="update-score" data-match="${fixture.id}">Update Score</button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching fixtures:", error));
});

// Fetch fixtures and update the table
document.addEventListener('DOMContentLoaded', function() {
  fetch('https://soccer-site.glitch.me/fixtures')
    .then((response) => response.json())
    .then((fixtures) => {
      const tableBody = document.getElementById('fixtures-table-body');
      tableBody.innerHTML = '';

      fixtures.forEach((fixture) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${fixture.home}</td>
          <td>${fixture.away}</td>
          <td>${fixture.date}</td>
          <td>${fixture.score}</td>
          <td>
            <button class="update-score" data-match="${fixture.id}">Update Score</button>
          </td>
        `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error('Error fetching fixtures:', error));
});

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', setupLiveScores);
