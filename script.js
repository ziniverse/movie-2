// JavaScript to handle modals
document.addEventListener('DOMContentLoaded', () => {
    // Get all current and upcoming movie buttons and modals
    const movieButtons = document.querySelectorAll('.movie-button');
    const upcomingMovieButtons = document.querySelectorAll('.upcoming-movie-button');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    // Function to open a modal
    const openModal = (modal) => {
        modal.style.display = 'block';
    };

    // Function to close a modal
    const closeModal = (modal) => {
        modal.style.display = 'none';
    };

    // Add event listeners for current movie buttons
    movieButtons.forEach((button, index) => {
        button.addEventListener('click', () => openModal(modals[index]));
    });

    // Add event listeners for upcoming movie buttons
    upcomingMovieButtons.forEach((button, index) => {
        button.addEventListener('click', () => openModal(modals[movieButtons.length + index]));
    });

    // Add event listeners for close buttons
    closeButtons.forEach((button) => {
        button.addEventListener('click', () => closeModal(button.closest('.modal')));
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Find all trailer buttons
    const trailerButtons = document.querySelectorAll('.trailer-btn');

    // Add click event to each button
    trailerButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoUrl = button.getAttribute('data-trailer-url');
            window.open(videoUrl, '_blank'); // Open the video in a new tab
        });
    });
});
document.querySelectorAll('.book-now-btn').forEach((button, index) => {
    button.addEventListener('click', function() {
        document.getElementById(`ticket-modal-movie-${index+1}`).style.display = 'block';
        // If you want to close the current movie modal when opening the ticket modal, uncomment the line below
        // this.closest('.modal').style.display = 'none';
    });
});

// Close the respective ticket modal
document.querySelectorAll('[id^="close-ticket-modal-movie-"]').forEach(closeButton => {
  closeButton.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
  });
});
// Select all the modals
const modals = document.querySelectorAll('.modal');

modals.forEach(modal => {
    // For each modal, find its location buttons and the date selection container within it
    const locationButtons = modal.querySelectorAll('.location-button');
    const dateSelectionContainer = modal.querySelector('.date-selection-container');
  
    // Define a function that shows the date selection container
    function showDateSelection() {
        dateSelectionContainer.style.display = 'block'; // Change 'block' to 'flex' or 'grid' depending on your layout
    }
  
    // Add click event listeners to each location button within the current modal
    locationButtons.forEach(button => {
        button.addEventListener('click', showDateSelection);
    });
  });
  // Select all the modals
  modals.forEach(modal => {
    // Select the date buttons and the time selection container within this modal
    const dateButtons = modal.querySelectorAll('.date-button');
    const timeSelectionContainer = modal.querySelector('.time-selection-container');
    const timeSlots = modal.querySelectorAll('.time-slot');
  
    // Function to show the time selection container and the appropriate time slots
    function showTimeSelection(event) {
        // Hide all time slots first
        timeSlots.forEach(slot => slot.style.display = 'none');
        
        // Get the selected date from the data attribute of the clicked button
        const selectedDate = event.target.textContent;
  
        // Find the time slot that matches the selected date and show it
        const matchingTimeSlot = Array.from(timeSlots).find(slot => slot.getAttribute('data-date') === selectedDate);
        if (matchingTimeSlot) {
            matchingTimeSlot.style.display = 'block';
        }
        // Inside your showTimeSelection function or equivalent
        if (matchingTimeSlot) {
            matchingTimeSlot.style.display = 'flex'; // This should match your CSS styling for .time-slot
  }
  
        // Show the time selection container
        timeSelectionContainer.style.display = 'block';
    }
  
    // Add click event listeners to each date button
    dateButtons.forEach(button => {
        button.addEventListener('click', showTimeSelection);
    });
  });

  var globalTotalPrice = 0;
   // Global counter for total tickets

  // Function to update ticket count
  // Function to update ticket count
