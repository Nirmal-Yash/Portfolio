# CyberHacker Portfolio

A cyberpunk-themed portfolio website with OSINT dashboard aesthetics, featuring advanced security implementations and stunning visual effects.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Single Page Application**: Smooth section transitions without page reloads  
- **Terminal-Style Navigation**: Command-line inspired UI with typing effects
- **Matrix Rain Background**: Dynamic digital rain animation
- **Interactive Skills Graph**: D3.js network visualization of skills and connections
- **Auto-Playing Certifications Slider**: Glitch-effect transitions between certificates
- **Project Showcase**: Expandable project cards with detailed modal views
- **Security-Enhanced**: XSS protection, input sanitization, CSP headers

### Visual Effects
- **Cyber Glitch Animations**: Text and image glitch effects
- **Terminal Typing Effects**: Simulated command-line interactions  
- **Scanline Overlays**: CRT monitor simulation
- **Neon Glow Effects**: CSS-based cyber styling
- **Smooth Transitions**: GSAP-powered animations
- **Hover Interactions**: Responsive UI feedback

### Security Features
- **Input Sanitization**: All user inputs are cleaned and validated
- **XSS Protection**: Content Security Policy and safe HTML rendering
- **Security Headers**: X-Frame-Options, X-Content-Type-Options protection
- **Safe External Links**: Proper target and rel attributes
- **Error Handling**: Graceful degradation and fallback systems

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML structure
├── styles.css              # Complete CSS styling with cyber theme
├── data/
│   └── portfolio-data.js   # Modular data configuration
├── js/
│   ├── main.js            # Core application logic
│   ├── matrix-rain.js     # Background animation system
│   ├── skills-graph.js    # D3.js network visualization
│   └── certifications-slider.js # Auto-playing slideshow
└── README.md              # This file
```

## ⚙️ Configuration

### Updating Content

All content is managed through `data/portfolio-data.js`:

```javascript
const portfolioData = {
    personal: {
        name: "Your Name",
        title: "Your Title", 
        email: "your.email@domain.com",
        // ... other personal info
    },
    
    skills: [
        {
            id: 1,
            name: "Skill Name",
            category: "Category",
            level: 85,
            connections: [2, 3] // IDs of connected skills
        }
    ],
    
    projects: [
        {
            id: 1,
            title: "Project Name",
            description: "Project description",
            tech: ["Technology", "Stack"],
            github: "https://github.com/user/repo",
            demo: "https://demo.url"
        }
    ],
    
    certifications: [
        {
            id: 1,
            title: "Certification Name",
            issuer: "Issuing Organization",
            date: "2024",
            image: "https://image.url",
            download: "#"
        }
    ]
};
```

### Customizing Theme

Modify CSS custom properties in `styles.css`:

```css
:root {
    --primary-green: #00ff00;      /* Main accent color */
    --secondary-green: #00cc00;    /* Secondary accent */
    --bg-dark: #0a0a0a;           /* Background color */
    --text-primary: #00ff00;       /* Primary text */
    --border-color: #004400;       /* Border color */
}
```

## 🚀 Deployment to GitHub Pages

### Method 1: Direct Upload
1. Create a new GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" → main → / (root)
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Method 2: GitHub Desktop
1. Clone the repository locally
2. Copy portfolio files to the local repository folder
3. Commit and push changes
4. Enable GitHub Pages in repository settings

### Method 3: GitHub CLI
```bash
# Create new repository
gh repo create portfolio --public

# Clone and add files  
git clone https://github.com/yourusername/portfolio.git
cd portfolio
# Copy all portfolio files here
git add .
git commit -m "Add cyberpunk portfolio"
git push origin main

# Enable GitHub Pages
gh api repos/yourusername/portfolio --method PATCH \
  --field has_pages=true \
  --field pages.source.branch=main \
  --field pages.source.path=/
```

## 🛠️ Technical Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Animations**: GSAP, CSS3 Transitions
- **Visualizations**: D3.js for skills network graph
- **Typography Effects**: Typed.js for terminal typing
- **Deployment**: GitHub Pages compatible
- **Performance**: Optimized for fast loading
- **Compatibility**: Modern browsers (Chrome, Firefox, Safari, Edge)

## 🎨 Customization Guide

### Adding New Skills
```javascript
skills: [
    {
        id: 10, // Unique ID
        name: "New Skill",
        category: "Category Name", 
        level: 75, // 0-100
        connections: [1, 2, 3] // Connect to existing skill IDs
    }
]
```

### Adding New Projects
```javascript
projects: [
    {
        id: 5,
        title: "New Project",
        description: "Detailed description",
        detailed_description: "Extended description for modal",
        tech: ["React", "Node.js", "MongoDB"],
        image: "https://image.url",
        github: "https://github.com/user/repo",
        demo: "https://demo.url",
        status: "Active", // or "Beta", "Completed"
        features: [
            "Feature 1",
            "Feature 2", 
            "Feature 3"
        ]
    }
]
```

### Adding New Certifications
```javascript
certifications: [
    {
        id: 6,
        title: "New Certification",
        issuer: "Organization Name",
        date: "2024",
        image: "https://cert-image.url",
        download: "https://certificate.pdf", // or "#" for placeholder
        description: "Certification description"
    }
]
```

## 🔒 Security Features

- **Content Security Policy**: Prevents XSS attacks
- **Input Sanitization**: All dynamic content is cleaned
- **Safe External Links**: `target="_blank" rel="noopener noreferrer"`
- **Error Boundaries**: Graceful error handling
- **Performance Monitoring**: Optimized resource loading

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Single column layout)
- **Tablet**: 768px - 1024px (Adapted grid layouts)  
- **Desktop**: > 1024px (Full multi-column experience)

## 🎯 Performance Optimizations

- **Lazy Loading**: Images load as needed
- **Efficient Animations**: Hardware-accelerated CSS transforms
- **Optimized JavaScript**: Minimal DOM manipulation
- **Compressed Assets**: Optimized file sizes
- **Caching Strategy**: Proper cache headers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments for implementation details

---

**Note**: This portfolio is designed for GitHub Pages deployment and includes all security best practices for static site hosting. All external dependencies are loaded from CDNs with proper fallback mechanisms.