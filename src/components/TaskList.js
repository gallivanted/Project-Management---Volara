import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  Typography, 
  Avatar, 
  Chip, 
  Button, 
  AvatarGroup, 
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  IconButton,
  Collapse,
  TextField
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTheme } from '@mui/material/styles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import anime from 'animejs/lib/anime.es.js';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
}));

const TaskCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.shape.borderRadius * 1.5,
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  transition: 'all 0.3s ease',
  border: '1px solid rgba(0,0,0,0.05)',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    transform: 'translateY(-2px)',
  },
}));

const mockTasks = [
  {
    id: 1,
    title: 'Pitx App 3d Icon Design',
    assignee: { name: 'Julmal', avatar: 'JU' },
    type: 'Meeting',
    important: true,
    progress: 54,
    dueDate: '2024-04-18',
    description: 'Create 3D icon designs for the Pitx mobile application. Focus on modern, clean aesthetics with depth.',
  },
  {
    id: 2,
    title: 'Hub Flay Video',
    assignee: { name: 'Lima', avatar: 'LI' },
    type: 'Team',
    important: true,
    progress: 32,
    dueDate: '2024-04-20',
    description: 'Produce promotional video for Hub Flay platform. Include product features and user testimonials.',
  },
  {
    id: 3,
    title: 'Hip App Flow Work',
    assignee: { name: 'Hatik', avatar: 'HA' },
    type: 'Meeting',
    important: false,
    progress: 78,
    dueDate: '2024-04-16',
    description: 'Finalize user flow diagrams for Hip App. Ensure all user journeys are mapped and optimized.',
  },
  {
    id: 4,
    title: 'Brand Guidelines Update',
    assignee: { name: 'Amirul', avatar: 'AM' },
    type: 'Design',
    important: true,
    progress: 45,
    dueDate: '2024-04-22',
    description: 'Update company brand guidelines with new color palette, typography, and usage examples.',
  },
  {
    id: 5,
    title: 'Client Presentation',
    assignee: { name: 'Julmal', avatar: 'JU' },
    type: 'Meeting',
    important: true,
    progress: 90,
    dueDate: '2024-04-17',
    description: 'Prepare and deliver presentation to key client stakeholders on project progress and next steps.',
  },
];

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
  if (diff < 0) return `Overdue: ${deadlineDate.toLocaleDateString()}`;
  if (diff === 0) return 'Due today';
  if (diff <= 7) return `Due in ${diff} day${diff > 1 ? 's' : ''}`;
  return deadlineDate.toLocaleDateString();
};

