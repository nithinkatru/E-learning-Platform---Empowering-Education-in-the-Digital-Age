// StudentLearning.jsx
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from 'react-bootstrap'

export default function StudentLearning() {
    return <div>
        <Container>
            <h1>Hello world!</h1>
            <div className="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowFullscreen></iframe>
            </div>
        </Container>
        
        
        </div>
}