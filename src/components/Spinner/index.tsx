import React from "react";
import "./spinner.scss";
import { useAppSelector } from "../../store/hooks";

const Spinner = () => {
    const { searchLoading } = useAppSelector((state) => state.search);
    if (!searchLoading) return <></>;
    return (
        <div className="body">
            <div id="circle-orbit-container">
                <div id="Neptune-orbit">
                    <div className="Neptune-orbit-cirlces"></div>
                </div>

                <div id="Uranus-orbit">
                    <div className="Uranus-orbit-cirlces"></div>
                </div>

                <div id="Saturn-orbit">
                    <div className="Saturn-orbit-cirlces"></div>
                </div>

                <div id="Jupiter-orbit">
                    <div className="Jupiter-orbit-cirlces"></div>
                </div>

                <div id="mars-orbit">
                    <div className="mars-orbit-cirlces"></div>
                </div>

                <div id="earth-orbit">
                    <div className="earth-orbit-cirlces"></div>
                </div>

                <div id="venus-orbit">
                    <div className="venus-orbit-cirlces"></div>
                </div>

                <div id="Mercury-orbit">
                    <div className="Mercury-orbit-cirlces"></div>
                </div>
                <div className="sun"></div>
            </div>
        </div>
    );
};

export default Spinner;
