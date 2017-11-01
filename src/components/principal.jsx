import React, {Component} from 'react'
import {  withScriptjs,GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import { changeInput, changeFirebase } from './principalActions'

import { database } from '../services/firebase'
class Principal extends Component{ 
    
    constructor(props){
        super(props)
        this.state ={
            markers:[{
                position:{
                    lat:-16.0138654,
                    lng:-48.0614447,
                    address:"Minha casa"
                }
            }],
            mensagemErro:""
        }
        database.ref("positions").on('value', data=>{
            // this.setState({...this.state, markers:[{}]})
            let markers = []
            data.forEach((position)=> {
                const {lat, lng, address} = position.val().position;
                markers.push({position:{lat:Number(lat), lng:Number(lng), address}});
            });
            this.setState({
                ...this.state, 
                markers:markers
            })
        })
    }
    getAtualLocation(){
        navigator.geolocation.getCurrentPosition(success=>{
            this.setState({   
                ...this.state,
                    markers:this.state.markers.concat({position:{lat:success.coords.latitude, lng:success.coords.longitude}}),
                })
        }, err=>{
            this.setState({mensagemErro:err})
            console.log(err)
            setTimeout(()=>{
              this.setState({mensagemErro:""})  
            },3000)
        })

    }
    render(){
        const { nome, changeInput, email, form } = this.props
        return (
        <div className='container'>

            <button className="btn btn-default" onClick={()=>this.getAtualLocation()}>Minha localização</button> 
            <p style={{color:'red'}}>{this.state.mensagemErro.message}</p>
            <Map 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLZ_Y-mXEK51keuawkneoXzmilUabHjQc"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                markers={this.state.markers}
                >
               
            </Map>
        </div>
        )
    }
}


const image = require('../../static/images/map-marker-outline.svg')

class Mapa extends Component{
    geoCode
    constructor(props){
        super(props)
        this.addMarker = this.addMarker.bind(this);
        this.state ={
            marker:[],
            certer:{
                position:{
                    lat:-16.0138654,
                    lng:-48.0614447
                }
            }
        }
        this.goToMarker = this.goToMarker.bind(this)
        this.geoCode = new google.maps.Geocoder()
    }
    goToMarker(position){
        this.setState({certer:{position}})
    }
    addMarker(e, map){
        this.geoCode.geocode({'location':{lat:e.latLng.lat(), lng:e.latLng.lng()}}, (result, status)=>{
            database.ref('positions').push({position:{lat:e.latLng.lat(), lng:e.latLng.lng(), address:result[0].formatted_address}})
        })
    }

    render(){
        let map = (
            <GoogleMap
            defaultZoom={16}
            center={this.state.certer.position}
            onDblClick={(e)=>this.addMarker(e, map)}
            options={{disableDoubleClickZoom: true,
            styles:style}}
            >
            {this.props.markers.map((marker, index)=>(
                <Marker key={index} 
                position={marker.position} 
                defaultTitle="minha casa"
                icon={{url:image}}
                animation={google.maps.Animation.Ro}
                >
                {
                <div>
                    <img src={image}/>
                    <button className="btn btn-default" onClick={()=>this.goToMarker(marker.position)}>{marker.position.address}</button>
                </div>
                }
                </Marker>
            ))
            }
            </GoogleMap>

        )
        return map
    }
}

const Map = withScriptjs(withGoogleMap(Mapa))


const mapStateToProps = state => ({
        nome : state.teste.nome,
        email: state.teste.email
    })
const mapDispachToProps = dispatch => bindActionCreators({changeInput}, dispatch)
Principal.propTypes = {
    nome:PropTypes.string
}
export default connect(mapStateToProps, mapDispachToProps)(Principal)
const style = [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
