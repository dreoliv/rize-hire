import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Student } from '../types/student';
import './StudentTable.css';

interface StudentTableProps {
  students: Student[];
}

type SortField = 'name' | 'matchScore' | 'proactivity' | 'communication' | 'presentationSkills' | 'recommendationRate' | 'graduationYear';
type SortDirection = 'asc' | 'desc';

export function StudentTable({ students }: StudentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [majorFilter, setMajorFilter] = useState<string>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('matchScore');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [minMatchScore, setMinMatchScore] = useState<number>(0);

  const majors = useMemo(() => {
    const uniqueMajors = [...new Set(students.map(s => s.major))];
    return uniqueMajors.sort();
  }, [students]);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(students.map(s => s.graduationYear))];
    return uniqueYears.sort();
  }, [students]);

  const filteredAndSortedStudents = useMemo(() => {
    let result = students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesMajor = majorFilter === 'all' || student.major === majorFilter;
      const matchesYear = yearFilter === 'all' || student.graduationYear.toString() === yearFilter;
      const matchesScore = student.matchScore >= minMatchScore;

      return matchesSearch && matchesMajor && matchesYear && matchesScore;
    });

    result.sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortField) {
        case 'name':
          return sortDirection === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'matchScore':
          aValue = a.matchScore;
          bValue = b.matchScore;
          break;
        case 'proactivity':
          aValue = a.softSkills.proactivity.score;
          bValue = b.softSkills.proactivity.score;
          break;
        case 'communication':
          aValue = a.softSkills.communication.score;
          bValue = b.softSkills.communication.score;
          break;
        case 'presentationSkills':
          aValue = a.softSkills.presentationSkills.score;
          bValue = b.softSkills.presentationSkills.score;
          break;
        case 'recommendationRate':
          aValue = a.instructorFeedback.recommendationRate;
          bValue = b.instructorFeedback.recommendationRate;
          break;
        case 'graduationYear':
          aValue = a.graduationYear;
          bValue = b.graduationYear;
          break;
        default:
          return 0;
      }

      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return result;
  }, [students, searchTerm, majorFilter, yearFilter, sortField, sortDirection, minMatchScore]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const getScoreClass = (score: number, max: number = 5) => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return 'score-excellent';
    if (percentage >= 75) return 'score-good';
    if (percentage >= 60) return 'score-average';
    return 'score-below';
  };

  return (
    <div className="student-table-container">
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search by name, email, or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="major">Major</label>
          <select
            id="major"
            value={majorFilter}
            onChange={(e) => setMajorFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Majors</option>
            {majors.map(major => (
              <option key={major} value={major}>{major}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="year">Graduation Year</label>
          <select
            id="year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="minScore">Min Match Score: {minMatchScore}%</label>
          <input
            id="minScore"
            type="range"
            min="0"
            max="100"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="score-slider"
          />
        </div>
      </div>

      <div className="results-count">
        Showing {filteredAndSortedStudents.length} of {students.length} students
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Student</th>
              <th onClick={() => handleSort('matchScore')} className="sortable">
                Match Score {getSortIcon('matchScore')}
              </th>
              <th onClick={() => handleSort('proactivity')} className="sortable">
                Proactivity {getSortIcon('proactivity')}
              </th>
              <th onClick={() => handleSort('communication')} className="sortable">
                Communication {getSortIcon('communication')}
              </th>
              <th onClick={() => handleSort('presentationSkills')} className="sortable">
                Presentation {getSortIcon('presentationSkills')}
              </th>
              <th onClick={() => handleSort('recommendationRate')} className="sortable">
                Rec. Rate {getSortIcon('recommendationRate')}
              </th>
              <th>Skills</th>
              <th onClick={() => handleSort('graduationYear')} className="sortable">
                Grad Year {getSortIcon('graduationYear')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <Link to={`/student/${student.id}`} className="student-link">
                    <div className="student-info">
                      <img
                        src={student.profilePicture}
                        alt={student.name}
                        className="student-avatar"
                      />
                      <div className="student-details">
                        <span className="student-name">{student.name}</span>
                        <span className="student-meta">{student.major}</span>
                        <span className="student-meta">{student.college}</span>
                      </div>
                    </div>
                  </Link>
                </td>
                <td>
                  <span className={`match-score ${getScoreClass(student.matchScore, 100)}`}>
                    {student.matchScore}%
                  </span>
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(student.softSkills.proactivity.score)}`}>
                    {student.softSkills.proactivity.score}/5
                  </span>
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(student.softSkills.communication.score)}`}>
                    {student.softSkills.communication.score}/5
                  </span>
                </td>
                <td>
                  <span className={`score-badge ${getScoreClass(student.softSkills.presentationSkills.score)}`}>
                    {student.softSkills.presentationSkills.score}/5
                  </span>
                </td>
                <td>
                  <span className={`rec-rate ${getScoreClass(student.instructorFeedback.recommendationRate, 100)}`}>
                    {student.instructorFeedback.recommendationRate}%
                  </span>
                </td>
                <td>
                  <div className="skills-cell">
                    {student.skills.slice(0, 3).map(skill => (
                      <span key={skill} className="skill-pill">{skill}</span>
                    ))}
                    {student.skills.length > 3 && (
                      <span className="skill-more">+{student.skills.length - 3}</span>
                    )}
                  </div>
                </td>
                <td>{student.graduationYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredAndSortedStudents.length === 0 && (
        <div className="no-results">
          No students match your filters. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
}
