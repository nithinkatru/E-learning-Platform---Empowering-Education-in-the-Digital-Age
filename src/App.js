import Educatordashboard from './components/Educator/Educatordashboard.jsx';
import Coursespage from './components/Educator/CoursesPage.jsx';
import StudentDashboard from './components/StudentDashboard/StudentWelcome.jsx';
import ExploreCourses from "./components/StudentDashboard/ExploreCourses.jsx";
import AnalyticsPage from "./components/Educator/AnalyticsPage.jsx";
import QuizManager from "./components/Educator/QuizManager.jsx";
import TakeExam from "./components/StudentDashboard/TakeExam.jsx';
import SuperAdmin from "./components/Superadmin/Superadmin.jsx";
import { UserProvider } from './src/UserContext.js';






function App() {
  return (
    <div>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='Educatordashboard' element={<Educatordashboard />} />
          <Route exact path='/coursespage' element={<Coursespage />} />
          <Route exact path='/StudentDashboard' element={<StudentDashboard />} />
          <Route exact path='/ExploreCourses' element={<ExploreCourses />} />
          <Route exact path='/courses' element={<CourseHome />} />
          <Route exact path='/team' element={<Team />} />
          <Route exact path='/AnalyticsPage' element={<AnalyticsPage />} />
          <Route exact path='/QuizManager' element={<QuizManager />} /> 
          <Route exact path='/TakeExam' element={<TakeExam />} />
          <Route exact path='/SuperAdmin' element={<SuperAdmin />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
