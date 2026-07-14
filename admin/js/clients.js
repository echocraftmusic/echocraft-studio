/*
==========================================================
EC FRAMEWORK
CLIENTS PAGE CONTROLLER
Version 1.0
==========================================================
*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("newClientForm");
    const tableBody = document.getElementById("clientTableBody");
    const searchInput = document.getElementById("clientSearch");
    const filterButtons = document.querySelectorAll(".filterButton");

    let activeFilter = "all";

    if (!form || !tableBody) {
        return;
    }

    form.addEventListener("submit", event => {

        event.preventDefault();

        const name = document
            .getElementById("clientName")
            .value
            .trim();

        const company = document
            .getElementById("clientCompany")
            .value
            .trim();

        const email = document
            .getElementById("clientEmail")
            .value
            .trim();

        const phone = document
            .getElementById("clientPhone")
            .value
            .trim();

        if (!name) {

            if (window.ecNotify) {

                window.ecNotify.warning(
                    "Client Name Required",
                    "Enter a client name before saving."
                );

            }

            return;
        }

        if (!window.ecCreate || !window.ecClients) {

            console.error("EC client engines are not available.");

            return;
        }

        window.ecCreate.client({

            name,
            company,
            email,
            phone,
            status: "Lead",
            referralSource: "Direct"

        });

        form.reset();

        if (window.ecModal) {

            window.ecModal.close(
                document.getElementById("newClientModal")
            );

        }

        if (window.ecNotify) {

            window.ecNotify.success(
                "Client Added",
                `${name} was added successfully.`
            );

        }

        renderClients();

    });

    if (searchInput) {

        searchInput.addEventListener("input", renderClients);

    }

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(item =>
                item.classList.remove("active")
            );

            button.classList.add("active");

            activeFilter = button.dataset.filter || "all";

            renderClients();

        });

    });

    document.addEventListener("click", event => {

        const addButton = event.target.closest(
            ".primaryAction"
        );

        if (
            addButton &&
            (
                addButton.textContent.includes("New Client") ||
                addButton.textContent.includes("Add First Client")
            )
        ) {

            if (window.ecModal) {

                window.ecModal.open("newClientModal");

            }

        }

        const deleteButton = event.target.closest(
            "[data-delete-client]"
        );

        if (deleteButton) {

            const id = deleteButton.dataset.deleteClient;

            const client = window.ecClients.get(id);

            if (!client) return;

            const confirmed = window.confirm(
                `Delete ${client.name}?`
            );

            if (!confirmed) return;

            if (window.ecDelete) {

                window.ecDelete.client(id);

            } else {

                window.ecClients.delete(id);

            }

            if (window.ecNotify) {

                window.ecNotify.info(
                    "Client Deleted",
                    `${client.name} was removed.`
                );

            }

            renderClients();

        }

    });

    renderClients();

    function renderClients() {

        const clients = window.ecClients
            ? window.ecClients.getAll()
            : [];

        const searchTerm = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const filteredClients = clients.filter(client => {

            const matchesSearch =
                !searchTerm ||
                (client.name || "")
                    .toLowerCase()
                    .includes(searchTerm) ||
                (client.company || "")
                    .toLowerCase()
                    .includes(searchTerm) ||
                (client.email || "")
                    .toLowerCase()
                    .includes(searchTerm);

            const status = (client.status || "Lead")
                .toLowerCase();

            const matchesFilter =
                activeFilter === "all" ||
                status === activeFilter;

            return matchesSearch && matchesFilter;

        });

        updateStats(clients);

        if (filteredClients.length === 0) {

            tableBody.innerHTML = `

                <tr class="emptyTableRow">

                    <td colspan="7">

                        <div class="emptyState">

                            <div class="emptyStateIcon">

                                <i class="fa-solid fa-users"></i>

                            </div>

                            <h3>No Clients Found</h3>

                            <p>

                                Add a new client or adjust your search and filters.

                            </p>

                            <button
                                type="button"
                                class="primaryAction"
                                data-modal="newClientModal">

                                <i class="fa-solid fa-plus"></i>

                                Add First Client

                            </button>

                        </div>

                    </td>

                </tr>

            `;

            return;

        }

        tableBody.innerHTML = filteredClients
            .map(client => {

                const updated = client.updated || client.created;

                const updatedDate = updated
                    ? new Date(updated).toLocaleDateString()
                    : "—";

                return `

                    <tr>

                        <td>

                            <strong>${escapeHTML(client.name || "Unnamed Client")}</strong>

                            <div class="clientEmail">

                                ${escapeHTML(client.email || "No email")}

                            </div>

                        </td>

                        <td>

                            ${escapeHTML(client.company || "—")}

                        </td>

                        <td>

                            <span class="clientStatus clientStatus-${escapeHTML(
                                (client.status || "Lead").toLowerCase()
                            )}">

                                ${escapeHTML(client.status || "Lead")}

                            </span>

                        </td>

                        <td>

                            0

                        </td>

                        <td>

                            ${escapeHTML(client.referralSource || "Direct")}

                        </td>

                        <td>

                            ${updatedDate}

                        </td>

                        <td>

                            <button
                                type="button"
                                class="ec-action-btn"
                                data-delete-client="${client.id}"
                                aria-label="Delete client">

                                <i class="fa-solid fa-trash"></i>

                            </button>

                        </td>

                    </tr>

                `;

            })
            .join("");

    }

    function updateStats(clients) {

        const total = clients.length;

        const leads = clients.filter(
            client =>
                (client.status || "").toLowerCase() === "lead"
        ).length;

        const active = clients.filter(
            client =>
                (client.status || "").toLowerCase() === "active"
        ).length;

        const completed = clients.filter(
            client =>
                (client.status || "").toLowerCase() === "completed"
        ).length;

        const statValues = document.querySelectorAll(
            ".clientStatCard strong"
        );

        if (statValues[0]) statValues[0].textContent = total;
        if (statValues[1]) statValues[1].textContent = leads;
        if (statValues[2]) statValues[2].textContent = active;
        if (statValues[3]) statValues[3].textContent = completed;

    }

    function escapeHTML(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }

});