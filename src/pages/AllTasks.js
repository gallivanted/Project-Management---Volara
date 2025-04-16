import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import anime from 'animejs';

const mockTasks = [
  {
    id: 1,
    title: 'Design System Update',
    project: 'Mobile App',
    assignee: { name: 'Alice Miller', avatar: 'AM' },
    dueDate: '2024-02-25',
    priority: 'High',
    status: 'In Progress',
    progress: 65,
  },
  {
    id: 2,
    title: 'API Integration',
    project: 'Backend Services',
    assignee: { name: 'Robert Brown', avatar: 'RB' },
    dueDate: '2024-03-10',
    priority: 'Medium',
    status: 'Todo',
    progress: 0,
  },
  {
    id: 3,
    title: 'User Testing',
    project: 'Mobile App',
    assignee: { name: 'John Doe', avatar: 'JD' },
    dueDate: '2024-02-28',
    priority: 'Low',
    status: 'Review',
    progress: 90,
  },
  {
    id: 4,
    title: 'Documentation',
    project: 'Knowledge Base',
    assignee: { name: 'Emma Wilson', avatar: 'EW' },
    dueDate: '2024-03-15',
    priority: 'Medium',
    status: 'Completed',
    progress: 100,
  },
];

const getPriorityColor = (priority) => {
  switch (priority.toLowerCase()) {
    case 'high':
      return 'error';
    case 'medium':
      return 'warning';
    case 'low':
      return 'success';
    default:
      return 'default';
  }
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'success';
    case 'in progress':
      return 'primary';
    case 'review':
      return 'warning';
    case 'todo':
      return 'default';
    default:
      return 'default';
  }
};

const AllTasks = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [filters, setFilters] = React.useState({
    status: 'all',
    priority: 'all',
    project: 'all',
  });

  React.useEffect(() => {
    // Animate table rows on mount
    anime({
      targets: '.task-row',
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(50),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">All Tasks</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Task
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <TextField
            placeholder="Search tasks..."
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
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status}
              name="status"
              label="Status"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={filters.priority}
              name="priority"
              label="Priority"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Project</InputLabel>
            <Select
              value={filters.project}
              name="project"
              label="Project"
              onChange={handleFilterChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="mobile app">Mobile App</MenuItem>
              <MenuItem value="backend services">Backend Services</MenuItem>
              <MenuItem value="knowledge base">Knowledge Base</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Assignee</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockTasks.map((task) => (
                <TableRow key={task.id} className="task-row" hover>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.project}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ width: 24, height: 24 }}>{task.assignee.avatar}</Avatar>
                      <Typography variant="body2">{task.assignee.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={task.priority}
                      size="small"
                      color={getPriorityColor(task.priority)}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={task.status}
                      size="small"
                      color={getStatusColor(task.status)}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box
                        sx={{
                          flexGrow: 1,
                          bgcolor: 'background.default',
                          borderRadius: 1,
                          height: 4,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            width: `${task.progress}%`,
                            height: '100%',
                            bgcolor: 'primary.main',
                          }}
                        />
                      </Box>
                      <Typography variant="body2">{task.progress}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={handleMenuClick}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
        <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
        <MenuItem onClick={handleMenuClose}>Mark as Complete</MenuItem>
      </Menu>
    </Box>
  );
};

export default AllTasks; 