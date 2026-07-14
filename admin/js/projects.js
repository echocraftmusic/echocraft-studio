/*
==========================================================
EC FRAMEWORK
PROJECTS PAGE CONTROLLER
Version 1.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("EC Projects Controller Loaded");

    const newProjectButtons = document.querySelectorAll(".primaryButton");

    newProjectButtons.forEach(button => {

        if (
            button.textContent.includes("New Project") ||
            button.textContent.includes("Create Project")
        ) {

            button.addEventListener("click", () => {

                if (window.ecModal) {

                    window.ecModal.open("newProjectModal");

                }

            });

        }

    });

renderProjectStats();

renderPipeline();

renderRecentProjects();

});

/* ==========================================================
   PROJECT STATISTICS
========================================================== */

function renderProjectStats() {

    if (!window.ecProjects) return;

    const projects = window.ecProjects.getAll();

    const statCards = document.querySelectorAll(".statCard span");

    if (statCards.length < 4) return;

    const active =
        projects.filter(p => p.status === "Active").length;

    const review =
        projects.filter(p => p.stage === "Review").length;

    const completed =
        projects.filter(p => p.status === "Completed").length;

    let revenue = 0;

    projects.forEach(project => {

        revenue += Number(project.value || 0);

    });

    statCards[0].textContent = active;
    statCards[1].textContent = review;
    statCards[2].textContent = completed;
    statCards[3].textContent =
        "$" + revenue.toLocaleString();

}

/* ==========================================================
   PIPELINE
========================================================== */

function renderPipeline() {

    if (!window.ecProjects) return;

    const projects = window.ecProjects.getAll();

    console.log("Projects:", projects);

    document.querySelectorAll(".pipelineColumn").forEach(column => {

        const badge = column.querySelector(".badge");

        const empty = column.querySelector(".pipelineEmpty");

        if (!badge || !empty) return;

        const stage = column.querySelector("h3").childNodes[0]
            .textContent
            .trim();

        const count = projects.filter(project =>
            project.stage === stage
        ).length;

        badge.textContent = count;

        if (count > 0) {

            empty.innerHTML = `

                <div style="padding:18px;text-align:center;">

                    <strong>${count}</strong>

                    <p style="margin-top:8px;">

                        Project${count>1?"s":""}

                    </p>

                </div>

            `;

        }

    });

}

/* ==========================================================
   SAVE PROJECT
========================================================== */

const projectForm = document.getElementById("newProjectForm");

if (projectForm) {

    projectForm.addEventListener("submit", function (e) {

        e.preventDefault();

        window.ecProjects.add({

            name: document.getElementById("projectName").value,

            client: document.getElementById("projectClient").value,

            value: document.getElementById("projectValue").value,

            stage: document.getElementById("projectStage").value,

            status: "Active"

        });

        renderProjectStats();

        renderPipeline();

        this.reset();

        if (window.ecModal) {

            document
    .getElementById("newProjectModal")
    .classList.remove("active");

        }

        console.log("Project Saved");

    });

}

/* ==========================================================
   RECENT PROJECTS
========================================================== */

function renderRecentProjects() {

    if (!window.ecProjects) return;

    const projects = window.ecProjects.getAll();

    const emptyCard = document.querySelector(".infoCard.emptyState");

    if (!emptyCard) return;

    if (projects.length === 0) return;

    let html = "";

    projects.forEach(project => {

        html += `

        <div class="infoCard">

            <h3>${project.name}</h3>

            <p><strong>Client:</strong> ${project.client}</p>

            <p><strong>Stage:</strong> ${project.stage}</p>

            <p><strong>Value:</strong> $${Number(project.value).toLocaleString()}</p>

        </div>

        `;

    });

    emptyCard.parentElement.innerHTML = html;

}