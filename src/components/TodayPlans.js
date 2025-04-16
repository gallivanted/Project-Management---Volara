import React from 'react';
import { Box, Typography, Avatar, Paper, styled } from '@mui/material';
import anime from 'animejs';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.primary.main,
  color: 'white',
  height: '100%',
  minHeight: 300,
}));

const DateDisplay = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
}));

const TodayPlans = ({ matchHeight }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const containerRef = React.useRef(null);
  const [height, setHeight] = React.useState(matchHeight || 'auto');

  React.useEffect(() => {
    anime({
      targets: '.time-animation',
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  React.useEffect(() => {
    if (matchHeight) {
      setHeight(matchHeight);
    }
  }, [matchHeight]);

  const formatDate = (date) => {
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    return {
      day: days[date.getDay()],
      hours: date.getHours().toString().padStart(2, '0'),
      minutes: date.getMinutes().toString().padStart(2, '0'),
      month: months[date.getMonth()],
    };
  };
  const { day, hours, minutes, month } = formatDate(currentDate);

  return (
    <StyledPaper elevation={0} ref={containerRef} sx={{ height: height, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 300 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, fontSize: 24 }}>AM</Avatar>
        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: 18, md: 22 } }}>Hello Amirul</Typography>
      </Box>
      <Typography variant="h5" sx={{ mt: 1, mb: 2, fontWeight: 700, fontSize: { xs: 20, md: 26 } }}>
        Your Today Plans (5)
      </Typography>
      <DateDisplay sx={{ mb: 4 }}>
        <Typography variant="body1" className="time-animation" sx={{ fontSize: { xs: 14, md: 16 } }}>
          {day}
        </Typography>
        <Typography variant="h2" className="time-animation" sx={{ fontWeight: 'bold', fontSize: { xs: 32, md: 48 } }}>
          {hours}:{minutes}
        </Typography>
        <Typography variant="h4" className="time-animation" sx={{ fontSize: { xs: 18, md: 28 } }}>
          {month}
        </Typography>
      </DateDisplay>
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 } }}>
            TEAM WORK
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: 15, md: 18 } }}>
            6 Projects
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 } }}>
            MY WORK
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: 15, md: 18 } }}>
            3d And Vide Editing
          </Typography>
        </Box>
      </Box>
    </StyledPaper>
  );
};

export default TodayPlans;