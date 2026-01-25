export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h2>
        <label htmlFor="wd-name">Assignment Name</label>
      </h2>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" cols={45} rows={10}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas Application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tr>
          {/* clicking this label */}
          {/* selects this field */}
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" type="number" defaultValue={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-assignment-group">
              <option>ASSIGNMENTS</option>
              <option>EXAMS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade">
              <option>Percentage</option>
              <option>Decimal</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option>Online</option>
              <option>In Person</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td />
          <td align="left" valign="top">
            <label>Online Entry Options</label>
            <br />
            <input
              type="checkbox"
              name="wd-check-online-entry"
              id="wd-chkbox-text-entry"
            />
            <label htmlFor="wd-chkbox-text-entry">Text Entry</label> <br />
            <input
              type="checkbox"
              name="wd-check-online-entry"
              id="wd-check-website-url"
            />
            <label htmlFor="wd-check-website-url">Website URL</label> <br />
            <input
              type="checkbox"
              name="wd-check-online-entry"
              id="wd-check-media-recordings"
            />
            <label htmlFor="wd-check-media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="wd-check-online-entry"
              id="wd-check-student-annotations"
            />
            <label htmlFor="wd-check-student-annotations">
              Student Annotations
            </label>
            <br />
            <input
              type="checkbox"
              name="wd-check-online-entry"
              id="wd-check-file-uploads"
            />
            <label htmlFor="wd-check-file-uploads">File Uploads</label>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-assign-to">Assign to</label>
            <br />
            <input id="wd-assign-to" defaultValue="Everyone" />
          </td>
        </tr>
        <br />
        <tr>
          <td />
          <td align="left" valign="top">
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
          </td>
        </tr>
        <tr>
          <td />
          <td align="left" valign="top">
            <label htmlFor="wd-available-from">Available from</label>
            <br />
            <input
              type="date"
              id="wd-available-from"
              defaultValue="2024-05-06"
            />
          </td>
          <td align="left" valign="top">
            <label htmlFor="wd-until">Until</label>
            <br />
            <input type="date" id="wd-until" defaultValue="2024-05-20" />
          </td>
        </tr>
      </table>
      <hr />
      <button>Cancel</button>
      <button>Save</button>
    </div>
  );
}
