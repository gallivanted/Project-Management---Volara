import React from 'react';
import { Box, Grid, Typography, Avatar, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import anime from 'animejs';
import TodayPlans from '../components/TodayPlans';
import StatsOverview from '../components/StatsOverview';
import TaskList from '../components/TaskList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTheme } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  height: '100%',
}));

const Dashboard = () => {
  const [statsHeight, setStatsHeight] = React.useState(null);
  const statsRef = React.useRef(null);
  const theme = useTheme();

  // Demo deadlines for summary
  const deadlines = [
    '2024-04-20', // Mobile App Redesign
    '2024-04-18', // User Testing
    '2024-04-25', // Robert Brown
    '2024-04-16', // Emma Wilson
  ];
  const getNextDeadline = () => {
    const today = new Date();
    const future = deadlines
      .map(date => new Date(date))
      .filter(date => date >= today)
      .sort((a, b) => a - b);
    return future.length > 0 ? future[0] : null;
  };
  const nextDeadline = getNextDeadline();

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
            {/* Deadline summary below the graph */}
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', bgcolor: '#e8f5e9', borderRadius: 2, p: 2, gap: 1 }}>
              <CalendarTodayIcon sx={{ color: theme.palette.success.main, mr: 1 }} />
              <Typography variant="subtitle1" sx={{ color: theme.palette.success.main, fontWeight: 600 }}>
                Next Deadline:
              </Typography>
              <Typography variant="subtitle1" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>
                {nextDeadline ? nextDeadline.toLocaleDateString() : 'No upcoming deadlines'}
              </Typography>
            </Box>
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