export function getAppointmentsForDay(state, day) {
  const dayAppointments = [];

  const filterDay = state.days.find((selectedDay) => selectedDay.name === day);

  if (!filterDay) {
    return [];
  }

  for (const appointmentID of filterDay.appointments) {
    if (state.appointments[appointmentID]) {
      dayAppointments.push(state.appointments[appointmentID]);
    }
  }
  return dayAppointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const getInterviewObj = {};

  const interviewerID = interview.interviewer;
  const studentName = interview.student;
  const interviewerObj = state.interviewers[interviewerID];

  getInterviewObj.student = studentName;
  getInterviewObj.interviewer = interviewerObj;

  return getInterviewObj;
}

export function getInterviewersForDay(state, day) {
  const dayInterviewers = [];

  const filterDay = state.days.find((selectedDay) => selectedDay.name === day);

  if (!filterDay) {
    return [];
  }

  for (const interviewerID of filterDay.interviewers) {
    if (state.interviewers[interviewerID]) {
      dayInterviewers.push(state.interviewers[interviewerID]);
    }
  }
  return dayInterviewers;
}
