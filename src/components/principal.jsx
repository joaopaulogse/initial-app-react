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
                    lng:-48.0614247
                }
            }]
        }
        navigator.geolocation.getCurrentPosition(success=>{
            this.setState({   
                    markers:[...this.state, ...{position:{lat:success.coords.latitude, lng:success.coords.longitude}}]
                })
        })
        // this.setState({   
        //         markers:[...this.state, ...{position:{lat:-16.013872,lng:-48.061423}} ]
        //     })
    }
        
    render(){
        const { nome, changeInput, email, form } = this.props
        return (
        <div className='container'>
            <Map isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLZ_Y-mXEK51keuawkneoXzmilUabHjQc"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                markers={this.state.markers}>
               
            </Map>
            
        </div>
        )
    }
}

const mapStateToProps = state => ({
        nome : state.teste.nome,
        email: state.teste.email
    })
const mapDispachToProps = dispatch => bindActionCreators({changeInput}, dispatch)
Principal.propTypes = {
    nome:PropTypes.string
}

const Map = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
    defaultZoom={8}
    defaultCenter={props.markers[0].position}
    >
    {props.isMarkerShown && props.markers.map((marker, index)=>(
        <Marker key={index} position={marker.position}/>
    ))}
    </GoogleMap>
))

export default connect(mapStateToProps, mapDispachToProps)(Principal)