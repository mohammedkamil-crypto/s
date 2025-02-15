// Update copyright year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation Effects
const nav = document.querySelector('nav');
const navHighlight = document.querySelector('.nav-highlight');
const navLinks = document.querySelectorAll('nav ul li a');

// Update navigation highlight position
function updateHighlight(link) {
    const linkRect = link.getBoundingClientRect();
    navHighlight.style.width = `${linkRect.width}px`;
    navHighlight.style.left = `${link.offsetLeft}px`;
}

// Initialize highlight for active link
const activeLink = document.querySelector('.active-link');
updateHighlight(activeLink);

// Scroll effects
window.addEventListener('scroll', () => {
    // Add scrolled class to nav
    window.scrollY > 50
        ? nav.classList.add('scrolled')
        : nav.classList.remove('scrolled');

    // Update active section
    const fromTop = window.scrollY + 100;
    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active-link');
            updateHighlight(link);
        } else {
            link.classList.remove('active-link');
        }
    });
});

// Smooth scroll and update highlight
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.hash);

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active-link'));

        // Add active class to clicked link
        this.classList.add('active-link');

        // Update highlight position
        updateHighlight(this);

        // Smooth scroll
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Window resize handler
window.addEventListener('resize', () => {
    const activeLink = document.querySelector('.active-link');
    updateHighlight(activeLink);
});

// AI Assistant Functionality
const aiButton = document.querySelector('.ai-button');
const aiChat = document.querySelector('.ai-chat');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input input');
const sendButton = document.querySelector('.send-button');
const typingIndicator = document.querySelector('.typing-indicator');
const closeChat = document.querySelector('.close-chat');

// Toggle chat visibility
aiButton.addEventListener('click', () => {
    aiChat.style.display = 'flex';
    aiButton.style.display = 'none';
});

closeChat.addEventListener('click', () => {
    aiChat.style.display = 'none';
    aiButton.style.display = 'flex';
});

// Add message to chat
function addMessage(text, isUser = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getAIResponse(prompt) {
    try {
        typingIndicator.style.display = 'block';

        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `sk-3984d679523b475db4ad3e3d0b33a03c`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful portfolio assistant for Mohammed Kamil. He is a web developer, student, and footballer."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('AI Error:', error);
        return "Sorry, I'm having trouble responding right now.";
    } finally {
        typingIndicator.style.display = 'none';
    }
}

async function main() {
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "deepseek-chat",
    });

    console.log(completion.choices[0].message.content);
}

main();
// Handle AI Response
async function getAIResponse(prompt) { }
// Replace with actual API call
// Example using OpenAI (requires API key)
/*
const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY`
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150
    })
});
 
const data = await response.json();
return data.choices[0].text.trim();
*/

/*

const mockResponses = {
    "projects": "I have 4 key projects: 1) E-commerce Platform, 2) Portfolio Website, 3) Football Management App, 4) University Portal.",
    "skills": "My skills include Web Design (HTML/CSS/JS), UI/UX, Team Leadership, and Football Strategy!",
    "experience": "I'm a student with hands-on experience in web development and competitive football experience.",
    "default": "I'm an AI assistant here to help you learn more about Mohammed's portfolio. Ask about projects, skills, or experience!",
    "Hi": "Hello",
    "who": "He is a web developer.",
    "age": "he is 15 years old."
};

typingIndicator.style.display = 'block';
await new Promise(resolve => setTimeout(resolve, 1000));

typingIndicator.style.display = 'none';

const lowerPrompt = prompt.toLowerCase();
if (lowerPrompt.includes('project')) return mockResponses.projects;
if (lowerPrompt.includes('skill')) return mockResponses.skills;
if (lowerPrompt.includes('experience')) return mockResponses.experience;
if (lowerPrompt.includes('hi')) return mockResponses.Hi;
if (lowerPrompt.includes('who')) return mockResponses.who;
if (lowerPrompt.includes('age')) return mockResponses.age;

return mockResponses.default;
}*/
function getBotReply(userInput) {
    userInput = userInput.toLowerCase(); // Convert user input to lowercase for case-insensitive matching

    for (const key in mockResponses) {
        const keywords = key.split("|"); // Split the key into individual keywords (if multiple exist)

        for (const keyword of keywords) {
            if (userInput.includes(keyword.toLowerCase())) { // Check if the keyword is present in the user input
                return mockResponses[key]; // Return the corresponding response
            }
        }
    }

    return mockResponses["default"]; // Return the default response if no keywords are found
}




