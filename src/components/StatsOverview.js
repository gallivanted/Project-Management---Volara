import React, { useState } from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';
import anime from 'animejs';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
}));

const Chart = styled(Box)(({ theme }) => ({
  flex: 1,
  height: 160,
  position: 'relative',
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(0.5),
  paddingBottom: 0,
  '& svg': {
    overflow: 'visible',
  }
}));

const Tooltip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  padding: theme.spacing(0.75),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  pointerEvents: 'none',
  display: 'none',
  zIndex: 1000,
  minWidth: '60px',
  textAlign: 'center',
  border: '1px solid rgba(0,0,0,0.05)',
}));

const StatsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  marginTop: 'auto',
  paddingTop: theme.spacing(1),
}));

const StatItem = styled(Box)(({ theme }) => ({
  flex: 1,
  textAlign: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  },
}));

const StatsOverview = React.forwardRef((props, ref) => {
  const chartRef = React.useRef(null);
  const tooltipRef = React.useRef(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  React.useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous content
    chartRef.current.innerHTML = '';

    // Create SVG element with better dimensions
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 800 400');
    svg.style.overflow = 'visible'; // Allow labels to overflow
    chartRef.current.appendChild(svg);

    // Add grid lines with better spacing
    for (let i = 0; i <= 4; i++) {
      const y = 80 + i * 80;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', '40');
      line.setAttribute('y1', y.toString());
      line.setAttribute('x2', '760');
      line.setAttribute('y2', y.toString());
      line.setAttribute('stroke', 'rgba(224, 224, 224, 0.6)');
      line.setAttribute('stroke-dasharray', '4');
      svg.appendChild(line);

      // Add percentage labels with better positioning
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '30');
      text.setAttribute('y', (y + 5).toString());
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('fill', '#666');
      text.setAttribute('font-size', '12');
      text.textContent = `${100 - (i * 25)}%`;
      svg.appendChild(text);
    }

    // Sample data points with better distribution
    const productiveData = [
      { x: 40, y: 56 },
      { x: 180, y: 65 },
      { x: 320, y: 45 },
      { x: 460, y: 70 },
      { x: 600, y: 56 },
      { x: 760, y: 60 }
    ];

    const completionData = [
      { x: 40, y: 22 },
      { x: 180, y: 30 },
      { x: 320, y: 15 },
      { x: 460, y: 35 },
      { x: 600, y: 22 },
      { x: 760, y: 25 }
    ];

    // Create paths with smoother curves
    const createPath = (data, color) => {
      // Create smooth curve using cubic bezier
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const d = data.map((point, i, points) => {
        if (i === 0) return `M ${point.x} ${400 - (point.y * 4)}`;
        
        const prev = points[i - 1];
        const curr = point;
        const controlPoint1X = prev.x + (curr.x - prev.x) / 2;
        const controlPoint2X = prev.x + (curr.x - prev.x) / 2;
        
        return `C ${controlPoint1X} ${400 - (prev.y * 4)} ${controlPoint2X} ${400 - (curr.y * 4)} ${curr.x} ${400 - (curr.y * 4)}`;
      }).join(' ');

      path.setAttribute('d', d);
      path.setAttribute('stroke', color);
      path.setAttribute('stroke-width', '2.5');
      path.setAttribute('fill', 'none');
      svg.appendChild(path);

      // Add interactive points with better hover effect
      data.forEach((point, index) => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', point.x.toString());
        circle.setAttribute('cy', (400 - (point.y * 4)).toString());
        circle.setAttribute('r', '5');
        circle.setAttribute('fill', '#fff');
        circle.setAttribute('stroke', color);
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('opacity', '0');
        circle.setAttribute('cursor', 'pointer');

        // Add hover glow effect
        const glow = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        glow.setAttribute('cx', point.x.toString());
        glow.setAttribute('cy', (400 - (point.y * 4)).toString());
        glow.setAttribute('r', '8');
        glow.setAttribute('fill', color);
        glow.setAttribute('opacity', '0');
        glow.setAttribute('filter', 'url(#glow)');
        svg.appendChild(glow);

        circle.addEventListener('mouseenter', (e) => {
          circle.setAttribute('opacity', '1');
          glow.setAttribute('opacity', '0.3');
          const tooltip = tooltipRef.current;
          if (tooltip) {
            tooltip.style.display = 'block';
            tooltip.style.left = `${e.clientX + 10}px`;
            tooltip.style.top = `${e.clientY - 40}px`;
            setHoveredPoint({ value: point.y, color });
          }
        });

        circle.addEventListener('mouseleave', () => {
          circle.setAttribute('opacity', '0');
          glow.setAttribute('opacity', '0');
          if (tooltipRef.current) {
            tooltipRef.current.style.display = 'none';
          }
          setHoveredPoint(null);
        });

        svg.appendChild(circle);
      });

      // Add glow filter
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
      filter.setAttribute('id', 'glow');
      filter.innerHTML = `
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      `;
      defs.appendChild(filter);
      svg.appendChild(defs);

      // Animate the path
      const length = path.getTotalLength();
      path.setAttribute('stroke-dasharray', length);
      path.setAttribute('stroke-dashoffset', length);

      anime({
        targets: path,
        strokeDashoffset: [length, 0],
        easing: 'easeInOutSine',
        duration: 1500,
        delay: 300
      });
    };

    createPath(productiveData, '#4CAF50');
    createPath(completionData, '#2196F3');

    // Animate stats numbers
    anime({
      targets: '.stat-number',
      innerHTML: [0, el => el.getAttribute('data-value')],
      round: 1,
      easing: 'easeInOutExpo',
      duration: 2000,
      delay: 500,
    });
  }, []);

  return (
    <StyledPaper elevation={0} ref={ref}>
      <Typography variant="h6" sx={{ 
        fontWeight: 600, 
        color: '#1a1a1a',
        fontSize: '1rem',
        mb: 0.5
      }}>
        Work Overview
      </Typography>
      
      <Box sx={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Chart ref={chartRef} />
        <Tooltip ref={tooltipRef}>
          {hoveredPoint && (
            <Typography variant="body2" sx={{ 
              color: hoveredPoint.color,
              fontWeight: 600,
              fontSize: '0.85rem'
            }}>
              {hoveredPoint.value}%
            </Typography>
          )}
        </Tooltip>
      </Box>

      <StatsBox>
        <StatItem>
          <Typography variant="h6" sx={{ 
            color: '#4CAF50', 
            fontWeight: 500,
            fontSize: '0.85rem',
            mb: 0.25
          }}>
            PRODUCTIVE
          </Typography>
          <Typography 
            variant="h4" 
            className="stat-number" 
            data-value="56"
            sx={{ 
              fontWeight: 600, 
              color: '#1a1a1a',
              fontSize: '1.75rem',
              lineHeight: 1.1
            }}
          >
            0
          </Typography>
          <Typography variant="body2" sx={{ 
            color: 'text.secondary',
            fontSize: '0.75rem'
          }}>%</Typography>
        </StatItem>

        <StatItem>
          <Typography variant="h6" sx={{ 
            color: '#2196F3', 
            fontWeight: 500,
            fontSize: '0.85rem',
            mb: 0.25
          }}>
            COMPLETION
          </Typography>
          <Typography 
            variant="h4" 
            className="stat-number" 
            data-value="22"
            sx={{ 
              fontWeight: 600, 
              color: '#1a1a1a',
              fontSize: '1.75rem',
              lineHeight: 1.1
            }}
          >
            0
          </Typography>
          <Typography variant="body2" sx={{ 
            color: 'text.secondary',
            fontSize: '0.75rem'
          }}>%</Typography>
        </StatItem>
      </StatsBox>
    </StyledPaper>
  );
});

export default StatsOverview;