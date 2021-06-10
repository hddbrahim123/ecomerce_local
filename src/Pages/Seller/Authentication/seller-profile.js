import MetaTags from 'react-meta-tags';
import React, { useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Media,
} from "reactstrap"

import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"

import avatar from "../../../assets/images/users/avatar-1.jpg"

const UserProfile = props => {


  useEffect(() => {
    
  }, [])



  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | seller Profile</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="seller" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <Media>
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <Media body className="align-self-center">
                      <div className="text-muted">
                        <h5>name</h5>
                        <p className="mb-1">hddbrahim123@gmail.com</p>
                        <p className="mb-0">Id no: #idx</p>
                      </div>
                    </Media>
                  </Media>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
             
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}


export default withRouter(UserProfile)
