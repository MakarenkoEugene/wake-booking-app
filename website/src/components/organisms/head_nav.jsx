import React from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";

export default function HeadNav() {
  return (
    <nav id="nav_head">
      <Link to="/" id="logo">
        {"Logo"}
      </Link>
      
      <ul>
        <li>
          <Link to="/docs/">{"Docs"}</Link>
        </li>
        <li>
          <Link to="/profile/">{"Profile"}</Link>
        </li>
      </ul>
    </nav>
  );
}

// export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
