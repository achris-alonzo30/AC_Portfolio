// ***************************** Set Variables ****************************** //

// ***************************** Variables related to images and navigation ***************************** //
const images = ['MangaTrackr-logo.png', 'TaskZen-logo.png', 'personal-logo.png'];
const carouselImage = document.getElementById('carouselImage');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let setIndex = 0;
const imagePath = `static/logos/${images[setIndex]}`;
carouselImage.src = imagePath;

// ***************************** Variables related to indicators ***************************** //
const indicators = [
  document.getElementById('circleIndicator1'),
  document.getElementById('circleIndicator2'),
  document.getElementById('circleIndicator3')
];

// ***************************** Variables related to project descriptions ***************************** //
const projectDescriptions = [
    {
        author: 'MangaTrackr',
        description: 'I used to spend a lot of time checking for new manga chapters every day, but I found it to be a waste of time. So, I decided to automate the process and receive notifications via text or email whenever a new chapter is released.',
        projectTools: '#HTML #CSS #BootstrapCSS #Python #Javascript #Flask #Selenium #WebDriver #BeatifulSoup #Crontab #SMTP #TwillioAPI'
    },
    {
        author: 'TaskZen',
        description: 'I like to document my day to day life by planning and writing it down on piece of paper. So I made an app that helps me keep me updated on my day to day life so I can focus on what really matters and get things done. I made the app simple to use and easily to navigate.',
        projectTools: '#HTML #CSS #BootstrapCSS #Python #Javascript #Django #UserAuthentication #DatabaseManagement'
    },
    {
        author: 'AC: Personal Website',
        description: 'My personal website is a glimpse into my web development journey, a space where I document my growth and showcase my latest creations.',
        projectTools: '#HTML #CSS #BootstrapCSS #Python #Javascript #Django #DatabaseManagement'
    },
];

// ***************************** Variables related to likes ***************************** //
const likeBtn = document.querySelector('.likeBtn');
const likesCount = document.getElementById('likesCount');

// Retrieve the likes count from localStorage or set an initial value
let likes = localStorage.getItem('likesCount') || 2000;

// ***************************** Variables related to comments ***************************** //
const commentInput = document.getElementById('commentInput');
const postBtn = document.getElementById('postBtn');
const commentDisplay = document.getElementById('commentDisplay');
const viewAllCommentsLink = document.getElementById('viewAllComments');

// Initially hide the comment display
commentDisplay.style.display = 'none';
viewAllCommentsLink.style.display = 'none';

// ***************************** Function to update the navigation buttons (next and previous) ***************************** //
function updateButtons() {
  if (setIndex === 0) {
    prevBtn.style.display = 'none';
  } else {
    prevBtn.style.display = 'block';
  }

  if (setIndex === images.length - 1) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'block';
  }
}

// ***************************** Function to update the indicators (circles at the bottom) ***************************** //
function updateIndicators() {
  indicators.forEach((indicator, index) => {
    if (index === setIndex) {
      indicator.style.backgroundColor = 'black';
    } else {
      indicator.style.backgroundColor = '#D8D8D8';
    }
  });
}

// ***************************** Function to update the likesCount element's content ***************************** //
likesCount.innerHTML = `<b><span id="likesCountValue">${likes}</span> Likes</b>`;

likeBtn.addEventListener('click', () => {
  // Increase the number of likes when the button is clicked
  likes++;
  // Update the likesCount element's content, including "Likes"
  likesCount.innerHTML = `<b><span id="likesCountValue">${likes}</span> Likes</b>`;

  // Store the updated likes count in localStorage
  localStorage.setItem('likesCount', likes);
});

// ***************************** Function to update the Project Description ***************************** //
function updateProjectDescription() {
  const projectDescription = projectDescriptions[setIndex];
  const descriptionElement = document.querySelector('.project-description');

  if (projectDescription) {
    descriptionElement.innerHTML = `<span class="project-username"><b>${projectDescription.author}</b></span> <span class="project-description">${projectDescription.description}</span> <span class="highlighted-words"><b>${projectDescription.projectTools}</b></span>`;
  }
}


nextBtn.addEventListener('click', () => {
  setIndex = (setIndex + 1) % images.length;
  const imagePath = `static/logos/${images[setIndex]}`;
  carouselImage.src = imagePath;
  updateButtons();
  updateIndicators();
  updateProjectDescription();
});

prevBtn.addEventListener('click', () => {
  setIndex = (setIndex - 1 + images.length) % images.length;
  const imagePath = `static/logos/${images[setIndex]}`;
  carouselImage.src = imagePath;
  updateButtons();
  updateIndicators();
  updateProjectDescription();
});

// Load comments from localStorage and display them
const savedComments = JSON.parse(localStorage.getItem('comments')) || [];

// ***************************** Function to display a comment ***************************** //
function displayComment(author, text) {
    // Create a new paragraph element to display the comment
    const commentParagraph = document.createElement('p');

    // Create a bold element for the author
    const authorElement = document.createElement('b');
    authorElement.textContent = author;

    // Create a text node for the comment
    const commentTextNode = document.createTextNode(`: ${text}`);

    // Append the author and comment text to the comment paragraph
    commentParagraph.appendChild(authorElement);
    commentParagraph.appendChild(commentTextNode);

    // Append the comment paragraph to the comment display div
    commentDisplay.appendChild(commentParagraph);

    // Display the comment display
    commentDisplay.style.display = 'block';
}

// ***************************** Function to update the comment display ***************************** //
function updateCommentDisplay() {
    // Clear the comment display
    commentDisplay.innerHTML = '';

    // If there are more than 3 comments, hide and show the "View all comments" link
    if (savedComments.length > 3) {
        viewAllCommentsLink.style.display = 'block';
        viewAllCommentsLink.textContent = `View all ${savedComments.length} comments`;

        // Add a click event to the link to show all comments
        viewAllCommentsLink.addEventListener('click', () => {
            commentDisplay.innerHTML = '';
            savedComments.forEach((comment) => {
                displayComment(comment.author, comment.text);
            });
            // Hide the "View all comments" link
            viewAllCommentsLink.style.display = 'none';

            // Add the .view-all-comments class to the link
            viewAllCommentsLink.classList.add('view-all-comments', 'text-start');

        });
    } else {
        // Display up to 3 comments
        savedComments.slice(0, 3).forEach((comment) => {
            displayComment(comment.author, comment.text);
        });
    }
}

// ***************************** Initially hide the comment display ***************************** //
if (savedComments.length > 3) {
    commentDisplay.style.display = 'none';
    viewAllCommentsLink.style.display = 'block';
    updateCommentDisplay();
} else {
    commentDisplay.style.display = 'block';
    updateCommentDisplay();
}

// Add an event listener to the "Post" button
postBtn.addEventListener('click', () => {
    // Get the user's comment from the input field
    const userComment = commentInput.value;

    // Create a new comment object
    const comment = {
        author: 'Anonymous', // Default author
        text: userComment,
    };

    // Save the comment to localStorage
    savedComments.push(comment);
    localStorage.setItem('comments', JSON.stringify(savedComments));

    // Update the comment display
    updateCommentDisplay();

    // Clear the input field after posting the comment
    commentInput.value = '';
});

updateButtons();
updateIndicators();
updateProjectDescription();

