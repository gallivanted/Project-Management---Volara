import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  styled, 
  ToggleButtonGroup, 
  ToggleButton, 
  Tooltip,
  IconButton
} from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useTheme } from '@mui/material/styles';
import anime from 'animejs/lib/anime.es.js';

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

const ChartTooltip = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
  pointerEvents: 'none',
  display: 'none',
  zIndex: 1000,
  minWidth: '100px',
  textAlign: 'center',
  border: '1px solid rgba(0,0,0,0.08)',
  transition: 'all 0.2s ease',
  backdropFilter: 'blur(4px)',
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
  const theme = useTheme();
  const chartRef = React.useRef(null);
  const tooltipRef = React.useRef(null);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [chartType, setChartType] = useState('line');
  const [tooltipVisible, setTooltipVisible] = useState(false);

  // Sample data points with better distribution
  const productiveData = [
    { x: 40, y: 56, label: 'Mon' },
    { x: 180, y: 65, label: 'Tue' },
    { x: 320, y: 45, label: 'Wed' },
    { x: 460, y: 70, label: 'Thu' },
    { x: 600, y: 56, label: 'Fri' },
    { x: 760, y: 60, label: 'Sat' }
  ];

  const completionData = [
    { x: 40, y: 22, label: 'Mon' },
    { x: 180, y: 30, label: 'Tue' },
    { x: 320, y: 15, label: 'Wed' },
    { x: 460, y: 35, label: 'Thu' },
    { x: 600, y: 22, label: 'Fri' },
    { x: 760, y: 25, label: 'Sat' }
  ];

  const handleChartTypeChange = (event, newType) => {
    if (newType !== null) {
      setChartType(newType);
      
      // Animate the chart transition
      anime({
        targets: chartRef.current,
        opacity: [1, 0],
        translateY: [0, 10],
        duration: 300,
        easing: 'easeOutQuad',
        complete: () => {
          renderChart(newType);
          anime({
            targets: chartRef.current,
            opacity: [0, 1],
            translateY: [10, 0],
            duration: 500,
            easing: 'easeOutQuad'
          });
        }
      });
    }
  };

  const renderChart = (type) => {
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

    if (type === 'line') {
      renderLineChart(svg);
    } else if (type === 'bar') {
      renderBarChart(svg);
    } else if (type === 'pie') {
      renderPieChart(svg);
    }

    // Animate stats numbers
    anime({
      targets: '.stat-number',
      innerHTML: [0, el => el.getAttribute('data-value')],
      round: 1,
      easing: 'easeInOutExpo',
      duration: 2000,
      delay: 500,
    });
  };

  const renderLineChart = (svg) => {
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

    // Add day labels on x-axis
    productiveData.forEach(point => {
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', point.x.toString());
      text.setAttribute('y', '410');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#666');
      text.setAttribute('font-size', '12');
      text.textContent = point.label;
      svg.appendChild(text);
    });

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
          glow.setAttribute('opacity', '0.5');
          const tooltip = tooltipRef.current;
          if (tooltip) {
            tooltip.style.display = 'block';
            
            // Calculate position based on SVG coordinates
            const svgRect = svg.getBoundingClientRect();
            const circleX = parseFloat(circle.getAttribute('cx'));
            const circleY = parseFloat(circle.getAttribute('cy'));
            
            // Convert SVG coordinates to screen coordinates
            const screenX = svgRect.left + (circleX / 800) * svgRect.width;
            const screenY = svgRect.top + (circleY / 400) * svgRect.height;
            
            tooltip.style.left = `${screenX + 15}px`;
            tooltip.style.top = `${screenY - 45}px`;
            
            setHoveredPoint({ 
              value: point.y, 
              color, 
              label: point.label,
              dataType: color === '#4CAF50' ? 'Productivity' : 'Completion'
            });
            setTooltipVisible(true);
            
            // Animate the dot appearance with anime.js
            anime({
              targets: circle,
              r: [5, 8],
              duration: 400,
              easing: 'easeOutElastic(1, .5)'
            });
            
            // Animate tooltip appearance
            anime({
              targets: tooltip,
              opacity: [0, 1],
              scale: [0.9, 1],
              translateY: [10, 0],
              duration: 300,
              easing: 'easeOutQuad'
            });
          }
        });

        circle.addEventListener('mouseleave', () => {
          circle.setAttribute('opacity', '0');
          glow.setAttribute('opacity', '0');
          if (tooltipRef.current) {
            anime({
              targets: tooltipRef.current,
              opacity: 0,
              scale: 0.9,
              duration: 200,
              easing: 'easeInQuad',
              complete: () => {
                tooltipRef.current.style.display = 'none';
                setTooltipVisible(false);
              }
            });
          }
          setHoveredPoint(null);
          
          // Animate the dot back to original size
          anime({
            targets: circle,
            r: 5,
            duration: 300,
            easing: 'easeOutQuad'
          });
        });

        svg.appendChild(circle);
      });

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
  };

  const renderBarChart = (svg) => {
    // Add grid lines
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

      // Add percentage labels
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', '30');
      text.setAttribute('y', (y + 5).toString());
      text.setAttribute('text-anchor', 'end');
      text.setAttribute('fill', '#666');
      text.setAttribute('font-size', '12');
      text.textContent = `${100 - (i * 25)}%`;
      svg.appendChild(text);
    }

    // Calculate bar width and spacing
    const barWidth = 30;
    const groupSpacing = 100;
    const barSpacing = 10;
    
    // Create bars for each data point
    productiveData.forEach((point, index) => {
      const completionPoint = completionData[index];
      const groupX = 70 + index * groupSpacing;
      
      // Productive bar
      const productiveBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      productiveBar.setAttribute('x', groupX.toString());
      productiveBar.setAttribute('y', (400 - (point.y * 4)).toString());
      productiveBar.setAttribute('width', barWidth.toString());
      productiveBar.setAttribute('height', '0'); // Start at 0 for animation
      productiveBar.setAttribute('fill', '#4CAF50');
      productiveBar.setAttribute('rx', '4');
      productiveBar.setAttribute('ry', '4');
      productiveBar.setAttribute('cursor', 'pointer');
      svg.appendChild(productiveBar);
      
      // Completion bar
      const completionBar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      completionBar.setAttribute('x', (groupX + barWidth + barSpacing).toString());
      completionBar.setAttribute('y', (400 - (completionPoint.y * 4)).toString());
      completionBar.setAttribute('width', barWidth.toString());
      completionBar.setAttribute('height', '0'); // Start at 0 for animation
      completionBar.setAttribute('fill', '#2196F3');
      completionBar.setAttribute('rx', '4');
      completionBar.setAttribute('ry', '4');
      completionBar.setAttribute('cursor', 'pointer');
      svg.appendChild(completionBar);
      
      // Day label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', (groupX + barWidth + barSpacing/2).toString());
      text.setAttribute('y', '420');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('fill', '#666');
      text.setAttribute('font-size', '12');
      text.textContent = point.label;
      svg.appendChild(text);
      
      // Add hover events for productive bar
      productiveBar.addEventListener('mouseenter', (e) => {
        productiveBar.setAttribute('filter', 'url(#glow)');
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.display = 'block';
          tooltip.style.left = `${e.clientX + 10}px`;
          tooltip.style.top = `${e.clientY - 40}px`;
          setHoveredPoint({ value: point.y, color: '#4CAF50', label: point.label });
        }
      });
      
      productiveBar.addEventListener('mouseleave', () => {
        productiveBar.removeAttribute('filter');
        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
        setHoveredPoint(null);
      });
      
      // Add hover events for completion bar
      completionBar.addEventListener('mouseenter', (e) => {
        completionBar.setAttribute('filter', 'url(#glow)');
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.display = 'block';
          tooltip.style.left = `${e.clientX + 10}px`;
          tooltip.style.top = `${e.clientY - 40}px`;
          setHoveredPoint({ value: completionPoint.y, color: '#2196F3', label: completionPoint.label });
        }
      });
      
      completionBar.addEventListener('mouseleave', () => {
        completionBar.removeAttribute('filter');
        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
        setHoveredPoint(null);
      });
      
      // Animate bars
      anime({
        targets: productiveBar,
        height: point.y * 4,
        duration: 1500,
        easing: 'easeOutElastic(1, .5)',
        delay: 300 + index * 100
      });
      
      anime({
        targets: completionBar,
        height: completionPoint.y * 4,
        duration: 1500,
        easing: 'easeOutElastic(1, .5)',
        delay: 300 + index * 100
      });
    });
    
    // Add legend
    const legendY = 30;
    
    // Productive legend
    const productiveLegendRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    productiveLegendRect.setAttribute('x', '600');
    productiveLegendRect.setAttribute('y', legendY.toString());
    productiveLegendRect.setAttribute('width', '12');
    productiveLegendRect.setAttribute('height', '12');
    productiveLegendRect.setAttribute('fill', '#4CAF50');
    productiveLegendRect.setAttribute('rx', '2');
    svg.appendChild(productiveLegendRect);
    
    const productiveLegendText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    productiveLegendText.setAttribute('x', '618');
    productiveLegendText.setAttribute('y', (legendY + 10).toString());
    productiveLegendText.setAttribute('fill', '#666');
    productiveLegendText.setAttribute('font-size', '12');
    productiveLegendText.textContent = 'Productive';
    svg.appendChild(productiveLegendText);
    
    // Completion legend
    const completionLegendRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    completionLegendRect.setAttribute('x', '690');
    completionLegendRect.setAttribute('y', legendY.toString());
    completionLegendRect.setAttribute('width', '12');
    completionLegendRect.setAttribute('height', '12');
    completionLegendRect.setAttribute('fill', '#2196F3');
    completionLegendRect.setAttribute('rx', '2');
    svg.appendChild(completionLegendRect);
    
    const completionLegendText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    completionLegendText.setAttribute('x', '708');
    completionLegendText.setAttribute('y', (legendY + 10).toString());
    completionLegendText.setAttribute('fill', '#666');
    completionLegendText.setAttribute('font-size', '12');
    completionLegendText.textContent = 'Completion';
    svg.appendChild(completionLegendText);
  };

  const renderPieChart = (svg) => {
    const centerX = 400;
    const centerY = 200;
    const radius = 150;
    
    // Calculate average values
    const productiveAvg = productiveData.reduce((sum, point) => sum + point.y, 0) / productiveData.length;
    const completionAvg = completionData.reduce((sum, point) => sum + point.y, 0) / completionData.length;
    const otherValue = 100 - productiveAvg - completionAvg;
    
    // Calculate pie slices
    const total = productiveAvg + completionAvg + otherValue;
    const productiveAngle = (productiveAvg / total) * 360;
    const completionAngle = (completionAvg / total) * 360;
    const otherAngle = 360 - productiveAngle - completionAngle;
    
    // Create pie slices
    let startAngle = 0;
    
    // Productive slice
    const createSlice = (startAngle, endAngle, color, label, value) => {
      const startRad = (startAngle - 90) * Math.PI / 180;
      const endRad = (endAngle - 90) * Math.PI / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
      
      const pathData = [
        `M ${centerX} ${centerY}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z'
      ].join(' ');
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData);
      path.setAttribute('fill', color);
      path.setAttribute('stroke', '#fff');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('cursor', 'pointer');
      svg.appendChild(path);
      
      // Add hover effect
      path.addEventListener('mouseenter', (e) => {
        path.setAttribute('filter', 'url(#glow)');
        path.setAttribute('transform', `translate(${(centerX - x1) * 0.05} ${(centerY - y1) * 0.05})`);
        
        const tooltip = tooltipRef.current;
        if (tooltip) {
          tooltip.style.display = 'block';
          tooltip.style.left = `${e.clientX + 10}px`;
          tooltip.style.top = `${e.clientY - 40}px`;
          setHoveredPoint({ value, color, label });
        }
      });
      
      path.addEventListener('mouseleave', () => {
        path.removeAttribute('filter');
        path.setAttribute('transform', '');
        
        if (tooltipRef.current) {
          tooltipRef.current.style.display = 'none';
        }
        setHoveredPoint(null);
      });
      
      // Animate slice
      anime({
        targets: path,
        scale: [0, 1],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutElastic(1, .5)',
        delay: 300
      });
      
      // Add label line and text for larger slices
      if (endAngle - startAngle > 30) {
        const midAngle = (startAngle + endAngle) / 2;
        const midRad = (midAngle - 90) * Math.PI / 180;
        
        const labelX = centerX + (radius + 30) * Math.cos(midRad);
        const labelY = centerY + (radius + 30) * Math.sin(midRad);
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', centerX + radius * 0.8 * Math.cos(midRad));
        line.setAttribute('y1', centerY + radius * 0.8 * Math.sin(midRad));
        line.setAttribute('x2', labelX);
        line.setAttribute('y2', labelY);
        line.setAttribute('stroke', '#999');
        line.setAttribute('stroke-width', '1');
        svg.appendChild(line);
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', labelX + (labelX > centerX ? 5 : -5));
        text.setAttribute('y', labelY);
        text.setAttribute('text-anchor', labelX > centerX ? 'start' : 'end');
        text.setAttribute('fill', '#666');
        text.setAttribute('font-size', '12');
        text.textContent = `${label} (${Math.round(value)}%)`;
        svg.appendChild(text);
      }
      
      return endAngle;
    };
    
    startAngle = createSlice(startAngle, startAngle + productiveAngle, '#4CAF50', 'Productive', productiveAvg);
    startAngle = createSlice(startAngle, startAngle + completionAngle, '#2196F3', 'Completion', completionAvg);
    createSlice(startAngle, startAngle + otherAngle, '#E0E0E0', 'Other', otherValue);
    
    // Add center circle for donut effect
    const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    centerCircle.setAttribute('cx', centerX.toString());
    centerCircle.setAttribute('cy', centerY.toString());
    centerCircle.setAttribute('r', (radius * 0.6).toString());
    centerCircle.setAttribute('fill', '#fff');
    centerCircle.setAttribute('stroke', '#f5f5f5');
    centerCircle.setAttribute('stroke-width', '1');
    svg.appendChild(centerCircle);
    
    // Add total percentage in center
    const totalText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    totalText.setAttribute('x', centerX.toString());
    totalText.setAttribute('y', (centerY - 10).toString());
    totalText.setAttribute('text-anchor', 'middle');
    totalText.setAttribute('fill', '#333');
    totalText.setAttribute('font-size', '24');
    totalText.setAttribute('font-weight', 'bold');
    totalText.textContent = `${Math.round(productiveAvg + completionAvg)}%`;
    svg.appendChild(totalText);
    
    const totalLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    totalLabel.setAttribute('x', centerX.toString());
    totalLabel.setAttribute('y', (centerY + 15).toString());
    totalLabel.setAttribute('text-anchor', 'middle');
    totalLabel.setAttribute('fill', '#666');
    totalLabel.setAttribute('font-size', '12');
    totalLabel.textContent = 'Total Performance';
    svg.appendChild(totalLabel);
  };

  React.useEffect(() => {
    renderChart(chartType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartType]);

  return (
    <StyledPaper elevation={0} ref={ref}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" sx={{ 
          fontWeight: 600, 
          color: '#1a1a1a',
          fontSize: '1rem',
        }}>
          Work Overview
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={handleChartTypeChange}
            size="small"
            sx={{ 
              '& .MuiToggleButton-root': {
                border: 'none',
                padding: '4px',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: theme.palette.success.main
                }
              }
            }}
          >
            <ToggleButton value="line">
              <Tooltip title="Line Chart">
                <ShowChartIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="bar">
              <Tooltip title="Bar Chart">
                <BarChartIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
            <ToggleButton value="pie">
              <Tooltip title="Pie Chart">
                <PieChartIcon fontSize="small" />
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          
          <Tooltip title="Performance metrics based on team activity">
            <IconButton size="small" sx={{ ml: 0.5 }}>
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      
      <Box sx={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Chart ref={chartRef} />
        <ChartTooltip 
          ref={tooltipRef} 
          sx={{ 
            opacity: tooltipVisible ? 1 : 0,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          {hoveredPoint && (
            <Box sx={{ p: 0.8 }}>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontWeight: 600 }}>
                {hoveredPoint.label}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', color: 'text.secondary', fontSize: '0.7rem' }}>
                {hoveredPoint.dataType}
              </Typography>
              <Typography variant="body2" sx={{ 
                color: hoveredPoint.color,
                fontWeight: 800,
                fontSize: '1rem',
                mt: 0.5
              }}>
                {hoveredPoint.value}%
              </Typography>
            </Box>
          )}
        </ChartTooltip>
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