// Skills Network Graph using D3.js
class SkillsGraph {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.links = [];
    }

    render(containerId, skillsData) {
        const container = document.querySelector(containerId);
        if (!container || typeof d3 === 'undefined') {
            return;
        }
        // Only start animation when visible
        const startGraph = () => {
            container.innerHTML = '';
            // Responsive: use parent size, fallback to 1000x600
            this.width = container.offsetWidth > 0 ? container.offsetWidth : 1600;
            this.height = container.offsetHeight > 0 ? container.offsetHeight : 900;
            this.prepareData(skillsData);
            this.svg = d3.select(container)
                .append('svg')
                .attr('width', '100%')
                .attr('height', '80%')
                .attr('viewBox', `0 0 ${this.width} ${this.height}`)
                .style('background', 'rgba(0, 0, 0, 0.8)')
                .style('border', '1px solid var(--border-color)')
                .style('display', 'block');
            this.createSimulation();
            this.renderGraph();
            window.addEventListener('resize', () => {
                this.handleResize(container);
            });
        };
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startGraph();
                        obs.disconnect();
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(container);
        } else {
            startGraph();
        }
    }

    prepareData(skillsData) {
        // Map all skills from portfolioData.skills directly
        this.nodes = skillsData.map(skill => ({
            id: skill.id,
            name: skill.name,
            category: skill.category,
            level: skill.level,
            connections: Array.isArray(skill.connections) ? skill.connections : [],
            radius: this.calculateRadius(skill.level),
            color: this.getCategoryColor(skill.category)
        }));

        // Build links based on connections
        this.links = [];
        const nodeIds = new Set(this.nodes.map(n => n.id));
        this.nodes.forEach(skill => {
            skill.connections.forEach(connId => {
                if (nodeIds.has(connId)) {
                    this.links.push({
                        source: skill.id,
                        target: connId,
                        strength: this.calculateLinkStrength(skill.level, 
                            this.nodes.find(s => s.id === connId)?.level || 50)
                    });
                }
            });
        });
    }

    calculateRadius(level) {
        return Math.max(12, level * 0.28);
    }

    getCategoryColor(category) {
        const colors = {
            'Security': '#00ff00',
            'Intelligence': '#00cc99',
            'Programming': '#ffff00',
            'Systems': '#ff6600',
            'Investigation': '#cc00ff'
        };
        return colors[category] || '#00ff00';
    }

    calculateLinkStrength(level1, level2) {
        return (level1 + level2) / 200;
    }

    createSimulation() {
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links)
                .id(d => d.id)
                .strength(d => d.strength)
                .distance(340)) // More horizontal spread
            .force('charge', d3.forceManyBody()
                .strength(-1000))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('collision', d3.forceCollide()
                .radius(d => d.radius + 40));
    }

    renderGraph() {
        // Create glow filter
        const defs = this.svg.append('defs');
        const filter = defs.append('filter')
            .attr('id', 'glow')
            .attr('x', '-50%')
            .attr('y', '-50%')
            .attr('width', '200%')
            .attr('height', '200%');

        filter.append('feGaussianBlur')
            .attr('stdDeviation', '3')
            .attr('result', 'coloredBlur');

        const feMerge = filter.append('feMerge');
        feMerge.append('feMergeNode').attr('in', 'coloredBlur');
        feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

        // Render gradient for links
        const gradient = defs.append('linearGradient')
            .attr('id', 'link-gradient')
            .attr('x1', '0%').attr('y1', '0%')
            .attr('x2', '100%').attr('y2', '0%');
        gradient.append('stop').attr('offset', '0%').attr('stop-color', '#00ff99');
        gradient.append('stop').attr('offset', '100%').attr('stop-color', '#00ccff');

        // Render links
        const link = this.svg.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(this.links)
            .enter()
            .append('line')
            .attr('stroke', 'url(#link-gradient)')
            .attr('stroke-opacity', d => d.strength)
            .attr('stroke-width', d => Math.max(1.5, d.strength * 5))
            .style('filter', 'url(#glow)');

        // Render nodes with pulsing animation for high skill level
        const node = this.svg.append('g')
            .attr('class', 'nodes')
            .selectAll('circle')
            .data(this.nodes)
            .enter()
            .append('circle')
            .attr('r', d => d.radius)
            .attr('fill', d => d.color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2.5)
            .style('filter', 'url(#glow)')
            .style('cursor', 'pointer')
            .attr('class', d => d.level > 80 ? 'pulse-node' : '')
            .call(this.createDragBehavior());

        // Add pulsing animation via CSS for high skill nodes
        const style = document.createElement('style');
        style.innerHTML = `
        .pulse-node {
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { filter: drop-shadow(0 0 0 #00ffcc); }
            50% { filter: drop-shadow(0 0 20px #00ffcc); }
            100% { filter: drop-shadow(0 0 0 #00ffcc); }
        }
        `;
        document.head.appendChild(style);

        // Add node labels (above node, neon, with background for clarity)
        const labels = this.svg.append('g')
            .attr('class', 'labels')
            .selectAll('g')
            .data(this.nodes)
            .enter()
            .append('g')
            .attr('class', 'label-group');

        // Add background rect for each label
        labels.append('rect')
            .attr('rx', 6)
            .attr('ry', 6)
            .attr('fill', 'rgba(0,0,0,0.7)')
            .attr('stroke', '#00fff7')
            .attr('stroke-width', 1.2)
            .attr('filter', 'url(#glow)');

        // Add text
        labels.append('text')
            .text(d => d.name)
            .attr('font-family', 'Fira Mono, Courier New, monospace')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .attr('fill', '#fff')
            .attr('text-anchor', 'middle')
            .attr('dy', '-1.1em') // Place label above node
            .style('pointer-events', 'none')
            .style('text-shadow', '0 0 16px #00fff7, 0 0 4px #00ffcc, 0 0 2px #fff');

        // Add hover effects
        node.on('mouseover', (event, d) => {
            this.highlightNode(d);
            this.showTooltip(event, d);
        })
        .on('mouseout', (event, d) => {
            this.unhighlightNode();
            this.hideTooltip();
        });

        // Update positions on simulation tick, constrain to SVG bounds
        // Vertical offset to push the whole graph down
        const verticalOffset = 40;
        this.simulation.on('tick', () => {
            const pad = 30;
            link
                .attr('x1', d => Math.max(pad, Math.min(this.width - pad, d.source.x)))
                .attr('y1', d => Math.max(pad + verticalOffset, Math.min(this.height - pad, d.source.y + verticalOffset)))
                .attr('x2', d => Math.max(pad, Math.min(this.width - pad, d.target.x)))
                .attr('y2', d => Math.max(pad + verticalOffset, Math.min(this.height - pad, d.target.y + verticalOffset)));

            node
                .attr('cx', d => {
                    d.x = Math.max(pad, Math.min(this.width - pad, d.x));
                    return d.x;
                })
                .attr('cy', d => {
                    d.y = Math.max(pad + verticalOffset, Math.min(this.height - pad, d.y + verticalOffset));
                    return d.y;
                });

            // Position label groups above each node, but never above the top edge
            labels.each(function(d) {
                const group = d3.select(this);
                // Clamp label y to at least 10px from top
                const labelY = Math.max(10, d.y + verticalOffset - d.radius - 16);
                // Text element
                const text = group.select('text')
                    .attr('x', d.x)
                    .attr('y', labelY);
                // Get text width for background
                const node = text.node();
                const bbox = node.getBBox();
                // Rect element
                group.select('rect')
                    .attr('x', bbox.x - 10)
                    .attr('y', bbox.y - 4)
                    .attr('width', bbox.width + 20)
                    .attr('height', bbox.height + 8);
            });
        });
    }

    createDragBehavior() {
        return d3.drag()
            .on('start', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            })
            .on('drag', (event, d) => {
                d.fx = event.x;
                d.fy = event.y;
            })
            .on('end', (event, d) => {
                if (!event.active) this.simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            });
    }

    highlightNode(selectedNode) {
        this.svg.selectAll('circle')
            .style('opacity', d => {
                const connected = selectedNode.connections.includes(d.id) || d.id === selectedNode.id;
                return connected ? 1 : 0.3;
            });

        this.svg.selectAll('line')
            .style('opacity', d => {
                const connected = d.source.id === selectedNode.id || d.target.id === selectedNode.id;
                return connected ? 1 : 0.1;
            });
    }

    unhighlightNode() {
        this.svg.selectAll('circle').style('opacity', 1);
        this.svg.selectAll('line').style('opacity', d => d.strength);
    }

    showTooltip(event, d) {
        const tooltip = d3.select('body').append('div')
            .attr('class', 'graph-tooltip')
            .style('position', 'absolute')
            .style('background', 'linear-gradient(135deg, #001a1a 60%, #00ffcc 100%)')
            .style('color', '#fff')
            .style('padding', '14px 18px')
            .style('border', '2px solid #00ffcc')
            .style('border-radius', '10px')
            .style('font-family', 'Fira Mono, Courier New, monospace')
            .style('font-size', '15px')
            .style('box-shadow', '0 0 30px #00fff7, 0 0 10px #00ffcc')
            .style('z-index', '10000')
            .style('pointer-events', 'none')
            .html(`
                <div style="font-size:1.1em;font-weight:bold;letter-spacing:1px;">${sanitizeInput(d.name)}</div>
                <div style="margin-top:2px;">Category: <span style="color:#00ffcc;">${sanitizeInput(d.category)}</span></div>
                <div>Level: <span style="color:#fffb00;">${d.level}%</span></div>
                <div>Connections: <span style="color:#00ffcc;">${d.connections.length}</span></div>
            `)
            .style('left', (event.pageX + 10) + 'px')
            .style('top', (event.pageY - 10) + 'px')
            .style('opacity', 0)
            .transition()
            .duration(200)
            .style('opacity', 1);
    }

    hideTooltip() {
        d3.selectAll('.graph-tooltip').remove();
    }

    handleResize(container) {
    const newWidth = container.offsetWidth > 0 ? container.offsetWidth : 1000;
    const newHeight = container.offsetHeight > 0 ? container.offsetHeight : 900;
        if (newWidth !== this.width || newHeight !== this.height) {
            this.width = newWidth;
            this.height = newHeight;
            this.svg
                .attr('viewBox', `0 0 ${this.width} ${this.height}`);
            this.simulation
                .force('center', d3.forceCenter(this.width / 2, this.height / 2))
                .restart();
        }
    }

    // Fallback rendering removed for production clarity
}

// Export for global use
window.SkillsGraph = SkillsGraph;