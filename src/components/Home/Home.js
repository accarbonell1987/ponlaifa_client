import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      videos: []
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4000/api/videos');
      const data = await response.json();
      this.setState({ videos: [...data] });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="App-header">
        <div className="container">
          <div className="row">
            {this.state.videos.map((video) => (
              <div className="col-md-4" key={video._id}>
                <Link to={`/player/${video._id}`}>
                  <div className="card border-0">
                    {console.log(video.poster)}
                    <img src={`http://localhost:4000/api/${video.poster}`} alt={video.name} />
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
