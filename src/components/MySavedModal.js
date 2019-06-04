import React from 'react'
import '../style/App.css';
import Modal from 'react-modal';
import { Trans } from "@lingui/macro"
import Notifications, { notify } from 'react-notify-toast';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px'
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
    console.log("VALUE ÄR ", event.target)
    const id = event.target.value;
    await fetch("os2024back/webresources/savedtravelentity/delete/"+id);
    notify.show("Route has been deleted from your list!", "error", 3000)
    this.openModal();
  }

  render() {
    const savedRoutes = this.state.savedRoutes;
    const showSavedRoutes = savedRoutes.map((route, index) =>
      <div className="savedRoutesListContainer">
        <div className="savedRouteCard">
          <span> {index + 1}: <Trans>Origin</Trans>: {route.origin}</span>
          <span> <Trans>Destination</Trans>: {route.destination}</span>
          <span> <Trans>Distance</Trans>: {route.distance}</span>
          <span> <Trans>Total Duration</Trans>: {route.duration}</span>
          <span> <Trans>Price</Trans>: {route.price}</span>
          <span> <Trans>Transport</Trans>: {route.transport}</span>
        </div>
        <button className="deleteRouteButton delete-glow" value={route.id} onClick={this.handleDeleteRoute}>
        </button>
      </div>)

    return (
      <div>
        <Notifications options={{ top: '120px' }} />
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