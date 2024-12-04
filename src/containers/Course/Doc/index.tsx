import './index.scss';

const CourseDoc = () => {
    return (
        <div className="container-fluid p-0">
            <div className='course-doc'>
              <h1>Welcome to the course</h1>
              <p>Welcome to the course on Software processes and methodologies. I assume you want to know if this course is for you and what you can expect to learn in this course. You are in the right place to get the answers to these questions.</p>
  
              <h2>Who can benefit from this course?</h2>
              <p>It is designed for individuals who are new to the software engineering world or have been developing software but want to gain an academic context on why we develop software the way we do.</p>
  
              <h2>What are we going to learn?</h2>
              <p>You will learn how software teams work, what makes them good, the processes they use, and some of the industry-standard methodologies. At the end of this course, you will be able to have meaningful conversations around software development processes.</p>
  
              <h2>How are we going to learn?</h2>
              <ul>
                  <li>
                      <strong>Weeks 1 & 2:</strong> You will learn the core processes of software development like requirements, design, development, etc. You will learn what is involved in each of these processes and what good looks like; particularly, the do's and don'ts for each of these processes.
                  </li>
                  <li>
                      <strong>Week 3:</strong> You will learn about predictive or waterfall methods that are used when requirements are well-known and not expected to change. You will learn the pros and cons of each method.
                  </li>
                  <li>
                      <strong>Week 4:</strong> You will learn about adaptive or agile models that have gained a lot of attention in the last several years. You will also compare predictive and adaptive methods to develop a basic understanding of what to use when.
                  </li>
              </ul>
            </div>
        </div>
    );
};

export default CourseDoc;
