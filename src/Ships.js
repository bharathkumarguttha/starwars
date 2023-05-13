import React from "react";
import { findMaxFeaturedShipNames } from "./utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import "./Ships.scss";

export default function Ships({ ships }) {
    const maxFeaturedShipNames = findMaxFeaturedShipNames(ships);
    console.log("max faetured names are");
    console.log(maxFeaturedShipNames)
    return (
        <div className="ship-container">
            {ships.map(ship => (
                <div key={ship.name} className="ship-details">
                    <div className="ship-name">
                        <p>{ship.name}
                            {maxFeaturedShipNames.includes(ship.name) && <FontAwesomeIcon icon={faTrophy} />}</p>
                    </div>
                    <div className="ship-info-wrapper">
                        <div className="ship-model-wrapper">
                            <p>Model</p>
                            <p>{ship.model}</p>
                        </div>
                        <div className="ship-film-wrapper">
                            <p>Number of films</p>
                            <p>{ship.films.length}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}