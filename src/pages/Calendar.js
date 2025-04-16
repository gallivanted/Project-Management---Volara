import React from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Button,
  Chip,
  Avatar,
  styled,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddIcon from '@mui/icons-material/Add';
import anime from 'animejs';

const CalendarCell = styled(Paper)(({ theme, isToday, isSelected }) => ({
  padding: theme.spacing(1),
  height: '120px',
  cursor: 'pointer',
  backgroundColor: isToday ? 'rgba(76, 175, 80, 0.1)' : isSelected ? 'rgba(76, 175, 80, 0.05)' : 'transparent',
  border: isToday ? `1px solid ${theme.palette.primary.main}` : '1px solid #eee',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
}));

const TaskChip = styled(Chip)(({ theme }) => ({
  margin: '2px 0',
  width: '100%',
  justifyContent: 'flex-start',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const mockTasks = {
  '2024-02-15': [
    { id: 1, title: 'Team Meeting', type: 'meeting', assignee: 'JD' },
    { id: 2, title: 'Project Review', type: 'review', assignee: 'AM' },
    { id: 3, title: 'Client Presentation', type: 'meeting', assignee: 'RB' },
  ],
  '2024-02-16': [
    { id: 4, title: 'Sprint Planning', type: 'meeting', assignee: 'EW' },
  ],
  '2024-02-18': [
    { id: 5, title: 'Client Call', type: 'meeting', assignee: 'KL' },
    { id: 6, title: 'Design Review', type: 'review', assignee: 'AM' },
  ],
  '2024-02-20': [
    { id: 7, title: 'Design Sprint', type: 'work', assignee: 'RB' },
    { id: 8, title: 'Release v2.0', type: 'milestone', assignee: 'TM' },
    { id: 9, title: 'Team Sync', type: 'meeting', assignee: 'JD' },
  ],
  '2024-02-22': [
    { id: 10, title: 'Code Review', type: 'review', assignee: 'EW' },
    { id: 11, title: 'Bug Fixes', type: 'work', assignee: 'RB' },
  ],
  '2024-02-25': [
    { id: 12, title: 'Monthly Report', type: 'milestone', assignee: 'JD' },
  ],
  '2024-02-28': [
    { id: 13, title: 'Product Demo', type: 'meeting', assignee: 'AM' },
    { id: 14, title: 'Release Planning', type: 'meeting', assignee: 'TM' },
  ],
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [currentMonth, setCurrentMonth] = React.useState(new Date());

  React.useEffect(() => {
    // Animate calendar cells on mount
    anime({
      targets: '.calendar-cell',
      scale: [0.9, 1],
      opacity: [0, 1],
      delay: anime.stagger(50, {
        grid: [7, 6],
        from: 'center',
      }),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, [currentMonth]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay };
  };

  const getTaskColor = (type) => {
    switch (type) {
      case 'meeting':
        return 'primary';
      case 'review':
        return 'info';
      case 'milestone':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const { daysInMonth, startingDay } = getDaysInMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      days.push(<Grid item xs key={`empty-${i}`} className="calendar-cell">
        <CalendarCell elevation={0} />
      </Grid>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dateString = date.toISOString().split('T')[0];
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
      const dayTasks = mockTasks[dateString] || [];

      days.push(
        <Grid item xs key={day} className="calendar-cell">
          <CalendarCell
            elevation={0}
            isToday={isToday}
            isSelected={isSelected}
            onClick={() => setSelectedDate(date)}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isToday ? 'bold' : 'normal',
                  color: isToday ? 'primary.main' : 'inherit',
                }}
              >
                {day}
              </Typography>
              {dayTasks.length > 0 && (
                <IconButton size="small">
                  <AddIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {dayTasks.map((task) => (
                <TaskChip
                  key={task.id}
                  size="small"
                  label={task.title}
                  color={getTaskColor(task.type)}
                  avatar={<Avatar>{task.assignee}</Avatar>}
                />
              ))}
            </Box>
          </CalendarCell>
        </Grid>
      );
    }

    return days;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Calendar</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Event
        </Button>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton onClick={handlePreviousMonth}>
              <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Typography>
            <IconButton onClick={handleNextMonth}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={0}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <Grid item xs key={day}>
              <Box sx={{ p: 1, textAlign: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {day}
                </Typography>
              </Box>
            </Grid>
          ))}
          {renderCalendar()}
        </Grid>
      </Paper>
    </Box>
  );
};

export default Calendar; 