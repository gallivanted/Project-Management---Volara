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
  Tooltip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import anime from 'animejs';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
  const [editingId, setEditingId] = React.useState(null);
  const [tempDeadline, setTempDeadline] = React.useState('');
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [tasks, setTasks] = React.useState(mockTasks);
  const theme = useTheme();

  React.useEffect(() => {
    anime({
      targets: '.task-row',
      translateX: [-20, 0],
      opacity: [0, 1],
      delay: anime.stagger(50),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

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

  const DeadlineBox = styled(Box)`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    background: ${props => props.status === 'overdue' ? theme.palette.error.light : props.status === 'soon' ? theme.palette.warning.light : '#e8f5e9'};
    border-radius: 16px;
    padding: 2px 10px;
    transition: background 0.2s;
    color: ${theme.palette.success.main};
    ${props => props.status === 'overdue' ? `color: ${theme.palette.error.main};` : ''}
    ${props => props.status === 'soon' ? `color: ${theme.palette.warning.dark};` : ''}
    font-weight: 500;
    min-width: 110px;
    min-height: 28px;
  `;

  const handleDeadlineClick = (id, currentDeadline) => {
    setEditingId(id);
    setTempDeadline(currentDeadline);
  };

  const handleDateChange = (newValue) => {
    setTempDeadline(newValue ? new Date(newValue).toISOString().split('T')[0] : tempDeadline);
  };

  const handleDialogClose = () => {
    setEditingId(null);
  };

  const handleDialogConfirm = () => {
    setTasks(prev => prev.map(task => task.id === editingId ? { ...task, dueDate: tempDeadline } : task));
    setEditingId(null);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

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
  
  // Add missing handleClose function
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">All Tasks</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>Add Task</Button>
      </Box>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="task-row">
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.project}</TableCell>
                <TableCell>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>{task.assignee.avatar}</Avatar>
                  {task.assignee.name}
                </TableCell>
                <TableCell>
                  <DeadlineBox status={getDeadlineStatus(task.dueDate)} onClick={() => handleDeadlineClick(task.id, task.dueDate)}>
                    <CalendarTodayIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 14 }}>{formatDeadline(task.dueDate)}</Typography>
                  </DeadlineBox>
                </TableCell>
                <TableCell>
                  <Chip label={task.priority} color={getPriorityColor(task.priority)} size="small" sx={{ fontWeight: 600 }} />
                </TableCell>
                <TableCell>
                  <Chip label={task.status} color={getStatusColor(task.status)} size="small" sx={{ fontWeight: 600 }} />
                </TableCell>
                <TableCell>
                  <LinearProgress variant="determinate" value={task.progress} sx={{ height: 6, borderRadius: 3, bgcolor: '#e8f5e9', '& .MuiLinearProgress-bar': { bgcolor: '#43a047' } }} />
                </TableCell>
                <TableCell>
                  <IconButton size="small" onClick={(event) => handleMenuClick(event)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Edit</MenuItem>
                    <MenuItem onClick={handleClose}>Delete</MenuItem>
                    <MenuItem onClick={handleClose}>Archive</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={editingId !== null} onClose={handleDialogClose}>
        <DialogTitle>Edit Deadline</DialogTitle>
        <DialogContent>
          <DatePicker label="Due Date" value={tempDeadline} onChange={handleDateChange} renderInput={(params) => <Box component="div" sx={{ mt: 2 }}>{params.input}</Box>} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleDialogConfirm} variant="contained" color="primary">Update</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Deadline Updated</DialogTitle>
        <DialogContent>
          <Typography>Deadline changed to {formatDeadline(tempDeadline)}.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
      
      <Dialog open={!!editingId} onClose={handleDialogClose}>
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
      
      {/* Wrap adjacent JSX elements in a fragment */}
      <>
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Deadline Updated</DialogTitle>
        <DialogContent>
          <Typography>Deadline changed to {formatDeadline(tempDeadline)}.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
      </>
    </Box>
  );
};

export default AllTasks;