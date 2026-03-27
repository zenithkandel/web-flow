const stepContent = {
    1: {
        title: "What is web and how it works",
        description: "The web is a system where browsers request resources and servers respond with HTML, CSS, JS, images, or API data.",
        points: [
            "Browser asks DNS to find a domain's server IP.",
            "Request goes to the server using HTTP/HTTPS.",
            "Server sends back a response, then browser renders the page."
        ],
        promptPreview: "Prompt: Explain browser, DNS, HTTP request/response, and rendering with one beginner analogy.",
        detailedPrompt: "You are a patient web development teacher. Explain what the web is and how it works for a complete beginner. Keep it very simple. Cover browser, DNS, server, HTTP request/response, and rendering in short bullets. Then give one real-life analogy and one tiny exercise."
    },
    2: {
        title: "Frontend vs backend",
        description: "Frontend is the interface users interact with, while backend handles business logic, data processing, and server-side security.",
        points: [
            "Frontend: HTML, CSS, JavaScript, React or Vue.",
            "Backend: Node, Python, PHP, Java, and server frameworks.",
            "Both connect through APIs to build one complete app."
        ],
        promptPreview: "Prompt: Compare frontend and backend roles with tools and one real project workflow.",
        detailedPrompt: "Teach me the difference between frontend and backend in very simple language. Provide: 1) what each side does, 2) common technologies, 3) how they work together in one mini project, 4) a beginner practice plan for one week."
    },
    3: {
        title: "How frontend communicates with backend (API)",
        description: "Frontend sends requests to backend endpoints; backend validates input, performs logic, and returns structured JSON responses.",
        points: [
            "GET fetches data and POST sends new data.",
            "Backend returns status code and JSON payload.",
            "Frontend updates UI from the API response."
        ],
        promptPreview: "Prompt: Teach GET and POST flow using a simple to-do app with fetch examples.",
        detailedPrompt: "Explain how frontend communicates with backend APIs for a beginner. Show the flow of a GET and POST request using JSON. Include one easy example with fetch, endpoint, request body, and response handling. Keep code minimal and clear."
    },
    4: {
        title: "What is database",
        description: "A database is where application data is stored in a structured way so it can be queried, updated, and protected reliably.",
        points: [
            "SQL databases use tables and relationships.",
            "NoSQL databases use flexible formats like documents.",
            "Choice depends on data structure and app requirements."
        ],
        promptPreview: "Prompt: Explain SQL vs NoSQL with practical decision examples for beginners.",
        detailedPrompt: "Explain what a database is in beginner-friendly language. Compare SQL and NoSQL simply, include when to choose each, and provide one small example table/document model for a notes app."
    },
    5: {
        title: "How is database contacted",
        description: "Applications usually access databases from backend code using drivers, ORMs, and secure credentials through a connection layer.",
        points: [
            "Backend opens a connection using environment secrets.",
            "Queries run through ORM or raw SQL commands.",
            "Results are validated and sent back by API."
        ],
        promptPreview: "Prompt: Show backend-to-database flow with safe querying and one simple example.",
        detailedPrompt: "Teach me how a backend contacts a database. Explain connection strings, query execution, and safe querying to avoid SQL injection. Give one short example using any common stack and summarize each line."
    },
    6: {
        title: "CRUD",
        description: "CRUD means Create, Read, Update, Delete. These four operations cover most day-to-day data actions in web apps.",
        points: [
            "Create: add a new record.",
            "Read: fetch one or many records.",
            "Update/Delete: edit existing data or remove it."
        ],
        promptPreview: "Prompt: Map CRUD to API routes and DB actions in a beginner notes app.",
        detailedPrompt: "Explain CRUD for beginners with a notes app example. Map Create, Read, Update, Delete to API routes and basic database operations. Give one mini practice task for each CRUD operation."
    },
    7: {
        title: "What is auth",
        description: "Authentication checks identity, while authorization decides access level after login based on permissions or roles.",
        points: [
            "Login verifies email/password safely.",
            "Sessions or JWT keep users signed in.",
            "Authorization protects admin-only or private routes."
        ],
        promptPreview: "Prompt: Explain authentication and authorization with sessions vs JWT and route protection.",
        detailedPrompt: "Teach authentication and authorization in very simple terms. Explain signup/login, password hashing, sessions vs JWT, protected routes, and role-based access with one small example flow."
    },
    8: {
        title: "UIUX and SEO",
        description: "UI/UX improves usability and trust, while SEO helps search engines understand your content and rank it correctly.",
        points: [
            "UI/UX: clarity, hierarchy, spacing, and accessibility.",
            "SEO: semantic HTML, metadata, headings, and speed.",
            "Mobile-first design improves both UX and SEO."
        ],
        promptPreview: "Prompt: Give a beginner checklist for UI/UX and SEO before launching a small web app.",
        detailedPrompt: "Give me a beginner checklist for UI/UX and SEO for a small web app. Keep it practical and short. Include layout/readability basics, mobile responsiveness, performance hints, semantic HTML, metadata, and one simple audit routine."
    }
};

const cards = document.querySelectorAll(".learn-card");
const modal = document.getElementById("detailModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPoints = document.getElementById("modalPoints");
const modalPromptPreview = document.getElementById("modalPromptPreview");
const modalStepLabel = document.getElementById("modalStepLabel");
const modalCopyBtn = document.getElementById("modalCopyBtn");
const modalCloseBtn = document.getElementById("modalCloseBtn");

let currentStep = null;

function openModal(step) {
    const item = stepContent[step];
    if (!item) return;

    currentStep = step;
    modalStepLabel.textContent = `Step ${String(step).padStart(2, "0")}`;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalPromptPreview.textContent = item.promptPreview;
    modalPoints.innerHTML = item.points.map((point) => `<li>${point}</li>`).join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentStep = null;
}

cards.forEach((card) => {
    const head = card.querySelector(".card-head");
    const step = Number(card.dataset.step);

    head.addEventListener("click", () => {
        openModal(step);
    });
});

modal.addEventListener("click", (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeModal === "true") {
        closeModal();
    }
});

modalCloseBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
    }
});

modalCopyBtn.addEventListener("click", async () => {
    if (!currentStep) return;

    const text = stepContent[currentStep].detailedPrompt;
    try {
        await navigator.clipboard.writeText(text);
        const oldText = modalCopyBtn.textContent;
        modalCopyBtn.textContent = "Copied";
        modalCopyBtn.classList.add("copied");

        setTimeout(() => {
            modalCopyBtn.textContent = oldText;
            modalCopyBtn.classList.remove("copied");
        }, 1300);
    } catch {
        modalCopyBtn.textContent = "Clipboard blocked";
        setTimeout(() => {
            modalCopyBtn.textContent = "Copy detailed prompt";
        }, 1300);
    }
});
