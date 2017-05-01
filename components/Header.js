import Link from 'next/link'
import Head from 'next/head'
import { Navbar, Container, NavbarBrand, Nav, NavItem, Button } from 'reactstrap'

const Header = () => (
  <div>
    <Head>
      <title>PairHub</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Find remote pair programming buddies" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
      <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />
      <script src="https://use.fontawesome.com/49ef5fd256.js"></script>
      <style>{`
        .btn-secondary {
          color: #0000ff;
          border-color: #0000ff;
          cursor: pointer;
        }
        .btn-secondary:hover {
          color: white;
          border-color: #0000ff;
          background-color: #0000ff;
        }
      `}</style>
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
          <NavItem><Button><i className="fa fa-github" aria-hidden="true"></i> Log in with GitHub</Button></NavItem>

        </Nav>
      </Container>
    </Navbar>
  </div>
)

export default Header
