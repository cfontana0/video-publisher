import React, { Component } from 'react'
import Styles from '../styles/index.less'

export default class App extends Component {
  constructor (props) {
    super(props)
    document.title = 'Video Publisher'
  }

  render () {
    let children = null
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth // sends auth instance from route to children
      })
    }

    return (
        <div>
            { children }
        </div>
    )
  }
}
