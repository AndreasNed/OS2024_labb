import React from 'react'
import '../style/App.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class MySavedModal extends React.Component {

    constructor(props) {
        super();
    
        this.state = {
          modalIsOpen: false,
          savedRoutes: []
        };
    
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }
    
      async openModal() {
        this.setState({modalIsOpen: true});
        const response = await fetch(`os2024back/webresources/savedtravelentity/getall/${localStorage.getItem("userId")}`);
        if (!response.ok){ return null}
        const savedRoutes = await response.json();
        console.log(savedRoutes)
        this.setState({savedRoutes})
      }
    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }



    render() {

      const savedRoutes = this.state.savedRoutes;
      const showSavedRoutes = savedRoutes.map((route, index) => <div>{index+1}: Origin: {route.origin} 
      <span> Destination: {route.destination}</span>  
      <span> Distance: {route.distance}</span>   
      <span> Total Duration: {route.duration}</span>
      <span> Price: {route.price}</span>
      <span> Transport: {route.transport}</span>
       </div>)

        return (

        <div>
          <button onClick={this.openModal}>My Saved Routes</button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
          <button onClick={this.closeModal}>close</button>
          {showSavedRoutes}
        </Modal>
      </div>


        )
    }
}