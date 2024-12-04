import "./NewsCurcus.scss";

function NewsCurcus() {
  return (
    <>
      <div className="container">
        <div className="new-cursus">
          <h4 className="new-cursus-title">What's new in Cursus</h4>
          <div className="new-cursus-background-content">
            <a href="https://www.tinybird.co/blog-posts/7-tips-to-make-your-dashboards-faster" className="p1">Improved performance on Studio Dashboard</a>
            <a href="https://www.tinybird.co/blog-posts/7-tips-to-make-your-dashboards-faster" className="p2">See more Dashboard updates</a>
            <a href="https://www.tinybird.co/blog-posts/7-tips-to-make-your-dashboards-faster" className="p3">See issues-at-glance for Live</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsCurcus;
