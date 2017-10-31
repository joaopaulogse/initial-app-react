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
                    lng:-48.0614447
                }
            }],
            mensagemErro:""
        }
        database.ref("positions").on('value', data=>{
            // this.setState({...this.state, markers:[{}]})
            let markers = []
            data.forEach((position)=> {
                const {lat, lng} = position.val().position;
                markers.push({position:{lat:Number(lat), lng:Number(lng)}});
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

            <button onClick={()=>this.getAtualLocation()}>Minha localização</button> 
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


const image = require('../../static/images/map-marker-radius.png')

class Mapa extends Component{

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
    }
    goToMarker(position){
        console.log(position)
        this.setState({certer:{position}})
    }
    addMarker(e, map){

        database.ref('positions').push({position:{lat:e.latLng.lat(), lng:e.latLng.lng()}}).then((a)=>{
        })
        console.log(e)
        console.log(e.latLng.lat(), e.latLng.lng())
    }

    render(){
        let map = (
            <GoogleMap
            defaultZoom={16}
            center={this.state.certer.position}
            onClick={(e)=>this.addMarker(e, map)}
            >
            {this.props.markers.map((marker, index)=>(
                <Marker key={index} 
                position={marker.position} 
                defaultTitle="minha casa"
                icon={{url:image}}
                >
                {
                <div>
                    <img src={image}/>
                    <button onClick={()=>this.goToMarker(marker.position)}>{marker.position.lat}, {marker.position.lng}</button>
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