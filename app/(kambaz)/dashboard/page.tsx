"use client";
import * as client from "../courses/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../courses/reducer";
import { setEnrollments } from "../enrollments/reducer";
import { RootState } from "../store";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  FormControl,
  Row,
} from "react-bootstrap";
import { redirect } from "next/navigation";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentReducer
  );
  const dispatch = useDispatch();

  if (!currentUser) {
    redirect("/account/signin");
  }

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const [showAll, setShowAll] = useState(false);

  const fetchCourses = async () => {
    try {
      if (isFaculty) {
        const all = await client.fetchAllCourses();
        dispatch(setCourses(all));
      } else if (showAll) {
        const all = await client.fetchAllCourses();
        dispatch(setCourses(all));
      } else {
        const mine = await client.findMyCourses();
        dispatch(setCourses(mine));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const data = await client.findEnrollmentsForUser(currentUser._id);
      dispatch(setEnrollments(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (!isFaculty) fetchEnrollments();
  }, [currentUser, showAll]);

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(courses.map((c) => (c._id === course._id ? course : c)))
    );
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser._id && e.course === courseId
    );

  const handleEnroll = async (courseId: string) => {
    const newEnrollment = await client.enrollInCourse(
      currentUser._id,
      courseId
    );
    dispatch(setEnrollments([...enrollments, newEnrollment]));
  };

  const handleUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse(currentUser._id, courseId);
    dispatch(
      setEnrollments(
        enrollments.filter(
          (e: any) => !(e.user === currentUser._id && e.course === courseId)
        )
      )
    );
  };

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div id="wd-dashboard">
      <h1
        id="wd-dashboard-title"
        className="d-flex justify-content-between align-items-center"
      >
        Dashboard
        {!isFaculty && (
          <Button variant="primary" onClick={toggleShowAll}>
            {showAll ? "Show Enrolled Only" : "Show All Courses"}
          </Button>
        )}
      </h1>
      <hr />

      {isFaculty && (
        <div>
          <h5>
            New Course
            <button
              onClick={onAddNewCourse}
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </div>
      )}

      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={
                    isEnrolled(c._id) || isFaculty
                      ? `/courses/${c._id}/home`
                      : "#"
                  }
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if (!isEnrolled(c._id) && !isFaculty) e.preventDefault();
                  }}
                >
                  <CardImg
                    src={"/images/reactjs.jpg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>

                    {!isFaculty && (
                      <>
                        {isEnrolled(c._id) ? (
                          <Button
                            variant="danger"
                            onClick={(e) => {
                              e.preventDefault();
                              handleUnenroll(c._id);
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnroll(c._id);
                            }}
                          >
                            Enroll
                          </Button>
                        )}
                      </>
                    )}

                    {isFaculty && (
                      <>
                        <Button variant="primary">Go</Button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            onDeleteCourse(c._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                        <button
                          id="wd-edit-course-click"
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(c);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
