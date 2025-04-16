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

const mockProjects = [
  {
    id: 1,
    title: 'Mobile App Redesign',
    description: 'Redesign the mobile app interface for better user experience',
    progress: 75,
    status: 'In Progress',
    members: 5,
    tasks: 12,
    dueDate: '2024-03-15',
  },
  {
    id: 2,
    title: 'Website Development',
    description: 'Create a new company website with modern technologies',
    progress: 30,
    status: 'Planning',
    members: 4,
    tasks: 8,
    dueDate: '2024-04-01',
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    description: 'Launch Q1 marketing campaign across social media',
    progress: 90,
    status: 'Review',
    members: 3,
    tasks: 15,
    dueDate: '2024-02-28',
  },
  {
    id: 4,
    title: 'Product Launch',
    description: 'Prepare and execute the new product launch event. Coordinate with marketing, sales, and product teams. Ensure all assets and logistics are ready. Finalize guest list and press releases. Monitor launch KPIs and gather feedback.',
    progress: 45,
    status: 'In Progress',
    members: 6,
    tasks: 20,
    dueDate: '2024-05-01',
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress':
        return 'primary';
      case 'Review':
        return 'warning';
      case 'Planning':
        return 'info';
      default:
        return 'default';
    }
  };

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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Chip
            label={project.status}
            color={getStatusColor(project.status)}
            size="small"
            sx={{ fontWeight: 600 }}
          />
          <Typography variant="body2" color="text.secondary" fontWeight={600}>
            Due {new Date(project.dueDate).toLocaleDateString()}
          </Typography>
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
    </Paper>
  );
};

const Projects = () => {
  React.useEffect(() => {
    // Animate project cards on mount
    anime({
      targets: '.project-card',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Projects</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          New Project
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          placeholder="Search projects..."
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          startIcon={<FilterListIcon />}
        >
          Filter
        </Button>
      </Box>

      <Grid container spacing={3}>
        {mockProjects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id} className="project-card">
            <ProjectCard project={project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Projects;