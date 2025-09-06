// Matrix Rain Background Effect
export class MatrixRain {
    constructor() {
        this.canvas = document.getElementById('matrix-rain');
        this.ctx = this.canvas.getContext('2d');
        this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
        this.fontSize = 14;
        this.columns = 0;
        this.drops = [];
        this.animationId = null;
        
        this.setupCanvas();
        this.setupDrops();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.columns = Math.floor(this.canvas.width / this.fontSize);
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.columns = Math.floor(this.canvas.width / this.fontSize);
            this.setupDrops();
        });
    }

    setupDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = {
                y: Math.random() * this.canvas.height,
                speed: Math.random() * 3 + 2,
                opacity: Math.random() * 0.8 + 0.2
            };
        }
    }

    draw() {
        // Semi-transparent black background for fading effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            // Random character
            const char = this.characters[Math.floor(Math.random() * this.characters.length)];
            
            // Different shades of green for depth effect
            const hue = 120; // Green hue
            const saturation = 100;
            const lightness = Math.floor(drop.opacity * 50 + 30);
            
            this.ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${drop.opacity})`;
            
            // Draw character
            this.ctx.fillText(char, i * this.fontSize, drop.y);
            
            // Move drop down
            drop.y += drop.speed;
            
            // Random reset to create varied lengths
            if (drop.y > this.canvas.height && Math.random() > 0.975) {
                drop.y = 0;
                drop.speed = Math.random() * 3 + 2;
                drop.opacity = Math.random() * 0.8 + 0.2;
            }
        }
    }

    start() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        const animate = () => {
            this.draw();
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }

    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    // Performance optimization - pause animation when tab is not visible
    handleVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stop();
            } else {
                this.start();
            }
        });
    }
}

// Enhanced Matrix Rain with cyber effects
class CyberMatrixRain extends MatrixRain {
    constructor() {
        super();
        this.glitchChance = 0.001; // Chance of glitch effect
        this.pulseSpeed = 0.02;
        this.pulseOffset = 0;
    }

    draw() {
        // Pulse effect for background
        this.pulseOffset += this.pulseSpeed;
        const pulseAlpha = 0.05 + (Math.sin(this.pulseOffset) * 0.02);
        
        this.ctx.fillStyle = `rgba(0, 0, 0, ${pulseAlpha})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.font = `${this.fontSize}px 'Courier New', monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const drop = this.drops[i];
            
            // Character selection with occasional cyber symbols
            let charSet = this.characters;
            if (Math.random() < 0.1) {
                charSet = '!@#$%^&*()_+-=[]{}|;:,.<>?~`';
            }
            
            const char = charSet[Math.floor(Math.random() * charSet.length)];
            
            // Glitch effect
            let x = i * this.fontSize;
            let y = drop.y;
            
            if (Math.random() < this.glitchChance) {
                x += Math.random() * 10 - 5;
                y += Math.random() * 10 - 5;
                
                // Glitch colors
                this.ctx.fillStyle = `hsla(${Math.random() * 360}, 100%, 50%, ${drop.opacity})`;
            } else {
                // Normal green matrix effect
                const lightness = Math.floor(drop.opacity * 60 + 20);
                this.ctx.fillStyle = `hsla(120, 100%, ${lightness}%, ${drop.opacity})`;
            }
            
            // Draw character with glow effect for brighter drops
            if (drop.opacity > 0.7) {
                this.ctx.shadowColor = '#00ff00';
                this.ctx.shadowBlur = 5;
            } else {
                this.ctx.shadowBlur = 0;
            }
            
            this.ctx.fillText(char, x, y);
            
            // Reset shadow
            this.ctx.shadowBlur = 0;
            
            // Move drop
            drop.y += drop.speed;
            
            // Reset drop with slight randomization
            if (drop.y > this.canvas.height + 50) {
                if (Math.random() > 0.98) {
                    drop.y = -Math.random() * 200;
                    drop.speed = Math.random() * 4 + 1;
                    drop.opacity = Math.random() * 0.9 + 0.1;
                }
            }
        }
    }
}

// Export for global use
window.MatrixRain = CyberMatrixRain || MatrixRain;