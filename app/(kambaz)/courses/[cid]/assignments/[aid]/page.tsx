import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor p-3">
      <Form>
        <h2>
          <label htmlFor="wd-name">Assignment Name</label>
        </h2>
        <Row className="mb-3">
          <Col>
            <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FormControl
              as="textarea"
              id="wd-description"
              rows={10}
              defaultValue={
                "The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section Links to each of the lab assignments Link to the Kanbas application Links to all relevant source code repositories The Kanbas Application should include a link to navigate back to the landing page."
              }
            ></FormControl>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel>Points</FormLabel>
          </Col>
          <Col>
            <FormControl type="number" defaultValue={100}></FormControl>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel>Assignment Group</FormLabel>
          </Col>
          <Col>
            <FormSelect>
              <option>ASSIGNMENTS</option>
              <option>EXAMS</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel>Display Grade as</FormLabel>
          </Col>
          <Col>
            <FormSelect>
              <option>Percentage</option>
              <option>Decimal</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel>Submission Type</FormLabel>
          </Col>
          <Col className="flex-column border border-secondary">
            <FormSelect className="mt-2">
              <option>Online</option>
              <option>In Person</option>
            </FormSelect>
            <Row className="p-1">
              <FormLabel column sm={3} className="fw-bold">
                Online Entry Options
              </FormLabel>
            </Row>
            <Row className="mb-2">
              <FormCheck label="Text Entry" className="ps-5" />
              <FormCheck label="Website URL" className="ps-5" />
              <FormCheck label="Media Recordings" className="ps-5" />
              <FormCheck label="Student Annotation" className="ps-5" />
              <FormCheck label="File Uploads" className="ps-5" />
            </Row>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel>Assign</FormLabel>
          </Col>
          <Col className="flex-column border border-secondary">
            <Row className="ps-3">
              <FormLabel column sm={4} className="fw-bold">
                Assign To
              </FormLabel>
              <FormControl
                type="search"
                defaultValue={"Everyone"}
              ></FormControl>
            </Row>

            <Row className="ps-3">
              <FormLabel column sm={4} className="fw-bold">
                Due
              </FormLabel>
              <FormControl type="date"></FormControl>
            </Row>

            <Row className="p-1 mb-4">
              <Col>
                <FormLabel column sm={4} className="fw-bold">
                  Available From
                </FormLabel>
                <FormControl type="date"></FormControl>
              </Col>
              <Col>
                <FormLabel column sm={2} className="fw-bold">
                  Until
                </FormLabel>
                <FormControl type="date"></FormControl>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-end">
            <Button type="submit" className="btn btn-light">
              Cancel
            </Button>
            <Button type="submit" className="btn btn-danger">
              Submission Type
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
