const generateBtn = document.getElementById("generateBtn");
const resetBtn = document.getElementById("resetBtn");
const careerSelect = document.getElementById("careerSelect");
const roadmapContainer = document.getElementById("roadmap");

const roadmaps = {
    frontend: [
        "HTML Fundamentals",
        "CSS Basics & Flexbox",
        "JavaScript Basics",
        "DOM Manipulation",
        "Git & GitHub",
        "Responsive Design",
        "APIs & Fetch",
        "React.js Basics",
        "Build Portfolio Projects"
    ],
    backend: [
        "Programming Language (Node.js / Python)",
        "Data Structures",
        "Databases (SQL & NoSQL)",
        "REST APIs",
        "Authentication & JWT",
        "Server Deployment",
        "Docker Basics",
        "Testing",
        "System Design Basics"
    ],
    data: [
        "Python Basics",
        "Statistics & Probability",
        "NumPy & Pandas",
        "Data Visualization",
        "SQL",
        "Machine Learning Basics",
        "Model Evaluation",
        "Projects & Case Studies",
        "Deploy ML Model"
    ]
};

generateBtn.addEventListener("click", generateRoadmap);
resetBtn.addEventListener("click", resetProgress);

function generateRoadmap() {
    const career = careerSelect.value;
    roadmapContainer.innerHTML = "";

    if (!career) {
        alert("Please select a career path");
        return;
    }

    const savedProgress = JSON.parse(localStorage.getItem(career)) || [];

    roadmaps[career].forEach((topic, index) => {
        const item = document.createElement("div");
        item.classList.add("roadmap-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = savedProgress.includes(index);

        if (checkbox.checked) {
            item.classList.add("completed");
        }

        checkbox.addEventListener("change", () => {
            item.classList.toggle("completed");
            saveProgress(career);
        });

        const label = document.createElement("label");
        label.textContent = topic;

        item.appendChild(checkbox);
        item.appendChild(label);
        roadmapContainer.appendChild(item);
    });
}

function saveProgress(career) {
    const checkboxes = document.querySelectorAll(".roadmap-item input");
    const completedIndexes = [];

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            completedIndexes.push(index);
        }
    });

    localStorage.setItem(career, JSON.stringify(completedIndexes));
}

function resetProgress() {
    const career = careerSelect.value;
    if (!career) return;

    localStorage.removeItem(career);
    generateRoadmap();
}
