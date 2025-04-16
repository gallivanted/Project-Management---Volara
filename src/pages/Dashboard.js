import React from 'react';
import { Box, Grid, Typography, Avatar, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import anime from 'animejs';
import TodayPlans from '../components/TodayPlans';
import StatsOverview from '../components/StatsOverview';
import TaskList from '../components/TaskList';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  height: '100%',
}));

const Dashboard = () => {
  const [statsHeight, setStatsHeight] = React.useState(null);
  const statsRef = React.useRef(null);

  React.useEffect(() => {
    // Animate dashboard components on mount
    anime({
      targets: '.dashboard-animation',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  React.useEffect(() => {
    if (statsRef.current) {
      setStatsHeight(statsRef.current.offsetHeight);
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Box className="dashboard-animation">
            <TodayPlans matchHeight={statsHeight} />
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Box className="dashboard-animation">
            <StatsOverview ref={statsRef} />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className="dashboard-animation">
            <TaskList />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;