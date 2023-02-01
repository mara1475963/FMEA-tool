import React from "react";
import { useDispatch } from "react-redux";
import { fetchFMEAData } from "../../store/fmea/fmea.actions";
import "./navigation.css";

const Navigation = () => {
  const dispatch = useDispatch();
  const createNewFMEA = (type) => {
    console.log(type);
    dispatch(fetchFMEAData(type));
  };

  return (
    <div className="navigation grid-item">
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
        style={{ height: 30 }}
      >
        <div className="container-fluid">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                File
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    New FMEA &raquo;
                  </a>
                  <ul className="dropdown-menu dropdown-submenu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => createNewFMEA("DFMEA")}
                      >
                        DFMEA
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => createNewFMEA("PFMEA")}
                      >
                        PFMEA
                      </a>
                    </li>
                  </ul>
                  <li>
                    <a className="dropdown-item" href="#">
                      Save
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      About
                    </a>
                  </li>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
