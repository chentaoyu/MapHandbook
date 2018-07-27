import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmap'

class App extends Component {
  
  constructor(){
    super()
    // this.create = this.create.bind(this)
  }
  state = {
    show:false,
    markers : [
      {
          lng: 116.402544,
          lat: 39.928216,
          title:'中国中国中国',
          show:true
      },
      {
          lng: 83.430831,
          lat: 39.711366,
          title:'中国中国中国',
          show:false
      },
    ]
  }
  zoomstart(event) {
    let zoom = event.target.getZoom()
    if (zoom == 3) {
      this.setState({
        show: true
      })
    }else{
      this.setState({
        show: false
      })
    }
  }
  toFixedNum(num, s) {
    var times = Math.pow(10, s)
    var des = num * times + 0.5
    des = parseInt(des, 10) / times
    return des + ''
}
  render() {
    const mapStyle ={
      styleJson:[{
        "featureType": "all",
        "elementType": "all",
        "stylers": {}
      },
      {
        "featureType": "land",
        "elementType": "all",
        "stylers": {
          "color": "#9c7c1aff"
        }
      },
      {
        "featureType": "water",
        "elementType": "all",
        "stylers": {
          "color": "#cdbb80ff"
        }
      },
      {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": {
          "visibility": "off"
        }
      },
      {
        "featureType": "boundary",
        "elementType": "geometry",
        "stylers": {
          "color": "#9c7c1aff"
        }
      },
      {
        "featureType": "road",
        "elementType": "all",
        "stylers": {
                  "visibility": "off"
        }
}
    ]
    } 
    const show = this.state.show
    const newMarker = this.state.newMarker
    const markers = this.state.markers
    return (
    <Map 
    events = {
      {
        zoomstart: this.zoomstart.bind(this)
      }
    }
    style = {
      "height:100%"
    }
    mapStyle = {
      mapStyle
    }
    minZoom = {
      1
    }
    maxZoom = {
      6
    }
    center = {
      {
        lng: 105.403119,
        lat: 38.028658
      }
    }
    zoom = "1"
      >
       <NavigationControl /> 
      {
        show?
        markers.map((marker, index) => {
                var icon = "red" + (index + 1);
                let order = index + 100;
                let updown = index / 2 ? '-' : '';
                let active = false;
                let leftStyle = null;
                if (index % 3 == 0) {
                  leftStyle = {
                    background: 'blue'
                  }
                } else if (index % 3 == 1) {
                  active = true;
                }
                let ran = Math.random() * 100;
                let rn = this.toFixedNum(ran, 2);
                let rate = updown + rn + '%'
                let num = rn;
                let name = '测试' + order;
                return    ( 
                  !marker.show?  
                <Marker 
                style={!show?"display:none":""}
                events = {
                  {
                    click: (event)=>{
                      marker.show = true;
                      markers[index] = marker
                      this.setState({
                        markers
                      })
                    }
                  }
                }
                key = { index }
                map = { this.props.map }
                icon = { icon }
                position = {
                  {
                    lng: marker.lng,
                    lat: marker.lat
                  }
                } { ...marker}
                />:<Marker
                key = {
                  order
                }
                type = {
                  'order_tip'
                }
                  active = {active}
                  leftStyle = {leftStyle}
                  map = {this.props.map}
                  // rightModule={<div>hello</div>}
                  position = {marker}
                  name = {name}
                  num = {num}
                  rate = {rate}
                  order = { order}/>
              )
            }):''
          }
             {/* <CustomControl /> */}
     </Map>
    );
  }
}

export default App;
