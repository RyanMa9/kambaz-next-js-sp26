import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.jpg"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/2" className="wd-dashboard-course-link">
            <Image src="/images/math.jpg" width={200} height={150} alt="math" />
            <div>
              <h5> CS0002 Math</h5>
              <p className="wd-dashboard-course-title">Student</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/3" className="wd-dashboard-course-link">
            <Image src="/images/sql.jpg" width={200} height={150} alt="sql" />
            <div>
              <h5> CS003 SQL </h5>
              <p className="wd-dashboard-course-title">SQL Developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4" className="wd-dashboard-course-link">
            <Image
              src="/images/javascript.jpg"
              width={200}
              height={150}
              alt="javascript"
            />
            <div>
              <h5> CS0004 JS </h5>
              <p className="wd-dashboard-course-title">Javascript developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/5" className="wd-dashboard-course-link">
            <Image
              src="/images/english.jpg"
              width={200}
              height={150}
              alt="english"
            />
            <div>
              <h5> ENGW0005 English </h5>
              <p className="wd-dashboard-course-title">Student</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/6" className="wd-dashboard-course-link">
            <Image
              src="/images/python.jpg"
              width={200}
              height={150}
              alt="python"
            />
            <div>
              <h5> CS0006 Python </h5>
              <p className="wd-dashboard-course-title">Python developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/7" className="wd-dashboard-course-link">
            <Image src="/images/java.jpg" width={200} height={150} alt="java" />
            <div>
              <h5> CS0007 Java </h5>
              <p className="wd-dashboard-course-title">Java developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/8" className="wd-dashboard-course-link">
            <Image src="/images/vue.jpg" width={200} height={150} alt="vue" />
            <div>
              <h5> CS0008 Vue </h5>
              <p className="wd-dashboard-course-title">Vue developer</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
