import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import anime from 'animejs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from 'styled-components';
import { Tooltip, useTheme, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const mockProjects = [
  {
    id: 1,
    title: 'Mobile App Redesign',
    description: 'Redesign the mobile app interface for better user experience. Implement new design system, improve navigation flow, and enhance accessibility features.',
    progress: 75,
    status: 'In Progress',
    members: 5,
    tasks: 12,
    dueDate: '2025-04-20',
    highlights: [
      'Wireframes completed',
      'User testing scheduled',
      'Design system created',
      'Prototype in review',
      'Accessibility audit in progress'
    ],
    budget: '$12,500',
    sponsors: 2
  },
  {
    id: 2,
    title: 'Website Development',
    description: 'Create a new company website with modern technologies. Focus on performance optimization, SEO, and responsive design for all devices.',
    progress: 30,
    status: 'Planning',
    members: 4,
    tasks: 8,
    dueDate: '2025-04-15',
    highlights: [
      'Tech stack selected',
      'Content strategy defined',
      'SEO requirements documented',
      'Design mockups approved',
      'Development environment set up'
    ],
    budget: '$18,000',
    sponsors: 1
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    description: 'Launch Q2 marketing campaign across social media platforms. Develop creative assets, coordinate with influencers, and track performance metrics.',
    progress: 90,
    status: 'Review',
    members: 3,
    tasks: 15,
    dueDate: '2025-04-10',
    highlights: [
      'Campaign strategy finalized',
      'Creative assets produced',
      'Influencer contracts signed',
      'Ad spend allocated',
      'Analytics dashboard created'
    ],
    budget: '$25,000',
    sponsors: 4
  },
  {
    id: 4,
    title: 'Product Launch',
    description: 'Prepare and execute the new product launch event. Coordinate with marketing, sales, and product teams. Ensure all assets and logistics are ready. Finalize guest list and press releases. Monitor launch KPIs and gather feedback.',
    progress: 45,
    status: 'In Progress',
    members: 6,
    tasks: 20,
    dueDate: '2025-04-30',
    highlights: [
      'Venue booked',
      'Press kit ready',
      'Demo scheduled',
      'Social media campaign live',
      'VIP invitations sent'
    ],
    budget: '$15,000',
    sponsors: 3
  },
];

const ProjectCard = ({ project }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const cardRef = React.useRef(null);
  const theme = useTheme();
  const [deadline, setDeadline] = React.useState(project.dueDate);
  const [editing, setEditing] = React.useState(false);
  const [tempDeadline, setTempDeadline] = React.useState(deadline);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const deadlineRef = React.useRef(null);

  React.useEffect(() => {
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: [1, 1.03],
        duration: 300,
        easing: 'easeInOutQuad',
        direction: 'alternate',
        loop: false,
        autoplay: false
      });
    }
  }, []);

  React.useEffect(() => {
    anime({
      targets: deadlineRef.current,
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 600,
      easing: 'easeOutQuad',
    });
  }, [deadline]);

  React.useEffect(() => {
    setDeadline(project.dueDate);
  }, [project.dueDate]);
  
  // Add missing functions
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'info';
      case 'On Hold':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getDeadlineStatus = (dateStr) => {
    const today = new Date();
    const deadlineDate = new Date(dateStr);
    const diff = Math.ceil((deadlineDate.getTime() - today.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
    if (diff < 0) return 'overdue';
    if (diff <= 3) return 'soon';
    return 'normal';
  };

  const formatDeadline = (dateStr) => {
    const today = new Date();
    const deadlineDate = new Date(dateStr);
    const diff = Math.ceil((deadlineDate.getTime() - today.setHours(0,0,0,0)) / (1000 * 60 * 60 * 24));
    if (diff < 0) return deadlineDate.toLocaleDateString();
    if (diff === 0) return 'Due today';
    if (diff <= 7) return `Due in ${diff} day${diff > 1 ? 's' : ''}`;
    return deadlineDate.toLocaleDateString();
  };

  const status = getDeadlineStatus(deadline);

  const DeadlineBox = styled(Box)`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    background: ${status === 'overdue' ? theme.palette.error.light : status === 'soon' ? theme.palette.warning.light : '#e8f5e9'};
    border-radius: 16px;
    padding: 2px 10px;
    transition: background 0.2s;
    color: ${theme.palette.success.main};
    ${status === 'overdue' ? `color: ${theme.palette.error.main};` : ''}
    ${status === 'soon' ? `color: ${theme.palette.warning.dark};` : ''}
    font-weight: 500;
    min-width: 110px;
    min-height: 28px;
  `;

  const handleDeadlineClick = (e) => {
    e.stopPropagation();
    setTempDeadline(deadline);
    setEditing(true);
  };

  const handleDateChange = (newValue) => {
    setTempDeadline(newValue ? new Date(newValue).toISOString().split('T')[0] : tempDeadline);
  };

  const handleDialogClose = () => {
    setEditing(false);
  };

  const handleDialogConfirm = () => {
    setDeadline(tempDeadline);
    setEditing(false);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const isMobile = window.innerWidth < 400;

  return (
    <Paper
      ref={cardRef}
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'scale(1.03)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>{project.title}</Typography>
        <IconButton onClick={handleClick} size="small">
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
          <MenuItem onClick={handleClose}>Archive</MenuItem>
        </Menu>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {project.description}
      </Typography>

      {project.highlights && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="primary" sx={{ mb: 1, fontWeight: 600 }}>Highlights</Typography>
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {project.highlights.map((item, idx) => (
              <li key={idx} style={{ fontSize: 13, color: '#555', marginBottom: 2 }}>{item}</li>
            ))}
          </ul>
        </Box>
      )}

      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" fontWeight={600}>Progress</Typography>
          <Typography variant="body2" fontWeight={600}>{project.progress}%</Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={{ height: 6, borderRadius: 3, bgcolor: '#e8f5e9', '& .MuiLinearProgress-bar': { bgcolor: '#43a047' } }}
        />
      </Box>

      <Box sx={{ mt: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, alignItems: 'center' }}>
          <Chip
            label={project.status}
            color={getStatusColor(project.status)}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Box ml="auto" ref={deadlineRef}>
            {isMobile ? (
              <Tooltip title={formatDeadline(deadline)} placement="top">
                <DeadlineBox onClick={handleDeadlineClick}>
                  <CalendarTodayIcon sx={{ fontSize: 18 }} />
                </DeadlineBox>
              </Tooltip>
            ) : (
              <DeadlineBox onClick={handleDeadlineClick}>
                <CalendarTodayIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 14 }}>
                  {formatDeadline(deadline)}
                </Typography>
              </DeadlineBox>
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {project.members} Members
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {project.tasks} Tasks
          </Typography>
        </Box>
        {project.budget && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Budget</Typography>
            <Typography variant="body2" color="success.main" fontWeight={700}>{project.budget}</Typography>
          </Box>
        )}
        {project.sponsors && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Sponsors</Typography>
            <Typography variant="body2" color="primary.main" fontWeight={700}>{project.sponsors}</Typography>
          </Box>
        )}
      </Box>
      <Dialog open={editing} onClose={handleDialogClose}>
        <DialogTitle>Edit Deadline</DialogTitle>
        <DialogContent>
          <DatePicker
            label="Due Date"
            value={tempDeadline}
            onChange={handleDateChange}
            renderInput={(params) => <Box component="div" sx={{ mt: 2 }}>{params.input}</Box>}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogConfirm} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Deadline Updated</DialogTitle>
        <DialogContent>
          <Typography>Deadline changed to {formatDeadline(deadline)}.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

const Projects = () => {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Projects</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>Add Project</Button>
      </Box>
      <Grid container spacing={3}>
        {mockProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

// Wrap with React.memo for performance optimization
export default React.memo(Projects);