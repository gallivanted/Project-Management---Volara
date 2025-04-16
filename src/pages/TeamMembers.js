import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  Chip,
  LinearProgress,
  IconButton,
  TextField,
  InputAdornment,
  AvatarGroup,
  styled as muiStyled,
  Tooltip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import anime from 'animejs';
import styled from 'styled-components';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const StyledPaper = muiStyled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const LargeAvatar = muiStyled(Avatar)(({ theme }) => ({
  width: theme.spacing(9),
  height: theme.spacing(9),
  marginBottom: theme.spacing(2),
}));

const mockTeamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Project Manager',
    avatar: 'JD',
    email: 'john.doe@example.com',
    tasksCompleted: 45,
    tasksInProgress: 8,
    projectsInvolved: ['Mobile App', 'Website Redesign'],
    performance: 85,
    deadline: '2024-04-20',
  },
  {
    id: 2,
    name: 'Alice Miller',
    role: 'UI/UX Designer',
    avatar: 'AM',
    email: 'alice.miller@example.com',
    tasksCompleted: 38,
    tasksInProgress: 5,
    projectsInvolved: ['Mobile App', 'Brand Guidelines'],
    performance: 92,
    deadline: '2024-04-18',
  },
  {
    id: 3,
    name: 'Robert Brown',
    role: 'Frontend Developer',
    avatar: 'RB',
    email: 'robert.brown@example.com',
    tasksCompleted: 52,
    tasksInProgress: 6,
    projectsInvolved: ['Website Redesign', 'Customer Portal'],
    performance: 78,
    deadline: '2024-04-25',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    role: 'Backend Developer',
    avatar: 'EW',
    email: 'emma.wilson@example.com',
    tasksCompleted: 41,
    tasksInProgress: 4,
    projectsInvolved: ['API Integration', 'Database Migration'],
    performance: 88,
    deadline: '2024-04-16',
  },
];

const DeadlineBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  background: ${props => props.status === 'overdue' ? 'rgba(176, 0, 32, 0.1)' : props.status === 'soon' ? props.theme.palette.warning.light : '#e8f5e9'};
  border-radius: 16px;
  padding: 4px 12px;
  transition: all 0.2s ease;
  color: ${props => props.theme.palette.success.main};
  ${props => props.status === 'overdue' ? `color: #B00020;` : ''}
  ${props => props.status === 'soon' ? `color: ${props.theme.palette.warning.dark};` : ''}
  font-weight: 600;
  min-width: 120px;
  min-height: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
  }
`;

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

const MemberCard = ({ member, onDeadlineEdit }) => {
  const theme = useTheme();
  const [deadline, setDeadline] = React.useState(member.deadline);
  const [editing, setEditing] = React.useState(false);
  const [tempDeadline, setTempDeadline] = React.useState(deadline);
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const deadlineRef = React.useRef(null);

  React.useEffect(() => {
    anime({
      targets: `.progress-${member.id}`,
      width: `${member.performance}%`,
      duration: 1500,
      easing: 'easeInOutQuart',
    });
  }, [member.id, member.performance]);

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
    setDeadline(member.deadline);
  }, [member.deadline]);

  const status = getDeadlineStatus(deadline);
  const isMobile = window.innerWidth < 400;

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
    if (onDeadlineEdit) onDeadlineEdit(member.id, tempDeadline);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <LargeAvatar>{member.avatar}</LargeAvatar>
        <Typography variant="h6">{member.name}</Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {member.role}
        </Typography>
        <Button
          startIcon={<EmailIcon />}
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        >
          Contact
        </Button>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom>Deadline</Typography>
        <Box ml="auto" ref={deadlineRef}>
          {isMobile ? (
            <Tooltip title={formatDeadline(deadline)} placement="top">
              <DeadlineBox theme={theme} status={status} onClick={handleDeadlineClick}>
                <CalendarTodayIcon sx={{ fontSize: 18 }} />
              </DeadlineBox>
            </Tooltip>
          ) : (
            <DeadlineBox theme={theme} status={status} onClick={handleDeadlineClick}>
              <CalendarTodayIcon sx={{ fontSize: 18 }} />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 700, 
                  fontSize: 14,
                  color: status === 'overdue' ? '#B00020' : 'inherit'
                }}
              >
                {formatDeadline(deadline)}
              </Typography>
            </DeadlineBox>
          )}
        </Box>
        <Dialog open={editing} onClose={handleDialogClose}>
          <DialogTitle>Edit Deadline</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Due Date"
                value={tempDeadline}
                onChange={handleDateChange}
                sx={{ mt: 2, width: '100%' }}
              />
            </LocalizationProvider>
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
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Performance</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ flexGrow: 1, bgcolor: 'background.default', borderRadius: 1, height: 8, overflow: 'hidden' }}>
            <Box
              className={`progress-${member.id}`}
              sx={{
                width: 0,
                height: '100%',
                bgcolor: 'primary.main',
                transition: 'width 1.5s ease-in-out',
              }}
            />
          </Box>
          <Typography variant="body2">{member.performance}%</Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>Tasks</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            label={`${member.tasksCompleted} Completed`}
            color="primary"
            size="small"
          />
          <Chip
            label={`${member.tasksInProgress} In Progress`}
            variant="outlined"
            size="small"
          />
        </Box>
      </Box>

      <Box>
        <Typography variant="subtitle2" gutterBottom>Projects</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {member.projectsInvolved.map((project) => (
            <Chip
              key={project}
              label={project}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
      </Box>
    </StyledPaper>
  );
};

const TeamMembers = () => {
  const [members, setMembers] = React.useState(mockTeamMembers);
  React.useEffect(() => {
    anime({
      targets: '.member-card',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, []);

  const handleDeadlineEdit = (id, newDeadline) => {
    setMembers(prev => prev.map(m => m.id === id ? { ...m, deadline: newDeadline } : m));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Team Members</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />}>Add Member</Button>
      </Box>
      <Grid container spacing={3}>
        {members.map((member) => (
          <MemberCard key={member.id} member={member} onDeadlineEdit={handleDeadlineEdit} />
        ))}
      </Grid>
    </Box>
  );
};

// Wrap with React.memo for performance optimization
export default React.memo(TeamMembers);