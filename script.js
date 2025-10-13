// Initialize the LinkedIn SDK
function initLinkedIn() {
    // This function loads the SDK asynchronously
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://platform.linkedin.com/in.js';
    script.text = `api_key: 789fpgwdxweuiv\n authorize: true\n scope: r_liteprofile r_emailaddress`;
    document.head.appendChild(script);
}

// Function to handle the sign-in button click
function signInWithLinkedIn() {
    // The SDK's `IN.User.authorize()` function triggers the OAuth flow
    IN.User.authorize(function() {
        fetchProfileData();
    });
}

// Function to fetch the user's profile data after they are authorized
function fetchProfileData() {
    // Use the SDK's `IN.API.Raw` to call the Profile endpoint
    IN.API.Raw("/people/~:(id,firstName,lastName,profilePicture(displayImage~:playableStreams),vanityName,headline,location,summary)?format=json")
        .result(function(data) {
            // We have the data! Now update the webpage.
            updateProfileUI(data);
        })
        .error(function(error) {
            console.error("Error fetching profile data:", error);
            alert("There was an error fetching your LinkedIn data.");
        });
}

// Function to update the HTML with the fetched data
function updateProfileUI(data) {
    // Update Name
    const nameElement = document.getElementById('profile-name');
    nameElement.textContent = `${data.firstName.localized.en_US} ${data.lastName.localized.en_US}`;

    // Update Headline
    const headlineElement = document.getElementById('profile-headline');
    headlineElement.textContent = data.headline.localized.en_US;

    // Update Summary
    const summaryElement = document.getElementById('profile-summary');
    summaryElement.textContent = data.summary?.localized?.en_US || "No summary provided.";

    // Update Profile Picture (this part is a bit more complex)
    const pictureElement = document.getElementById('profile-picture');
    if (data.profilePicture && data.profilePicture['displayImage~'].elements.length > 0) {
        // Get the highest resolution image available
        const pictureUrl = data.profilePicture['displayImage~'].elements.pop().identifiers[0].identifier;
        pictureElement.src = pictureUrl;
    }

    // Hide the sign-in button after successful login
    document.querySelector('.btn').style.display = 'none';
}

// Initialize the LinkedIn SDK when the page loads
window.onload = initLinkedIn;
