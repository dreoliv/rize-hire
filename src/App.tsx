import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StudentTable } from './components/StudentTable';
import { StudentProfile } from './components/StudentProfile';
import studentsData from './data/students.json';
import type { Student } from './types/student';
import './App.css';

const students: Student[] = studentsData.students as Student[];

function App() {
  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="logo">
              <span className="logo-icon">R</span>
              <span className="logo-text">Rize Align</span>
            </div>
            <p className="tagline">Connecting top talent with top employers</p>
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<StudentTable students={students} />} />
            <Route path="/student/:id" element={<StudentProfile students={students} />} />
          </Routes>
        </main>
        <footer className="app-footer">
          <p>© 2024 Rize Align. Powered by proprietary student performance data.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
