import Header from './Header'
import { Container } from 'reactstrap'
import withData from '../lib/withData'

const Layout = (props) => (
  <div>
    <Header />
    <Container>
      {props.children}
    </Container>
  </div>
)

export default withData(Layout);
