import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  Button,
  TextField,
  AvatarGroup,
  IconButton,
  styled,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import anime from 'animejs';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task] = React.useState({
    id: 1,
    title: 'Pitx App 3d Icon Design',
    description: 'Create modern and sleek 3D icons for the Pitx mobile application',
    assignee: { name: 'Julmal', avatar: 'JU' },
    type: 'Meeting',
    important: true,
    progress: 54,
    dueDate: '2024-01-20',
    members: ['M1', 'M2', 'M3', 'M4', 'M5'],
  });

  React.useEffect(() => {
    // Animate content on mount
    anime({
      targets: '.details-animation',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5">Task</Typography>
      </Box>

      <StyledPaper elevation={0} className="details-animation">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ mb: 2 }}>{task.title}</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
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
            </Box>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CalendarTodayIcon />}
          >
            Due {new Date(task.dueDate).toLocaleDateString()}
          </Button>
        </Box>

        <Box sx={{ mb: 4 }} className="details-animation">
          <Typography variant="subtitle1" sx={{ mb: 1 }}>Description</Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={task.description}
            variant="outlined"
          />
        </Box>

        <Box sx={{ mb: 4 }} className="details-animation">
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Progress</Typography>
          <Box
            sx={{
              height: 8,
              bgcolor: 'background.default',
              borderRadius: 4,
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                width: `${task.progress}%`,
                height: '100%',
                bgcolor: 'primary.main',
                transition: 'width 0.5s ease-in-out',
              }}
            />
          </Box>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {task.progress}% Complete
          </Typography>
        </Box>

        <Box className="details-animation">
          <Typography variant="subtitle1" sx={{ mb: 2 }}>Team Members</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <AvatarGroup max={5}>
              {task.members.map((member) => (
                <Avatar key={member} sx={{ bgcolor: 'secondary.main' }}>{member}</Avatar>
              ))}
            </AvatarGroup>
            <Button variant="outlined" color="primary">
              Invite Members
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default TaskDetails; 