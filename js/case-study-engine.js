document.addEventListener("DOMContentLoaded", async () => {
    let projectId = new URLSearchParams(window.location.search).get("id");

    // Supports showcase.html?id=pizzeria
    // Also supports direct pages such as pizzeria.html
    if (!projectId) {
        const page = window.location.pathname.split("/").pop();

        projectId = page
            .replace(".html", "")
            .toLowerCase();
    }

    if (!projectId) {
        return;
    }

    try {
        const response = await fetch("../data/case-studies.json");

        if (!response.ok) {
            throw new Error("Unable to load case-studies.json");
        }

        const projects = await response.json();

        if (!Array.isArray(projects) || projects.length === 0) {
            throw new Error("No case-study projects were found.");
        }

        const currentProjectIndex = projects.findIndex(
            project => project.id === projectId
        );

        if (currentProjectIndex === -1) {
            showProjectNotFound(projectId);
            return;
        }

        const project = projects[currentProjectIndex];

        document.title =
            `${project.title} | Echo Craft Creative Studio`;

        // ---------------------------------
        // Main Project Information
        // ---------------------------------

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

        // ---------------------------------
        // Showcase Hero
        // ---------------------------------

        loadHeroImage(project);

        // ---------------------------------
        // Featured Commercial
        // ---------------------------------

        loadFeaturedCommercial(project);

        // ---------------------------------
        // Services
        // ---------------------------------

        loadServices(project);

        // ---------------------------------
        // Previous / Portfolio / Next
        // ---------------------------------

        loadProjectNavigation(
            projects,
            currentProjectIndex
        );

        // ---------------------------------
        // Explore More Projects
        // ---------------------------------

        loadExploreProjects(
            projects,
            currentProjectIndex
        );
    } catch (error) {
        console.error("Case Study Error:", error);

        showLoadingError();
    }
});


// =========================================
// Hero Image
// =========================================

function loadHeroImage(project) {
    const heroImage = document.getElementById("heroImage");

    if (!heroImage || !project.heroImage) {
        return;
    }

    heroImage.src = project.heroImage;
    heroImage.alt = project.title;
}


// =========================================
// Featured YouTube Commercial
// =========================================

function loadFeaturedCommercial(project) {
    const featuredContainer =
        document.querySelector(".featuredCommercial");

    if (
        !featuredContainer ||
        !project.youtubeId
    ) {
        return;
    }

    featuredContainer.innerHTML = `
        <div class="videoPlayer">

            <img
                src="${escapeAttribute(project.heroImage)}"
                alt="${escapeAttribute(project.title)}"
                class="videoPoster"
            >

            <button
                class="playCommercial"
                id="playCommercial"
                type="button"
                aria-label="Watch ${escapeAttribute(project.title)} commercial"
            >

                <div class="playCircle">
                    <i class="fa-solid fa-play"></i>
                </div>

                <span>Watch Commercial</span>

            </button>

        </div>
    `;

    const playButton =
        document.getElementById("playCommercial");

    if (!playButton) {
        return;
    }

    playButton.addEventListener("click", () => {
        featuredContainer.innerHTML = `
            <iframe
                width="100%"
                height="650"
                src="https://www.youtube.com/embed/${encodeURIComponent(project.youtubeId)}?autoplay=1&rel=0"
                title="${escapeAttribute(project.title)}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            >
            </iframe>
        `;
    });
}


// =========================================
// Services Grid
// =========================================

function loadServices(project) {
    const servicesGrid =
        document.getElementById("servicesGrid");

    if (!servicesGrid) {
        return;
    }

    servicesGrid.innerHTML = "";

    if (!Array.isArray(project.services)) {
        return;
    }

    project.services.forEach(service => {
        const serviceCard =
            document.createElement("article");

        serviceCard.className = "serviceCard";

        serviceCard.innerHTML = `
            <div class="serviceIcon">
                <i class="fa-solid fa-check"></i>
            </div>

            <h3>${escapeHtml(service)}</h3>
        `;

        servicesGrid.appendChild(serviceCard);
    });
}


// =========================================
// Previous / Portfolio / Next Navigation
// =========================================

