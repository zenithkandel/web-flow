const detailedPrompts = {
    1: "You are a patient web development teacher. Explain what the web is and how it works for a complete beginner. Keep it very simple. Cover browser, DNS, server, HTTP request/response, and rendering in short bullets. Then give one real-life analogy and one tiny exercise.",
    2: "Teach me the difference between frontend and backend in very simple language. Provide: 1) what each side does, 2) common technologies, 3) how they work together in one mini project, 4) a beginner practice plan for one week.",
    3: "Explain how frontend communicates with backend APIs for a beginner. Show the flow of a GET and POST request using JSON. Include one easy example with fetch, endpoint, request body, and response handling. Keep code minimal and clear.",
    4: "Explain what a database is in beginner-friendly language. Compare SQL and NoSQL simply, include when to choose each, and provide one small example table/document model for a notes app.",
    5: "Teach me how a backend contacts a database. Explain connection strings, query execution, and safe querying to avoid SQL injection. Give one short example using any common stack and summarize each line.",
    6: "Explain CRUD for beginners with a notes app example. Map Create, Read, Update, Delete to API routes and basic database operations. Give one mini practice task for each CRUD operation.",
    7: "Teach authentication and authorization in very simple terms. Explain signup/login, password hashing, sessions vs JWT, protected routes, and role-based access with one small example flow.",
    8: "Give me a beginner checklist for UI/UX and SEO for a small web app. Keep it practical and short. Include layout/readability basics, mobile responsiveness, performance hints, semantic HTML, metadata, and one simple audit routine."
};

const cards = document.querySelectorAll(".learn-card");

cards.forEach((card) => {
    const head = card.querySelector(".card-head");
    const copyBtn = card.querySelector(".copy-btn");
    const step = Number(card.dataset.step);

    head.addEventListener("click", () => {
        const isOpen = card.classList.contains("open");
        cards.forEach((item) => {
            if (item === card) return;
            item.classList.remove("open");
            item.querySelector(".card-head")?.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
            card.classList.add("open");
            head.setAttribute("aria-expanded", "true");
        }
    });

    copyBtn.addEventListener("click", async (event) => {
        event.stopPropagation();

        const text = detailedPrompts[step];
        if (!text) return;

        try {
            await navigator.clipboard.writeText(text);
            const oldText = copyBtn.textContent;
            copyBtn.textContent = "Copied";
            copyBtn.classList.add("copied");

            setTimeout(() => {
                copyBtn.textContent = oldText;
                copyBtn.classList.remove("copied");
            }, 1300);
        } catch {
            copyBtn.textContent = "Clipboard blocked";
            setTimeout(() => {
                copyBtn.textContent = "Copy detailed prompt";
            }, 1300);
        }
    });
});
