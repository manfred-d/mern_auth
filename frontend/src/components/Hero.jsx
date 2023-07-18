import { Container, Card, Button } from 'react-bootstrap'
import LinkContainer from 'react-router-bootstrap/LinkContainer';

export const Hero = () => {
    return (
      <div className="py-5">
        <Container className="d-flex justify-content-center">
          <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
            <h2 className="text-center mb-4">MERN Authentication</h2>
            <p className="text-center mb-4">
              This is a MERN AUTH that stores a jwt in an http-Only cookie. It
              uses Redux Toolkit and the React Bootstrap library
            </p>
            <div className="d-flex">
              <LinkContainer to='/login'>
                  <Button className="me-3" variant="primary" >
                    Sign In
                  </Button>
              </LinkContainer>
              <LinkContainer to='/register'>
                  <Button className="me-3" variant="secondary" href="/register">
                    Sign Up
                  </Button>
              </LinkContainer>
            </div>
          </Card>
        </Container>
      </div>
    );
};