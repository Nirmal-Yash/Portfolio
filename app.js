const d=window.portfolioData;
const $=(s,r=document)=>r.querySelector(s);
const safeUrl=(raw)=>{try{const u=new URL(raw,location.href);return["http:","https:","mailto:","tel:"].includes(u.protocol)?u.href:""}catch{return""}};
const node=(tag,attrs={},children=[])=>{const n=document.createElement(tag);Object.entries(attrs).forEach(([k,v])=>k==="text"?n.textContent=v:k==="className"?n.className=v:k==="html"?n.innerHTML=v:n.setAttribute(k,v));children.forEach(c=>n.append(c));return n};

const specialLogos={"Scapy":"https://raw.githubusercontent.com/secdev/scapy/master/doc/scapy/graphics/scapy_logo.png","Nmap":"https://nmap.org/images/nmap-logo-64px.png"};
const logoMap={
"Python":"python","Bash":"gnubash","Dart":"dart","HTML":"html5","CSS":"css3",
"Angular":"angular","Flutter":"flutter","Next.js":"nextdotjs","Fastify":"fastify","Git & GitHub":"github",
"Kali Linux":"kalilinux","Linux CLI":"linux","RHEL":"redhat","Ubuntu":"ubuntu","Docker":"docker",
"PostgreSQL":"postgresql","Redis":"redis","Prisma":"prisma","Nmap":"nmap","Whois":"whois",
"JavaScript":"javascript","TypeScript":"typescript","Node.js":"nodedotjs","AWS":"amazonaws","Computer Vision":"opencv","WebRTC":"webrtc","Packet Analysis":"wireshark","Cloud Native Application Deployment":"kubernetes",
"NextAuth":"nextdotjs","Zustand":"zustand","TanStack":"tanstack"
};
const fallbackMark=(label)=>node("span",{className:"logo-fallback",text:String(label).slice(0,2).toUpperCase()});
function techLogo(label){
 const direct=specialLogos[label],slug=logoMap[label];
 if(!direct&&!slug)return fallbackMark(label);
 const img=node("img",{className:"tech-logo",src:direct||("https://cdn.simpleicons.org/"+slug),alt:label+" logo",loading:"lazy"});
 img.addEventListener("error",()=>{img.replaceWith(fallbackMark(label))},{once:true});
 return img;
}
function chip(label){const s=node("span",{className:"chip tech-chip"});s.append(techLogo(label),node("span",{text:label}));return s}
function skillIcon(label){return techLogo(label)}

function skillGroup(group,interactive){
 const card=node(interactive?"button":"article",{className:"skill-group"});if(interactive)card.type="button";
 if(interactive){card.dataset.skillIndex=group.icon;card.setAttribute("aria-label","View skills in "+group.title)}
 const head=node("span",{className:"skill-group-head"});
 head.append(node("span",{className:"skill-group-head-copy"},[node("strong",{text:group.title})]));
 card.append(head);
 if(interactive)card.append(node("span",{className:"skill-group-arrow",text:"↗"}));
 return card;
}

function projectCard(p){
 const a=node("a",{className:"project-card",href:safeUrl(p.github||p.url||"#"),target:"_blank",rel:"noopener noreferrer","aria-label":"Open "+p.title});
 const chips=node("div",{className:"chip-row"});(p.tech||[]).forEach(t=>chips.append(chip(t)));
 a.append(node("div",{className:"mini-bar",text:p.category}),node("h3",{text:p.title}),node("div",{className:"meta",text:p.category}),node("p",{text:p.description}),chips,node("span",{className:"project-link",text:"Open project ↗"}));
 return a;
}

function certCard(c){
 const a=node("article",{className:"cert cv-cert"});
 const copy=node("div",{className:"cert-copy"});
 copy.append(node("h3",{text:c[0]}),node("p",{className:"cert-description",text:c[1]+" · "+c[2]}));
 const meta=node("div",{className:"cert-meta"});
 if(c[3])meta.append(node("a",{href:safeUrl(c[3]),target:"_blank",rel:"noopener noreferrer",text:"View certificate ↗"}));
 a.append(copy,meta);
 return a;
}
function achievementCard(a){return node("article",{className:"cert achievement-card"},[node("small",{text:a[2]}),node("h3",{text:a[0]}),node("p",{text:a[1]}),node("span",{text:a[3]})])}

