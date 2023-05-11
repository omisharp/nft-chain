import React, { Component } from 'react'
import $ from 'jquery'

import moment from 'moment'

import { SpinnerButton } from './Spinner.js'

import AuctionService from '../services/Auctions.js'
import { REQUESTDATE_FORMAT } from '../services/Constants.js'
import { toast } from 'react-toastify'
import validator from 'validator'

class SubmitArtworkAuction extends Component {
   constructor(props) {
      super(props)

      this.auctions = new AuctionService()

      this.state = {
         auction: {
            requestDate: moment().format(REQUESTDATE_FORMAT),
            auctionHouseID: '',
         },
         isLoading: false,
      }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
   }

   componentDidMount() {
      $('#submitArtworkModal').on('hidden.bs.modal', function (event) {
         document.getElementById('formSubmitArtWork').reset()
      })
   }

   handleChange(event) {
      const target = event.target
      const value = target.value
      const name = target.name
      let auction = { ...this.state.auction }
      auction[name] = validator.escape(value)
      this.setState({ auction })
   }

   handleSubmit(event) {
      event.preventDefault()
      let auctionRequest = { ...this.state.auction }

      auctionRequest['nftId'] = this.props.nftID
      ;(auctionRequest['aesKey'] = this.props.selectedNft.aesKey),
         this.setState({ isLoading: true })
      this.auctions
         .createAuctionRequest(auctionRequest)
         .then(response => {
            this.setState({ isLoading: false })
            $('#submitArtworkModal').modal('hide')
            this.props.updateArtwork()

            toast.dismiss()
            toast.success(
               'Tác phẩm NFT đã được đăng ký với nhà đấu giá thành công!'
            )
            document.getElementById('formSubmitArtWork').reset()
         })
         .catch(err => {
            this.setState({ isLoading: false })
            document.getElementById('formSubmitArtWork').reset()
            toast.dismiss()
            toast.error('Nhà đấu giá không tồn tại!')
         })
   }

   renderContent() {
      return (
         <form id='formSubmitArtWork' onSubmit={this.handleSubmit}>
            <div className='mb-3'>
               <label htmlFor='auctionHouseID'>Nhà đấu giá</label>
               <input
                  className='form-control'
                  type='text'
                  name='auctionHouseID'
                  placeholder=''
                  onChange={this.handleChange}
                  required
               />
            </div>
            <div className='mb-3'>
               <label htmlFor='buytItNowPrice'>
                  Giá <b>Mua Ngay</b>
               </label>
               <div className='input-group'>
                  <div className='input-group-prepend'>
                     <span className='input-group-text'>$</span>
                  </div>
                  <input
                     className='form-control'
                     type='number'
                     name='buyItNowPrice'
                     placeholder=''
                     onChange={this.handleChange}
                     required
                  />
               </div>
            </div>
            <div className='mb-3'>
               <label htmlFor='reservePrice'>Giá khởi điểm</label>
               <div className='input-group'>
                  <div className='input-group-prepend'>
                     <span className='input-group-text'>$</span>
                  </div>
                  <input
                     className='form-control'
                     type='number'
                     name='reservePrice'
                     max={this.state.auction.buyItNowPrice}
                     placeholder=''
                     onChange={this.handleChange}
                     required
                  />
               </div>
            </div>
            <button
               type='submit'
               className='btn btn-primary mt-2'
               disabled={this.state.isLoading}
            >
               Đăng ký
               {this.state.isLoading && <SpinnerButton />}
            </button>
         </form>
      )
   }

   render() {
      let { itemDetail } = { ...this.props['item'] }
      return (
         <div
            id='submitArtworkModal'
            className='modal fade submit-artwork-auction-modal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='submitArtwork'
            aria-hidden='true'
         >
            <div className='modal-dialog modal-lg'>
               <div className='modal-content'>
                  <div className='modal-header'>
                     <h5 className='modal-title'>
                        Đăng ký tác phẩm &quot;{itemDetail} -{' '}
                        <small className='text-muted'>{this.props.nftID}</small>
                        &quot; để đấu giá
                     </h5>

                     <button
                        type='button'
                        className='close'
                        data-dismiss='modal'
                        aria-label='Close'
                     >
                        <span aria-hidden='true'>&times;</span>
                     </button>
                  </div>
                  <div className='modal-body'>
                     <div className='container-fluid'>
                        {this.renderContent()}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      )
   }
}

export default SubmitArtworkAuction
