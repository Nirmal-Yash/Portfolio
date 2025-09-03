// Import portfolio data and components
import { portfolioData } from '../data/portfolio-data.js';
import { SkillsGraph } from './skills-graph.js';
import { CertificationsSlider } from './certifications-slider.js';

// Main JavaScript functionality
class CyberPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isAnimating = false;
        this.portfolioData = portfolioData;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupNavigation();
        this.loadContent();
        this.startTypingEffect();
        this.initializeSkillsGraph();
        this.initializeCertificationsSlider();
        this.setupMobileMenu();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
                this.updateTerminalCommand(targetSection);
            });
        });

        // Project cards click handlers
        document.addEventListener('click', (e) => {
            if (e.target.closest('.project-card')) {
                const projectId = e.target.closest('.project-card').dataset.projectId;
                this.showProjectModal(projectId);
            }
        });

        // Modal close handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) {
                this.closeModal();
            }
        });

        // Security: Disable developer shortcuts and text selection
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('selectstart', e => e.preventDefault());
        document.addEventListener('keydown', (e) => {
            // Block F12, Ctrl+Shift+I/J/U, Ctrl+S, Ctrl+U
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'U'].includes(e.key.toUpperCase())) ||
                (e.ctrlKey && ['S', 'U'].includes(e.key.toUpperCase()))
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    setupNavigation() {
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const section = e.state?.section || 'home';
            this.navigateToSection(section, false);
        });

        // Set initial state
        history.replaceState({ section: 'home' }, '', '#home');
    }

    navigateToSection(sectionName, updateHistory = true) {
        if (this.isAnimating || sectionName === this.currentSection) return;

        this.isAnimating = true;

        // Hide current section
        const currentElement = document.querySelector(`#${this.currentSection}`);
        if (currentElement) {
            currentElement.classList.remove('active');
        }

        // Show new section with animation
        setTimeout(() => {
            const newElement = document.querySelector(`#${sectionName}`);
            if (newElement) {
                newElement.classList.add('active');
                newElement.classList.add('fade-in');
                
                // Remove animation class after completion
                setTimeout(() => {
                    newElement.classList.remove('fade-in');
                }, 800);
            }

            this.currentSection = sectionName;
            this.isAnimating = false;

            // Update browser history
            if (updateHistory) {
                history.pushState({ section: sectionName }, '', `#${sectionName}`);
            }

            // Update navigation active state
            this.updateNavigation();

        }, 200);
    }

    updateNavigation() {
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkSection = link.getAttribute('href').substring(1);
            if (linkSection === this.currentSection) {
                link.style.color = 'var(--primary-green)';
                link.style.textShadow = '0 0 10px var(--glow-color)';
            } else {
                link.style.color = 'var(--text-secondary)';
                link.style.textShadow = 'none';
            }
        });
    }

    updateTerminalCommand(section) {
        const terminalCommand = document.getElementById('terminal-command');
        const commands = portfolioData.terminalCommands;
        
        if (terminalCommand && commands[section]) {
            terminalCommand.textContent = '';
            this.typeCommand(commands[section], terminalCommand);
        }
    }

    typeCommand(command, element, speed = 50) {
        let i = 0;
        const typeChar = () => {
            if (i < command.length) {
                element.textContent += command.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        };
        typeChar();
    }

    loadContent() {
    this.loadProjects();
    this.loadCertifications();
    this.loadContactInfo();
    }
    loadContactInfo() {
        const contactInfo = portfolioData.personal.contact;
        const contactSection = document.querySelector('.contact-info');
        if (!contactSection) return;

        // Build contact HTML
        let html = '';
        if (contactInfo.email) {
            html += `<div class="contact-item">
                <span class="prompt">$</span> echo $EMAIL
                <div class="contact-value">
                    <a href="mailto:${sanitizeInput(contactInfo.email)}" class="contact-link">${sanitizeInput(contactInfo.email)}</a>
                </div>
            </div>`;
        }
        if (contactInfo.phone) {
            html += `<div class="contact-item">
                <span class="prompt">$</span> echo $PHONE
                <div class="contact-value">
                    <a href="tel:${sanitizeInput(contactInfo.phone)}" class="contact-link">${sanitizeInput(contactInfo.phone)}</a>
                </div>
            </div>`;
        }
        if (contactInfo.linkedin) {
            html += `<div class="contact-item">
                <span class="prompt">$</span> echo $LINKEDIN
                <div class="contact-value">
                    <a href="${sanitizeInput(contactInfo.linkedin)}" target="_blank" class="contact-link">${sanitizeInput(contactInfo.linkedin.replace('https://www.linkedin.com/in/', 'linkedin.com/in/'))}</a>
                </div>
            </div>`;
        }
        if (contactInfo.github) {
            html += `<div class="contact-item">
                <span class="prompt">$</span> echo $GITHUB
                <div class="contact-value">
                    <a href="${sanitizeInput(contactInfo.github)}" target="_blank" class="contact-link">${sanitizeInput(contactInfo.github.replace('https://github.com/', 'github.com/'))}</a>
                </div>
            </div>`;
        }
        if (contactInfo.instagram) {
            html += `<div class="contact-item">
                <span class="prompt">$</span> echo $INSTAGRAM
                <div class="contact-value">
                    <a href="${sanitizeInput(contactInfo.instagram)}" target="_blank" class="contact-link">${sanitizeInput(contactInfo.instagram.replace('https://www.instagram.com/', 'instagram.com/'))}</a>
                </div>
            </div>`;
        }
        html += `<div class="contact-item">
            <span class="prompt">$</span> cat /proc/availability
            <div class="contact-value status-active">
                ● Available for cybersecurity consulting and projects
            </div>
        </div>`;
        contactSection.innerHTML = html;
    }

    loadProjects() {
        const homeProjects = document.getElementById('home-projects');
        const allProjects = document.getElementById('all-projects');
        
        const projectsHtml = portfolioData.projects.map(project => `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-header">
                    <h3 class="project-title">${sanitizeInput(project.title)}</h3>
                    <span class="project-status">${sanitizeInput(project.status)}</span>
                </div>
                <p class="project-description">${sanitizeInput(project.description)}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${sanitizeInput(tech)}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="project-link" onclick="event.stopPropagation()">🔗 GitHub</a>
                </div>
            </div>
        `).join('');

        if (homeProjects) {
            homeProjects.innerHTML = projectsHtml;
        }
        if (allProjects) {
            allProjects.innerHTML = projectsHtml;
        }
    }

    loadCertifications() {
        const certificationsGallery = document.getElementById('certifications-gallery');
        
        if (certificationsGallery) {
            const certsHtml = portfolioData.certifications.map(cert => `
                <div class="cert-card">
                    <h3 class="cert-title">${sanitizeInput(cert.title)}</h3>
                    <p class="cert-issuer">${sanitizeInput(cert.issuer)}</p>
                    <p class="cert-year">${sanitizeInput(cert.year)}</p>
                    <a href="${cert.link}" class="cert-link" target="_blank">🔗 View Certificate</a>
                </div>
            `).join('');
            
            certificationsGallery.innerHTML = certsHtml;
        }
    }

    showProjectModal(projectId) {
        const project = portfolioData.projects.find(p => p.id == projectId);
        if (!project) return;

        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('modal-content');

        const featuresHtml = project.features ? project.features.map(feature => 
            `<li>• ${sanitizeInput(feature)}</li>`
        ).join('') : '';

        modalContent.innerHTML = `
            <div class="terminal-line">
                <span class="prompt">$</span> cat /projects/${project.title.toLowerCase().replace(/\s+/g, '_')}/README.md
            </div>
            <div style="margin: 1rem 0;">
                <h2 style="color: var(--primary-green); margin-bottom: 1rem;">${sanitizeInput(project.title)}</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    ${sanitizeInput(project.detailed_description || project.description)}
                </p>
                
                <div class="terminal-line" style="margin: 1.5rem 0 0.5rem 0;">
                    <span class="prompt">$</span> ls -la features/
                </div>
                <ul style="color: var(--text-secondary); margin: 0 0 1rem 1rem;">
                    ${featuresHtml}
                </ul>
                
                <div class="terminal-line" style="margin: 1.5rem 0 0.5rem 0;">
                    <span class="prompt">$</span> cat tech_stack.txt
                </div>
                <div class="project-tech" style="margin-bottom: 1.5rem;">
                    ${project.tech.map(tech => `<span class="tech-tag">${sanitizeInput(tech)}</span>`).join('')}
                </div>
                
                <div class="terminal-line" style="margin: 1.5rem 0 0.5rem 0;">
                    <span class="prompt">$</span> echo "Links:"
                </div>
                <div class="project-links">
                    <a href="${project.github}" target="_blank" class="project-link">🔗 GitHub Repository</a>
                </div>
            </div>
        `;

        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }

    closeModal() {
        const modal = document.getElementById('project-modal');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    startTypingEffect() {
        const heroTypedElement = document.getElementById('hero-typed');
        if (heroTypedElement && typeof Typed !== 'undefined') {
            new Typed('#hero-typed', {
                strings: [
                    `Entry-Level Security Engineer | OSINT | PenTesting`,
                    `Aspiring InfoSec Professional | Fast Learner`,
                    `Yash Nirmal - Ready for New Opportunities`
                ],
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                startDelay: 1000,
                loop: true,
                showCursor: true,
                cursorChar: '_'
            });
        }
    }

    initializeSkillsGraph() {
        const skillsGraph = new SkillsGraph();
        skillsGraph.render('#skills-graph', this.portfolioData.skills);
    }

    initializeCertificationsSlider() {
        const slider = new CertificationsSlider();
        slider.init(this.portfolioData.certifications);
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }
}

// Security: Input validation and XSS protection
function validateInput(input) {
    if (typeof input !== 'string') return false;
    // Basic validation - no script tags, no javascript: protocols
    const dangerousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi
    ];
    
    return !dangerousPatterns.some(pattern => pattern.test(input));
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Security notice
    // Security logs removed for production
    
    // Initialize matrix rain background
    if (typeof window.MatrixRain !== 'undefined') {
        const matrixRain = new MatrixRain();
        matrixRain.start();
    }
    
    // Initialize main portfolio
    window.portfolio = new CyberPortfolio();
    
    // Add security notice to footer
    const securityNotice = document.createElement('div');
    securityNotice.className = 'security-notice';
    securityNotice.innerHTML = '🔒 Secure Portfolio v2.0';
    document.body.appendChild(securityNotice);
    
    // Hide security notice after 5 seconds
    setTimeout(() => {
        securityNotice.style.opacity = '0';
        setTimeout(() => {
            securityNotice.remove();
        }, 500);
    }, 5000);
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Don't expose errors to end users in production
});

// Export for global access
window.CyberPortfolio = CyberPortfolio;