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
 * Mobile Menu Management
 */
function toggleMobileMenu() {
	const mobileMenuBtn = document.getElementById(
		"mobileMenuBtn"
	);
	const navMobileMenu = document.getElementById(
		"navMobileMenu"
	);

	if (mobileMenuBtn && navMobileMenu) {
		mobileMenuBtn.classList.toggle("active");
		navMobileMenu.classList.toggle("active");
	}
}

function closeMobileMenu() {
	const mobileMenuBtn = document.getElementById(
		"mobileMenuBtn"
	);
	const navMobileMenu = document.getElementById(
		"navMobileMenu"
	);

	if (mobileMenuBtn && navMobileMenu) {
		mobileMenuBtn.classList.remove("active");
		navMobileMenu.classList.remove("active");
	}
}

/**
 * Initialize mobile menu listeners
 */
function initMobileMenu() {
	const mobileMenuBtn = document.getElementById(
		"mobileMenuBtn"
	);
	const navMobileMenu = document.getElementById(
		"navMobileMenu"
	);

	if (mobileMenuBtn) {
		mobileMenuBtn.addEventListener(
			"click",
			toggleMobileMenu
		);
	}

	// Close menu when clicking on nav links
	if (navMobileMenu) {
		const links =
			navMobileMenu.querySelectorAll("a");
		links.forEach((link) => {
			link.addEventListener(
				"click",
				closeMobileMenu
			);
		});
	}

	// Close menu when clicking outside
	document.addEventListener(
		"click",
		function (event) {
			const navbar =
				document.querySelector(".navbar");
			if (
				navbar &&
				!navbar.contains(event.target)
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
			if (window.innerWidth > 768) {
				closeMobileMenu();
			}
		}, 100);
	});

	// Also check on initial load to ensure menu is closed on desktop
	if (window.innerWidth > 768) {
		closeMobileMenu();
	}
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

// Close modal when clicking outside content
document.addEventListener(
	"DOMContentLoaded",
	function () {
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
						if (
							modal.classList.contains("show")
						) {
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

		// Mobile menu toggle
		setupMobileMenu();

		// Smooth scrolling for nav links
		setupSmoothScroll();

		// Animate elements on scroll
		setupScrollAnimations();
	}
);

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

	// In production, you would send this data to a server
	console.log(
		`${formType} Form Data:`,
		Object.fromEntries(formData)
	);
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

	// In production, you would send this to a server
	console.log("Newsletter subscription:", email);
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
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
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
// Mobile Menu
// ============================================

function setupMobileMenu() {
	const mobileMenuBtn = document.querySelector(
		".mobile-menu-btn"
	);
	const navMobileMenu = document.querySelector(
		".nav-mobile-menu"
	);

	if (!mobileMenuBtn || !navMobileMenu) return;

	// Toggle menu on button click
	mobileMenuBtn.addEventListener(
		"click",
		function (e) {
			e.stopPropagation();
			toggleMobileMenu();
		}
	);

	// Close menu when clicking on nav links
	const navLinks = navMobileMenu.querySelectorAll(
		".nav-link-mobile, .nav-cta-mobile"
	);
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			closeMobileMenu();
		});
	});

	// Close menu when clicking outside navbar
	document.addEventListener(
		"click",
		function (event) {
			const navbar =
				document.querySelector(".navbar");
			if (
				navbar &&
				!navbar.contains(event.target)
			) {
				closeMobileMenu();
			}
		}
	);
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
		rootMargin: "0px 0px -100px 0px",
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
			".step-card, .benefit-card, .benefit-item, .testimonial-card, .tip-card, .scenario-card, .option, .how-it-works-step, .education-tip, section"
		);

	elementsToObserve.forEach((el) => {
		observer.observe(el);
	});

	// Add animation styles
	const animationStyle =
		document.createElement("style");
	animationStyle.textContent = `
        .step-card, 
        .benefit-card,
        .benefit-item, 
        .testimonial-card, 
        .tip-card, 
        .scenario-card,
        .option,
        .how-it-works-step,
        .education-tip,
        section {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .step-card.animate-in,
        .benefit-card.animate-in,
        .benefit-item.animate-in,
        .testimonial-card.animate-in,
        .tip-card.animate-in,
        .scenario-card.animate-in,
        .option.animate-in,
        .how-it-works-step.animate-in,
        .education-tip.animate-in,
        section.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
	document.head.appendChild(animationStyle);
}

// ============================================
// Utility Functions
// ============================================

/**
 * Format a date in a user-friendly way
 */
function formatDate(date) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return new Date(date).toLocaleDateString(
		"en-US",
		options
	);
}

/**
 * Check if an element is in viewport
 */
function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <=
			(window.innerHeight ||
				document.documentElement.clientHeight) &&
		rect.right <=
			(window.innerWidth ||
				document.documentElement.clientWidth)
	);
}

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

// Track CTA clicks
document.addEventListener(
	"click",
	function (event) {
		if (
			event.target.closest(
				".btn-primary, .btn-secondary"
			)
		) {
			const buttonText = event.target.textContent;
			console.log("CTA Clicked:", buttonText);
			// In production, send to analytics service
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
			if (maxScrollPercentage % 25 === 0) {
				console.log(
					"Scroll Depth:",
					maxScrollPercentage + "%"
				);
				// In production, send to analytics service
			}
		}
	}, 250)
);

// ============================================
// Performance Optimizations
// ============================================

// Lazy load images if needed
if ("IntersectionObserver" in window) {
	const imageObserver = new IntersectionObserver(
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

// ============================================
// Dark Mode Support (Optional)
// ============================================

function initDarkMode() {
	const prefersDark = window.matchMedia(
		"(prefers-color-scheme: dark)"
	);

	prefersDark.addEventListener("change", (e) => {
		if (e.matches) {
			document.documentElement.style.colorScheme =
				"dark";
			// Apply dark mode styles
		} else {
			document.documentElement.style.colorScheme =
				"light";
			// Apply light mode styles
		}
	});
}

// Uncomment to enable dark mode support
// initDarkMode();

console.log(
	"SmartCare Home Landing Page - Scripts Loaded Successfully"
);
