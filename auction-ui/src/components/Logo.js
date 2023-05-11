import React, { Component } from 'react'
import { SITE_LOGO, SITE_NAME } from '../services/Constants'

export default class Logo extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <div
            className='d-flex justify-content-center align-items-center'
            style={{ marginBottom: this.props.marginBtm }}
         >
            <img
               className='mb-2'
               src={SITE_LOGO}
               alt='{SITE_NAME}'
               width=''
               height='60'
               style={{ marginRight: '15px' }}
            />
            <h3>
               <b>NFT Chain</b>
            </h3>
         </div>
      )
   }
}