function changeTicketCount(button, change) {
    var counterDiv = button.parentElement; 
    var input = counterDiv.querySelector('input[type="text"]');
    var currentValue = parseInt(input.value);
    var newValue = currentValue + change;
    if (modal) {
        globalTotalPrice = updateTotal(modal);
        updateBuyTicketModal(globalTotalPrice); // Update the buy ticket modal with the new total price
        checkAndToggleBuyButton(modal); // Check and toggle Buy Now button state
    }
    if (newValue >= 0) {
        // Update global ticket counter
        globalTicketCounter += change;

        // Check if the global ticket counter exceeds the limit
        if (globalTicketCounter > 10) {
            globalTicketCounter -= change; // Revert the change
            alert('A total of 10 tickets can be purchased at once. If you want to purchase tickets for a larger group, please contact moviereservationsite@email.com or call +358-XXX-XXX-XXX');
            return; // Prevent adding more tickets
        }

        // Update count if within the limit
        input.value = newValue;
        var modal = counterDiv.closest('.modal');
        if (modal) {
            globalTotalPrice = updateTotal(modal);
            updateBuyTicketModal(globalTotalPrice); // Update the buy ticket modal with the new total price
        }
    }
}
// Function to update seat buttons based on globalTicketCounter
function updateSeatButtons(modal) {
    var seats = modal.querySelectorAll('.seat-button.active');
    var totalTickets = globalTicketCounter;
    seats.forEach(function(seat, index) {
        if (index < totalTickets) {
            seat.disabled = false;
        } else {
            seat.disabled = true;
            seat.classList.remove('selected');
            seat.style.backgroundColor = '#FFFFFF'; // Reset color for deselected seats
        }
    });
}

var globalTicketCounter = 0;
// Function to calculate and update the total price for a given modal
function updateTotal(modal) {
    var adultPrice = 16.52;
    var childrenPrice = 11.92;
    var seniorPrice = 13.72;
    var studentPrice = 11.92;
    var wheelchairPrice = 11.92;

    var total = 0;

    // Safely calculating total
    total += calculatePrice(modal, '#adults', adultPrice);
    total += calculatePrice(modal, '#children', childrenPrice);
    total += calculatePrice(modal, '#seniors', seniorPrice);
    total += calculatePrice(modal, '#students', studentPrice);
    total += calculatePrice(modal, '#wheelchair', wheelchairPrice);

    // Update total
    var totalElement = modal.querySelector('#total');
    if (totalElement) {
        totalElement.value = `€${total.toFixed(2)}`;
    }

    return total;
}

// Helper function to safely calculate price for each ticket type
function calculatePrice(modal, selector, price) {
    var element = modal.querySelector(selector);
    return element ? parseInt(element.value) * price : 0;
}

// Attach event listeners to all + and - buttons and initialize the total for each modal
document.querySelectorAll('.modal').forEach(function(modal) {
    modal.querySelectorAll('.button').forEach(function(button) {
        button.onclick = function() {
            var change = button.textContent.trim() === '+' ? 1 : -1;
            changeTicketCount(button, change);
            updateTotal(modal); // Update the total price
        };
    });
    updateTotal(modal);
});

