document.addEventListener("DOMContentLoaded", async () => {

    let projectId = new URLSearchParams(window.location.search).get("id");

    // Support direct pages like showcase.html?id=pizzeria
    if (!projectId) {
        const page = window.location.pathname.split("/").pop();
        projectId = page.replace(".html", "").toLowerCase();
    }

    if (!projectId) return;

    try {

        const response = await fetch("../data/case-studies.json");

        if (!response.ok) {
            throw new Error("Unable to load case-studies.json");
        }

        const projects = await response.json();

        const project = projects.find(p => p.id === projectId);

        if (!project) {

            document.body.innerHTML = `
                <main style="padding:100px;text-align:center;color:white;">
                    <h1>Project Not Found</h1>
                    <p>No case study exists for "<strong>${projectId}</strong>".</p>
                </main>
            `;

            return;
        }

        document.title = `${project.title} | Echo Craft Creative Studio`;

        setText("project-title", project.title);
        setText("breadcrumb-title", project.title);
        setText("project-category", project.category);
        setText("project-tagline", project.tagline);
        setText("project-overview", project.overview);
        setText("project-challenge", project.challenge);
        setText("project-strategy", project.strategy);
        setText("project-outcome", project.outcome);

        setText("industry", project.industry);

setText(
    "snapshot-services",
    Array.isArray(project.services)
        ? project.services.join(", ")
        : project.services
);

setText("deliverables", project.deliverables);

setText("categoryType", project.categoryType);

// -------------------------
// Showcase Hero V2
// -------------------------

const heroImage = document.getElementById("heroImage");

if (heroImage && project.heroImage) {

    heroImage.src = project.heroImage;

    heroImage.alt = project.title;

}

setText("breadcrumb-title", project.title);

setText("project-category", project.category);

setText("project-title", project.title);

setText("project-tagline", project.tagline);

// -------------------------
// Featured Commercial
// -------------------------

const featuredContainer = document.querySelector(".featuredCommercial");

if (featuredContainer && project.youtubeId) {

    featuredContainer.innerHTML = `

        <div class="videoPlayer">

            <img
                src="${project.heroImage}"
                alt="${project.title}"
                class="videoPoster">

            <button
                class="playCommercial"
                id="playCommercial">

                <div class="playCircle">

                    <i class="fa-solid fa-play"></i>

                </div>

                <span>Watch Commercial</span>

            </button>

        </div>

    `;

    document
        .getElementById("playCommercial")
        .addEventListener("click", () => {

            featuredContainer.innerHTML = `

                <iframe

                    width="100%"

                    height="650"

                    src="https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0"

                    title="${project.title}"

                    frameborder="0"

                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

                    allowfullscreen>

                </iframe>

            `;

        });

}



        // -------------------------
        // Services
        // -------------------------

        const servicesGrid = document.getElementById("servicesGrid");

        if (servicesGrid) {

            servicesGrid.innerHTML = "";

            if (Array.isArray(project.services)) {

                project.services.forEach(service => {

                    servicesGrid.innerHTML += `
                        <article class="serviceCard">

                            <div class="serviceIcon">
                                <i class="fa-solid fa-check"></i>
                            </div>

                            <h3>${service}</h3>

                        </article>
                    `;

                });

            }

        }

    }

    catch (error) {

        console.error("Case Study Error:", error);

    }

});

function setText(id, value) {

    const el = document.getElementById(id);

    if (el) {

        el.textContent = value ?? "";

    }

}