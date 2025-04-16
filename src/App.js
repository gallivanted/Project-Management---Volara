import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Dashboard from './pages/Dashboard';
import TaskDetails from './pages/TaskDetails';
import Projects from './pages/Projects';
import AllTasks from './pages/AllTasks';
import Reports from './pages/Reports';
import Calendar from './pages/Calendar';
import TeamMembers from './pages/TeamMembers';
import Layout from './components/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1B5E20', // Dark green
      light: '#4CAF50', // Light green
    },
    secondary: {
      main: '#81C784', // Accent green
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#B00020', // Deep red for better visibility
      light: '#FFEBEE',
    },
    deadline: {
      main: '#B00020', // Deep red for deadlines
      light: '#FFEBEE',
      contrastText: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    deadline: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiChip: {
      variants: [
        {
          props: { variant: 'deadline' },
          style: {
            backgroundColor: '#B00020',
            color: '#FFFFFF',
            fontWeight: 600,
            '&:hover': {
              backgroundColor: '#8B001A',
            },
          },
        },
      ],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<AllTasks />} />
            <Route path="/task/:id" element={<TaskDetails />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/team" element={<TeamMembers />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 