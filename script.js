// ============================================
// Navigation & Scroll Functions
// ============================================

/**
 * Scroll to a specific section
 */
function scrollToSection(sectionId) {
	const section =
		document.getElementById(sectionId);
	if (section) {
		// Close mobile menu if open
		closeMobileMenu();

		// Scroll to section with smooth behavior
		section.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});

		// Track analytics if available
		if (window.gtag) {
			gtag("event", "navigation_click", {
				section: sectionId,
			});
		}
	}
}

/**
 * Scroll to top when logo is clicked
 */
function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}

/**
 * Mobile Menu Management
 */
function toggleMobileMenu() {
	const hamburger = document.getElementById(
		"mobileMenuBtn"
	);
	const navMenu =
		document.getElementById("navMenu");
	const navOverlay =
		document.getElementById("navOverlay");

	if (hamburger && navMenu) {
		hamburger.classList.toggle("active");
		navMenu.classList.toggle("active");
		if (navOverlay)
			navOverlay.classList.toggle("active");

		document.body.classList.toggle("no-scroll");
		document.documentElement.classList.toggle(
			"no-scroll"
		);
	}
}

function closeMobileMenu() {
	const hamburger = document.getElementById(
		"mobileMenuBtn"
	);
	const navMenu =
		document.getElementById("navMenu");
	const navOverlay =
		document.getElementById("navOverlay");

	if (hamburger && navMenu) {
		hamburger.classList.remove("active");
		navMenu.classList.remove("active");
		if (navOverlay)
			navOverlay.classList.remove("active");

		document.body.classList.remove("no-scroll");
		document.documentElement.classList.remove(
			"no-scroll"
		);
	}
}

/**
 * Initialize mobile menu listeners
 */
function initMobileMenu() {
	const hamburger = document.getElementById(
		"mobileMenuBtn"
	);
	const navMenu =
		document.getElementById("navMenu");
	const navOverlay =
		document.getElementById("navOverlay");

	if (hamburger) {
		hamburger.removeEventListener(
			"click",
			toggleMobileMenu
		);
		hamburger.addEventListener(
			"click",
			toggleMobileMenu
		);
	}

	if (navOverlay) {
		navOverlay.addEventListener(
			"click",
			closeMobileMenu
		);
	}

	// Close menu when clicking on nav links
	if (navMenu) {
		const links =
			navMenu.querySelectorAll(".nav-link");
		links.forEach((link) => {
			link.addEventListener(
				"click",
				closeMobileMenu
			);
		});
	}

	// Close menu when clicking outside (fallback)
	document.addEventListener(
		"click",
		function (event) {
			const navbar =
				document.querySelector(".navbar");
			const navMenu =
				document.getElementById("navMenu");

			// If menu is active and click is outside navbar (and not on overlay which is handled above)
			if (
				navbar &&
				!navbar.contains(event.target) &&
				navMenu &&
				navMenu.classList.contains("active")
			) {
				closeMobileMenu();
			}
		}
	);

	// Close menu on window resize if switching to desktop
	let resizeTimeout;
	window.addEventListener("resize", function () {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			if (window.innerWidth > 1100) {
				closeMobileMenu();
			}
		}, 100);
	});
}

/**
 * Navbar Scroll Effect
 */
function initNavbarScroll() {
	const navbar =
		document.getElementById("navbar");
	if (!navbar) return;

	window.addEventListener("scroll", function () {
		if (window.scrollY > 50) {
			navbar.classList.add("scrolled");
		} else {
			navbar.classList.remove("scrolled");
		}
	});
}

// ============================================
// Modal Management
// ============================================

function openModal(modalType) {
	const modalId = `${modalType}Modal`;
	const modal = document.getElementById(modalId);
	if (modal) {
		modal.classList.add("show");
		document.body.style.overflow = "hidden";
	}
}

function closeModal(modalType) {
	const modalId = `${modalType}Modal`;
	const modal = document.getElementById(modalId);
	if (modal) {
		modal.classList.remove("show");
		document.body.style.overflow = "auto";
	}
}

function initModals() {
	const modals =
		document.querySelectorAll(".modal");

	modals.forEach((modal) => {
		modal.addEventListener(
			"click",
			function (event) {
				if (event.target === this) {
					const modalType = this.id.replace(
						"Modal",
						""
					);
					closeModal(modalType);
				}
			}
		);
	});

	// Close modal with Escape key
	document.addEventListener(
		"keydown",
		function (event) {
			if (event.key === "Escape") {
				modals.forEach((modal) => {
					if (modal.classList.contains("show")) {
						const modalType = modal.id.replace(
							"Modal",
							""
						);
						closeModal(modalType);
					}
				});
			}
		}
	);
}

