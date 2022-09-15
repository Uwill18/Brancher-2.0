//source: https://learn.nucamp.co/mod/book/view.php?id=5930&chapterid=6151

import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link,Router } from 'react-router-dom';

const SubHeader = ({ current, detail }) => {
    return (
        <Router>
        <Row>
            <Col>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/'>Home</Link>
                    </BreadcrumbItem>
                    {detail && (
                        <BreadcrumbItem>
                            <Link to='/directory'>Directory</Link>
                        </BreadcrumbItem>
                    )}
                    <BreadcrumbItem active>{current}</BreadcrumbItem>
                </Breadcrumb>
                <h2>{current}</h2>
                <hr />
            </Col>
        </Row>
        </Router>
    );
};

export default SubHeader;