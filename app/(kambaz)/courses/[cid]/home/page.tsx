import Modules from "../modules/page";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div id="wd-home">
      <div className="d-flex" id="wd-home">
        <div className="flex-fill">
          <Modules></Modules>
        </div>
        <div className="d-none d-lg-block ms-5">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
