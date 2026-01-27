<script src="js/script.js"></script>
const projects = [
    {
        title: "Vision AI – OCR & Few-Shot",
        description: "FastAPI backend for OCR and few-shot image identification using FAISS."
    },
    {
        title: "Your Next Project",
        description: "Short description here."
    }
];

const projectsEl = document.getElementById("projects");
projects.forEach(proj => {
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = `<h3>${proj.title}</h3><p>${proj.description}</p>`;
    projectsEl.appendChild(card);
});
