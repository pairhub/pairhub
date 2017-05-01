import Header from './Header'

import { Container } from 'reactstrap'

const Layout = (props) => (
  <div>
    <Header />
    <Container>
      {props.children}
    </Container>
  </div>
)

export default Layout