function loadProjectNavigation(
    projects,
    currentProjectIndex
) {
    const previousProjectIndex =
        currentProjectIndex === 0
            ? projects.length - 1
            : currentProjectIndex - 1;

    const nextProjectIndex =
        currentProjectIndex === projects.length - 1
            ? 0
            : currentProjectIndex + 1;

    const previousProject =
        projects[previousProjectIndex];

    const nextProject =
        projects[nextProjectIndex];

    let navigationContainer =
        document.getElementById("projectNavigation");

    if (!navigationContainer) {
        navigationContainer =
            document.createElement("nav");

        navigationContainer.id =
            "projectNavigation";

        navigationContainer.className =
            "projectNavigation";

        navigationContainer.setAttribute(
            "aria-label",
            "Case study navigation"
        );

        const exploreSection =
            findExploreSection();

        const ctaSection =
            findCtaSection();

        if (
            exploreSection &&
            exploreSection.parentNode
        ) {
            exploreSection.parentNode.insertBefore(
                navigationContainer,
                exploreSection
            );
        } else if (
            ctaSection &&
            ctaSection.parentNode
        ) {
            ctaSection.parentNode.insertBefore(
                navigationContainer,
                ctaSection
            );
        } else {
            const main =
                document.querySelector("main");

            if (main) {
                main.appendChild(
                    navigationContainer
                );
            }
        }
    }

    navigationContainer.innerHTML = `
        <div class="projectNavigationInner">

            <a
                href="showcase.html?id=${encodeURIComponent(previousProject.id)}"
                class="projectNavLink projectNavPrevious"
                aria-label="View previous project: ${escapeAttribute(previousProject.title)}"
            >

                <span class="projectNavDirection">
                    <i class="fa-solid fa-arrow-left"></i>
                    Previous Project
                </span>

                <strong>
                    ${escapeHtml(previousProject.title)}
                </strong>

            </a>

            <a
                href="../portfolio.html"
                class="projectNavPortfolio"
            >
                <i class="fa-solid fa-border-all"></i>
                <span>Back To Portfolio</span>
            </a>

            <a
                href="showcase.html?id=${encodeURIComponent(nextProject.id)}"
                class="projectNavLink projectNavNext"
                aria-label="View next project: ${escapeAttribute(nextProject.title)}"
            >

                <span class="projectNavDirection">
                    Next Project
                    <i class="fa-solid fa-arrow-right"></i>
                </span>

                <strong>
                    ${escapeHtml(nextProject.title)}
                </strong>

            </a>

        </div>
    `;

        const quickNavigationContainer =
        document.getElementById(
            "projectQuickNavigation"
        );

    if (quickNavigationContainer) {
        quickNavigationContainer.innerHTML = `
            <a
                href="showcase.html?id=${encodeURIComponent(previousProject.id)}"
                class="projectQuickLink projectQuickPrevious"
                aria-label="View previous project: ${escapeAttribute(previousProject.title)}"
            >

                <i class="fa-solid fa-arrow-left"></i>

                <span>
                    Previous
                </span>

                <strong>
                    ${escapeHtml(previousProject.title)}
                </strong>

            </a>

            <a
                href="../portfolio.html"
                class="projectQuickPortfolio"
                aria-label="Return to portfolio"
            >

                <i class="fa-solid fa-border-all"></i>

                <span>
                    All Projects
                </span>

            </a>

            <a
                href="showcase.html?id=${encodeURIComponent(nextProject.id)}"
                class="projectQuickLink projectQuickNext"
                aria-label="View next project: ${escapeAttribute(nextProject.title)}"
            >

                <span>
                    Next
                </span>

                <strong>
                    ${escapeHtml(nextProject.title)}
                </strong>

                <i class="fa-solid fa-arrow-right"></i>

            </a>
        `;
    }

}


// =========================================
// Explore More Projects
// =========================================

function loadExploreProjects(
    projects,
    currentProjectIndex
) {
    const currentProject =
        projects[currentProjectIndex];

    const remainingProjects =
        projects.filter(
            project =>
                project.id !== currentProject.id
        );

    const selectedProjects =
        getExploreProjects(
            remainingProjects,
            currentProjectIndex,
            3
        );

    let exploreGrid =
        document.getElementById("exploreProjectsGrid");

    if (!exploreGrid) {
        exploreGrid =
            findExistingExploreGrid();
    }

    if (!exploreGrid) {
        const exploreSection =
            findExploreSection();

        if (exploreSection) {
            exploreGrid =
                document.createElement("div");

            exploreGrid.id =
                "exploreProjectsGrid";

            exploreGrid.className =
                "exploreProjectsGrid";

            exploreSection.appendChild(
                exploreGrid
            );
        }
    }

    if (!exploreGrid) {
        return;
    }

    exploreGrid.id = "exploreProjectsGrid";
    exploreGrid.classList.add(
        "exploreProjectsGrid"
    );

    exploreGrid.innerHTML = "";

    selectedProjects.forEach(project => {
        const cardLink =
            document.createElement("a");

        cardLink.href =
            `showcase.html?id=${encodeURIComponent(project.id)}`;

        cardLink.className =
            "exploreProjectCard";

        cardLink.setAttribute(
            "aria-label",
            `View ${project.title}`
        );

        cardLink.innerHTML = `
            <article class="exploreProjectCardInner">

                <div class="exploreProjectImage">

                    <img
                        src="${escapeAttribute(project.heroImage)}"
                        alt="${escapeAttribute(project.title)}"
                        loading="lazy"
                    >

                    <div class="exploreProjectOverlay">

                        <span class="exploreProjectButton">
                            View Project
                            <i class="fa-solid fa-arrow-right"></i>
                        </span>

                    </div>

                </div>

                <div class="exploreProjectContent">

                    <span class="exploreProjectCategory">
                        ${escapeHtml(project.category || "")}
                    </span>

                    <h3>
                        ${escapeHtml(project.title)}
                    </h3>

                </div>

            </article>
        `;

        exploreGrid.appendChild(cardLink);
    });
}


