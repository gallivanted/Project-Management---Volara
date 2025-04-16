import React from 'react';
import { Box, Paper, Typography, Avatar, Chip, Button, AvatarGroup, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import anime from 'animejs';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const TaskCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const mockTasks = [
  {
    id: 1,
    title: 'Pitx App 3d Icon Design',
    assignee: { name: 'Julmal', avatar: 'JU' },
    type: 'Meeting',
    important: true,
    progress: 54,
  },
  {
    id: 2,
    title: 'Hub Flay Video',
    assignee: { name: 'Lima', avatar: 'LI' },
    type: 'Team',
    important: true,
    progress: 32,
  },
  {
    id: 3,
    title: 'Hip App Flow Work',
    assignee: { name: 'Hatik', avatar: 'HA' },
    type: 'Meeting',
    important: false,
    progress: 78,
  },
];

const TaskList = () => {
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

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6">Today Tasks</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2 }}
        >
          New Task
        </Button>
      </Box>

      {mockTasks.map((task) => (
        <TaskCard key={task.id} className="task-card">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>{task.assignee.avatar}</Avatar>
            <Box>
              <Typography variant="subtitle1">{task.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                Linked to {task.assignee.name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip
              label={task.type}
              color={task.type === 'Team' ? 'primary' : 'default'}
              size="small"
            />
            {task.important && (
              <Chip
                label="Important"
                color="secondary"
                size="small"
              />
            )}
            <Box
              sx={{
                width: 100,
                height: 4,
                bgcolor: 'background.paper',
                borderRadius: 2,
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
          </Box>
        </TaskCard>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
        <Typography variant="subtitle1">Team Members</Typography>
        <AvatarGroup max={5}>
          {['M1', 'M2', 'M3', 'M4', 'M5'].map((member) => (
            <Avatar key={member} sx={{ bgcolor: 'secondary.main' }}>{member}</Avatar>
          ))}
        </AvatarGroup>
      </Box>
    </StyledPaper>
  );
};

export default TaskList; 