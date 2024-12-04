import TitlePages from '@/components/atoms/Title';
import './index.scss'
const breadcrumbs = [
  { name: "Home", path: "/" },
  { name: "Terms of Use", path: " " },
];

const TermsofUse = () => {
  return (
    
    <div className='Terms-Page'>
      <div className='title'>
        <TitlePages
          breadcrumbs={breadcrumbs}
          titleName="Terms of Use"
        />
        </div>
      <div className="all-content">
        <div className="sidebar">
          <ul>
            <li>Terms of Use</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Copyright Policy</li>
            <li>Cursus API Agreement</li>
            <li>Instructor Terms</li>
            <li>Credits Program</li>
            <li>Pricing and Promotions Policy</li>
          </ul>
        </div>

        <div className="contents">
        <h2>These Terms of Use ("Terms") were last updated on August 1, 2020.</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            volutpat maximus pellentesque. Integer sem enim, luctus at nibh at,
            condimentum sagittis sapien. Sed tempus ipsum erat, sit amet efficitur velit interdum eu. Vestibulum hendrerit id dolor eu scelerisque. Phasellus ex dui, consequat nec feugiat eu, dapibus eget ante. Sed sodales interdum dui, at euismod mi feugiat hendrerit. Suspendisse auctor libero in tempor mollis. Nulla et dolor velit. Aliquam sit amet luctus quam.
          </p>
          <p>
            Nam a egestas libero, eget eleifend turpis. Sed id ipsum a ipsum aliquam laoreet sit amet sit amet nibh. Proin dapibus, libero sed posuere rhoncus, orci mi cursus enim, at accumsan eros massa lacinia mi. Nunc eget finibus felis, volutpat malesuada sem. Aliquam ac nisl pellentesque, varius neque sit amet, porttitor nunc. Nullam elit tellus, dapibus non eleifend sed, hendrerit eget velit. Aliquam ut felis dictum, tincidunt magna vitae, aliquam massa. In porttitor tristique quam, non dignissim sapien pharetra ultrices. Cras non ante non velit mollis mollis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque ut bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl.
          </p>
          <p>
            Etiam lobortis dictum tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse ultricies efficitur dui, suscipit tempus elit condimentum quis. Duis sed vestibulum tortor, eget cursus odio.
          </p>
          <h3>Table of Contents</h3>
          <ol>
            <li>Accounts</li>
            <li>Course Enrollment and Lifetime Access</li>
            <li>Payments, Credits, and Refunds</li>
            <li>Content and Behavior Rules</li>
            <li>Cursus's Rights to Content You Post</li>
            <li>Cursus’s Rights</li>
            <li>How to Contact Us</li>
          </ol>

          <h3>1. Accounts</h3>
          <p>
            Morbi lectus nunc, lacinia et consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna. Quisque interdum ac enim eu tempus. Fusce viverra, lectus egestas tincidunt cursus, tortor sapien convallis metus, vitae auctor risus metus vel nisi. Aenean dapibus bibendum mauris ut iaculis.
          </p>

          <h3>2. Course Enrollment and Lifetime Access</h3>
          <p>
            Vestibulum accumsan consectetur quam, id molestie odio pharetra sit amet. Integer fringilla mi vel lectus vehicula mollis. Curabitur ac turpis dictum, interdum lectus in, malesuada lorem. Donec quis sapien eget nisl ornare hendrerit. Phasellus vehicula orci nec est consequat laoreet. Proin tempor nunc nec orci condimentum aliquet. Etiam venenatis arcu purus, et viverra purus posuere et. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <h3>3. Payments, Credits, and Refunds</h3>
          <p>
            Morbi lectus nunc, lacinia et consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna. Quisque interdum ac enim eu tempus. Fusce viverra, lectus egestas tincidunt cursus, tortor sapien convallis metus, vitae auctor risus metus vel nisi. Aenean dapibus bibendum mauris ut iaculis.
          </p>

          <h3>4. Content and Behavior Rules</h3>
          <p>
            Quisque ut bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl.
          </p>

          <h3>5. Cursus’s Rights to Content You Post</h3>
          <p>
            Morbi lectus nunc, lacinia et consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna. Quisque interdum ac enim eu tempus. Fusce viverra, lectus egestas tincidunt cursus, tortor sapien convallis metus, vitae auctor risus metus vel nisi. Aenean dapibus bibendum mauris ut iaculis.
          </p>

          <h3>6. Cursus’s Rights</h3>
          <p>
            Quisque ut bibendum urna, eget consequat sapien. Integer sed condimentum nibh. Integer id neque tristique, lobortis massa ac, dapibus nibh. Donec nulla odio, porttitor ac rutrum eget, volutpat a velit. Curabitur et enim quis diam congue dictum et vitae dui. Nulla tortor orci, luctus a pretium vel, ultrices porta nisl.
          </p>

          <h3>7. How to Contact Us</h3>
          <p>
            Morbi lectus nunc, lacinia et consequat a, semper vel erat. Duis ut lacus nec dui sodales mattis. Mauris tellus dolor, pulvinar sit amet pretium a, malesuada sed tellus. Aliquam ultrices elit neque, quis lacinia ex porttitor non. Donec ac iaculis turpis. Nulla lacinia enim quis orci aliquam, non cursus urna pellentesque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus in mi a nisi auctor interdum. Vivamus faucibus magna sed elit interdum consequat. Vestibulum eu tortor vel ante feugiat faucibus quis et urna. Quisque interdum ac enim eu tempus. Fusce viverra, lectus egestas tincidunt cursus, tortor sapien convallis metus, vitae auctor risus metus vel nisi. Aenean dapibus bibendum mauris ut iaculis.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsofUse;
