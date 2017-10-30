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
    render(){
        const { nome, changeInput, email, form } = this.props
        return (
        <div className='container'>
            <input id='nome' type="text" name='nome' onChange={changeInput} value={nome}/> <br/>
            <input type="text" name='email' onChange={changeInput} value={email}/>
            
            <h2>Nome: {nome}</h2><br/>
            <h2>Email: {email}</h2>
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