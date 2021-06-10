import MetaTags from 'react-meta-tags';
import React, { useState } from "react"

import { Row, Col, CardBody, Card, Container, Form, Input } from "reactstrap"

import { withRouter, Link } from "react-router-dom"


import toastr from "toastr"
import "toastr/build/toastr.min.css"  
import { SellerSignin } from '../../../Core/ApiCore/Auth';

const SellerLogin = props => {

  const [seller , setSeller] = useState({
    "email":"",
    "password":""
  })

  const handleSeller = (e) => setSeller({ ...seller , [e.target.id]:e.target.value})

  const submitSeller = (e) => {
    e.preventDefault()
    console.log(seller)

    SellerSignin(seller)
      .then(res => { 
        console.log(res)
        if(res.success){
          localStorage.setItem('JWT_SELLER', JSON.stringify(res))
          props.history.push('/seller')
          toastr.options.progressBar = true;
          toastr.success(res.code, res.message)
        }else{
          toastr.options.progressBar = true;
          toastr.error(res.code, res.message)
        }
      })
  }

  return (
    <React.Fragment>
     <MetaTags>
          <title>Login | Ecomerce seller login</title>
        </MetaTags>
      
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to seller Center.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      {/* <img src={profile} alt="" className="img-fluid" /> */}
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="p-2">
                    <Form
                      onSubmit={submitSeller}
                      className="form-horizontal"
                      
                    >
                      <div className="mb-3">
                        <Input
                          id="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                          onChange={handleSeller}
                        />
                      </div>

                      <div className="mb-3">
                        <Input
                          id="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                          onChange={handleSeller}
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link
                    to="register"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(SellerLogin)