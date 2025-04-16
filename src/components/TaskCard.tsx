import React, { useRef, useState } from "react";
import styled from "styled-components";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Typography, Tooltip, Box, useTheme, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface TaskCardProps {
  task: {
    title: string;
    assignee: string;
    progress: number;
    type: string;
    dueDate: string;
    isImportant: boolean;
    avatarUrl: string;
  };
}

const DeadlineBox = styled(Box)<{ $status: string; $theme: any }>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  background: ${({ $status, $theme }) =>
    $status === "overdue"
      ? $theme.palette.error.light
      : $status === "soon"
      ? $theme.palette.warning.light
      : "#e8f5e9"};
  border-radius: 16px;
  padding: 2px 10px;
  transition: background 0.2s;
  color: ${({ $status, $theme }) =>
    $status === "overdue"
      ? $theme.palette.error.main
      : $status === "soon"
      ? $theme.palette.warning.dark
      : $theme.palette.success.main};
  font-weight: 500;
  min-width: 110px;
  min-height: 28px;
`;

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const theme = useTheme();
  const [deadline, setDeadline] = useState<string>(task.dueDate);
  const [editing, setEditing] = useState(false);
  const [tempDeadline, setTempDeadline] = useState(deadline);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const deadlineRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setDeadline(task.dueDate);
  }, [task.dueDate]);

  const getDeadlineStatus = (dateStr: string): "overdue" | "soon" | "normal" => {
    const today = new Date();
    const deadlineDate = new Date(dateStr);
    const diff = Math.ceil((deadlineDate.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
    if (diff < 0) return "overdue";
    if (diff <= 3) return "soon";
    return "normal";
  };

  const formatDeadline = (dateStr: string): string => {
    const today = new Date();
    const deadlineDate = new Date(dateStr);
    const diff = Math.ceil((deadlineDate.getTime() - today.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
    if (diff < 0) return deadlineDate.toLocaleDateString();
    if (diff === 0) return "Due today";
    if (diff <= 7) return `Due in ${diff} day${diff > 1 ? "s" : ""}`;
    return deadlineDate.toLocaleDateString();
  };

  const status = getDeadlineStatus(deadline);

  const handleDeadlineClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTempDeadline(deadline);
    setEditing(true);
  };

  const handleDateChange = (newValue: string | null) => {
    setTempDeadline(newValue ? new Date(newValue).toISOString().split("T")[0] : tempDeadline);
  };

  const handleDialogClose = () => {
    setEditing(false);
  };

  const handleDialogConfirm = () => {
    setDeadline(tempDeadline);
    setEditing(false);
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 400;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="w-full bg-gray-100 h-1 rounded-full">
          <div
            className="bg-emerald-500 h-1 rounded-full"
            style={{ width: `${task.progress}%` }}
          />
        </div>
        <span className="absolute right-0 -top-6 text-xs text-gray-500">
          {task.progress}% DONE
        </span>
      </div>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <div className="flex items-center gap-2 mt-2">
            <img
              src={task.avatarUrl}
              alt={task.assignee}
              className="w-6 h-6 rounded-full"
            />
            <span className="text-sm text-gray-600">
              Linked to {task.assignee}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Removed unused Calendar and Clock icons */}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
          {task.type}
        </span>
        {task.isImportant && (
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm">
            Important
          </span>
        )}
        <Box ml="auto" ref={deadlineRef}>
          {isMobile ? (
            <Tooltip title={formatDeadline(deadline)} placement="top">
              <DeadlineBox $status={status} $theme={theme} onClick={handleDeadlineClick}>
                <CalendarTodayIcon sx={{ fontSize: 18 }} />
              </DeadlineBox>
            </Tooltip>
          ) : (
            <DeadlineBox $status={status} $theme={theme} onClick={handleDeadlineClick}>
              <CalendarTodayIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: 14 }}>
                {formatDeadline(deadline)}
              </Typography>
            </DeadlineBox>
          )}
        </Box>
      </div>
      <Dialog open={editing} onClose={handleDialogClose}>
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
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Deadline Updated</DialogTitle>
        <DialogContent>
          <Typography>Deadline changed to {formatDeadline(deadline)}.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} autoFocus>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
