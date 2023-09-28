import React, {Component} from 'react';
import '../../App.css';
import Particle from "../styles/Particle";
class MissingPage extends Component {
    render() {
        return (
                <div>
                    <div className="bg-image" >
                        <div className="center-blur">
                            <div className="central-body">
                                <h5 className={"error-image" }>404</h5>
                                <a href="/" className="btn-go-home" >GO BACK HOME</a>
                            </div>
                        </div>
                    </div>
                    <Particle/>
                </div>
        );
    }
}

export default MissingPage;