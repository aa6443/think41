
import React, { useState } from "react";
import { format, addDays, addWeeks, isWithinInterval, parseISO } from "date-fns";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function RecurringEventGenerator() {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [recurrenceType, setRecurrenceType] = useState("Weekly");
  const [dayOfWeek, setDayOfWeek] = useState("Monday");
  const [occurrences, setOccurrences] = useState(5);
  const [viewStart, setViewStart] = useState("");
  const [viewEnd, setViewEnd] = useState("");
  const [instances, setInstances] = useState([]);

  const generateInstances = () => {
    if (!startDate || !occurrences || !viewStart || !viewEnd) return;
    const eventStart = parseISO(startDate);
    const viewStartDate = parseISO(viewStart);
    const viewEndDate = parseISO(viewEnd);

    let dates = [];

    if (recurrenceType === "Weekly") {
      let firstEventDate = new Date(eventStart);
      const eventDay = daysOfWeek.indexOf(dayOfWeek);

      while (firstEventDate.getDay() !== eventDay) {
        firstEventDate = addDays(firstEventDate, 1);
      }

      for (let i = 0; i < occurrences; i++) {
        const instanceDate = addWeeks(firstEventDate, i);
        dates.push(instanceDate);
      }
    } else {
      for (let i = 0; i < occurrences; i++) {
        const instanceDate = addDays(eventStart, i);
        dates.push(instanceDate);
      }
    }

    setInstances(
      dates.map((date) => ({
        date,
        inView: isWithinInterval(date, {
          start: viewStartDate,
          end: viewEndDate,
        }),
      }))
    );
  };

  return (
    <div className="container">
      <h1 className="title">Recurring Event Instance Generator</h1>

      <div className="grid">
        <div>
          <label className="label">Event Start Date:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="input" />
        </div>

        <div>
          <label className="label">Event Time:</label>
          <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="input" />
        </div>

        <div>
          <label className="label">Recurrence Type:</label>
          <select value={recurrenceType} onChange={(e) => setRecurrenceType(e.target.value)} className="select">
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </select>
        </div>

        {recurrenceType === "Weekly" && (
          <div>
            <label className="label">Day of Week:</label>
            <select value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} className="select">
              {daysOfWeek.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="label">Number of Occurrences:</label>
          <input type="number" min="1" value={occurrences} onChange={(e) => setOccurrences(parseInt(e.target.value))} className="input" />
        </div>

        <div>
          <label className="label">View Window Start:</label>
          <input type="date" value={viewStart} onChange={(e) => setViewStart(e.target.value)} className="input" />
        </div>

        <div>
          <label className="label">View Window End:</label>
          <input type="date" value={viewEnd} onChange={(e) => setViewEnd(e.target.value)} className="input" />
        </div>
      </div>

      <button onClick={generateInstances} className="button">Generate Instances</button>

      <div className="instance-list">
        <h2 className="text-xl font-semibold mt-6">Generated Instances:</h2>
        <ul>
          {instances.map((inst, idx) => (
            <li key={idx} className={inst.inView ? "in-view" : "out-of-view"}>
              {format(inst.date, "yyyy-MM-dd")} at {startTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
