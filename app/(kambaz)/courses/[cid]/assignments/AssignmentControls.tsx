import Link from "next/link";
import { useParams } from "next/navigation";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";

export default function AssignmentControls() {
  const { cid } = useParams();
  return (
    <div className="d-flex align-items-center justify-content-between">
      <InputGroup style={{ width: "350px" }}>
        <InputGroupText>
          <IoIosSearch />
        </InputGroupText>
        <FormControl type="search" placeholder="Search..." />
      </InputGroup>
      <div>
        <Link href={`/courses/${cid}/assignments/new`}>
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment"
          >
            <FaPlus className="position-relative me-2"></FaPlus>
            Assignments
          </Button>
        </Link>
        <Button
          variant="secondary"
          size="lg"
          className="me-1 float-end"
          id="wd-group-assignment"
        >
          Group
        </Button>
      </div>
    </div>
  );
}
