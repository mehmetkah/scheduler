import { useEffect, useState } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function spotsRemaining(day, days, appointments) {
    const foundDay = days.find((element) => element.name === day);

    let spots = 0;

    for (const appointmentID of foundDay.appointments) {
      const appointmentsObj = appointments[appointmentID];

      if (!appointmentsObj.interview) {
        spots += 1;
      }
    }
    let newDayObj = { ...foundDay, spots };
    let newDaysArray = days.map((element) =>
      element.name === day ? newDayObj : element
    );

    return newDaysArray;
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)

      .then((res) => {
        const days = spotsRemaining(state.day, state.days, appointments);

        setState({
          ...state,
          appointments,
          days,
        });
      });
  }
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      const days = spotsRemaining(state.day, state.days, appointments);

      setState({
        ...state,
        appointments,
        days,
      });
    });
  }

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8001/api/days"),
      axios.get("http://localhost:8001/api/appointments"),
      axios.get("http://localhost:8001/api/interviewers"),
    ]).then((all) => {
      console.log(all);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    bookInterview,
    setDay,
    cancelInterview,
  };
}
