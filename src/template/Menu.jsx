import React from 'react'

export default props=>(
    <div role='form' className='navbar navbar-inverse bg-inverse'>
        <div className=''>
            <a href="#" className='navbar-brand'>
                <i className='fa fa-tachometer'></i>
            </a>
        </div>
        <div className='navbar-collapse collapse'>
            <ul className="nav navbar-nav">
                <li><a href="#/main">Principal</a></li>
                <li><a href="#/about">About</a></li>
            </ul>
        </div>
    </div>
)