import React from "react";
import { Fragment } from "react";
import "components/Appointment";
import "components/Appointment/styles.scss";
import Empty from "./Empty";
import Header from "./Header";
import Show from "./Show";
export default function Appointment(props) {
  return (
    <article className="appointment">
      <Header time={props.time}></Header>
      {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      ) : (
        <Empty />
      )}
    </article>
  );
}
