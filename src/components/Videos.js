import React, { Component, PropTypes } from 'react'
import { http } from '../utils/Request'
import getVideoId from 'get-video-id'
import shortid from 'shortid'


export default class Videos extends Component {

  static contextTypes = {
      router: PropTypes.object
  }

  componentWillMount () {
    this.state = {
      url: "",
      key: "AIzaSyB5p_-mp1GIEQ491TnFbZNflp69s5opuzs",
      selected: null,
      videos: [],
      error: "",
      overlay: false
    } 

    const sesToken = window.localStorage.getItem("sesToken");

    if (!sesToken || sesToken === null) {
      return this.context.router.push('/')
    }

    this.state.user = sesToken

    const getVideos = () => {
      http({url: `http://ec2-13-58-224-185.us-east-2.compute.amazonaws.com:10009/videos?username=${this.state.user}`,
        method: 'GET'
      }).then((response) => {
        if (response.status === 200) {
          if (response && response.body) {
            const videos = response.body.reverse() 
            this.setState({videos, selected: videos[0].id})
          } 
        } 
      }).catch((e) => {})
    }
    getVideos()
  }

  render () {
    const importVideo = () => {
      const vid = getVideoId(this.state.url)

      if (vid && vid.id) {
        http({url: `https://www.googleapis.com/youtube/v3/videos?id=${vid.id}&key=${this.state.key}&part=snippet`,
          method: 'GET'
        }).then((response) => {
          if (response.status === 200) {
            this.setState({selected: vid.id})
            const videos = this.state.videos
            postVideo(vid.id)
            videos.unshift({id: vid.id})
            this.setState({videos})
          }  else {
            this.setState({error: "The provided url is invalid."})
          }
        }).catch((e) => {
          this.setState({error: "The provided url is invalid."})
        })
      } else {
        this.setState({error: "The provided url is invalid."})
      }
    }

    const logout = () => {
      window.localStorage.clear();
      return this.context.router.push('/')
    }

    const send = (id) => {
      const body = {
          url: `https://www.youtube.com/watch?v=${id}`, 
          username: this.state.user, 
          contributor: shortid.generate()
      }
      http({url: `https://requestb.in/t6u8j9t6`, method: 'POST', body, mode: 'no-cors'})
      .then((response) => {
        this.setState({overlay: true})
      }).catch((e) => {})
    }

    const postVideo = (id) => {
        const body = {owner: this.state.user, id}
        http({url: `http://ec2-13-58-224-185.us-east-2.compute.amazonaws.com:10009/videos`,method: 'POST', body})
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
          }  else {
            console.log("error")
          }
        }).catch((e) => {})
    }

    const VideoComponent = this.state.videos.map((v,i) => {
      return (
        <div key={i} onClick={() => { this.setState({selected: v.id}) }} className='video' style={{backgroundImage: `url(https://img.youtube.com/vi/${v.id}/0.jpg)`}}>
          <button onClick={() => send(v.id) } className='sendMoney'>Send $ with PopChest</button>
        </div>
      )
    })

    return (
      <div className='videos'>
        <div className='container'>

          { this.state.overlay &&
            <div className='overlay'>
              <div className='modal'>
                <div className='title'>Congratulations</div>
                <div className='modalBody'>$ Sent with PopChest</div>
                <button onClick={() => { this.setState({overlay: false}) }} className='floatBtn'>Ok</button>
              </div>
            </div>
          }

          <div className='head'>
            <button onClick={() => logout()}>Logout</button>
          </div>

          <div className='center'>

            <div className="sectionTitle">
              <span>Add new video</span>
            </div>

            <input value={this.state.url} onChange={(e) => { this.setState({url: e.target.value}) }} type='text' className='grabber' placeholder='Write a youtube video url'/>
            <button onClick={() => { importVideo() }} className='importBtn'>Import</button>

            { this.state.error && <div className='errorCont'><label>{`${this.state.error}`}</label></div>}

            <div className="sectionTitle">
              <span>Your videos</span>
            </div>

            { this.state.videos.length === 0 &&
              <span className="noVideos">There are no videos yet.</span>
            }

            { this.state.selected && this.state.selected !== null &&
              <div className='lastContainer'>
                <div className='lastVideo'>
                  <iframe width="600" height="400" src={`https://www.youtube.com/embed/${this.state.selected}?autoplay=0`}></iframe>
                  <button onClick={() => send(this.state.selected) } className='sendMoney'>Send $ with PopChest</button>
                </div>
              </div>
            }

            <div className='gridContainer'>
              {VideoComponent}
            </div>

          </div>

        </div>
      </div>

    )
  }
}
