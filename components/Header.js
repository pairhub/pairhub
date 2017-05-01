import Link from 'next/link'
import Head from 'next/head'
import { Navbar, Container, NavbarBrand, Nav, NavItem } from 'reactstrap'

const Header = () => (
  <div>
    <Head>
      <title>PairHub</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
    </Head>

    <Navbar color="faded" light toggleable style={{padding: '0px', marginBottom: '50px'}}>
      <Container>
        <NavbarBrand tag={Link} href="/">
          <a><img src="/static/pairhub-logo.png" width="50" height="50" /></a>
        </NavbarBrand>
        <Nav navbar>
          <NavItem>
            <Link href="/about"><a className="nav-link">About</a></Link>
          </NavItem>
        </Nav>
        <Nav navbar className="ml-auto">
          {/* {this.props.authenticated ? <NavAuthenticatedUser /> : <NavLoginButton />} */}

        </Nav>
      </Container>
    </Navbar>
  </div>
)

export default Header
