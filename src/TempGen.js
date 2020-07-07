import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand } from 'reactstrap';
import "./Generator.css"

const initialState = {
    toptext: "",
    bottomtext: "",
    isTopDragging: false,
    isBottomDragging: false,
    topY: "10%",
    topX: "50%",
    bottomX: "50%",
    bottomY: "90%"
}

class TempGen extends Component {

    constructor() {
        super();
        this.state = {
            currentImage: "",
            modalIsOpen: false,
            currentImagebase64: null,
            ...initialState
        };
    }

    getStateObj = (e, type) => {
        let rect = this.imageRef.getBoundingClientRect();
        const xOffset = e.clientX - rect.left;
        const yOffset = e.clientY - rect.top;
        let stateObj = {};
        if (type === "bottom") {
            stateObj = {
                isBottomDragging: true,
                isTopDragging: false,
                bottomX: `${xOffset}px`,
                bottomY: `${yOffset}px`
            }
        } else if (type === "top") {
            stateObj = {
                isTopDragging: true,
                isBottomDragging: false,
                topX: `${xOffset}px`,
                topY: `${yOffset}px`
            }
        }
        return stateObj;
    }

    changeText = (event) => {
        this.setState({
            [event.currentTarget.name]: event.currentTarget.value
        });
    }

    handleMouseDown = (e, type) => {
        const stateObj = this.getStateObj(e, type);
        document.addEventListener('mousemove', (event) => this.handleMouseMove(event, type));
        this.setState({
            ...stateObj
        })
    }

    handleMouseMove = (e, type) => {
        if (this.state.isTopDragging || this.state.isBottomDragging) {
            let stateObj = {};
            if (type === "bottom" && this.state.isBottomDragging) {
                stateObj = this.getStateObj(e, type);
            } else if (type === "top" && this.state.isTopDragging) {
                stateObj = this.getStateObj(e, type);
            }
            this.setState({
                ...stateObj
            });
        }
    };

    handleMouseUp = (event) => {
        document.removeEventListener('mousemove', this.handleMouseMove);
        this.setState({
            isTopDragging: false,
            isBottomDragging: false
        });
    }

    render() {
        const image = this.props.meme;
        let newWidth = image.width;
        let newHeight = image.height;
        const textStyle = {
            fontFamily: "Impact",
            fontSize: "50px",
            textTransform: "uppercase",
            fill: "#FFF",
            stroke: "#000",
            userSelect: "none"
        }
        
        return (
            <div className="main-content">
                <div className="meme-gen-modal" >
                    <svg id="svg_ref"
                        ref={el => { this.svgRef = el }}
                        height={newHeight}
                        width={newWidth}>

                        <image
                            ref={el => { this.imageRef = el }}
                            xlinkHref={this.props.meme.url}
                            height={newHeight}
                            width={newWidth}
                        />

                        <text
                            style={{ ...textStyle, zIndex: this.state.isTopDragging ? 4 : 1 }}
                            x={this.state.topX}
                            y={this.state.topY}
                            dominantBaseline="middle"
                            textAnchor="middle"
                            onMouseDown={event => this.handleMouseDown(event, 'top')}
                            onMouseUp={event => this.handleMouseUp(event, 'top')}
                        >
                            {this.state.toptext}
                        </text>

                        <text
                            style={textStyle}
                            dominantBaseline="middle"
                            textAnchor="middle"
                            x={this.state.bottomX}
                            y={this.state.bottomY}
                            onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                            onMouseUp={event => this.handleMouseUp(event, 'bottom')}
                        >
                            {this.state.bottomtext}
                        </text>
                    </svg>
                    <div className="meme-form">
                        <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
                        <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
                    </div>
                </div>
            </div>
        );
    }
}

export default TempGen;
