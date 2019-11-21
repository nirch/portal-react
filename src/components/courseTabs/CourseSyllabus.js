import React from 'react';
import server from '../../shared/server';
import '../../pages/courses/courses.css';

class CourseSyllabus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { courseDetails } = this.props;
        return (
            <div>
                <div className = "syllabus-header">קורס</div>
                <div className = "syllabus-course">{courseDetails.courseName}</div>
            </div>
        )
    }
}

export default CourseSyllabus;