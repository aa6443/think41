# think41
📅 Recurring Event Instance Generator
A simple React UI component to generate and display recurring events based on user-defined rules. Supports daily and weekly recurrence patterns with filtering based on a custom view window.

✨ Features
✅ Select start date and time for an event

✅ Choose between Daily or Weekly recurrence

✅ Pick day of week for weekly recurrence

✅ Specify number of occurrences

✅ Set a view window to filter visible events

✅ Highlight out-of-view instances (gray, italic, strikethrough)

🧠 Technologies Used
React (Hooks)

date-fns for date handling

Plain CSS (or optional Tailwind-like class names)

📸 UI Overview
Input Fields	Function
Event Start Date	Select the first date of the event
Event Time	Set the time of day
Recurrence Type	Daily / Weekly toggle
Day of Week	Only visible for weekly recurrence
Occurrences	Total number of events
View Window	Define visible date range for filtering

✅ Instance Display Logic
In View: Normal black text

Out of View: Gray, italicized, and struck-through

🚀 Getting Started
bash
Copy
Edit
npm install
npm start
📂 File Structure
RecurringEventGenerator.js – Main component logic

styles.css – CSS for layout and highlighting

📌 Example Output
sql
Copy
Edit
2025-08-05 at 09:00       ✅ In View
2025-08-12 at 09:00       ❌ Out of View (gray, italic, strikethrough)
🛠 Future Improvements
Add Monthly/Custom recurrence

Export to .ics or Google Calendar

Add toggle to hide/show out-of-view instances
