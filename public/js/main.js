document.addEventListener("DOMContentLoaded", () => {
  initializeAnimations();
});

// Add this new event listener for page show events
window.addEventListener("pageshow", (event) => {
  // Check if the page is being loaded from the cache
  if (event.persisted) {
    initializeAnimations();
  }
});

function initializeAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animations
  gsap.from(".hero h1", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".hero p", {
    opacity: 0,
    y: -30,
    duration: 1,
    delay: 0.3,
    ease: "power3.out",
  });

  // Card animations
  const cards = document.querySelectorAll(".card");
  gsap.from(cards, {
    opacity: 0,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".cards",
      start: "top 80%",
    },
  });

  // Card hover and click animations
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
    card.addEventListener("click", () => {
      const link = card.getAttribute("data-link");
      if (link) {
        gsap.to(card, {
          scale: 0.95,
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            window.location.href = link;
          },
        });
      }
    });
  });

  // Registered people page animations
  if (document.querySelector(".registered-people")) {
    initializeRegisteredPeopleAnimations();
  }

  // About page animations
  if (document.querySelector(".about")) {
    initializeAboutPageAnimations();
  }

  // Contact page animations
  if (document.querySelector(".contact")) {
    initializeContactPageAnimations();
  }

  // Problem statements page animations
  if (document.querySelector(".problem-statements")) {
    initializeProblemStatementsAnimations();
  }
}

function initializeRegisteredPeopleAnimations() {
  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const tableBody = document.getElementById("tableBody");

  if (!searchInput || !sortSelect || !tableBody) {
    console.error("Required elements not found");
    return;
  }

  // Store the original table data
  const originalData = Array.from(tableBody.querySelectorAll("tr")).map(
    (row) => ({
      element: row,
      teamName: row.cells[1]?.textContent.toLowerCase() || "",
      leaderName: row.cells[2]?.textContent.toLowerCase() || "",
      phoneNumber: row.cells[3]?.textContent || "",
      teamSize: parseInt(row.cells[5]?.textContent) || 0,
    })
  );

  // Search functionality
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterAndSortTable(searchTerm, sortSelect.value);
  });

  // Sort functionality
  sortSelect.addEventListener("change", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterAndSortTable(searchTerm, sortSelect.value);
  });

  function filterAndSortTable(searchTerm, sortBy) {
    const filteredData = originalData.filter(
      (row) =>
        row.teamName.includes(searchTerm) ||
        row.leaderName.includes(searchTerm) ||
        row.phoneNumber.includes(searchTerm)
    );

    filteredData.sort((a, b) => {
      switch (sortBy) {
        case "teamName":
          return a.teamName.localeCompare(b.teamName);
        case "leaderName":
          return a.leaderName.localeCompare(b.leaderName);
        case "phoneNumber":
          return a.phoneNumber.localeCompare(b.phoneNumber);
        case "teamSize":
          return a.teamSize - b.teamSize;
        default:
          return 0;
      }
    });

    // Clear the table body
    tableBody.innerHTML = "";

    if (filteredData.length === 0) {
      const noDataRow = document.createElement("tr");
      const noDataCell = document.createElement("td");
      noDataCell.colSpan = 6;
      noDataCell.textContent = "No matching data found";
      noDataRow.appendChild(noDataCell);
      tableBody.appendChild(noDataRow);
    } else {
      // Append sorted and filtered rows
      filteredData.forEach((row, index) => {
        const newRow = row.element.cloneNode(true);
        newRow.cells[0].textContent = index + 1; // Update serial number
        tableBody.appendChild(newRow);
      });
    }

    // Animate new rows
    gsap.from(tableBody.querySelectorAll("tr"), {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.out",
    });
  }

  // Initial sort
  filterAndSortTable("", sortSelect.value);
}

function initializeAboutPageAnimations() {
  gsap.from(".about h1", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".founder-row .person", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  });

  gsap.from(".leadership-row .person", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.4,
    ease: "power3.out",
  });

  gsap.from(".students-row .person", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.6,
    ease: "power3.out",
  });
}

function initializeContactPageAnimations() {
  gsap.from(".contact h1", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: "power3.out",
  });

  gsap.from(".contact-item", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out",
  });

  gsap.from(".social-icon", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    delay: 0.4,
    ease: "power3.out",
  });
}

function initializeProblemStatementsAnimations() {
  gsap.from(".problem-statements h1", {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: "power3.out",
  });
  gsap.from(".modern-table", {
    opacity: 0,
    y: 30,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  });
  gsap.from(".modern-table tr", {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.4,
  });
}
