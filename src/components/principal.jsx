import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {  Field, reduxForm } from 'redux-form'
import PropTypes from 'prop-types'

import {changeInput, changeFirebase} from './principalActions'

import { database } from '../services/firebase'
class Principal extends Component{ 
    
    constructor(props){
        super(props)
    }
    componentDidMount(){
        var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
        var mapOptions = {
        zoom: 4,
        center: myLatlng
        }
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title:"Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
                
    }
    
    render(){
        const { nome, changeInput, email, form } = this.props
        return (
        <div className='container'>
            <div id="map"></div>
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


export default connect(mapStateToProps, mapDispachToProps)(Principal)