// JavaScript for Seat Selection with Dynamic Content and Seat Buttons
document.addEventListener("DOMContentLoaded", function() {
    var modals = document.querySelectorAll('.modal');
    var modalSeatStates = {}; // Object to store seat states for each modal

    // Function to generate random seat states
    function generateRandomSeatStates(totalSeats) {
        var activeSeats = Math.floor(Math.random() * (totalSeats + 1)); // Random number between 0 and totalSeats
        var seatStates = new Array(totalSeats).fill(false);
        for (let i = 0; i < activeSeats; i++) {
            let index;
            do {
                index = Math.floor(Math.random() * totalSeats);
            } while (seatStates[index]);
            seatStates[index] = true;
        }
        return seatStates;
    }

    // Iterate through each modal
    document.querySelectorAll('.modal').forEach(function(modal, modalIndex) {
        var timeButtons = modal.querySelectorAll('.time-button');
        modalSeatStates[modalIndex] = {}; // Initialize seat state storage for this modal
    
        // Generate and store random seat states for each time button in the modal
        timeButtons.forEach(function(button) {
            var buttonTextParts = button.textContent.trim().split(' ');
            var time = buttonTextParts[0]; // Extract the time part
            var totalSeats = parseInt(buttonTextParts[1].split('/')[1]);
            var seatStates = generateRandomSeatStates(totalSeats);
    
            // Calculate the percentage of active seats
            var activeSeats = seatStates.filter(state => state).length; // Count true values
            var activeSeatsPercentage = (activeSeats / totalSeats) * 100;
    
            // Update the button text
            button.textContent = `${time} ${activeSeats}/${totalSeats}`;
    
            // Apply low availability styling if active seats are <= 20% of total seats
            if (activeSeatsPercentage <= 20) {
                button.classList.add('low-availability');
            }
    
            // Store the seat states
            modalSeatStates[modalIndex][button.textContent] = seatStates;
        });

        // Add event listeners to time buttons
        timeButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Reset selectedSeats array and count when changing time slots
                selectedSeats = [];
                resetSeatSelection(modal);
    
                var timeButtonText = button.textContent.trim();
                updateSeatSelection(timeButtonText, modal, modalIndex);
            });
        });
    });

    // Function to update seat selection
    function updateSeatSelection(timeButtonText, modal, modalIndex) {
        var seatStates = modalSeatStates[modalIndex][timeButtonText];
        var seatSelectionContainer = modal.querySelector('.seat-selection-container');
        var seatSelectionHeader = seatSelectionContainer.querySelector('h3');
        var seatsContainer = modal.querySelector('.seats-container');
        var totalTickets = getTotalTickets(modal);
        var activeSeats = seatStates.filter(state => state).length; // Count of active seats
    
        // Check if selected tickets exceed available active seats
        if (totalTickets > activeSeats) {
            alert('Not enough seats available for the selected time slot. Please select fewer tickets or choose a different time slot.');
            return; // Exit the function to prevent seat selection
        }
    
        seatsContainer.innerHTML = '';
    
        var totalSeats = parseInt(timeButtonText.split('/')[1]);
        const seatsPerRow = 20;
        const numberOfRows = Math.ceil(totalSeats / seatsPerRow);
    
        // Create row labels and seat buttons
        for (let row = 0; row < numberOfRows; row++) {
            let rowLabel = document.createElement('div');
            rowLabel.className = 'row-label';
            rowLabel.textContent = 'Row ' + (row + 1);
            seatsContainer.appendChild(rowLabel);
    
            for (let seat = 0; seat < seatsPerRow; seat++) {
                let seatIndex = row * seatsPerRow + seat;
                if (seatIndex < totalSeats) {
                    let seatButton = document.createElement('button');
                    let isActive = seatStates[seatIndex];
                    seatButton.className = isActive ? 'seat-button active' : 'seat-button inactive';
                    seatButton.textContent = 'Seat ' + (seat + 1);
                    seatButton.dataset.seatId = `Row ${row + 1} Seat ${seat + 1}`; // Add seat identifier
    
                    if (isActive) {
                        seatButton.style.backgroundColor = '#FFFFFF'; // Initial color for active seats
    
                        seatButton.addEventListener('click', function() {
                            if (selectedSeats.length < totalTickets || seatButton.classList.contains('selected')) {
                                let seatId = seatButton.dataset.seatId;
                                let seatIndex = selectedSeats.indexOf(seatId);
    
                                if (seatIndex === -1) {
                                    selectedSeats.push(seatId); // Add seat if not already selected
                                    seatButton.style.backgroundColor = '#32527B'; // Selected color
                                    seatButton.classList.add('selected');
                                } else {
                                    selectedSeats.splice(seatIndex, 1); // Remove seat if already selected
                                    seatButton.style.backgroundColor = '#FFFFFF'; // Original color
                                    seatButton.classList.remove('selected');
                                }
    
                                updateBuyTicketModal(globalTotalPrice); // Update modal with current seat selections
                                checkAndToggleBuyButton(modal); // Check and toggle Buy Now button state
                            } else {
                                alert('You cannot select more seats than the number of tickets.');
                            }
                        });
                    }
    
                    seatsContainer.appendChild(seatButton);
                }
            }
        }
    
        // Check if the buy-ticket-section already exists, and create it if not
    var buyTicketSection = modal.querySelector('.buy-ticket-section');
    if (!buyTicketSection) {
        buyTicketSection = document.createElement('div');
        buyTicketSection.className = 'buy-ticket-section';
        seatSelectionContainer.appendChild(buyTicketSection); // Append buy-ticket-section to the seat-selection-container
    }
    
    // Remove any existing buy ticket buttons before adding a new one
    var existingButton = buyTicketSection.querySelector('.buy-ticket-button');
    if (existingButton) {
        buyTicketSection.removeChild(existingButton);
    }

    // Create the Buy Ticket button and append it to the buy-ticket-section
    var buyTicketButton = document.createElement('button');
    buyTicketButton.className = 'buy-ticket-button';
    buyTicketButton.textContent = 'Buy Ticket';
    buyTicketButton.addEventListener('click', function() {
        openBuyTicketModal();
    });
    buyTicketSection.appendChild(buyTicketButton); // Append the button to the buy-ticket-section

    // Display the seat selection container
    seatSelectionContainer.style.display = 'flex';
    }
    function resetSeatSelection(modal) {
        var seatsContainer = modal.querySelector('.seats-container');
        seatsContainer.innerHTML = ''; // Clear all existing seat buttons
    }
      
    // Function to get the total number of tickets
    function getTotalTickets(modal) {
        var adultTickets = parseInt(modal.querySelector('#adults').value) || 0;
        var childrenTickets = parseInt(modal.querySelector('#children').value) || 0;
        var seniorTickets = parseInt(modal.querySelector('#seniors').value) || 0;
        var studentTickets = parseInt(modal.querySelector('#students').value) || 0;
        var wheelchairTickets = parseInt(modal.querySelector('#wheelchair').value) || 0;
        return adultTickets + childrenTickets + seniorTickets + studentTickets + wheelchairTickets;
    }
    function checkAndToggleBuyButton(modal) {
        var totalTickets = getTotalTickets(modal);
        var buyTicketButton = modal.querySelector('.buy-ticket-button');
    
        if (selectedSeats.length === totalTickets) {
            buyTicketButton.disabled = false; // Enable the Buy Now button if the condition is met
        } else {
            buyTicketButton.disabled = true; // Disable the Buy Now button otherwise
        }
    }
});  
document.querySelectorAll('.modal').forEach(function(modal) {
    modal.querySelectorAll('.button').forEach(function(button) {
        button.onclick = function() {
            var change = button.textContent.trim() === '+' ? 1 : -1;
            changeTicketCount(button, change);
            updateTotal(modal); // Update the total price

            // After updating the total, recheck seat availability for the selected time slot
            var selectedTimeButton = modal.querySelector('.time-button.selected');
            if (selectedTimeButton) {
                updateSeatSelection(selectedTimeButton.textContent.trim(), modal, modalIndex);
            }
            checkAndToggleBuyButton(modal);
        };
    });
    // Initial setup
    updateSeatButtons(modal);
    updateTotal(modal);
});   



  // Function to reset all buttons of a particular class to the initial color
  function resetButtonColors(buttonClass) {
      let buttons = document.querySelectorAll(buttonClass);
      buttons.forEach(button => {
        button.classList.remove('clicked');
      });
    }
    
    // Function to handle location button click
    function handleLocationClick(event) {
      resetButtonColors('.location-button');
      event.currentTarget.classList.add('clicked');
      // You can add more functionality here like showing the date-selection-container, etc.
    }
    
    // Function to handle date button click
    function handleDateClick(event) {
      resetButtonColors('.date-button');
      event.currentTarget.classList.add('clicked');
      // You can add more functionality here like showing the time-selection-container, etc.
    }
    
    // Function to handle time button click
    function handleTimeClick(event) {
      resetButtonColors('.time-button');
      event.currentTarget.classList.add('clicked');
      // You can add more functionality here if needed.
    }
    
    // Attach event listeners to the location buttons
    document.querySelectorAll('.location-button').forEach(button => {
      button.addEventListener('click', handleLocationClick);
    });
    
    // Attach event listeners to the date buttons
    document.querySelectorAll('.date-button').forEach(button => {
      button.addEventListener('click', handleDateClick);
    });
    
    // Attach event listeners to the time buttons within each time-slot
    document.querySelectorAll('.time-slot .time-button').forEach(button => {
      button.addEventListener('click', handleTimeClick);
    });  
  document.getElementById('userIcon').addEventListener('click', function() {
    var modal = document.getElementById("modal-user");
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    document.getElementsByClassName("close")[0].onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
let userEmail = '';
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting the traditional way

    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var email = document.getElementById('email').value;

    // Handle the collected data (e.g., send it to a server or log it)
    console.log(firstName, lastName, userEmail);

    // Optionally, close the modal after submission
    document.getElementById('modal-user').style.display = 'none';
});
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting in the traditional way

    var firstName = document.getElementById('firstName').value;
    // You can retrieve lastName and email as well if needed

    // Update the greeting
    var greetingElement = document.getElementById('greeting');
    greetingElement.textContent = 'Hi ' + firstName + '!';

    // Optionally, close the modal after submission
    document.getElementById('modal-user').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    const seeAllCurrentMovies = document.getElementById('seeAllCurrentMovies');
    const seeAllUpcomingMovies = document.getElementById('seeAllUpcomingMovies');
    const allMoviesModal = document.getElementById('allMoviesModal'); // No change needed here
    const moviesGrid = document.querySelector('.movies-grid');
    
    // Update the selector for the close button within the new modal structure
    const closeButton = allMoviesModal.querySelector('.see-all-modal-content .close-button');

    seeAllCurrentMovies.addEventListener('click', function () {
        populateMoviesGrid('current');
        allMoviesModal.style.display = 'block';
    });

    seeAllUpcomingMovies.addEventListener('click', function () {
        populateMoviesGrid('upcoming');
        allMoviesModal.style.display = 'block';
    });

    closeButton.addEventListener('click', function () {
        allMoviesModal.style.display = 'none';
    });

    function populateMoviesGrid(type) {
        // Clear existing content
        moviesGrid.innerHTML = '';

        // Select the source elements based on type
        let sourceElements;
        if (type === 'current') {
            sourceElements = document.querySelectorAll('.current-movies .movie');
        } else {
            sourceElements = document.querySelectorAll('.upcoming-movies .upcoming-movie');
        }

        // Clone and append each source element
        sourceElements.forEach(function (element) {
            const clone = element.cloneNode(true);
            moviesGrid.appendChild(clone);
        });
    }

    // Updated event delegation for movie buttons inside the modal
    moviesGrid.addEventListener('click', function (event) {
    // Check if the clicked element is a movie button or a child of it
        let targetElement = event.target;
        while (targetElement != null && !targetElement.classList.contains('movie-button') && !targetElement.classList.contains('upcoming-movie-button')) {
            targetElement = targetElement.parentElement;
        }

        if (targetElement) {
            const movieId = targetElement.parentElement.id; // Assuming the ID is on the parent element of the button
            const isUpcoming = targetElement.classList.contains('upcoming-movie-button'); // Check if it's an upcoming movie
            openMovieDetailModal(movieId, isUpcoming);
        }
    });
    function openMovieDetailModal(movieId, isUpcoming) {
        allMoviesModal.style.display = 'none';
    
        // Adjust the ID based on whether the movie is current or upcoming
        const prefix = isUpcoming ? 'upcoming-' : '';
        const detailModalId = `modal-${prefix}movie-${movieId.split('-').pop()}`;
    
        // Find the movie detail modal using its ID
        const detailModal = document.getElementById(detailModalId);
    
        if (detailModal) {
            // Display the movie detail modal
            detailModal.style.display = 'block';
    
            // Close button for the movie detail modal
            const closeDetailButton = detailModal.querySelector('.close-button');
    
            // Add event listener to close the movie detail modal
            closeDetailButton.addEventListener('click', function() {
                detailModal.style.display = 'none';
            });
        }
    }
});
document.querySelector('.search-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const searchText = document.querySelector('.search-input').value.toLowerCase();
    const currentMovies = document.querySelectorAll('.movie');
    const upcomingMovies = document.querySelectorAll('.upcoming-movie');
    let foundMovies = [];

    // Search in current movies
    currentMovies.forEach(movie => {
        const title = movie.querySelector('h4').textContent.toLowerCase();
        if (title.includes(searchText)) {
            foundMovies.push({element: movie.cloneNode(true), type: 'current'});
        }
    });

    // Search in upcoming movies
    upcomingMovies.forEach(movie => {
        const title = movie.textContent.toLowerCase();
        if (title.includes(searchText)) {
            foundMovies.push({element: movie.cloneNode(true), type: 'upcoming'});
        }
    });

    displaySearchResults(foundMovies);
}

