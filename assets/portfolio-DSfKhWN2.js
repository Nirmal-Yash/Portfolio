const p={personal:{name:"Yash Nirmal",title:"Cyber Security Enthusiast & Pentester",bio:"I am Yash Nirmal - passionate about Cyber Security, Networking, and Exploring. Building skills today to defend systems tomorrow. I love CTF challenges.",location:"Gondal, Gujarat",contact:{linkedin:"https://www.linkedin.com/in/yash-nirmal721/",github:"https://github.com/Nirmal-Yash",instagram:"https://www.instagram.com/_yashpal_3/",email:"nirmalyash721@gmail.com",phone:"+91 9714914179"}},skills:[{id:"osint",name:"OSINT",category:"Intelligence",level:90,connections:["pentesting","threatintel","investigation"]},{id:"pentesting",name:"Penetration Testing",category:"Security",level:85,connections:["osint","linux","python","networking"]},{id:"threatintel",name:"Threat Intelligence",category:"Intelligence",level:80,connections:["osint","investigation","python"]},{id:"investigation",name:"Investigation",category:"Investigation",level:75,connections:["osint","threatintel","forensics"]},{id:"forensics",name:"Digital Forensics",category:"Investigation",level:70,connections:["investigation","linux"]},{id:"linux",name:"Linux",category:"Systems",level:80,connections:["pentesting","forensics","python","shell"]},{id:"python",name:"Python",category:"Programming",level:85,connections:["pentesting","linux","automation","threatintel"]},{id:"automation",name:"Automation Scripting",category:"Programming",level:75,connections:["python","shell"]},{id:"shell",name:"Shell Scripting",category:"Programming",level:70,connections:["linux","automation"]},{id:"networking",name:"Networking",category:"Systems",level:80,connections:["pentesting","linux"]}],certifications:[{title:"Advent of Cyber 2024",issuer:"TryHackMe",year:"August 2025",link:"https://drive.google.com/file/d/1OgY0uVfbzAQSaiQg52zWztzuZ_JAWgOa/view"},{title:"Hackerverse CTF Challenge",issuer:"EC-Council",year:"July 2025",link:"https://drive.google.com/file/d/11u0LNSJrsH9N4EVHcycAjAmgKHrSqDjJ/view"},{title:"Fundamentals of Enterprise Linux 9",issuer:"Red Hat",year:"February 2025",link:"https://drive.google.com/file/d/1kJcgV6aTE7JUhY6Ig6yntdOQjKFMwzAE/view"}],projects:[{title:"Wordlist",description:"Custom Password Lists to enumerate in Password Cracking Tool with Common Indian Passwords.",github:"https://github.com/Nirmal-Yash/Wordlist",tech:["Password Cracking","Security","Wordlists"]},{title:"PentestAutomation",description:"Scripts for Automation in Penetration Testing for Web Applications Reconnaissance Techniques.",github:"https://github.com/Nirmal-Yash/PentestAutomation",tech:["Penetration Testing","Automation","Shell"]}],commandHistory:{home:"cat introduction.txt",about:'echo "About me and my skills"',projects:'echo "See GitHub for projects"',contact:'echo "Contact via LinkedIn or Instagram"'}};function w(c){const t=document.createElement("div");return t.textContent=c,t.innerHTML}typeof window<"u"&&(window.portfolioData=p,window.sanitizeInput=w);class g{constructor(){this.width=0,this.height=0,this.svg=null,this.simulation=null,this.nodes=[],this.links=[]}render(t,e){const i=document.querySelector(t);if(!i||typeof d3>"u")return;const n=()=>{i.innerHTML="",this.width=i.offsetWidth>0?i.offsetWidth:1600,this.height=i.offsetHeight>0?i.offsetHeight:900,this.prepareData(e),this.svg=d3.select(i).append("svg").attr("width","100%").attr("height","80%").attr("viewBox",`0 0 ${this.width} ${this.height}`).style("background","rgba(0, 0, 0, 0.8)").style("border","1px solid var(--border-color)").style("display","block"),this.createSimulation(),this.renderGraph(),window.addEventListener("resize",()=>{this.handleResize(i)})};"IntersectionObserver"in window?new IntersectionObserver((a,l)=>{a.forEach(d=>{d.isIntersecting&&(n(),l.disconnect())})},{threshold:.2}).observe(i):n()}prepareData(t){this.nodes=t.map(i=>({id:i.id,name:i.name,category:i.category,level:i.level,connections:Array.isArray(i.connections)?i.connections:[],radius:this.calculateRadius(i.level),color:this.getCategoryColor(i.category)})),this.links=[];const e=new Set(this.nodes.map(i=>i.id));this.nodes.forEach(i=>{i.connections.forEach(n=>{var s;e.has(n)&&this.links.push({source:i.id,target:n,strength:this.calculateLinkStrength(i.level,((s=this.nodes.find(a=>a.id===n))==null?void 0:s.level)||50)})})})}calculateRadius(t){return Math.max(12,t*.28)}getCategoryColor(t){return{Security:"#00ff00",Intelligence:"#00cc99",Programming:"#ffff00",Systems:"#ff6600",Investigation:"#cc00ff"}[t]||"#00ff00"}calculateLinkStrength(t,e){return(t+e)/200}createSimulation(){this.simulation=d3.forceSimulation(this.nodes).force("link",d3.forceLink(this.links).id(t=>t.id).strength(t=>t.strength).distance(340)).force("charge",d3.forceManyBody().strength(-1e3)).force("center",d3.forceCenter(this.width/2,this.height/2)).force("collision",d3.forceCollide().radius(t=>t.radius+40))}renderGraph(){const t=this.svg.append("defs"),e=t.append("filter").attr("id","glow").attr("x","-50%").attr("y","-50%").attr("width","200%").attr("height","200%");e.append("feGaussianBlur").attr("stdDeviation","3").attr("result","coloredBlur");const i=e.append("feMerge");i.append("feMergeNode").attr("in","coloredBlur"),i.append("feMergeNode").attr("in","SourceGraphic");const n=t.append("linearGradient").attr("id","link-gradient").attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","0%");n.append("stop").attr("offset","0%").attr("stop-color","#00ff99"),n.append("stop").attr("offset","100%").attr("stop-color","#00ccff");const s=this.svg.append("g").attr("class","links").selectAll("line").data(this.links).enter().append("line").attr("stroke","url(#link-gradient)").attr("stroke-opacity",r=>r.strength).attr("stroke-width",r=>Math.max(1.5,r.strength*5)).style("filter","url(#glow)"),a=this.svg.append("g").attr("class","nodes").selectAll("circle").data(this.nodes).enter().append("circle").attr("r",r=>r.radius).attr("fill",r=>r.color).attr("stroke","#fff").attr("stroke-width",2.5).style("filter","url(#glow)").style("cursor","pointer").attr("class",r=>r.level>80?"pulse-node":"").call(this.createDragBehavior()),l=document.createElement("style");l.innerHTML=`
        .pulse-node {
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { filter: drop-shadow(0 0 0 #00ffcc); }
            50% { filter: drop-shadow(0 0 20px #00ffcc); }
            100% { filter: drop-shadow(0 0 0 #00ffcc); }
        }
        `,document.head.appendChild(l);const d=this.svg.append("g").attr("class","labels").selectAll("g").data(this.nodes).enter().append("g").attr("class","label-group");d.append("rect").attr("rx",6).attr("ry",6).attr("fill","rgba(0,0,0,0.7)").attr("stroke","#00fff7").attr("stroke-width",1.2).attr("filter","url(#glow)"),d.append("text").text(r=>r.name).attr("font-family","Fira Mono, Courier New, monospace").attr("font-size","18px").attr("font-weight","bold").attr("fill","#fff").attr("text-anchor","middle").attr("dy","-1.1em").style("pointer-events","none").style("text-shadow","0 0 16px #00fff7, 0 0 4px #00ffcc, 0 0 2px #fff"),a.on("mouseover",(r,o)=>{this.highlightNode(o),this.showTooltip(r,o)}).on("mouseout",(r,o)=>{this.unhighlightNode(),this.hideTooltip()});const h=40;this.simulation.on("tick",()=>{s.attr("x1",o=>Math.max(30,Math.min(this.width-30,o.source.x))).attr("y1",o=>Math.max(30+h,Math.min(this.height-30,o.source.y+h))).attr("x2",o=>Math.max(30,Math.min(this.width-30,o.target.x))).attr("y2",o=>Math.max(30+h,Math.min(this.height-30,o.target.y+h))),a.attr("cx",o=>(o.x=Math.max(30,Math.min(this.width-30,o.x)),o.x)).attr("cy",o=>(o.y=Math.max(30+h,Math.min(this.height-30,o.y+h)),o.y)),d.each(function(o){const f=d3.select(this),v=Math.max(10,o.y+h-o.radius-16),u=f.select("text").attr("x",o.x).attr("y",v).node().getBBox();f.select("rect").attr("x",u.x-10).attr("y",u.y-4).attr("width",u.width+20).attr("height",u.height+8)})})}createDragBehavior(){return d3.drag().on("start",(t,e)=>{t.active||this.simulation.alphaTarget(.3).restart(),e.fx=e.x,e.fy=e.y}).on("drag",(t,e)=>{e.fx=t.x,e.fy=t.y}).on("end",(t,e)=>{t.active||this.simulation.alphaTarget(0),e.fx=null,e.fy=null})}highlightNode(t){this.svg.selectAll("circle").style("opacity",e=>t.connections.includes(e.id)||e.id===t.id?1:.3),this.svg.selectAll("line").style("opacity",e=>e.source.id===t.id||e.target.id===t.id?1:.1)}unhighlightNode(){this.svg.selectAll("circle").style("opacity",1),this.svg.selectAll("line").style("opacity",t=>t.strength)}showTooltip(t,e){d3.select("body").append("div").attr("class","graph-tooltip").style("position","absolute").style("background","linear-gradient(135deg, #001a1a 60%, #00ffcc 100%)").style("color","#fff").style("padding","14px 18px").style("border","2px solid #00ffcc").style("border-radius","10px").style("font-family","Fira Mono, Courier New, monospace").style("font-size","15px").style("box-shadow","0 0 30px #00fff7, 0 0 10px #00ffcc").style("z-index","10000").style("pointer-events","none").html(`
                <div style="font-size:1.1em;font-weight:bold;letter-spacing:1px;">${sanitizeInput(e.name)}</div>
                <div style="margin-top:2px;">Category: <span style="color:#00ffcc;">${sanitizeInput(e.category)}</span></div>
                <div>Level: <span style="color:#fffb00;">${e.level}%</span></div>
                <div>Connections: <span style="color:#00ffcc;">${e.connections.length}</span></div>
            `).style("left",t.pageX+10+"px").style("top",t.pageY-10+"px").style("opacity",0).transition().duration(200).style("opacity",1)}hideTooltip(){d3.selectAll(".graph-tooltip").remove()}handleResize(t){const e=t.offsetWidth>0?t.offsetWidth:1e3,i=t.offsetHeight>0?t.offsetHeight:900;(e!==this.width||i!==this.height)&&(this.width=e,this.height=i,this.svg.attr("viewBox",`0 0 ${this.width} ${this.height}`),this.simulation.force("center",d3.forceCenter(this.width/2,this.height/2)).restart())}}window.SkillsGraph=g;class m{constructor(){this.currentSlide=0,this.slides=[],this.autoPlayInterval=null,this.isTransitioning=!1,this.autoPlayDelay=4e3}init(t){this.slides=t,this.render(),this.setupEventListeners(),this.startAutoPlay()}render(){const t=document.getElementById("certifications-slider"),e=document.getElementById("slide-indicators");if(!t||!e)return;const i=this.slides.map((s,a)=>`
      <div class="certification-slide" data-slide="${a}">
        <div class="cert-content">
          <h3 class="cert-title">${sanitizeInput(s.title)}</h3>
          <p class="cert-issuer">${sanitizeInput(s.issuer)}</p>
          <p class="cert-date">Earned: ${sanitizeInput(s.year)}</p>
          <a href="${s.link}" class="cert-link highlight-link" target="_blank">🔗 View Certificate</a>
        </div>
      </div>
    `).join("");t.innerHTML=i;const n=this.slides.map((s,a)=>`
            <span class="indicator" data-slide="${a}"></span>
        `).join("");e.innerHTML=n,this.updateSlideDisplay()}setupEventListeners(){document.querySelectorAll(".indicator").forEach((i,n)=>{i.addEventListener("click",()=>{this.isTransitioning||this.goToSlide(n)})});const e=document.querySelector(".certifications-slideshow");e&&(e.addEventListener("mouseenter",()=>{this.pauseAutoPlay()}),e.addEventListener("mouseleave",()=>{this.startAutoPlay()})),document.addEventListener("keydown",i=>{i.key==="ArrowLeft"?this.previousSlide():i.key==="ArrowRight"&&this.nextSlide()}),this.setupTouchEvents()}setupTouchEvents(){const t=document.getElementById("certifications-slider");if(!t)return;let e=0,i=0,n=0,s=0;t.addEventListener("touchstart",a=>{e=a.touches[0].clientX,i=a.touches[0].clientY}),t.addEventListener("touchend",a=>{n=a.changedTouches[0].clientX,s=a.changedTouches[0].clientY;const l=e-n,d=i-s;Math.abs(l)>Math.abs(d)&&Math.abs(l)>50&&(l>0?this.nextSlide():this.previousSlide())})}goToSlide(t){if(this.isTransitioning||t===this.currentSlide)return;this.isTransitioning=!0;const e=document.querySelector(".certification-slide.active");e&&e.classList.add("glitch-transition"),setTimeout(()=>{this.currentSlide=t,this.updateSlideDisplay(),this.isTransitioning=!1},250)}nextSlide(){const t=(this.currentSlide+1)%this.slides.length;this.goToSlide(t)}previousSlide(){const t=this.currentSlide===0?this.slides.length-1:this.currentSlide-1;this.goToSlide(t)}updateSlideDisplay(){const t=document.getElementById("certifications-slider"),e=document.querySelectorAll(".indicator");if(!t)return;const i=-this.currentSlide*100;t.style.transform=`translateX(${i}%)`;const n=document.querySelectorAll(".certification-slide");n.forEach((s,a)=>{s.classList.toggle("active",a===this.currentSlide),s.classList.contains("glitch-transition")&&a!==this.currentSlide&&s.classList.remove("glitch-transition")}),e.forEach((s,a)=>{s.classList.toggle("active",a===this.currentSlide)}),setTimeout(()=>{const s=n[this.currentSlide];s&&this.applyCyberEffects(s)},300)}applyCyberEffects(t){const e=t.querySelector(".cert-title"),i=t.querySelector(".cert-image");if(e){const n=e.textContent;e.textContent="",e.style.borderRight="2px solid #00ff00";let s=0;const a=setInterval(()=>{s<n.length?(e.textContent+=n.charAt(s),s++):(clearInterval(a),setTimeout(()=>{e.style.borderRight="none"},500))},50)}i&&this.applyScanLineEffect(i)}applyScanLineEffect(t){const e=document.createElement("div");e.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff00, transparent);
            z-index: 10;
            animation: scan 2s ease-in-out;
        `;const i=document.createElement("style");i.textContent=`
            @keyframes scan {
                0% { transform: translateY(0); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(150px); opacity: 0; }
            }
        `,document.head.appendChild(i);const n=t.parentElement;n.style.position="relative",n.appendChild(e),setTimeout(()=>{e.parentElement&&e.parentElement.removeChild(e),i.parentElement&&i.parentElement.removeChild(i)},2e3)}startAutoPlay(){this.pauseAutoPlay(),this.autoPlayInterval=setInterval(()=>{this.isTransitioning||this.nextSlide()},this.autoPlayDelay)}pauseAutoPlay(){this.autoPlayInterval&&(clearInterval(this.autoPlayInterval),this.autoPlayInterval=null)}showProgress(){const t=document.createElement("div");t.className="slide-progress",t.style.cssText=`
            position: absolute;
            bottom: 0;
            left: 0;
            height: 2px;
            background: #00ff00;
            width: 0;
            transition: width ${this.autoPlayDelay}ms linear;
        `;const e=document.querySelector(".certifications-slideshow");e&&(e.appendChild(t),setTimeout(()=>{t.style.width="100%"},100),setTimeout(()=>{t.parentElement&&t.parentElement.removeChild(t)},this.autoPlayDelay))}destroy(){this.pauseAutoPlay(),document.removeEventListener("keydown",this.handleKeydown),document.querySelectorAll(".certification-slide").forEach(e=>{e.classList.remove("glitch-transition","active")})}}class S extends m{constructor(){super(),this.glitchEffects=!0,this.scanLineEffects=!0,this.typewriterEffects=!0}applyCyberEffects(t){super.applyCyberEffects(t),this.glitchEffects&&this.applyRandomGlitch(t),this.scanLineEffects&&this.applyTerminalScanlines(t)}applyRandomGlitch(t){const n=setInterval(()=>{Math.random()<.1&&(t.style.transform=`translate(${Math.random()*4-2}px, ${Math.random()*4-2}px)`,t.style.filter=`hue-rotate(${Math.random()*360}deg)`,setTimeout(()=>{t.style.transform="translate(0, 0)",t.style.filter="hue-rotate(0deg)"},100))},2e3);setTimeout(()=>{clearInterval(n)},this.autoPlayDelay)}applyTerminalScanlines(t){const e=document.createElement("div");e.style.cssText=`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 0, 0.1) 2px,
                rgba(0, 255, 0, 0.1) 4px
            );
            pointer-events: none;
            z-index: 5;
            opacity: 0.3;
        `,t.style.position="relative",t.appendChild(e),setTimeout(()=>{e.parentElement&&e.parentElement.removeChild(e)},this.autoPlayDelay)}}window.CertificationsSlider=S||m;class y{constructor(){this.currentSection="home",this.isAnimating=!1,this.portfolioData=p,this.init()}init(){this.setupEventListeners(),this.setupNavigation(),this.loadContent(),this.startTypingEffect(),this.initializeSkillsGraph(),this.initializeCertificationsSlider(),this.setupMobileMenu()}setupEventListeners(){document.querySelectorAll(".nav-link").forEach(t=>{t.addEventListener("click",e=>{e.preventDefault();const i=t.getAttribute("href").substring(1);this.navigateToSection(i),this.updateTerminalCommand(i)})}),document.addEventListener("click",t=>{if(t.target.closest(".project-card")){const e=t.target.closest(".project-card").dataset.projectId;this.showProjectModal(e)}}),document.addEventListener("click",t=>{(t.target.classList.contains("modal")||t.target.classList.contains("close-modal"))&&this.closeModal()}),document.addEventListener("contextmenu",t=>t.preventDefault()),document.addEventListener("selectstart",t=>t.preventDefault()),document.addEventListener("keydown",t=>{if(t.key==="F12"||t.ctrlKey&&t.shiftKey&&["I","J","C","U"].includes(t.key.toUpperCase())||t.ctrlKey&&["S","U"].includes(t.key.toUpperCase()))return t.preventDefault(),t.stopPropagation(),!1;t.key==="Escape"&&this.closeModal()})}setupNavigation(){window.addEventListener("popstate",t=>{var i;const e=((i=t.state)==null?void 0:i.section)||"home";this.navigateToSection(e,!1)}),history.replaceState({section:"home"},"","#home")}navigateToSection(t,e=!0){if(this.isAnimating||t===this.currentSection)return;this.isAnimating=!0;const i=document.querySelector(`#${this.currentSection}`);i&&i.classList.remove("active"),setTimeout(()=>{const n=document.querySelector(`#${t}`);n&&(n.classList.add("active"),n.classList.add("fade-in"),setTimeout(()=>{n.classList.remove("fade-in")},800)),this.currentSection=t,this.isAnimating=!1,e&&history.pushState({section:t},"",`#${t}`),this.updateNavigation()},200)}updateNavigation(){document.querySelectorAll(".nav-link").forEach(t=>{t.getAttribute("href").substring(1)===this.currentSection?(t.style.color="var(--primary-green)",t.style.textShadow="0 0 10px var(--glow-color)"):(t.style.color="var(--text-secondary)",t.style.textShadow="none")})}updateTerminalCommand(t){const e=document.getElementById("terminal-command"),i=p.terminalCommands;e&&i[t]&&(e.textContent="",this.typeCommand(i[t],e))}typeCommand(t,e,i=50){let n=0;const s=()=>{n<t.length&&(e.textContent+=t.charAt(n),n++,setTimeout(s,i))};s()}loadContent(){this.loadProjects(),this.loadCertifications(),this.loadContactInfo()}loadContactInfo(){const t=p.personal.contact,e=document.querySelector(".contact-info");if(!e)return;let i="";t.email&&(i+=`<div class="contact-item">
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
        </div>`,e.innerHTML=i}loadProjects(){const t=document.getElementById("home-projects"),e=document.getElementById("all-projects"),i=p.projects.map(n=>`
            <div class="project-card" data-project-id="${n.id}">
                <div class="project-header">
                    <h3 class="project-title">${sanitizeInput(n.title)}</h3>
                    <span class="project-status">${sanitizeInput(n.status)}</span>
                </div>
                <p class="project-description">${sanitizeInput(n.description)}</p>
                <div class="project-tech">
                    ${n.tech.map(s=>`<span class="tech-tag">${sanitizeInput(s)}</span>`).join("")}
                </div>
                <div class="project-links">
                    <a href="${n.github}" target="_blank" class="project-link" onclick="event.stopPropagation()">🔗 GitHub</a>
                </div>
            </div>
        `).join("");t&&(t.innerHTML=i),e&&(e.innerHTML=i)}loadCertifications(){const t=document.getElementById("certifications-gallery");if(t){const e=p.certifications.map(i=>`
                <div class="cert-card">
                    <h3 class="cert-title">${sanitizeInput(i.title)}</h3>
                    <p class="cert-issuer">${sanitizeInput(i.issuer)}</p>
                    <p class="cert-year">${sanitizeInput(i.year)}</p>
                    <a href="${i.link}" class="cert-link" target="_blank">🔗 View Certificate</a>
                </div>
            `).join("");t.innerHTML=e}}showProjectModal(t){const e=p.projects.find(a=>a.id==t);if(!e)return;const i=document.getElementById("project-modal"),n=document.getElementById("modal-content"),s=e.features?e.features.map(a=>`<li>• ${sanitizeInput(a)}</li>`).join(""):"";n.innerHTML=`
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
                    ${e.tech.map(a=>`<span class="tech-tag">${sanitizeInput(a)}</span>`).join("")}
                </div>
                
                <div class="terminal-line" style="margin: 1.5rem 0 0.5rem 0;">
                    <span class="prompt">$</span> echo "Links:"
                </div>
                <div class="project-links">
                    <a href="${e.github}" target="_blank" class="project-link">🔗 GitHub Repository</a>
                </div>
            </div>
        `,i.style.display="block",setTimeout(()=>{i.style.opacity="1"},10)}closeModal(){const t=document.getElementById("project-modal");t.style.opacity="0",setTimeout(()=>{t.style.display="none"},300)}startTypingEffect(){document.getElementById("hero-typed")&&typeof Typed<"u"&&new Typed("#hero-typed",{strings:["Entry-Level Security Engineer | OSINT | PenTesting","Aspiring InfoSec Professional | Fast Learner","Yash Nirmal - Ready for New Opportunities"],typeSpeed:50,backSpeed:30,backDelay:2e3,startDelay:1e3,loop:!0,showCursor:!0,cursorChar:"_"})}initializeSkillsGraph(){document.getElementById("skills-graph")&&this.portfolioData.skills?(new g().render("#skills-graph",this.portfolioData.skills),console.log("Skills graph initialized with data:",this.portfolioData.skills)):console.error("Skills container or data not found")}initializeCertificationsSlider(){document.getElementById("certifications-slider")&&this.portfolioData.certifications?(new m().init(this.portfolioData.certifications),console.log("Certifications slider initialized with data:",this.portfolioData.certifications)):console.error("Certifications container or data not found")}setupMobileMenu(){const t=document.querySelector(".menu-toggle"),e=document.querySelector(".nav-menu");t&&e&&(t.addEventListener("click",()=>{e.classList.toggle("active"),t.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(i=>{i.addEventListener("click",()=>{e.classList.remove("active"),t.classList.remove("active")})}))}}document.addEventListener("DOMContentLoaded",async()=>{new MatrixRain().start(),window.portfolio=new y;const t=["home","about","projects","certifications","contact"];t.forEach(i=>{const n=document.getElementById(i);n&&(n.style.display=i==="home"?"block":"none")}),document.querySelectorAll(".nav-link").forEach(i=>{i.addEventListener("click",n=>{n.preventDefault();const s=n.target.getAttribute("href").substring(1);t.forEach(a=>{const l=document.getElementById(a);l&&(l.style.display=a===s?"block":"none")})})});const e=document.createElement("div");e.className="security-notice",e.innerHTML="🔒 Secure Portfolio v2.0",document.body.appendChild(e),setTimeout(()=>{e.style.opacity="0",setTimeout(()=>{e.remove()},500)},5e3)});window.addEventListener("error",c=>{console.error("Portfolio Error:",c.error)});window.CyberPortfolio=y;export{p};
