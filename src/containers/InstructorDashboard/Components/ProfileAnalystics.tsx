import { HiDownload, HiUpload } from "react-icons/hi";
import "./ProfileAnalystics.scss";

function ProfileAnalystics() {
  return (
    <>
      <div className="container">
        <div className="profile-analystics">
          <h4 className="profile-analystics-title">Profile Analytics</h4>
          <div className="profile-analystics-background-content">
            <h6>Current subscribers</h6>
            <h3>865</h3>
            <hr />
            <div className="profile-analystics-body">
              <div className="body-view">
                <div className="body-view-title">View</div>
                <div>
                  <span>17K </span>
                  <span className="up-down-percent">
                    <HiDownload />
                    <span> 75%</span>
                  </span>
                </div>
              </div>

              <div className="body-purchased">
                <div className="body-purchased-title">
                  Purchased<span className="time-unit"> (per hour)</span>
                </div>
                <div>
                  <span>1 </span>
                  <span className="up-down-percent">
                    <HiUpload />
                    <span> 100%</span>
                  </span>
                </div>
              </div>

              <div className="body-enroll">
                <div className="body-enroll-title">
                  Enroll<span className="time-unit"> (per hour)</span>
                </div>
                <div>
                  <span>50 </span>
                  <span className="up-down-percent">
                    <HiUpload />
                    <span> 70%</span>
                  </span>
                </div>
              </div>
            </div>
            <hr />
            <div className="profile-analystics-bottom">
              DO TO PROFILE ANALYTICS
            </div>
          </div>
        </div>

        <div className="submit-courses">
          <h4 className="submit-courses-title">Submit Courses</h4>
          <div className="submit-courses-background-content">
            <a className="submit-courses-content-title">
              The Complete JavaScript Course 2020: Build Real Projects!
              <span className="status">Pending</span>
            </a>
            <div className="submit-courses-content-time">
              Submitted <span>1 days ago</span>
            </div>
            <div className="submit-courses-content-delete">Delete</div>
          </div>
        </div>

        <div className="new-cursus">
          <h4 className="new-cursus-title">What's new in Cursus</h4>
          <div className="new-cursus-background-content">
            <a href="https://www.tinybird.co/blog-posts/7-tips-to-make-your-dashboards-faster" className="p1">Improved performance on Studio Dashboard</a>
            {/* <hr /> */}
            <a href="https://www.tinybird.co/blog-posts/7-tips-to-make-your-dashboards-faster" className="p2">See more Dashboard updates</a>
            {/* <hr /> */}
            <a href="https://www.tinybird.co/blog-posts/7-tips-to-make-your-dashboards-faster" className="p3">See issues-at-glance for Live</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileAnalystics;
