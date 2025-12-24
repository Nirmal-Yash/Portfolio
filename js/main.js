// Import portfolio data and components
import { portfolioData } from '../data/portfolio-data.js';
import { SkillsGraph } from './skills-graph.js';
import { CertificationsSlider } from './certifications-slider.js';

// Main JavaScript functionality
export class CyberPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.isAnimating = false;
        this.portfolioData = portfolioData;
        this.init();
    }

    init() {
        // Show loading screen
        const loader = document.getElementById('loading');
        
        // Initialize components
        Promise.all([
            this.setupEventListeners(),
            this.setupNavigation(),
            this.loadContent(),
            this.startTypingEffect(),
            this.initializeSkillsGraph(),
            this.initializeCertificationsSlider(),
            this.setupMobileMenu()
        ]).then(() => {
            // Hide loading screen with fade effect
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                
                // Trigger initial animations
                document.querySelectorAll('.section').forEach(section => {
                    if (section.id === this.currentSection) {
                        section.classList.add('active');
                    }
                });
            }, 500);
        });
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
                this.updateTerminalCommand(targetSection);
                
                // Update active class
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Project cards click handlers
        document.addEventListener('click', (e) => {
            const projectCard = e.target.closest('.project-card');
            if (projectCard) {
                e.preventDefault();
                const projectId = projectCard.dataset.projectId;
                const project = this.portfolioData.projects.find(p => p.title === projectId);
                if (project) {
                    this.showProjectModal(project);
                }
            }
        });

        // Modal close handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal') || e.target.classList.contains('close-modal')) {
                this.closeModal();
            }
        });
    }

    navigateToSection(sectionId) {
        if (this.isAnimating) return;
        this.isAnimating = true;

        // Hide all sections
        document.querySelectorAll('section').forEach(section => {
            section.style.display = 'none';
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.style.display = 'block';
            setTimeout(() => {
                targetSection.classList.add('active');
                this.isAnimating = false;
                
                // Reinitialize components if needed
                if (sectionId === 'home' || sectionId === 'about') {
                    this.initializeSkillsGraph();
                }
                if (sectionId === 'home') {
                    this.initializeCertificationsSlider();
                }
                if (sectionId === 'certifications') {
                    const galleryContainer = document.getElementById('certifications-gallery');
                    if (galleryContainer && this.portfolioData.certifications) {
                        this.renderCertificationsGallery(galleryContainer);
                    }
                }
            }, 100);
        }

        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);
    }

    setupNavigation() {
        // Handle initial section based on URL hash
        const hash = window.location.hash.substring(1);
        if (hash) {
            this.navigateToSection(hash);
        }

        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.substring(1) || 'home';
            this.navigateToSection(hash);
        });
    }

    startTypingEffect() {
        const typedElement = document.getElementById('hero-typed');
        if (typedElement) {
            new Typed(typedElement, {
                strings: [
                    "yash@security:~$ whoami",
                    "Security Engineer",
                    "Penetration Tester",
                    "OSINT Specialist",
                    "CTF Player"
                ],
                typeSpeed: 50,
                backSpeed: 30,
                loop: true,
                backDelay: 1500,
                startDelay: 500
            });
        }
    }

    loadContent() {
        this.loadProjects();
        this.loadContactInfo();
        this.updateTerminalInfo();
    }

    loadProjects() {
        const homeProjects = document.getElementById('home-projects');
        const allProjects = document.getElementById('all-projects');
        
        if (homeProjects && this.portfolioData.projects) {
            // Load featured projects on home
            const featuredProjects = this.portfolioData.projects.slice(0, 3);
            homeProjects.innerHTML = this.generateProjectsHTML(featuredProjects);
        }
        
        if (allProjects && this.portfolioData.projects) {
            // Load all projects in projects section
            allProjects.innerHTML = this.generateProjectsHTML(this.portfolioData.projects);
        }
    }

    generateProjectsHTML(projects) {
        return projects.map(project => `
            <div class="project-card" data-project-id="${project.title}">
                <div class="project-content">
                    <h3 class="project-title">${this.sanitizeInput(project.title)}</h3>
                    <p class="project-description">${this.sanitizeInput(project.description)}</p>
                    <div class="project-tech-stack">
                        ${project.tech.map(tech => `<span class="tech-tag">${this.sanitizeInput(tech)}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                            <span class="link-icon">📂</span> View Project
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateTerminalInfo() {
        const { name, title, bio } = this.portfolioData.personal;
        const heroTyped = document.getElementById('hero-typed');
        if (heroTyped) {
            heroTyped.setAttribute('data-typed-items', `${name},${title},${bio}`);
        }
    }

    initializeSkillsGraph() {
        const skillsContainer = document.getElementById('skills-graph');
        if (skillsContainer && this.portfolioData.skills) {
            const skillsGraph = new SkillsGraph();
            skillsGraph.render('#skills-graph', this.portfolioData.skills);
        }
    }

    initializeCertificationsSlider() {
        const sliderContainer = document.getElementById('certifications-slider');
        if (sliderContainer && this.portfolioData.certifications) {
            const slider = new CertificationsSlider();
            slider.init(this.portfolioData.certifications);
        }
        
        // Also render certifications gallery on certifications page
        const galleryContainer = document.getElementById('certifications-gallery');
        if (galleryContainer && this.portfolioData.certifications) {
            this.renderCertificationsGallery(galleryContainer);
        }
    }
    
    renderCertificationsGallery(container) {
        const certificationsHTML = this.portfolioData.certifications.map(cert => `
            <div class="cert-card">
                <h3 class="cert-title">${this.sanitizeInput(cert.title)}</h3>
                <p class="cert-issuer">${this.sanitizeInput(cert.issuer)}</p>
                <p class="cert-date">Earned: ${this.sanitizeInput(cert.year)}</p>
                <a href="${cert.link}" class="cert-link" target="_blank" rel="noopener noreferrer">
                    🔗 View Certificate
                </a>
            </div>
        `).join('');
        container.innerHTML = certificationsHTML;
    }

    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
            });

            // Close menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                });
            });
        }
    }

    updateTerminalCommand(section) {
        const terminalCommand = document.getElementById('terminal-command');
        const commands = this.portfolioData.commandHistory;
        
        if (terminalCommand && commands[section]) {
            terminalCommand.textContent = '';
            this.typeCommand(commands[section], terminalCommand);
        }
    }

    loadContactInfo() {
        const contactInfo = document.querySelector('.contact-info');
        if (contactInfo && this.portfolioData.personal.contact) {
            const contact = this.portfolioData.personal.contact;
            contactInfo.innerHTML = `
                <div class="contact-links">
                    <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link">
                        <span class="link-icon">🔗</span> LinkedIn
                    </a>
                    <a href="${contact.github}" target="_blank" rel="noopener noreferrer" class="contact-link">
                        <span class="link-icon">💻</span> GitHub
                    </a>
                    <a href="mailto:${contact.email}" class="contact-link">
                        <span class="link-icon">📧</span> ${contact.email}
                    </a>
                    <a href="tel:${contact.phone}" class="contact-link">
                        <span class="link-icon">📱</span> ${contact.phone}
                    </a>
                    <a href="${contact.instagram}" target="_blank" rel="noopener noreferrer" class="contact-link">
                        <span class="link-icon">📸</span> Instagram
                    </a>
                </div>
            `;
        }
    }

    showProjectModal(project) {
        const modal = document.getElementById('project-modal');
        const modalContent = document.getElementById('modal-content');
        
        if (modal && modalContent) {
            modalContent.innerHTML = `
                <h2>${this.sanitizeInput(project.title)}</h2>
                <p>${this.sanitizeInput(project.description)}</p>
                <div class="tech-stack">
                    <h3>Technologies Used:</h3>
                    <div class="tech-tags">
                        ${project.tech.map(tech => `<span class="tech-tag">${this.sanitizeInput(tech)}</span>`).join('')}
                    </div>
                </div>
                <div class="project-links">
                    <a href="${project.github}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <span class="link-icon">📂</span> View on GitHub
                    </a>
                </div>
            `;
            modal.style.display = 'flex';
        }
    }

    closeModal() {
        const modal = document.getElementById('project-modal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    sanitizeInput(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    typeCommand(command, element) {
        let i = 0;
        const typeEffect = () => {
            if (i < command.length) {
                element.textContent += command.charAt(i);
                i++;
                setTimeout(typeEffect, 50);
            }
        };
        typeEffect();
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize matrix rain background
    const matrixRain = new MatrixRain();
    matrixRain.start();
    
    // Initialize main portfolio
    window.portfolio = new CyberPortfolio();
    
    // Add security notice
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
});

// Export for global access
export default CyberPortfolio;