import React, { useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, Typography, Avatar, IconButton, styled } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Sidebar from './Sidebar';
import anime from 'animejs';

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'sidebarCollapsed'
})(({ theme, sidebarCollapsed }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  zIndex: theme.zIndex.drawer + 1,
  width: `calc(100% - ${sidebarCollapsed ? '60px' : '240px'})`,
  marginLeft: sidebarCollapsed ? '60px' : '240px',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
  },
}));

const MainContent = styled(Box, {
  shouldForwardProp: prop => prop !== 'sidebarCollapsed'
})(({ theme, sidebarCollapsed }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: sidebarCollapsed ? '60px' : '240px',
  marginTop: 64,
  backgroundColor: theme.palette.background.default,
  minHeight: 'calc(100vh - 64px)',
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // Load the collapsed state from localStorage on component mount
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarCollapsed(savedState === 'true');
    }
    
    // Animate the header on mount
    anime({
      targets: '.header-animation',
      translateY: [-20, 0],
      opacity: [0, 1],
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar 
        mobileOpen={mobileOpen} 
        setMobileOpen={setMobileOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      
      <StyledAppBar position="fixed" sidebarCollapsed={sidebarCollapsed}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box className="header-animation" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>V</Avatar>
            <Typography variant="h6" noWrap component="div">
              Volara
            </Typography>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <MainContent sidebarCollapsed={sidebarCollapsed}>
        {children}
      </MainContent>
    </Box>
  );
};

export default Layout; 