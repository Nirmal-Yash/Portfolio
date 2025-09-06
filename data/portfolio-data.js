// Portfolio Data
export const portfolioData = {
  personal: {
    name: "Yash Nirmal",
    title: "Cyber Security Enthusiast & Pentester",
    bio: "I am Yash Nirmal - passionate about Cyber Security, Networking, and Exploring. Building skills today to defend systems tomorrow. I love CTF challenges.",
    location: "Gondal, Gujarat",
    contact: {
      linkedin: "https://www.linkedin.com/in/yash-nirmal721/",
      github: "https://github.com/Nirmal-Yash",
      instagram: "https://www.instagram.com/_yashpal_3/",
      email: "nirmalyash721@gmail.com",
      phone: "+91 9714914179"
    }
  },
  skills: [
    {
      id: "osint",
      name: "OSINT",
      category: "Intelligence",
      level: 90,
      connections: ["pentesting", "threatintel", "investigation"]
    },
    {
      id: "pentesting",
      name: "Penetration Testing",
      category: "Security",
      level: 85,
      connections: ["osint", "linux", "python", "networking"]
    },
    {
      id: "threatintel",
      name: "Threat Intelligence",
      category: "Intelligence",
      level: 80,
      connections: ["osint", "investigation", "python"]
    },
    {
      id: "investigation",
      name: "Investigation",
      category: "Investigation",
      level: 75,
      connections: ["osint", "threatintel", "forensics"]
    },
    {
      id: "forensics",
      name: "Digital Forensics",
      category: "Investigation",
      level: 70,
      connections: ["investigation", "linux"]
    },
    {
      id: "linux",
      name: "Linux",
      category: "Systems",
      level: 80,
      connections: ["pentesting", "forensics", "python", "shell"]
    },
    {
      id: "python",
      name: "Python",
      category: "Programming",
      level: 85,
      connections: ["pentesting", "linux", "automation", "threatintel"]
    },
    {
      id: "automation",
      name: "Automation Scripting",
      category: "Programming",
      level: 75,
      connections: ["python", "shell"]
    },
    {
      id: "shell",
      name: "Shell Scripting",
      category: "Programming",
      level: 70,
      connections: ["linux", "automation"]
    },
    {
      id: "networking",
      name: "Networking",
      category: "Systems",
      level: 80,
      connections: ["pentesting", "linux"]
    }
  ],
  certifications: [
    {
      title: "Advent of Cyber 2024",
      issuer: "TryHackMe",
      year: "August 2025",
      link: "https://drive.google.com/file/d/1OgY0uVfbzAQSaiQg52zWztzuZ_JAWgOa/view"
    },
    {
      title: "Hackerverse CTF Challenge",
      issuer: "EC-Council",
      year: "July 2025",
      link: "https://drive.google.com/file/d/11u0LNSJrsH9N4EVHcycAjAmgKHrSqDjJ/view"
    },
    {
      title: "Fundamentals of Enterprise Linux 9",
      issuer: "Red Hat",
      year: "February 2025",
      link: "https://drive.google.com/file/d/1kJcgV6aTE7JUhY6Ig6yntdOQjKFMwzAE/view"
    }
  ],
  projects: [
    {
      title: "Wordlist",
      description: "Custom Password Lists to enumerate in Password Cracking Tool with Common Indian Passwords.",
      github: "https://github.com/Nirmal-Yash/Wordlist",
      tech: ["Password Cracking", "Security", "Wordlists"]
    },
    {
      title: "PentestAutomation",
      description: "Scripts for Automation in Penetration Testing for Web Applications Reconnaissance Techniques.",
      github: "https://github.com/Nirmal-Yash/PentestAutomation",
      tech: ["Penetration Testing", "Automation", "Shell"]
    }
  ],
  commandHistory: {
    home: "cat introduction.txt",
    about: "echo \"About me and my skills\"",
    projects: "echo \"See GitHub for projects\"",
    contact: "echo \"Contact via LinkedIn or Instagram\""
  }
};

// XSS Protection - Sanitize user inputs
export function sanitizeInput(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// Make available globally for non-module scripts
if (typeof window !== "undefined") {
  window.portfolioData = portfolioData;
  window.sanitizeInput = sanitizeInput;
}
