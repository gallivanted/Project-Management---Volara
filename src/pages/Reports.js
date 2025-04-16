import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import anime from 'animejs';

const mockData = {
  taskCompletion: [
    { month: 'Jan', completed: 45, total: 60 },
    { month: 'Feb', completed: 38, total: 45 },
    { month: 'Mar', completed: 52, total: 65 },
    { month: 'Apr', completed: 42, total: 50 },
    { month: 'May', completed: 48, total: 55 },
    { month: 'Jun', completed: 55, total: 70 },
  ],
  teamPerformance: [
    { name: 'Design Team', completed: 85, ongoing: 12, upcoming: 8 },
    { name: 'Development Team', completed: 72, ongoing: 18, upcoming: 15 },
    { name: 'Marketing Team', completed: 90, ongoing: 5, upcoming: 10 },
    { name: 'Sales Team', completed: 68, ongoing: 22, upcoming: 12 },
  ],
};

const Reports = () => {
  const [timeRange, setTimeRange] = React.useState('month');
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    // Animate the chart on mount
    if (chartRef.current) {
      const chartWidth = chartRef.current.offsetWidth;
      const chartHeight = chartRef.current.offsetHeight;
      const barWidth = (chartWidth * 0.1);
      const spacing = (chartWidth * 0.06);

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight}`);
      
      // Create background grid lines
      for (let i = 0; i <= 5; i++) {
        const y = chartHeight - (i * (chartHeight / 5));
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', '0');
        line.setAttribute('y1', y);
        line.setAttribute('x2', chartWidth);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#e0e0e0');
        line.setAttribute('stroke-width', '1');
        line.setAttribute('stroke-dasharray', '4');
        svg.appendChild(line);

        // Add percentage labels
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', '-20');
        text.setAttribute('y', y);
        text.setAttribute('fill', '#666');
        text.setAttribute('font-size', '12');
        text.setAttribute('text-anchor', 'end');
        text.setAttribute('alignment-baseline', 'middle');
        text.textContent = `${i * 20}%`;
        svg.appendChild(text);
      }

      // Create bars and labels for the chart
      mockData.taskCompletion.forEach((data, index) => {
        const x = index * (barWidth + spacing) + spacing;
        const percentage = (data.completed / data.total) * 100;
        const height = (percentage / 100) * (chartHeight - 40);
        const y = chartHeight - height;
        
        // Create bar group
        const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        // Create bar background
        const barBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        barBg.setAttribute('x', x);
        barBg.setAttribute('y', 40);
        barBg.setAttribute('width', barWidth);
        barBg.setAttribute('height', chartHeight - 40);
        barBg.setAttribute('fill', '#f5f5f5');
        barBg.setAttribute('rx', '4');
        group.appendChild(barBg);

        // Create actual bar
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', x);
        bar.setAttribute('y', chartHeight);
        bar.setAttribute('width', barWidth);
        bar.setAttribute('height', 0);
        bar.setAttribute('fill', '#4CAF50');
        bar.setAttribute('rx', '4');
        group.appendChild(bar);

        // Add hover effect
        group.addEventListener('mouseenter', () => {
          bar.setAttribute('fill', '#2E7D32');
          percentageText.setAttribute('opacity', '1');
        });
        group.addEventListener('mouseleave', () => {
          bar.setAttribute('fill', '#4CAF50');
          percentageText.setAttribute('opacity', '0');
        });

        // Add percentage text
        const percentageText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        percentageText.setAttribute('x', x + barWidth / 2);
        percentageText.setAttribute('y', y - 10);
        percentageText.setAttribute('fill', '#000');
        percentageText.setAttribute('font-size', '12');
        percentageText.setAttribute('text-anchor', 'middle');
        percentageText.setAttribute('opacity', '0');
        percentageText.textContent = `${percentage.toFixed(0)}%`;
        group.appendChild(percentageText);

        svg.appendChild(group);

        // Animate the bar
        anime({
          targets: bar,
          y: y,
          height: height,
          duration: 1500,
          easing: 'easeOutElastic(1, .5)',
          delay: index * 100
        });
      });

      chartRef.current.innerHTML = '';
      chartRef.current.appendChild(svg);
    }

    // Animate other elements
    anime({
      targets: '.report-animation',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, [timeRange]);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Reports & Analytics</Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<DownloadIcon />}
        >
          Export Report
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Task Completion Chart */}
        <Grid item xs={12} lg={8} className="report-animation">
          <Paper elevation={0} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6">Task Completion Rate</Typography>
              <ButtonGroup size="small">
                <Button
                  variant={timeRange === 'week' ? 'contained' : 'outlined'}
                  onClick={() => setTimeRange('week')}
                >
                  Week
                </Button>
                <Button
                  variant={timeRange === 'month' ? 'contained' : 'outlined'}
                  onClick={() => setTimeRange('month')}
                >
                  Month
                </Button>
                <Button
                  variant={timeRange === 'year' ? 'contained' : 'outlined'}
                  onClick={() => setTimeRange('year')}
                >
                  Year
                </Button>
              </ButtonGroup>
            </Box>
            <Box ref={chartRef} sx={{ height: 300 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
              {mockData.taskCompletion.map((data) => (
                <Typography key={data.month} variant="body2" color="text.secondary">
                  {data.month}
                </Typography>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Summary Stats */}
        <Grid item xs={12} lg={4} className="report-animation">
          <Paper elevation={0} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Performance Summary</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Overall Progress</Typography>
                  <Typography variant="body2">78%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={78} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Tasks Completed</Typography>
                  <Typography variant="body2">45/60</Typography>
                </Box>
                <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Team Efficiency</Typography>
                  <Typography variant="body2">85%</Typography>
                </Box>
                <LinearProgress variant="determinate" value={85} sx={{ height: 8, borderRadius: 4 }} />
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Team Performance Table */}
        <Grid item xs={12} className="report-animation">
          <Paper elevation={0} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Team Performance</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Team</TableCell>
                    <TableCell align="right">Completed Tasks</TableCell>
                    <TableCell align="right">Ongoing Tasks</TableCell>
                    <TableCell align="right">Upcoming Tasks</TableCell>
                    <TableCell align="right">Efficiency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mockData.teamPerformance.map((team) => (
                    <TableRow key={team.name}>
                      <TableCell component="th" scope="row">
                        {team.name}
                      </TableCell>
                      <TableCell align="right">{team.completed}</TableCell>
                      <TableCell align="right">{team.ongoing}</TableCell>
                      <TableCell align="right">{team.upcoming}</TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          <Typography variant="body2" sx={{ mr: 1 }}>
                            {Math.round((team.completed / (team.completed + team.ongoing + team.upcoming)) * 100)}%
                          </Typography>
                          <Box sx={{ width: 100 }}>
                            <LinearProgress
                              variant="determinate"
                              value={(team.completed / (team.completed + team.ongoing + team.upcoming)) * 100}
                              sx={{ height: 6, borderRadius: 3 }}
                            />
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports; 