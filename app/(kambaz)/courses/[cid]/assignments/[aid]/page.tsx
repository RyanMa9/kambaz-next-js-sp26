"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );

  const editingAssignment = assignments.find((a) => a._id === aid);

  const [title, setTitle] = useState(editingAssignment?.title || "");
  const [description, setDescription] = useState(
    editingAssignment?.description || ""
  );
  const [pts, setPts] = useState(editingAssignment?.pts || 100);
  const [availableFrom, setAvailableFrom] = useState(
    editingAssignment?.available_at_date || ""
  );
  const [dueDate, setDueDate] = useState(editingAssignment?.due_date || "");

  const handleSave = () => {
    const payload = {
      _id: editingAssignment?._id,
      course: cid,
      title,
      description,
      pts,
      available_at_date: availableFrom,
      due_date: dueDate,
    };

    if (editingAssignment) {
      dispatch(updateAssignment(payload));
    } else {
      dispatch(addAssignment(payload));
    }

    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => router.push(`/courses/${cid}/assignments`);

  return (
    <Form className="p-3">
      <h2>{editingAssignment ? "Edit Assignment" : "New Assignment"}</h2>

      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <FormControl value={title} onChange={(e) => setTitle(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <FormControl
          as="textarea"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <FormControl
          type="number"
          value={pts}
          onChange={(e) => setPts(Number(e.target.value))}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Available From</Form.Label>
        <FormControl
          type="date"
          value={availableFrom}
          onChange={(e) => setAvailableFrom(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <FormControl
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="secondary" className="me-2" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Form>
  );
}