function displaySearchResults(foundMovies) {
    const searchModalContainer = document.getElementById('search-modal-container');
    searchModalContainer.innerHTML = `
        <div class="full-screen-modal show">
            <span class="close-button">&times;</span>
            <div class="search-modal-content" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;"></div>
        </div>`;

    const searchModalContent = searchModalContainer.querySelector('.search-modal-content');

    if (foundMovies.length === 0) {
        searchModalContent.innerHTML = 'No search found';
    } else {
        foundMovies.forEach(({element, type}) => {
            element.addEventListener('click', function() {
                const movieId = type === 'current' ? element.id.replace('movie-', 'modal-movie-') : element.id.replace('upcoming-movie-', 'modal-upcoming-movie-');
                openMovieModal(movieId);
            });
            // Set image size based on movie type
            const img = element.querySelector('img');
            if (img) {
                if (type === 'current') {
                    img.style.width = '112px';
                    img.style.height = '169px';
                } else if (type === 'upcoming') {
                    img.style.width = '70px';
                    img.style.height = '97px';
                }
            }
            searchModalContent.appendChild(element);
        });
    }

    // Close button functionality
    const closeButton = searchModalContainer.querySelector('.close-button');
    closeButton.onclick = () => {
        searchModalContainer.innerHTML = '';
    };
}
function openMovieModal(movieModalId) {
    const modal = document.getElementById(movieModalId);
    if (modal) {
        modal.style.display = 'block';
    }
}


