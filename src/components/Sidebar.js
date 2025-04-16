import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { 
  Dashboard, 
  CalendarToday, 
  Assignment, 
  Assessment, 
  Settings,
  People,
  MenuOpen,
  Menu
} from '@mui/icons-material';

// This context will be used to share the collapsed state with other components
export const SidebarContext = React.createContext();

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${props => props.$isCollapsed ? '60px' : '240px'};
  background: #1a1a1a;
  color: white;
  padding: 20px 0;
  transition: all 0.3s ease;
  overflow: hidden;
  z-index: 1000;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};
  font-size: ${props => props.$isCollapsed ? '24px' : '28px'};
  font-weight: bold;
  padding: 0 ${props => props.$isCollapsed ? '0' : '24px'};
  margin-bottom: 40px;
  white-space: nowrap;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-top: 60px; /* Add space for the app bar */
`;

const StyledMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 12px ${props => props.$isCollapsed ? '0' : '24px'};
  padding-left: ${props => props.$isCollapsed ? '18px' : '24px'};
  color: ${props => props.$active ? '#fff' : '#888'};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  justify-content: ${props => props.$isCollapsed ? 'center' : 'flex-start'};

  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.1);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: #4CAF50;
    transform: scaleY(0);
    transition: transform 0.2s ease;
    ${props => props.$active && `
      transform: scaleY(1);
    `}
  }

  svg {
    margin-right: ${props => props.$isCollapsed ? '0' : '16px'};
    font-size: 24px;
    min-width: 24px;
  }
`;

const MenuText = styled.span`
  white-space: nowrap;
  opacity: ${props => props.$isCollapsed ? 0 : 1};
  max-width: ${props => props.$isCollapsed ? '0' : '180px'};
  transition: all 0.3s ease;
  overflow: hidden;
`;

const ToggleButton = styled.button`
  position: fixed;
  top: 80px;
  left: ${props => props.$isCollapsed ? '18px' : '200px'};
  background: #4CAF50;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 1001;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    background: #388E3C;
    transform: scale(1.1);
  }

  svg {
    font-size: 18px;
  }
`;

const MobileSidebar = styled.div`
  position: fixed;
  left: ${props => props.$mobileOpen ? '0' : '-240px'};
  top: 0;
  bottom: 0;
  width: 240px;
  background: #1a1a1a;
  color: white;
  padding: 20px 0;
  transition: left 0.3s ease;
  overflow: hidden;
  z-index: 1100;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  
  @media (min-width: 960px) {
    display: none;
  }
`;

// MenuItem component to avoid DOM warnings about the active prop
const MenuItem = ({ to, active, isCollapsed, onClick, children }) => {
  return (
    <StyledMenuItem to={to} $active={active} $isCollapsed={isCollapsed} onClick={onClick}>
      {children}
    </StyledMenuItem>
  );
};

const Sidebar = ({ mobileOpen, setMobileOpen, sidebarCollapsed, setSidebarCollapsed }) => {
  const location = useLocation();
  const isCollapsed = sidebarCollapsed;

  const toggleSidebar = () => {
    setSidebarCollapsed(!isCollapsed);
    localStorage.setItem('sidebarCollapsed', !isCollapsed);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <SidebarContainer $isCollapsed={isCollapsed} style={{ display: { xs: 'none', md: 'block' } }}>
        <Logo $isCollapsed={isCollapsed}>
          {isCollapsed ? 'V' : 'Volara'}
        </Logo>

        <MenuItem to="/" active={location.pathname === '/'} isCollapsed={isCollapsed}>
          <Dashboard />
          <MenuText $isCollapsed={isCollapsed}>Dashboard</MenuText>
        </MenuItem>

        <MenuItem to="/projects" active={location.pathname === '/projects'} isCollapsed={isCollapsed}>
          <Assignment />
          <MenuText $isCollapsed={isCollapsed}>Projects</MenuText>
        </MenuItem>

        <MenuItem to="/tasks" active={location.pathname === '/tasks'} isCollapsed={isCollapsed}>
          <Assignment />
          <MenuText $isCollapsed={isCollapsed}>All Tasks</MenuText>
        </MenuItem>

        <MenuItem to="/reports" active={location.pathname === '/reports'} isCollapsed={isCollapsed}>
          <Assessment />
          <MenuText $isCollapsed={isCollapsed}>Reports</MenuText>
        </MenuItem>

        <MenuItem to="/calendar" active={location.pathname === '/calendar'} isCollapsed={isCollapsed}>
          <CalendarToday />
          <MenuText $isCollapsed={isCollapsed}>Calendar</MenuText>
        </MenuItem>

        <MenuItem to="/team" active={location.pathname === '/team'} isCollapsed={isCollapsed}>
          <People />
          <MenuText $isCollapsed={isCollapsed}>Team</MenuText>
        </MenuItem>

        <MenuItem to="/settings" active={location.pathname === '/settings'} isCollapsed={isCollapsed}>
          <Settings />
          <MenuText $isCollapsed={isCollapsed}>Settings</MenuText>
        </MenuItem>

        <ToggleButton onClick={toggleSidebar} $isCollapsed={isCollapsed}>
          {isCollapsed ? <MenuOpen /> : <Menu />}
        </ToggleButton>
      </SidebarContainer>

      {/* Mobile Sidebar */}
      <MobileSidebar $mobileOpen={mobileOpen}>
        <Logo>Volara</Logo>

        <MenuItem to="/" active={location.pathname === '/'} onClick={() => setMobileOpen(false)}>
          <Dashboard />
          <MenuText>Dashboard</MenuText>
        </MenuItem>

        <MenuItem to="/projects" active={location.pathname === '/projects'} onClick={() => setMobileOpen(false)}>
          <Assignment />
          <MenuText>Projects</MenuText>
        </MenuItem>

        <MenuItem to="/tasks" active={location.pathname === '/tasks'} onClick={() => setMobileOpen(false)}>
          <Assignment />
          <MenuText>All Tasks</MenuText>
        </MenuItem>

        <MenuItem to="/reports" active={location.pathname === '/reports'} onClick={() => setMobileOpen(false)}>
          <Assessment />
          <MenuText>Reports</MenuText>
        </MenuItem>

        <MenuItem to="/calendar" active={location.pathname === '/calendar'} onClick={() => setMobileOpen(false)}>
          <CalendarToday />
          <MenuText>Calendar</MenuText>
        </MenuItem>

        <MenuItem to="/team" active={location.pathname === '/team'} onClick={() => setMobileOpen(false)}>
          <People />
          <MenuText>Team</MenuText>
        </MenuItem>

        <MenuItem to="/settings" active={location.pathname === '/settings'} onClick={() => setMobileOpen(false)}>
          <Settings />
          <MenuText>Settings</MenuText>
        </MenuItem>
      </MobileSidebar>
    </>
  );
};

export default Sidebar; 