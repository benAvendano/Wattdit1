window.onload = () => {
    displayProfileData();
    displayUserStories();
};

function displayProfileData() {
    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    
    const totalPosts = stories.length;
    const totalLikes = stories.reduce((sum, story) => sum + (story.likes || 0), 0);
    
    const lastUsername = stories.length > 0 ? stories[0].username : "Anónimo";
    

    document.getElementById("profile-username").innerText = `@${lastUsername}`;
    document.getElementById("total-posts").innerText = totalPosts;
    document.getElementById("total-likes").innerText = totalLikes;
}

function displayUserStories() {
    const stories = JSON.parse(localStorage.getItem("stories")) || [];
    const storyGrid = document.getElementById("profile-story-grid");
    storyGrid.innerHTML = "";

    stories.forEach((story, index) => {
        const storyCard = document.createElement("div");
        storyCard.classList.add("story-card");

        const userIcon = document.createElement("img");
        userIcon.src = "https://i.pinimg.com/736x/26/91/8c/26918c8eb57f4fc07eade15aada8f81f.jpg";
        userIcon.alt = "Usuario";

        const username = document.createElement("span");
        username.innerText = `@${story.username}`;

        const storyText = document.createElement("p");
        storyText.innerText = story.displayContent;

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Eliminar";
        deleteButton.onclick = () => deleteStory(index);

        

        storyCard.appendChild(userIcon);
        storyCard.appendChild(username);
        storyCard.appendChild(storyText);
        storyCard.appendChild(deleteButton);

        storyGrid.appendChild(storyCard);
    });
}

function toggleMenu() {
    const navbarLinks = document.querySelector('.navbar-links');
    navbarLinks.classList.toggle('active');
}



function deleteStory(index) {
    let stories = JSON.parse(localStorage.getItem("stories")) || [];
    stories.splice(index, 1);
    localStorage.setItem("stories", JSON.stringify(stories));
    displayProfileData();   
    displayUserStories();    
}
