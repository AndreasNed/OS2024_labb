import React from 'react'
import '../style/App.css';
import Modal from 'react-modal';
import { Trans } from "@lingui/macro"

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
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
    this.handleDeleteRoute = this.handleDeleteRoute.bind(this);
  }

  async openModal() {
    this.setState({ modalIsOpen: true });
    const response = await fetch(`os2024back/webresources/savedtravelentity/getall/${localStorage.getItem("userId")}`);
    if (!response.ok) { return null }
    const savedRoutes = await response.json();
    console.log(savedRoutes)
    this.setState({ savedRoutes })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

   async handleDeleteRoute (event) {
    const id = event.target.value;
    await fetch("os2024back/webresources/savedtravelentity/delete/"+id);
    this.openModal();
  }

  render() {
    const savedRoutes = this.state.savedRoutes;
    const showSavedRoutes = savedRoutes.map((route, index) =>
      <div className="savedRoutesList">{index + 1}: <Trans>Origin</Trans>: {route.origin}
        <span> <Trans>Destination</Trans>: {route.destination}</span>
        <span> <Trans>Distance</Trans>: {route.distance}</span>
        <span> <Trans>Total Duration</Trans>: {route.duration}</span>
        <span> <Trans>Price</Trans>: {route.price}</span>
        <span> <Trans>Transport</Trans>: {route.transport}</span>
        <button className="deleteRoute glow-button" value={route.id} onClick={this.handleDeleteRoute}><Trans>Remove from list</Trans></button>
      </div>)

    return (
      <div>
        <button className="savedModalButton glow-button" onClick={this.openModal}><Trans>My Saved Routes</Trans></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="savedRoutesModal">
          <button className="savedModalButton glow-button" onClick={this.closeModal}><Trans>Close</Trans></button>
          {showSavedRoutes}
          </div>
        </Modal>
      </div>
    )
  }
}