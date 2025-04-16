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
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [currentMonth, setCurrentMonth] = React.useState(new Date());
  const [selectedDateEvents, setSelectedDateEvents] = React.useState([]);

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
  
  React.useEffect(() => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      setSelectedDateEvents(mockTasks[dateString] || []);
    }
  }, [selectedDate]);

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
      
      {selectedDate && (
        <Paper elevation={0} sx={{ p: 3, mb: 3, mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Selected Date: {selectedDate.toLocaleDateString()}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<AddIcon />}
              size="small"
            >
              Add Event
            </Button>
          </Box>
          
          {selectedDateEvents.length > 0 ? (
            <Box>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Events ({selectedDateEvents.length})</Typography>
              <Grid container spacing={2}>
                {selectedDateEvents.map((event) => (
                  <Grid item xs={12} sm={6} md={4} key={event.id}>
                    <Paper 
                      elevation={0} 
                      sx={{ 
                        p: 2, 
                        border: '1px solid #eee',
                        borderLeft: `4px solid ${
                          event.type === 'meeting' ? theme.palette.primary.main :
                          event.type === 'review' ? theme.palette.info.main :
                          event.type === 'milestone' ? theme.palette.secondary.main :
                          theme.palette.grey[500]
                        }`,
                        '&:hover': {
                          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                          transform: 'translateY(-2px)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>{event.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                        </Typography>
                        <Box sx={{ ml: 'auto' }}>
                          <Avatar sx={{ width: 24, height: 24 }}>{event.assignee}</Avatar>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No events scheduled for this date
              </Typography>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Your First Event
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

// Wrap with React.memo for performance optimization
export default React.memo(Calendar); 