const TaskList = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState(mockTasks);
  const [editingId, setEditingId] = useState(null);
  const [tempDeadline, setTempDeadline] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const progressRefs = React.useRef({});

  React.useEffect(() => {
    // Animate task cards on mount
    anime({
      targets: '.task-card',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);
  
  React.useEffect(() => {
    // Animate progress bars
    Object.keys(progressRefs.current).forEach(id => {
      const task = tasks.find(t => t.id.toString() === id);
      if (task && progressRefs.current[id]) {
        anime({
          targets: progressRefs.current[id],
          width: `${task.progress}%`,
          duration: 1200,
          easing: 'easeOutQuart',
          delay: 300 + parseInt(id) * 100
        });
      }
    });
  }, [tasks]);

  const handleDeadlineClick = (id, currentDeadline, e) => {
    e.stopPropagation();
    setEditingId(id);
    setTempDeadline(currentDeadline);
    
    // Animate the clicked deadline box
    anime({
      targets: e.currentTarget,
      scale: [1, 1.1, 1],
      duration: 400,
      easing: 'easeOutElastic(1, .6)'
    });
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
  
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
    
    // Animate the expansion/collapse
    setTimeout(() => {
      const detailsEl = document.querySelector(`.task-details-${id}`);
      if (detailsEl) {
        if (expandedId !== id) {
          anime({
            targets: detailsEl,
            height: [0, detailsEl.scrollHeight],
            opacity: [0, 1],
            duration: 300,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: detailsEl,
            height: [detailsEl.scrollHeight, 0],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuad'
          });
        }
      }
    }, 0);
  };

  // Styled component for deadline box with WCAG-compliant contrast
  const DeadlineBox = styled(Box)(({ status }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    cursor: 'pointer',
    background: status === 'overdue' ? theme.palette.error.light : 
                status === 'soon' ? theme.palette.warning.light : 
                '#e8f5e9',
    borderRadius: 16,
    padding: '4px 12px',
    transition: 'all 0.3s ease',
    color: status === 'overdue' ? theme.palette.error.dark : 
           status === 'soon' ? theme.palette.warning.dark : 
           theme.palette.success.dark,
    fontWeight: 600,
    minWidth: 120,
    minHeight: 32,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
    }
  }));

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>Today Tasks</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: '#10b981',
            '&:hover': {
              bgcolor: '#047857'
            }
          }}
        >
          New Task
        </Button>
      </Box>

      {tasks.map((task) => (
        <TaskCard key={task.id} className="task-card">
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'secondary.main',
                  width: 40,
                  height: 40,
                  fontWeight: 'bold'
                }}
              >
                {task.assignee.avatar}
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{task.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Assigned to {task.assignee.name}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DeadlineBox 
                status={getDeadlineStatus(task.dueDate)} 
                onClick={(e) => handleDeadlineClick(task.id, task.dueDate, e)}
              >
                <CalendarTodayIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 14 }}>
                  {formatDeadline(task.dueDate)}
                </Typography>
              </DeadlineBox>
              
              <IconButton 
                size="small" 
                onClick={() => toggleExpand(task.id)}
                sx={{ 
                  transition: 'transform 0.3s',
                  transform: expandedId === task.id ? 'rotate(180deg)' : 'rotate(0deg)'
                }}
              >
                <ExpandMoreIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
            <Chip
              label={task.type}
              color={task.type === 'Team' ? 'primary' : 
                    task.type === 'Design' ? 'secondary' : 
                    'default'}
              size="small"
              sx={{ fontWeight: 500 }}
            />
            {task.important && (
              <Chip
                label="Important"
                color="error"
                size="small"
                sx={{ fontWeight: 500 }}
              />
            )}
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 600, mr: 1 }}>
              {task.progress}%
            </Typography>
            <Box
              sx={{
                width: 120,
                height: 8,
                bgcolor: 'rgba(0,0,0,0.05)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box
                ref={el => progressRefs.current[task.id] = el}
                sx={{
                  width: 0, // Start at 0 for animation
                  height: '100%',
                  bgcolor: task.progress >= 80 ? theme.palette.success.main : 
                          task.progress >= 40 ? theme.palette.primary.main : 
                          theme.palette.warning.main,
                  borderRadius: 4
                }}
              />
            </Box>
          </Box>
          
          {/* Expandable task details */}
          <Collapse in={expandedId === task.id}>
            <Box 
              className={`task-details-${task.id}`}
              sx={{ 
                mt: 2, 
                pt: 2, 
                borderTop: '1px dashed rgba(0,0,0,0.1)',
                height: expandedId === task.id ? 'auto' : 0,
                overflow: 'hidden',
                opacity: expandedId === task.id ? 1 : 0
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {task.description}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Tooltip title="Edit task">
                  <IconButton size="small" sx={{ color: theme.palette.primary.main }}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete task">
                  <IconButton size="small" sx={{ color: theme.palette.error.main }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Collapse>
        </TaskCard>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>Team Members</Typography>
        <AvatarGroup max={5}>
          {['JU', 'LI', 'HA', 'AM', 'EW'].map((member, index) => (
            <Tooltip key={member} title={['Julmal', 'Lima', 'Hatik', 'Amirul', 'Emma'][index]}>
              <Avatar 
                sx={{ 
                  bgcolor: index % 2 === 0 ? 'secondary.main' : 'primary.main',
                  fontWeight: 'bold'
                }}
              >
                {member}
              </Avatar>
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>
      
      {/* Date Picker Dialog */}
      <Dialog 
        open={editingId !== null} 
        onClose={handleDialogClose}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Edit Deadline</DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 3, px: 3 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Due Date"
              value={tempDeadline ? new Date(tempDeadline) : null}
              onChange={handleDateChange}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal"
                }
              }}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDialogClose} sx={{ fontWeight: 500 }}>Cancel</Button>
          <Button 
            onClick={handleDialogConfirm} 
            variant="contained" 
            color="primary"
            sx={{ 
              fontWeight: 600, 
              px: 3,
              backgroundColor: theme.palette.success.main,
              '&:hover': {
                backgroundColor: theme.palette.success.dark
              }
            }}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Confirmation Dialog */}
      <Dialog 
        open={confirmOpen} 
        onClose={handleConfirmClose}
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>Deadline Updated</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Typography>Deadline changed successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleConfirmClose} 
            autoFocus
            variant="contained"
            color="primary"
            sx={{ 
              fontWeight: 600,
              backgroundColor: theme.palette.success.main,
              '&:hover': {
                backgroundColor: theme.palette.success.dark
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default TaskList; 