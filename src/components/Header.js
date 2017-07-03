import { Component } from 'react'

export default class Header extends Component {
  render () {
    return (
      <header className='row header'>
        <IndexLink to='/about' className='header__tab' activeClassName='active' >
          <p>ABOUT</p>
        </IndexLink>

        <Link to='/blog' className='header__tab' activeClassName='active' >
          <p>BLOG</p>
        </Link>
      </header>
    )
  }
}
