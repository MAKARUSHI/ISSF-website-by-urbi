// Event listener setup
document.addEventListener("DOMContentLoaded", function() {

    // Function to handle search
    function search() {
        var searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();
        var searchResults = [];
        
        if (searchTerm !== "") {
            searchResults = users.filter(function(user) {
                // Concatenate name and surname for searching
                var fullName = user.name.toLowerCase() + " " + user.surname.toLowerCase();
                // Check if each letter in the search term is found consecutively
                var index = 0;
                for (var i = 0; i < fullName.length && index < searchTerm.length; i++) {
                    if (fullName[i] === searchTerm[index]) {
                        index++;
                    }
                }
                // If all letters in the search term are found consecutively, return true
                return index === searchTerm.length;
            });
        }
        
        displayResults(searchResults);
    }
  
    // Function to display search results
    function displayResults(results) {
        var searchResultsContainer = document.getElementById("searchResults");
        searchResultsContainer.innerHTML = "";
        
        if (results.length === 0) {
            searchResultsContainer.innerHTML = "0 results (0.000 seconds)";
        } else {
            var countElement = document.createElement("div");
            countElement.textContent = "Found " + results.length + " results.";
            searchResultsContainer.appendChild(countElement);
            
            results.forEach(function(result) {
                var resultElement = document.createElement("div");
                
                // Create an <img> element for the athlete's image
                var imgElement = document.createElement("img");
                imgElement.src = result.athlete_img;
                imgElement.alt = result.name + " " + result.surname; // Set alt attribute for accessibility
                imgElement.style.width = "100px"; // Adjust image width
                
                // Append the <img> element to the result element
                resultElement.appendChild(imgElement);
                
                // Add other athlete details
                var nameElement = document.createElement("a");
                nameElement.textContent += result.surname + " " + result.name + " (" + result.nationality + ")";
                nameElement.addEventListener("click", function() {
                    // Redirect to a different page with the athlete's ID as a query parameter
                    window.location.href = "athlete-stats.html?id=" + result.athlete_id;
                });
                resultElement.appendChild(nameElement);
                
                searchResultsContainer.appendChild(resultElement);
            });
        }
    }
  
    // Add event listeners
    document.getElementById("searchButton").addEventListener("click", search); // Trigger search on button click
  
    document.getElementById("searchInput").addEventListener("keydown", function(event) {
        if (event.keyCode === 13) {
            search();
        }
    });
  });
  