// Variables to store user selections
let selectedLocation = '';
let selectedDate = '';
let selectedTime = '';
let selectedSeats = []; // Array to store selected seat details

// Function to update the modal content
function updateBuyTicketModal(totalPrice) {
    let modalContent = `
        <p>Location: ${selectedLocation}</p>
        <p>Date: ${selectedDate}</p>
        <p>Time: ${selectedTime}</p>
        <p>Number of Tickets: ${globalTicketCounter}</p>
        <p>Total Price: €${totalPrice.toFixed(2)}</p>
        <p>Seats: ${selectedSeats.join(', ')}</p>
    `;
    document.getElementById('buy-ticket-modal-content').innerHTML = modalContent;
}

function openBuyTicketModal() {
    var buyTicketModal = document.getElementById('buy-ticket-modal');
    buyTicketModal.style.display = 'block';
    updateBuyTicketModal(globalTotalPrice); // Update modal with the current selections
    var modals = document.querySelectorAll('.modal');
    modals.forEach(function(modal) {
        updateTotal(modal); // Update the total price
        updateSeatButtons(modal); // Update the seat buttons
        checkAndToggleBuyButton(modal); // Check and toggle Buy Now button state
    });
}
document.addEventListener("DOMContentLoaded", function() {
    // ... existing initialization code ...
    var closeBtn = document.getElementById('close-buy-ticket-modal');
    closeBtn.addEventListener('click', function() {
        var buyTicketModal = document.getElementById('buy-ticket-modal');
        buyTicketModal.style.display = 'none';
    });
    var confirmTicketButton = document.getElementById('confirm-ticket-button');
    var confirmationModal = document.getElementById('confirmation-modal');

    confirmTicketButton.addEventListener('click', function() {
        // Show confirmation modal
        confirmationModal.style.display = 'block';

        // Wait for 5 seconds before hiding the modal and refreshing the page
        setTimeout(function() {
            confirmationModal.style.display = 'none';
            location.reload(); // Refreshes the page
        }, 2500);
    });
});

