import React from "react";
import { connect } from "react-redux";
import ReservationList from "./reservation_list";

import { toggleShowClientNav, signOut } from "../../action";

function ClientNav({ toggleShowClientNav, client, signOut }) {
  if (!client) return null;

  return (
    <div id="client_nav">
      <h2>{client.name || "name is missing"}</h2>

      <ul className="client_info">
        <li> {client.signUpDate && `Registered: ${client.signUpDate.slice(0, 10)}`}</li>
        <li> {`Phone: +${client.phone}`}</li>
      </ul>

      <ReservationList reservationList={client.reservationList} />

      <button className="client_return_btn" onClick={toggleShowClientNav}>
        ← Back To Booking
      </button>
      <button className="client_sign_out_btn" onClick={signOut}>
        Sign Out
      </button>
    </div>
  );
}

const mapStateToProps = (store) => ({
  client: store.client,
});

const mapDispatchToProps = (dispatch) => ({
  toggleShowClientNav: () => dispatch(toggleShowClientNav()),
  signOut: () => dispatch(signOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientNav);
