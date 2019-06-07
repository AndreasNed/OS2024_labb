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
    this.closeModal = this.closeModal.bind(this);
    this.handleDeleteRoute = this.handleDeleteRoute.bind(this);
  }

  componentDidMount() {
    Modal.setAppElement('body');
 }

  async openModal() {
    this.setState({ modalIsOpen: true });
    const response = await fetch(`http://localhost:3000/os2024back/webresources/savedtravelentity/getall/${localStorage.getItem("userId")}`);
    if (!response.ok) { return null }
    const savedRoutes = await response.json();
    this.setState({ savedRoutes })
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

   async handleDeleteRoute (event) {
    const id = event.target.value;
    await fetch("http://localhost:3000/os2024back/webresources/savedtravelentity/delete/"+id);
    notify.show("Route has been deleted from your list!", "error", 3000)
    this.openModal();
  }

  render() {
    const savedRoutes = this.state.savedRoutes;
    const showSavedRoutes = savedRoutes.map((route, index) =>
      <div key={index} className="savedRoutesListContainer">
          <div className="savedListFrom"> <strong>{index + 1}: <Trans>From</Trans>:</strong> {route.origin}</div>
          <div className="savedListTo"> <strong><Trans>To</Trans>:</strong> {route.destination}</div>
          <div className="savedListDistance"><i className="fas fa-road fa-2x" ></i>: {route.distance}</div>
          <div className="savedListDuration"><i className="far fa-clock fa-2x"></i>: {route.duration}</div>
          <div className="savedListPrice"><i className="far fa-money-bill-alt fa-2x"></i>: {route.price}</div>
          <div className="savedListTransport">
              {route.transport.toUpperCase().includes("DRIVE") ? <i className="fas fa-car"></i> : null}
              {route.transport.toUpperCase().includes("FLY") ? <i className="fas fa-plane"></i> : null}
              {route.transport.toUpperCase().includes("BUS") ? <i className="fas fa-bus"></i> : null}
              {route.transport.toUpperCase().includes("TRAIN") ? <i className="fas fa-train"></i> : null}
            </div >
        <button className="deleteRouteButton delete-glow" value={route.id} onClick={this.handleDeleteRoute}></button>
        <div className="shareSavedRoute">
          <FacebookShareButton className="shareButton shareBtn" value={route.id} url={`http://localhost:3000/${route.origin}/${route.destination}`.replace(/ /gi, "%20").replace(/,/gi, "")} children={<FacebookIcon size={32} round={true} />} />
          <TwitterShareButton className="shareButton shareBtn" title={"Look at this awesome trip!\n"} url={`http://localhost:3000/${route.origin}/${route.destination}`.replace(/ /gi, "%20").replace(/,/gi, "")} children={<TwitterIcon size={32} round={true} />} />
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