const experienceMeta={
"Software Engineer Intern":["Next.js","Fastify","Redis","Prisma","NextAuth","TanStack","Docker","RESTful APIs"],
"Cyber Security Analyst Intern":["Python","Scapy"],
"Network Engineer Intern":["Linux CLI","TCP/IP","Routing"],
"Web Development Intern":["Angular","RESTful APIs"]
};

function timelineItem(item,type,index){
 const isExp=type==="experience", icon=isExp?"▣":"◆";
 const tech=(experienceMeta[item[0]]||[]);
 const body=node("article",{className:"timeline-item reveal"});body.style.transitionDelay=(index*75)+"ms";
 const marker=node("span",{className:"timeline-marker",text:icon,ariaHidden:"true"});
 const top=node("div",{className:"timeline-top"});
 top.append(node("span",{className:"timeline-period",text:item[2]}),node("span",{className:"timeline-index",text:String(index+1).padStart(2,"0")}));
 const title=node("h3",{text:item[0]});
 const org=node("strong",{text:item[1]});
 const desc=node("p",{text:item[3]});
 body.append(marker,top,title,org,desc);
 if(tech.length){const row=node("div",{className:"timeline-tech"});tech.forEach(t=>row.append(chip(t)));body.append(row)}
 return body;
}

function educationItem(item,index){
 const body=node("article",{className:"timeline-item reveal"});body.style.transitionDelay=(index*75)+"ms";
 body.append(node("span",{className:"timeline-marker education-marker",text:"✦",ariaHidden:"true"}));
 const top=node("div",{className:"timeline-top"});top.append(node("span",{className:"timeline-period",text:item[2]}),node("span",{className:"timeline-index",text:String(index+1).padStart(2,"0")}));
 body.append(top,node("h3",{text:item[0]}),node("strong",{text:item[1]}));
 return body;
}

function render(){
 if(!d)throw new Error("Portfolio data did not load");
 const quote=$("#portfolio-quote");if(quote)quote.textContent=d.quote;
 const about=$("#home-about-copy");if(about)about.textContent=d.personal.bio;
 const bio=$("#about-bio");if(bio)bio.textContent=d.personal.bio;
 const ambition=$("#about-ambition");if(ambition)ambition.textContent=d.personal.ambition;
 const featured=$("#featured-projects");if(featured)featured.replaceChildren(...d.projects.filter(p=>p.featured).slice(0,3).map(projectCard));
 const all=$("#all-projects");if(all)all.replaceChildren(...d.projects.map(projectCard));
 const skillsHome=$("#skills-home");if(skillsHome)skillsHome.replaceChildren(...d.skillGroups.map(g=>skillGroup(g,true)));
 const skillsTable=$("#skills-table");if(skillsTable)skillsTable.replaceChildren(...d.skillGroups.map(g=>skillGroup(g,false)));
 const certs=$("#certifications");if(certs)certs.replaceChildren(...d.certifications.map(certCard));
 setupCertificationCarousel();
 const ach=$("#achievements");if(ach)ach.replaceChildren(...(d.achievements||[]).map(achievementCard));
 const exp=$("#experience");if(exp)exp.replaceChildren(...d.experience.map((i,n)=>timelineItem(i,"experience",n)));
 const edu=$("#education");if(edu)edu.replaceChildren(...d.education.map((i,n)=>educationItem(i,n)));
 const blogs=$("#blog-list");if(blogs)blogs.replaceChildren(...d.blogs.map(b=>{
   const a=node("article",{className:"blog-card reveal"}),h=node("div",{className:"blog-card-head"});
   h.append(node("div",{},[node("span",{className:"blog-category",text:b.category}),node("h2",{text:b.subject})]));
   a.append(h,node("p",{className:"blog-description",text:b.description}));
   if(b.attachments&&b.attachments.length){const box=node("div",{className:"attachments"}),list=node("div",{className:"attachment-list"});box.append(node("span",{className:"attachments-title",text:"ATTACHMENTS / RESOURCES"}));b.attachments.forEach(x=>list.append(node("a",{className:"attachment",href:safeUrl(x.url),target:"_blank",rel:"noopener noreferrer",text:x.label+" ↗"})));box.append(list);a.append(box)}
   a.style.transitionDelay=(Array.from(document.querySelectorAll("#blog-list .blog-card")).length*70)+"ms";return a;
 }));
 const loc=$("#contact-location");if(loc)loc.textContent=d.personal.location;
 document.querySelectorAll(".nav-item,.mobile-nav a,.top-links a").forEach(a=>{const href=a.getAttribute("href");if(href&&href.endsWith(location.pathname.split("/").pop()||"index.html"))a.classList.add("active")});
 document.title=d.personal.name+" — "+(document.body.dataset.page==="home"?"Portfolio":document.body.dataset.page.replace(/-/g," "));
}


