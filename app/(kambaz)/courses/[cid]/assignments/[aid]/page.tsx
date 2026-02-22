"use client";

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
import { useParams } from "next/navigation";
import * as db from "@/app/(kambaz)/database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const assignment = db.assignments.find(
    (assignment) => cid === assignment.course && aid === assignment._id
  );
  return (
    <div id="wd-assignments-editor p-3">
      <Form>
        <h2>
          <label htmlFor="wd-name">Assignment Name</label>
        </h2>
        <Row className="mb-3">
          <Col>
            <FormControl id="wd-name" defaultValue={assignment?.title} />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <FormControl
              as="textarea"
              id="wd-description"
              rows={10}
              defaultValue={assignment?.description}
            ></FormControl>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel>Points</FormLabel>
          </Col>
          <Col>
            <FormControl
              type="number"
              defaultValue={assignment?.pts}
            ></FormControl>
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
              <FormControl
                type="date"
                defaultValue={assignment?.due_date}
              ></FormControl>
            </Row>

            <Row className="p-1 mb-4">
              <Col>
                <FormLabel column sm={4} className="fw-bold">
                  Available From
                </FormLabel>
                <FormControl
                  type="date"
                  defaultValue={assignment?.available_at_date}
                ></FormControl>
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
            <Link href={`/courses/${cid}/assignments`} className="text-black">
              <Button type="submit" className="btn btn-light">
                Cancel
              </Button>
            </Link>

            <Link href={`/courses/${cid}/assignments`} className="text-white">
              <Button type="submit" className="btn btn-danger">
                Save
              </Button>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
