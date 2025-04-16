import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Avatar, Paper, styled, Tooltip, Badge } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupsIcon from '@mui/icons-material/Groups';
import ComputerIcon from '@mui/icons-material/Computer';
import { useTheme } from '@mui/material/styles';
import anime from 'animejs/lib/anime.es.js';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3.5),
  background: theme.palette.primary.main,
  color: 'white',
  height: '100%',
  minHeight: 300,
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '100%',
    background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.05) 100%)',
    zIndex: 0,
  }
}));

const DateDisplay = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  position: 'relative',
  zIndex: 1,
}));

const TodayPlans = ({ matchHeight }) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const containerRef = useRef(null);
  const [height, setHeight] = useState(matchHeight || 'auto');
  const [timeUpdated, setTimeUpdated] = useState(false);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
      setTimeUpdated(true);
      
      // Animate time update
      setTimeout(() => {
        setTimeUpdated(false);
      }, 1000);
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Animate elements on load
  useEffect(() => {
    anime({
      targets: '.time-animation',
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
    
    // Animate the background gradient
    anime({
      targets: containerRef.current,
      background: [
        theme.palette.primary.dark,
        theme.palette.primary.main
      ],
      duration: 1500,
      easing: 'easeOutQuad'
    });
  }, [theme.palette.primary.main, theme.palette.primary.dark]);

  // Update height to match the stats component
  useEffect(() => {
    if (matchHeight) {
      setHeight(matchHeight);
      
      // Use a timeout to ensure DOM elements are rendered
      const timer = setTimeout(() => {
        // Adjust spacing based on available height
        const contentHeight = matchHeight - 40; // Subtract padding
        const dateDisplayEl = document.querySelector('.date-display');
        const headerEl = document.querySelector('.today-header');
        const footerEl = document.querySelector('.today-footer');
        
        if (dateDisplayEl && headerEl && footerEl) {
          const headerHeight = headerEl.offsetHeight;
          const footerHeight = footerEl.offsetHeight;
          const availableHeight = contentHeight - headerHeight - footerHeight;
          
          // Adjust date display size based on available space
          dateDisplayEl.style.height = `${availableHeight}px`;
        }
      }, 100);
      
      return () => clearTimeout(timer);
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
      date: date.getDate(),
    };
  };
  
  const { day, hours, minutes, month, date } = formatDate(currentDate);

  return (
    <StyledPaper 
      elevation={0} 
      ref={containerRef} 
      sx={{ 
        height: height, 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        minHeight: 300 
      }}
    >
      <Box className="today-header" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, position: 'relative', zIndex: 1 }}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <Tooltip title="Online">
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  bgcolor: theme.palette.success.main,
                  borderRadius: '50%',
                  border: '2px solid white',
                }}
              />
            </Tooltip>
          }
        >
          <Avatar 
            sx={{ 
              bgcolor: 'secondary.main', 
              width: 52, 
              height: 52, 
              fontSize: 24,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            AM
          </Avatar>
        </Badge>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: 18, md: 22 } }}>
            Hello Amirul
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, fontSize: { xs: 12, md: 14 } }}>
            Welcome back to your dashboard
          </Typography>
        </Box>
      </Box>
      
      <Typography 
        variant="h5" 
        sx={{ 
          mt: 1, 
          mb: 2, 
          fontWeight: 800, 
          fontSize: { xs: 20, md: 26 },
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        Your Today Plans 
        <Badge 
          badgeContent="5" 
          color="secondary"
          sx={{ 
            '& .MuiBadge-badge': { 
              fontSize: 12, 
              fontWeight: 'bold',
              minWidth: 20,
              height: 20
            } 
          }}
        />
      </Typography>
      
      <DateDisplay className="date-display" sx={{ mb: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CalendarTodayIcon sx={{ fontSize: 16, opacity: 0.8 }} />
          <Typography 
            variant="body1" 
            className="time-animation" 
            sx={{ 
              fontSize: { xs: 14, md: 16 },
              letterSpacing: 1
            }}
          >
            {day}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography 
            variant="h2" 
            className="time-animation" 
            sx={{ 
              fontWeight: 'bold', 
              fontSize: { xs: 36, md: 52 },
              transition: 'color 0.3s',
              color: timeUpdated ? theme.palette.secondary.light : 'white'
            }}
          >
            {hours}:{minutes}
          </Typography>
          <AccessTimeIcon sx={{ fontSize: 20, opacity: 0.8, mb: 1 }} />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
          <Typography 
            variant="h4" 
            className="time-animation" 
            sx={{ 
              fontSize: { xs: 18, md: 28 },
              fontWeight: 600
            }}
          >
            {month}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontSize: { xs: 16, md: 24 },
              opacity: 0.9
            }}
          >
            {date}
          </Typography>
        </Box>
      </DateDisplay>
      
      <Box 
        className="today-footer"
        sx={{ 
          flexGrow: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3,
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <GroupsIcon sx={{ fontSize: 20, opacity: 0.9 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>
              TEAM WORK
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 15, md: 18 }, fontWeight: 700 }}>
              6 Projects
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ComputerIcon sx={{ fontSize: 20, opacity: 0.9 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ opacity: 0.8, fontSize: { xs: 14, md: 16 }, fontWeight: 600 }}>
              MY WORK
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: 15, md: 18 }, fontWeight: 700 }}>
              3D and Video Editing
            </Typography>
          </Box>
        </Box>
      </Box>
      
      {/* Decorative elements */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 20, 
          right: 20, 
          width: 80, 
          height: 80, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.05)',
          zIndex: 0
        }} 
      />
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 40, 
          right: -20, 
          width: 120, 
          height: 120, 
          borderRadius: '50%', 
          background: 'rgba(255,255,255,0.03)',
          zIndex: 0
        }} 
      />
    </StyledPaper>
  );
};

export default TodayPlans;