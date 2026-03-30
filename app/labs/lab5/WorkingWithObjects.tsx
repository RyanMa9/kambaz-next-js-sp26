import React, { useState } from "react";
import { FormControl } from "react-bootstrap";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const ASSIGNMENT_API_URL = `${HTTP_SERVER}/lab5/assignment`;

  const [module, setModule] = useState({
    id: 1,
    name: "Node",
    description: "Nodejs",
    course: "CS4550",
  });

  const MODULE_API_URL = `${HTTP_SERVER}/lab5/module`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Modifying Properties</h4>

      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <hr />

      <a
        id="wd-update-module-name"
        className="btn btn-secondary float-end"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Module Name
      </a>
      <FormControl
        className="w-75"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />

      <hr />

      <a
        id="wd-update-module-description"
        className="btn btn-secondary float-end"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Module Description
      </a>
      <FormControl
        className="w-75"
        defaultValue={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />

      <hr />

      <h4>Assignment Updates</h4>

      <a
        id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        type="number"
        className="w-75"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })
        }
      />

      <hr />

      <a
        id="wd-update-assignment-completed"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Update Completed
      </a>

      <div>
        <input
          type="checkbox"
          checked={assignment.completed}
          onChange={(e) =>
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="ms-2">Completed</label>
      </div>

      <hr />

      <h4>Retrieving Objects</h4>

      <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}`}>
        Get Assignment
      </a>

      <hr />

      <a className="btn btn-secondary" href={`${MODULE_API_URL}`}>
        Get Module
      </a>

      <hr />

      <h4>Retrieving Properties</h4>

      <a className="btn btn-primary" href={`${ASSIGNMENT_API_URL}/title`}>
        Get Title
      </a>

      <hr />

      <a className="btn btn-secondary" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>

      <hr />
    </div>
  );
}
