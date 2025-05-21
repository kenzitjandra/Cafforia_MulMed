const storyData = [
    {
        title1: "The World of",
        title2: "Coffee",
        text: "This introductory video invites you into the essence of coffee—its origins, its aroma, and the subtle magic in every brew. From hand-picked beans to the first warm sip, discover how coffee connects people, moments, and memories. (Watch until the end to unlock the next step)",
        media: "<div class='content-img'><video id='story-video' width='100%' controls><source src='assets/video/1.mp4' type='video/mp4'></video></div>",
        showNextAfterVideo: true
    },
    {
        title1: "Brew the Perfect",
        title2: "Cup",
        text: "Now let's explore how to make your own brew...",
        media: "<div class='content-img'><video id='story-video' width='100%' controls><source src='assets/video/2.mp4' type='video/mp4'></video></div>",
        showNextAfterVideo: true
    },
    {
        title1: "Choose Your",
        title2: "Brew",
        text: "Which coffee experience do you want?",
        media: `<div class="coffee-options">
                    <a href="coffee_page/americano.html" class="coffee-link" target="_blank" rel="noopener">
                    <div class="coffee-card">
                        <img src="assets/espresso.png" alt="Espresso">
                        <p class="coffee-name">Americano</p>
                    </div>
                    </a>

                    <a href="coffee_page/cappuccino.html" class="coffee-link" target="_blank" rel="noopener">
                    <div class="coffee-card">
                        <img src="assets/cappuccino.png" alt="Cappuccino">
                        <p class="coffee-name">Cappuccino</p>
                    </div>
                    </a>

                    <a href="coffee_page/latte.html" class="coffee-link" target="_blank" rel="noopener">
                    <div class="coffee-card">
                        <img src="assets/latte.png" alt="Latte">
                        <p class="coffee-name">Latte</p>
                    </div>
                    </a>
                </div>`,
        isFinal: true
    }
];

let currentStep = 0;

const watchedVideos = [false, false, false];

function loadStoryStep(index) {
    const data = storyData[index];
    document.getElementById("story-title-1").textContent = data.title1;
    document.getElementById("story-title-2").textContent = data.title2;
    document.getElementById("story-text").textContent = data.text;
    document.getElementById("media-container").innerHTML = data.media;

    const buttons = document.getElementById("story-buttons");
    document.getElementById("prev-btn").style.display = index === 0 ? "none" : "inline-block";

    buttons.style.display = "flex";
    document.getElementById("prev-btn").style.display = index === 0 ? "none" : "inline-block";

    if (data.isFinal) {
        document.getElementById("next-btn").style.display = "none";
        return;
    }

    buttons.style.display = "flex";

    const nextBtn = document.getElementById("next-btn");

    if (data.showNextAfterVideo) {
        const video = document.getElementById("story-video");

        if (watchedVideos[index]) {
            nextBtn.style.display = "inline-block";
        } else {
            nextBtn.style.display = "none";
            if (video) {
                video.onended = () => {
                    watchedVideos[index] = true;
                    nextBtn.style.display = "inline-block";
                };
            }
        }
    } else {
        nextBtn.style.display = "inline-block";
    }
}

function setupCoffeePageVideoFlow(videoId1, videoId2, nextButtonId, {
    titleSelector,
    subtitleSelector,
    descriptionSelector,
    newTitle,
    newSubtitle,
    newDescription
}) {
    const video1 = document.getElementById(videoId1);
    const video2 = document.getElementById(videoId2);
    const nextBtn = document.getElementById(nextButtonId);

    const titleElem = document.querySelector(titleSelector);
    const subtitleElem = document.querySelector(subtitleSelector);
    const descElem = document.querySelector(descriptionSelector);

    if (!video1 || !video2 || !nextBtn) return;

    video1.onended = () => {
        nextBtn.style.display = "inline-block";
    };

    nextBtn.onclick = (e) => {
        e.preventDefault();
        video1.style.display = "none";
        nextBtn.style.display = "none";
        video2.style.display = "block";
        video2.play();

        // Update text content
        if (titleElem) titleElem.textContent = newTitle;
        if (subtitleElem) subtitleElem.textContent = newSubtitle;
        if (descElem) descElem.textContent = newDescription;
    };
}

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const essenceSection = document.querySelector('.content'); // Essence of Coffee section

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const essenceTop = essenceSection.offsetTop;

    if (scrollTop < essenceTop) {
        // Before Essence section: always show navbar
        navbar.style.top = '0';
    } else {
        // Below Essence section
        if (scrollTop < lastScrollTop) {
            // Scrolling UP - show navbar
            navbar.style.top = '0';
        } else {
            // Scrolling DOWN - hide navbar
            navbar.style.top = '-120px'; // Adjust to your navbar height + padding
        }
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});



document.getElementById("next-btn").onclick = () => {
    if (currentStep < storyData.length - 1) {
        currentStep++;
        loadStoryStep(currentStep);
    }
};

document.getElementById("prev-btn").onclick = () => {
    if (currentStep > 0) {
        currentStep--;
        loadStoryStep(currentStep);
    }
};

loadStoryStep(currentStep);