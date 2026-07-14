document.addEventListener("DOMContentLoaded", async () => {

    const portfolioContainer = document.getElementById("portfolioProjects");

    if (!portfolioContainer) return;

    try {

        const response = await fetch("data/portfolio.json");
        const projects = await response.json();

        portfolioContainer.innerHTML = "";

        projects.forEach(project => {

            portfolioContainer.insertAdjacentHTML("beforeend", `

                <article class="portfolio-card">

                    <div class="portfolio-thumb">

                        <img
                            src="${project.thumbnail}"
                            alt="${project.title}">

                    </div>

                    <div class="portfolio-card-content">

                        <span class="portfolio-category">
                            ${project.category}
                        </span>

                        <h3>${project.title}</h3>

                        <p>${project.description}</p>

                        <a
                            href="${project.url}"
                            class="primaryButton">

                            View Project

                        </a>

                    </div>

                </article>

            `);

        });

    } catch (error) {

        console.error("Portfolio could not be loaded.", error);

    }

});