// =========================================
// Select Three Explore Projects
// =========================================

function getExploreProjects(
    remainingProjects,
    currentProjectIndex,
    amount
) {
    if (remainingProjects.length <= amount) {
        return remainingProjects;
    }

    const startIndex =
        currentProjectIndex %
        remainingProjects.length;

    const selectedProjects = [];

    for (
        let offset = 0;
        offset < remainingProjects.length;
        offset++
    ) {
        const project =
            remainingProjects[
                (startIndex + offset) %
                remainingProjects.length
            ];

        if (
            !selectedProjects.some(
                selected =>
                    selected.id === project.id
            )
        ) {
            selectedProjects.push(project);
        }

        if (
            selectedProjects.length === amount
        ) {
            break;
        }
    }

    return selectedProjects;
}


// =========================================
// Find Existing Explore Section
// =========================================

function findExploreSection() {
    return (
        document.getElementById(
            "exploreProjects"
        ) ||
        document.querySelector(
            ".exploreProjects"
        ) ||
        document.querySelector(
            ".exploreMoreProjects"
        ) ||
        document.querySelector(
            ".moreProjects"
        ) ||
        document.querySelector(
            "[data-explore-projects]"
        )
    );
}


// =========================================
// Find Existing Explore Grid
// =========================================

function findExistingExploreGrid() {
    const selectors = [
        "#exploreProjectsGrid",
        ".exploreProjectsGrid",
        ".exploreGrid",
        ".projectsGrid",
        ".moreProjectsGrid",
        "[data-project-grid]"
    ];

    for (const selector of selectors) {
        const element =
            document.querySelector(selector);

        if (element) {
            return element;
        }
    }

    return null;
}


// =========================================
// Find CTA Section
// =========================================

function findCtaSection() {
    return (
        document.getElementById(
            "caseStudyCta"
        ) ||
        document.querySelector(
            ".caseStudyCta"
        ) ||
        document.querySelector(
            ".ctaSection"
        ) ||
        document.querySelector(
            ".projectCta"
        )
    );
}


// =========================================
// Project Not Found
// =========================================

function showProjectNotFound(projectId) {
    document.body.innerHTML = `
        <main
            style="
                min-height:100vh;
                display:flex;
                align-items:center;
                justify-content:center;
                padding:60px 24px;
                text-align:center;
                color:white;
                background:#080808;
            "
        >

            <div>

                <p
                    style="
                        color:#caa85e;
                        letter-spacing:0.18em;
                        text-transform:uppercase;
                    "
                >
                    Echo Craft Creative Studio
                </p>

                <h1>
                    Project Not Found
                </h1>

                <p>
                    No case study exists for
                    "<strong>${escapeHtml(projectId)}</strong>".
                </p>

                <a
                    href="../portfolio.html"
                    style="
                        display:inline-block;
                        margin-top:24px;
                        padding:14px 24px;
                        color:#080808;
                        background:#caa85e;
                        text-decoration:none;
                        font-weight:700;
                    "
                >
                    Back To Portfolio
                </a>

            </div>

        </main>
    `;
}


// =========================================
// Loading Error
// =========================================

function showLoadingError() {
    const main =
        document.querySelector("main");

    if (!main) {
        return;
    }

    main.innerHTML = `
        <section
            style="
                padding:100px 24px;
                text-align:center;
                color:white;
            "
        >

            <h1>
                Unable To Load This Project
            </h1>

            <p>
                Please refresh the page or return
                to the portfolio.
            </p>

            <a <a href="../portfolio.html">
    Back To Portfolio
</a>

        </section>
    `;
}


// =========================================
// Set Text Safely
// =========================================

function setText(id, value) {
    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }

    element.textContent =
        value ?? "";
}


// =========================================
// Escape HTML
// =========================================

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}


// =========================================
// Escape HTML Attributes
// =========================================

function escapeAttribute(value) {
    return escapeHtml(value);
}