// Replace the existing mockResponses object with this
const mockResponses = {
    // Personal
    "hi|hello|hey": "Hello! I'm Mohammed's AI assistant. How can I help you?",
    "age|old": "I'm 15 years old and already building professional web projects!",
    "live|location|from": "I'm based in Adiss Ababa, combining tech skills with athletic passion",
    "email|contact": "You can reach me at mohammedkamilmohammed16@gmail.com",

    // Education
    "study|school|education": "I'm currently a high school student focusing on STEM subjects",
    "grade|class": "I maintain excellent grades while pursuing web development",

    // Skills
    "skill|expertise": "My core skills: Web Design (HTML/CSS/JS), UI/UX, Team Leadership",
    "frontend|html|css": "Frontend mastery: Responsive design, CSS animations, Modern layouts",
    "javascript|js": "JS expertise: DOM manipulation, API integration, Interactive features",

    // Projects
    "project|work": "My 4 main projects: 1) E-commerce Site 2) Portfolio 3) Football App 4) University Portal",
    "e-commerce|shop": "E-commerce Project: Built with cart system, product filters, and payment integration",
    "portfolio|website": "This Portfolio: Features AI assistant, smooth animations, and responsive design",
    "football app|sports": "Football Manager: Team scheduling, player stats, and match analysis tools",
    "university|portal": "Student Portal: Grade tracking, course registration, and resource sharing",

    // Football
    "football|soccer": "I play Left Winger, focusing on creative attacking and team strategy",
    "position|play": "I specialize as a Left Winger with strong tactical awareness",
    "team|club": "Currently playing for local club 4-3-3 youth team",

    // Tech
    "tech stack|tools": "Main stack: VSCode, Git, Chrome DevTools, Figma, and Adobe XD",
    "library|framework": "Experienced with React.js and planning to learn Node.js next",
    "design|ui|ux": "Strong focus on user-centered design with accessibility best practices",

    // Experience
    "experience|work": "development experience with 10+ completed projects",
    "client|freelance": "Completed few freelance projects for local businesses",
    "collaborate|team": "Experienced in team projects using Git version control",

    // Hobbies
    "hobby|interest": "Beyond coding: Football tactics analysis, tech podcasts, and fitness training",
    "read|book": "Currently reading 'Clean Code' by Robert C. Martin",
    "music|song": "I enjoy listening to Neshida while coding and Quran for relaxation",

    // Goals
    "goal|future": "Aim to study Computer Science while developing professional web solutions",
    "dream|aspire": "Vision: Combine tech and sports through innovative football analytics tools",

    // Fun
    "messi|ronaldo": "I admire both, but my playstyle is more similar to Cristiano",
    "ai|robot": "I may be artificial, but Mohammed's skills are very real! 😊",
    "joke|funny": "Why do programmers prefer dark mode? Because light attracts bugs!",
    "thanks|thank you": "You're welcome! Feel free to ask anything else",

    // Fallback
    "default": "I'm here to help you explore Mohammed's portfolio! Ask about:\n- Projects\n- Skills\n- Experience\n- Football\n- Education"
};

function getBotReply(userInput) {
    userInput = userInput.toLowerCase();

    const keywords = { // Group keywords by category/intent
        "projects": ["project|projects|work|portfolio|website|e-commerce|shop|football app|sports|university|portal"],
        "skills": ["skill|skills|expertise|frontend|html|css|javascript|js|design|ui|ux|tech stack|tools|library|framework"],
        "experience": ["experience|work|client|freelance|collaborate|team"],
        "football": ["football|soccer|position|play|team|club"],
        // ... other categories
    };

    for (const category in keywords) {
        for (const keyString of keywords[category]) {
            const keyWordsArray = keyString.split("|"); // Split the key string to array
            for (const keyword of keyWordsArray) {
                const regex = new RegExp("\\b" + keyword + "\\b", "i");
                if (regex.test(userInput)) {
                    // Basic context check (very limited)
                    if (category === "projects" && userInput.includes("football")) {
                        return mockResponses["football app|sports"]; // More specific project response
                    } else if (category === "skills" && userInput.includes("frontend")) {
                        return mockResponses["frontend|html|css"];
                    }
                    else if (category === "skills" && userInput.includes("javascript")) {
                        return mockResponses["javascript|js"];
                    }
                    // ... more context checks as needed

                    return mockResponses[keyString]; // Return the general response for the category
                }
            }
        }
    }

    return mockResponses["default"];
}
// Update the response logic
function getAIResponse(prompt) {
    const lowerPrompt = prompt.toLowerCase();

    // Check all response triggers
    for (const [keywords, response] of Object.entries(mockResponses)) {
        if (keywords.split("|").some(k => lowerPrompt.includes(k))) {
            return response;
        }
    }

    return mockResponses.default;
}

// Handle user input
sendButton.addEventListener('click', async () => {
    const prompt = chatInput.value.trim();
    if (!prompt) return;

    addMessage(prompt, true);
    chatInput.value = '';

    const response = await getAIResponse(prompt);
    addMessage(response, false);
});

// Enter key support
chatInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        await sendButton.click();
    }
});

