import{p as o}from"./portfolioData-mJV7lf92.js";import{S as l}from"./skillsGraph-DaNheTri.js";import{C as d}from"./certificationsSlider-B5Ah150j.js";class r{constructor(){this.currentSection="home",this.isAnimating=!1,this.portfolioData=o,this.init()}init(){this.setupEventListeners(),this.setupNavigation(),this.loadContent(),this.startTypingEffect(),this.initializeSkillsGraph(),this.initializeCertificationsSlider(),this.setupMobileMenu()}setupEventListeners(){document.querySelectorAll(".nav-link").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const i=t.getAttribute("href").substring(1);this.navigateToSection(i),this.updateTerminalCommand(i)})}),document.addEventListener("click",t=>{if(t.target.closest(".project-card")){const e=t.target.closest(".project-card").dataset.projectId;this.showProjectModal(e)}}),document.addEventListener("click",t=>{(t.target.classList.contains("modal")||t.target.classList.contains("close-modal"))&&this.closeModal()}),document.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("selectstart",t=>t.preventDefault()),document.addEventListener("keydown",t=>{if(t.key==="F12"||t.ctrlKey&&t.shiftKey&&["I","J","C","U"].includes(t.key.toUpperCase())||t.ctrlKey&&["S","U"].includes(t.key.toUpperCase()))return t.preventDefault(),t.stopPropagation(),!1;t.key==="Escape"&&this.closeModal()})}setupNavigation(){window.addEventListener("popstate",t=>{var i;const e=((i=t.state)==null?void 0:i.section)||"home";this.navigateToSection(e,!1)}),history.replaceState({section:"home"},"","#home")}navigateToSection(t,e=!0){if(this.isAnimating||t===this.currentSection)return;this.isAnimating=!0;const i=document.querySelector(`#${this.currentSection}`);i&&i.classList.remove("active"),setTimeout(()=>{const a=document.querySelector(`#${t}`);a&&(a.classList.add("active"),a.classList.add("fade-in"),setTimeout(()=>{a.classList.remove("fade-in")},800)),this.currentSection=t,this.isAnimating=!1,e&&history.pushState({section:t},"",`#${t}`),this.updateNavigation()},200)}updateNavigation(){document.querySelectorAll(".nav-link").forEach(t=>{t.getAttribute("href").substring(1)===this.currentSection?(t.style.color="var(--primary-green)",t.style.textShadow="0 0 10px var(--glow-color)"):(t.style.color="var(--text-secondary)",t.style.textShadow="none")})}updateTerminalCommand(t){const e=document.getElementById("terminal-command"),i=o.terminalCommands;e&&i[t]&&(e.textContent="",this.typeCommand(i[t],e))}typeCommand(t,e,i=50){let a=0;const s=()=>{a<t.length&&(e.textContent+=t.charAt(a),a++,setTimeout(s,i))};s()}loadContent(){this.loadProjects(),this.loadCertifications(),this.loadContactInfo()}loadContactInfo(){const t=o.personal.contact,e=document.querySelector(".contact-info");if(!e)return;let i="";t.email&&(i+=`<div class="contact-item">
                <span class="prompt">$</span> echo $EMAIL
                <div class="contact-value">
                    <a href="mailto:${sanitizeInput(t.email)}" class="contact-link">${sanitizeInput(t.email)}</a>
                </div>
            </div>`),t.phone&&(i+=`<div class="contact-item">
                <span class="prompt">$</span> echo $PHONE
                <div class="contact-value">
                    <a href="tel:${sanitizeInput(t.phone)}" class="contact-link">${sanitizeInput(t.phone)}</a>
                </div>
            </div>`),t.linkedin&&(i+=`<div class="contact-item">
                <span class="prompt">$</span> echo $LINKEDIN
                <div class="contact-value">
                    <a href="${sanitizeInput(t.linkedin)}" target="_blank" class="contact-link">${sanitizeInput(t.linkedin.replace("https://www.linkedin.com/in/","linkedin.com/in/"))}</a>
                </div>
            </div>`),t.github&&(i+=`<div class="contact-item">
                <span class="prompt">$</span> echo $GITHUB
                <div class="contact-value">
                    <a href="${sanitizeInput(t.github)}" target="_blank" class="contact-link">${sanitizeInput(t.github.replace("https://github.com/","github.com/"))}</a>
                </div>
            </div>`),t.instagram&&(i+=`<div class="contact-item">
                <span class="prompt">$</span> echo $INSTAGRAM
                <div class="contact-value">
                    <a href="${sanitizeInput(t.instagram)}" target="_blank" class="contact-link">${sanitizeInput(t.instagram.replace("https://www.instagram.com/","instagram.com/"))}</a>
                </div>
            </div>`),i+=`<div class="contact-item">
            <span class="prompt">$</span> cat /proc/availability
            <div class="contact-value status-active">
                ● Available for cybersecurity consulting and projects
            </div>
        </div>`,e.innerHTML=i}loadProjects(){const t=document.getElementById("home-projects"),e=document.getElementById("all-projects"),i=o.projects.map(a=>`
            <div class="project-card" data-project-id="${a.id}">
                <div class="project-header">
                    <h3 class="project-title">${sanitizeInput(a.title)}</h3>
                    <span class="project-status">${sanitizeInput(a.status)}</span>
                </div>
                <p class="project-description">${sanitizeInput(a.description)}</p>
                <div class="project-tech">
                    ${a.tech.map(s=>`<span class="tech-tag">${sanitizeInput(s)}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${a.github}" target="_blank" class="project-link" onclick="event.stopPropagation()">🔗 GitHub</a>
                </div>
            </div>
        `).join("");t&&(t.innerHTML=i),e&&(e.innerHTML=i)}loadCertifications(){const t=document.getElementById("certifications-gallery");if(t){const e=o.certifications.map(i=>`
                <div class="cert-card">
                    <h3 class="cert-title">${sanitizeInput(i.title)}</h3>
                    <p class="cert-issuer">${sanitizeInput(i.issuer)}</p>
                    <p class="cert-year">${sanitizeInput(i.year)}</p>
                    <a href="${i.link}" class="cert-link" target="_blank">🔗 View Certificate</a>
                </div>
            `).join("");t.innerHTML=e}}showProjectModal(t){const e=o.projects.find(c=>c.id==t);if(!e)return;const i=document.getElementById("project-modal"),a=document.getElementById("modal-content"),s=e.features?e.features.map(c=>`<li>• ${sanitizeInput(c)}</li>`).join(""):"";a.innerHTML=`
            <div class="terminal-line">
                <span class="prompt">$</span> cat /projects/${e.title.toLowerCase().replace(/\s+/g,"_")}/README.md
            </div>
            <div style="margin: 1rem 0;">
                <h2 style="color: var(--primary-green); margin-bottom: 1rem;">${sanitizeInput(e.title)}</h2>
                <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    ${sanitizeInput(e.detailed_description||e.description)}
                </p>
                
                <div class="terminal-line" style="margin: 1.5rem 0 0.5rem 0;">
                    <span class="prompt">$</span> ls -la features/
                </div>
                <ul style="color: var(--text-secondary); margin: 0 0 1rem 1rem;">
                    ${s}
                </ul>
                
                <div class="terminal-line" style="margin: 1.5rem 0 0.5rem 0;">
                    <span class="prompt">$</span> cat tech_stack.txt
                </div>
                <div class="project-tech" style="margin-bottom: 1.5rem;">
                    ${e.tech.map(c=>`<span class="tech-tag">${sanitizeInput(c)}</span>`).join("")}
                </div>
                
                <div class="terminal-line" style="margin: 1.5rem 0 0.5rem 0;">
                    <span class="prompt">$</span> echo "Links:"
                </div>
                <div class="project-links">
                    <a href="${e.github}" target="_blank" class="project-link">🔗 GitHub Repository</a>
                </div>
            </div>
        `,i.style.display="block",setTimeout(()=>{i.style.opacity="1"},10)}closeModal(){const t=document.getElementById("project-modal");t.style.opacity="0",setTimeout(()=>{t.style.display="none"},300)}startTypingEffect(){document.getElementById("hero-typed")&&typeof Typed<"u"&&new Typed("#hero-typed",{strings:["Entry-Level Security Engineer | OSINT | PenTesting","Aspiring InfoSec Professional | Fast Learner","Yash Nirmal - Ready for New Opportunities"],typeSpeed:50,backSpeed:30,backDelay:2e3,startDelay:1e3,loop:!0,showCursor:!0,cursorChar:"_"})}initializeSkillsGraph(){new l().render("#skills-graph",this.portfolioData.skills)}initializeCertificationsSlider(){new d().init(this.portfolioData.certifications)}setupMobileMenu(){const t=document.querySelector(".menu-toggle"),e=document.querySelector(".nav-menu");t&&e&&(t.addEventListener("click",()=>{e.classList.toggle("active"),t.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(i=>{i.addEventListener("click",()=>{e.classList.remove("active"),t.classList.remove("active")})}))}}document.addEventListener("DOMContentLoaded",()=>{typeof window.MatrixRain<"u"&&new MatrixRain().start(),window.portfolio=new r;const n=document.createElement("div");n.className="security-notice",n.innerHTML="🔒 Secure Portfolio v2.0",document.body.appendChild(n),setTimeout(()=>{n.style.opacity="0",setTimeout(()=>{n.remove()},500)},5e3)});window.addEventListener("error",n=>{console.error("Portfolio Error:",n.error)});window.CyberPortfolio=r;
