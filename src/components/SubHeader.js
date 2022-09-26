//source: https://learn.nucamp.co/mod/book/view.php?id=5930&chapterid=6151

import { Col, Row, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link} from 'react-router-dom';

const SubHeader = ({ current, detail }) => {
    return (
        <Row>
            <Col>
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/'>{current}</Link>
                    </BreadcrumbItem>
                    {detail && (
                        <BreadcrumbItem active>
                            <Link to='/cart'>{current}</Link>
                        </BreadcrumbItem>
                    )}
                </Breadcrumb>
            </Col>
        </Row>
   
    );
};

export default SubHeader;