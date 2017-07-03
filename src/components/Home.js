import React, { Component } from 'react'

export default class Home extends Component {
  componentWillMount () {
    this.state = { }
    this.onClick = this.onClick.bind(this)
  }

  onClick () {
    console.log('onClick')
  }

  render () {
    return (
      <div className='home'>
        <span>hola!</span>
      </div>
    )
  }
}