// Example event listeners to update the selected values
document.querySelectorAll('.location-button').forEach(button => {
    button.addEventListener('click', function() {
        selectedLocation = this.textContent.trim();
        updateBuyTicketModal();
    });
});
document.querySelectorAll('.date-button').forEach(button => {
    button.addEventListener('click', function() {
        selectedDate = this.textContent.trim();
        updateBuyTicketModal();
    });
});
document.querySelectorAll('.time-button').forEach(button => {
    button.addEventListener('click', function() {
        // Extract only the time part from the button's text content
        var buttonTextParts = this.textContent.trim().split(' ');
        selectedTime = buttonTextParts[0]; // Assign the time part to selectedTime

        // Update the Buy Ticket modal with the new time selection
        updateBuyTicketModal(globalTotalPrice);
    });
});
// Similar event listeners for date, time, and seat selections
// ...

// Example of seat selection logic
// Example of seat selection logic
document.querySelectorAll('.seat-button').forEach(button => {
    button.addEventListener('click', function() {
        // Assuming the seat info is correctly labeled in the button's text
        let seatInfo = this.textContent.trim(); // e.g., "Seat 5"
        let seatRow = this.parentElement.querySelector('.row-label').textContent.trim(); // e.g., "Row 3"
        let fullSeatInfo = `${seatRow} ${seatInfo}`; // Combine to form "Row 3 Seat 5"

        let seatIndex = selectedSeats.indexOf(fullSeatInfo);

        if (seatIndex === -1) {
            selectedSeats.push(fullSeatInfo); // Add seat if not already selected
        } else {
            selectedSeats.splice(seatIndex, 1); // Remove seat if already selected
        }

        updateBuyTicketModal(globalTotalPrice); // Update modal with current seat selections
    });
});


document.querySelectorAll('.time-button').forEach(button => {
    button.addEventListener('click', function() {
        var seatSelectionContainer = this.closest('.modal').querySelector('.seat-selection-container');

        if (seatSelectionContainer) {
            // Scroll to the seat selection container
            seatSelectionContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

            addBounceEffect(seatSelectionContainer);
        }
    });
});

function addBounceEffect(element) {
    // Add bounce effect class
    element.classList.add('bounce-effect');

    // Optional: Remove the class after the animation completes
    setTimeout(() => {
        element.classList.remove('bounce-effect');
    }, 1000); // The timeout should match the duration of the animation
}

// Call this function when the seat selection section is initially displayed
function onSeatSelectionDisplay() {
    var seatSelectionContainer = document.querySelector('.seat-selection-container');
    if (seatSelectionContainer) {
        addBounceEffect(seatSelectionContainer);
    }
}

// Example of calling the function when the modal is displayed
// You might need to adjust this part based on how your modal display logic works
onSeatSelectionDisplay();