function setupCertificationCarousel(){
 const track=$("#certifications"),viewport=document.querySelector(".cert-carousel-viewport");
 const prev=$("#cert-carousel-prev"),next=$("#cert-carousel-next"),dots=$("#certification-dots");
 if(!track||!viewport||!prev||!next||!dots||track.children.length<1)return;
 let index=0,timer=null;
 const total=track.children.length;
 dots.replaceChildren(...Array.from({length:total},(_,i)=>{const b=node("button",{className:"cert-carousel-dot",type:"button","aria-label":"Go to certification "+String(i+1)});b.addEventListener("click",()=>go(i,true));return b}));
 function go(i,manual){
   index=(i+total)%total;
   track.style.transform="translateX(-"+(index*100)+"%)";
   dots.querySelectorAll(".cert-carousel-dot").forEach((b,n)=>b.classList.toggle("active",n===index));
   if(manual)restart();
 }
 function restart(){
   if(timer)clearInterval(timer);
   timer=setInterval(()=>go(index+1,false),4200);
 }
 prev.addEventListener("click",()=>go(index-1,true));
 next.addEventListener("click",()=>go(index+1,true));
 viewport.addEventListener("mouseenter",()=>{if(timer)clearInterval(timer)});
 viewport.addEventListener("mouseleave",restart);
 viewport.addEventListener("focusin",()=>{if(timer)clearInterval(timer)});
 viewport.addEventListener("focusout",e=>{if(!viewport.contains(e.relatedTarget))restart()});
 go(0,false);restart();
}

function setupNavigation(){
 const menu=$("#mobile-menu"),mobile=$("#mobile-nav");
 if(menu&&mobile)menu.addEventListener("click",()=>{const open=mobile.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});
 document.querySelectorAll("img").forEach(img=>img.addEventListener("dragstart",e=>e.preventDefault()));
}
function setupSkillPopover(){
 const overlay=$("#skills-popover"),close=$("#skills-popover-close"),title=$("#skills-popover-title"),index=$("#skills-popover-index"),list=$("#skills-popover-list");
 if(!overlay||!close||!title||!index||!list)return;
 const hide=()=>{overlay.classList.remove("open");overlay.setAttribute("aria-hidden","true");document.body.classList.remove("popover-open")};
 const open=group=>{title.textContent=group.title;index.textContent=group.icon;list.replaceChildren(...group.skills.map(s=>{const label=typeof s==="string"?s:s.name;const item=node("span",{className:"popover-skill"});item.append(skillIcon(label),node("span",{text:label}));return item}));overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");document.body.classList.add("popover-open");close.focus()};
 document.querySelectorAll(".skill-group[data-skill-index]").forEach(tile=>{const group=d.skillGroups.find(g=>g.icon===tile.dataset.skillIndex);if(!group)return;tile.setAttribute("aria-haspopup","dialog");tile.setAttribute("aria-controls","skills-popover");tile.addEventListener("click",()=>open(group))});
 close.addEventListener("click",hide);overlay.addEventListener("click",e=>{if(e.target===overlay)hide()});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&overlay.classList.contains("open"))hide();if(e.key==="Tab"&&overlay.classList.contains("open")){const f=[close,...overlay.querySelectorAll("a[href],button:not([disabled]),[tabindex]:not([tabindex='-1'])")],first=f[0],last=f[f.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
}
function setupReveal(){
 const targets=document.querySelectorAll(".reveal");
 if(!("IntersectionObserver" in window)){targets.forEach(x=>x.classList.add("is-visible"));return}
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");io.unobserve(e.target)}}),{threshold:.12});
 targets.forEach(x=>io.observe(x));
}
document.addEventListener("DOMContentLoaded",()=>{try{render();setupNavigation();setupSkillPopover();setupReveal();document.documentElement.classList.add("js-ready")}catch(err){console.error(err)}});
