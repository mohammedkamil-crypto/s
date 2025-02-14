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
async function getAIResponse(prompt) {
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

    // Mock responses for demonstration

    const mockResponses = {
        "projects": "I have 4 key projects: 1) E-commerce Platform, 2) Portfolio Website, 3) Football Management App, 4) University Portal.",
        "skills": "My skills include Web Design (HTML/CSS/JS), UI/UX, Team Leadership, and Football Strategy!",
        "experience": "I'm a student with hands-on experience in web development and competitive football experience.",
        "default": "I'm an AI assistant here to help you learn more about Mohammed's portfolio. Ask about projects, skills, or experience!"
    };

    typingIndicator.style.display = 'block';
    await new Promise(resolve => setTimeout(resolve, 1000));

    typingIndicator.style.display = 'none';

    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('project')) return mockResponses.projects;
    if (lowerPrompt.includes('skill')) return mockResponses.skills;
    if (lowerPrompt.includes('experience')) return mockResponses.experience;
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

