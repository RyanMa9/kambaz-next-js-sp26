import Link from "next/link";
export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>{" "}
          <div className="wd-assignment-info">
            Multiple Modules | <b> Not Available until </b>May 6 at 12:00 am
          </div>
          <div className="wd-assignment-due-date">
            {" "}
            <b>Due </b> May 13 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/1234"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-info">
            Multiple Modules | <b> Not Available until </b>May 13 at 12:00 am
          </div>
          <div className="wd-assignment-due-date">
            {" "}
            <b>Due </b> May 20 at 11:59pm | 100 pts
          </div>
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/12345"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <div className="wd-assignment-info">
            Multiple Modules | <b> Not Available until </b>May 20 at 12:00 am
          </div>
          <div className="wd-assignment-due-date">
            {" "}
            <b>Due </b> May 27 at 11:59pm | 100 pts
          </div>
        </li>
      </ul>
      <h3 id="wd-assignments-title">
        QUIZZES 40% of Total <button>+</button>{" "}
      </h3>
      <h3 id="wd-assignments-title">
        EXAMS 40% of Total <button>+</button>{" "}
      </h3>
      <h3 id="wd-assignments-title">
        PROJECTS 40% of Total <button>+</button>{" "}
      </h3>
    </div>
  );
}