// ============================================
// Form Handling
// ============================================

function handleFormSubmit(event, formType) {
	event.preventDefault();

	// Get form data
	const form = event.target;
	const formData = new FormData(form);

	// Simulate form submission
	showNotification(
		`Thank you! We've received your ${formType} request. We'll be in touch soon!`,
		"success"
	);

	// Reset form
	form.reset();

	// Close modal
	closeModal(formType);
}

function handleNewsletter(event) {
	event.preventDefault();

	const form = event.target;
	const email = form.querySelector(
		'input[type="email"]'
	).value;

	showNotification(
		`Welcome to our safety community! Check your email at ${email} to confirm your subscription.`,
		"success"
	);

	form.reset();
}

// ============================================
// Notifications
// ============================================

function showNotification(
	message,
	type = "info"
) {
	const notification =
		document.createElement("div");
	notification.className = `notification notification-${type}`;
	notification.textContent = message;

	// Add styles dynamically
	notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${
					type === "success"
						? "#00b894"
						: "#0066cc"
				};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
        max-width: 400px;
    `;

	document.body.appendChild(notification);

	// Add animation
	const style = document.createElement("style");
	style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
	if (
		!document.querySelector(
			"style[data-notification-styles]"
		)
	) {
		style.setAttribute(
			"data-notification-styles",
			""
		);
		document.head.appendChild(style);
	}

	// Remove notification after 4 seconds
	setTimeout(() => {
		notification.style.animation =
			"slideOutRight 0.3s ease forwards";
		setTimeout(() => {
			notification.remove();
		}, 300);
	}, 4000);
}

// ============================================
// Smooth Scroll
// ============================================

function setupSmoothScroll() {
	document
		.querySelectorAll('a[href^="#"]')
		.forEach((anchor) => {
			anchor.addEventListener(
				"click",
				function (e) {
					const href = this.getAttribute("href");
					if (href === "#") return;

					e.preventDefault();
					const target =
						document.querySelector(href);
					if (target) {
						target.scrollIntoView({
							behavior: "smooth",
							block: "start",
						});
					}
				}
			);
		});
}

// ============================================
// Scroll Animations
// ============================================

function setupScrollAnimations() {
	// Use Intersection Observer for better performance
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px",
	};

	const observer = new IntersectionObserver(
		function (entries) {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add(
						"animate-in"
					);
					observer.unobserve(entry.target);
				}
			});
		},
		observerOptions
	);

	// Observe all cards, sections, and main content areas
	const elementsToObserve =
		document.querySelectorAll(
			".process-step, .use-case-card, .step-card, .benefit-card, .benefit-item, .testimonial-card, .tip-card, .scenario-card, .cta-card, .how-it-works-step, .education-tip, .section-header, .hero-content > *, .hero-image-container, .benefit-row, .resource-card, .resource-cta, .trust-badges, .footer-cta"
		);

	elementsToObserve.forEach((el) => {
		observer.observe(el);
	});
}

// ============================================
// Utility Functions
// ============================================

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
	let timeout;
	return function executedFunction(...args) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

// ============================================
// Analytics & Event Tracking
// ============================================

function initAnalytics() {
	// Track CTA clicks
	document.addEventListener(
		"click",
		function (event) {
			if (
				event.target.closest(
					".btn-primary, .btn-secondary"
				)
			) {
				const buttonText =
					event.target.textContent;
			}
		}
	);

	// Track scroll depth
	let maxScrollPercentage = 0;
	window.addEventListener(
		"scroll",
		debounce(function () {
			const scrollTop = window.scrollY;
			const docHeight =
				document.documentElement.scrollHeight -
				window.innerHeight;
			const scrollPercent = Math.round(
				(scrollTop / docHeight) * 100
			);

			if (scrollPercent > maxScrollPercentage) {
				maxScrollPercentage = scrollPercent;
			}
		}, 250)
	);
}

// ============================================
// Performance Optimizations
// ============================================

function initLazyLoading() {
	if ("IntersectionObserver" in window) {
		const imageObserver =
			new IntersectionObserver(
				(entries, observer) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							const img = entry.target;
							if (img.dataset.src) {
								img.src = img.dataset.src;
								img.removeAttribute("data-src");
							}
							observer.unobserve(img);
						}
					});
				}
			);

		document
			.querySelectorAll("img[data-src]")
			.forEach((img) => {
				imageObserver.observe(img);
			});
	}
}

// ============================================
// Main Initialization
// ============================================

document.addEventListener(
	"DOMContentLoaded",
	function () {
		initMobileMenu();
		initNavbarScroll();
		initModals();
		setupSmoothScroll();
		setupScrollAnimations();
		initAnalytics();
		initLazyLoading();
	}
);
