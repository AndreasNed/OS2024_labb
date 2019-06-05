import React from 'react'
import '../style/App.css';
import Modal from 'react-modal';
import { Trans } from "@lingui/macro"
import Notifications, { notify } from 'react-notify-toast';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

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

  componentDidMount() {
    Modal.setAppElement('body');
 }

  async openModal() {
    this.setState({ modalIsOpen: true });
    const response = await fetch(`os2024back/webresources/savedtravelentity/getall/${localStorage.getItem("userId")}`);
    if (!response.ok) { return null }
    const savedRoutes = await response.json();
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
    notify.show("Route has been deleted from your list!", "error", 3000)
    this.openModal();
  }

  shareUrl(event) {
    const processenvREACT_APP_URL = "localhost:3000"
    const id = event.target.value;
    const route = fetch("os2024back/webresources/savedtravelentity/" + id);
    console.log("HÄR ÄR VI!", id)
    return `http://${processenvREACT_APP_URL}/${route.origin}/${route.destination}`.replace(/ /gi, "%20").replace(/,/gi, "")
  }

  render() {
    const savedRoutes = this.state.savedRoutes;
    const showSavedRoutes = savedRoutes.map((route, index) =>
      <div key={index} className="savedRoutesListContainer">
        <div className="savedRouteCard">
          <span> {index + 1}: <Trans>Origin</Trans>: {route.origin}</span>
          <span> <Trans>Destination</Trans>: {route.destination}</span>
          <span> <Trans>Distance</Trans>: {route.distance}</span>
          <span> <Trans>Total Duration</Trans>: {route.duration}</span>
          <span> <Trans>Price</Trans>: {route.price}</span>
          <span> <Trans>Transport</Trans>: {route.transport}</span>
        </div>
        <button className="deleteRouteButton delete-glow" value={route.id} onClick={this.handleDeleteRoute}></button>
        <div className="shareSavedRoute">
          <FacebookShareButton className="shareButton shareBtn" value={route.id} url="URL" children={<FacebookIcon size={32} round={true} />} />
          <TwitterShareButton className="shareButton shareBtn" value={route.id} url="URL" children={<TwitterIcon size={32} round={true} />} />
        </div>
      </div>)

    return (
      <div>
        <Notifications options={{ top: '120px' }} />
        <button className="savedModalButton glow-button" onClick={this.openModal}><i className="fas fa-ticket-alt"></i></button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="savedRoutesModal">
          <button className="closeModalButton glow-button" onClick={this.closeModal}><Trans>Close</Trans></button>
          {showSavedRoutes}
          </div>
        </Modal>
      </div>
    )
  }
}