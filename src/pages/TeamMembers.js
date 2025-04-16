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
  styled,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmailIcon from '@mui/icons-material/Email';
import anime from 'animejs';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const LargeAvatar = styled(Avatar)(({ theme }) => ({
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
  },
];

const MemberCard = ({ member }) => {
  React.useEffect(() => {
    // Animate progress bars
    anime({
      targets: `.progress-${member.id}`,
      width: `${member.performance}%`,
      duration: 1500,
      easing: 'easeInOutQuart',
    });
  }, [member.id, member.performance]);

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton>
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
  React.useEffect(() => {
    // Animate member cards on mount
    anime({
      targets: '.member-card',
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
        <Box>
          <Typography variant="h4" gutterBottom>Team Members</Typography>
          <Typography variant="body1" color="text.secondary">
            {mockTeamMembers.length} members in the team
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Member
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <TextField
          placeholder="Search members..."
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
      </Box>

      <Grid container spacing={3}>
        {mockTeamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={member.id} className="member-card">
            <MemberCard member={member} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TeamMembers; 