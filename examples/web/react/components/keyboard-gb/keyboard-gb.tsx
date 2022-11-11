import React, { FC, useState } from "react";

import "./keyboard-gb.css";

declare const require: any;

type KeyboardGBProps = {
    focusable?: boolean;
    fullscreen?: boolean;
    style?: string[];
    onKeyDown?: (key: string) => void;
    onKeyUp?: (key: string) => void;
};

export const KeyboardGB: FC<KeyboardGBProps> = ({
    focusable = true,
    fullscreen = false,
    style = [],
    onKeyDown,
    onKeyUp
}) => {
    const containerClasses = () =>
        ["keyboard-container", fullscreen ? "fullscreen" : ""].join(" ");
    const classes = () =>
        [
            "keyboard",
            "keyboard-gb",
            fullscreen ? "fullscreen" : "",
            ...style
        ].join(" ");
    const renderKey = (
        key: string,
        keyName?: string,
        styles: string[] = []
    ) => {
        const [pressed, setPressed] = useState(false);
        const classes = ["key", pressed ? "pressed" : "", ...styles].join(" ");
        return (
            <span
                className={classes}
                key={keyName ?? key}
                tabIndex={focusable ? 0 : undefined}
                onKeyDown={(event) => {
                    if (event.key !== "Enter") return;
                    setPressed(true);
                    onKeyDown && onKeyDown(keyName ?? key);
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onKeyUp={(event) => {
                    if (event.key !== "Enter") return;
                    setPressed(false);
                    onKeyUp && onKeyUp(keyName ?? key);
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onBlur={(event) => {
                    setPressed(false);
                    onKeyUp && onKeyUp(key);
                }}
                onMouseDown={(event) => {
                    setPressed(true);
                    onKeyDown && onKeyDown(keyName ?? key);
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onMouseUp={(event) => {
                    setPressed(false);
                    onKeyUp && onKeyUp(keyName ?? key);
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onMouseLeave={(event) => {
                    if (!pressed) return;
                    setPressed(false);
                    onKeyUp && onKeyUp(keyName ?? key);
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onTouchStart={(event) => {
                    setPressed(true);
                    onKeyDown && onKeyDown(keyName ?? key);
                    event.stopPropagation();
                    event.preventDefault();
                }}
                onTouchEnd={(event) => {
                    setPressed(false);
                    onKeyUp && onKeyUp(keyName ?? key);
                    event.stopPropagation();
                    event.preventDefault();
                }}
            >
                {key}
            </span>
        );
    };
    return (
        <div className={containerClasses()}>
            <div
                className={classes()}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => e.preventDefault()}
            >
                <div className="dpad">
                    <div className="dpad-top">
                        {renderKey("▲", "ArrowUp", ["up"])}
                    </div>
                    <div>
                        {renderKey("◄", "ArrowLeft", ["left"])}
                        {renderKey("►", "ArrowRight", ["right"])}
                    </div>
                    <div className="dpad-bottom">
                        {renderKey("▼", "ArrowDown", ["down"])}
                    </div>
                </div>
                <div className="action">
                    {renderKey("B", "B", ["b"])}
                    {renderKey("A", "A", ["a"])}
                </div>
                <div className="break"></div>
                <div className="options">
                    {renderKey("START", "Start", ["start"])}
                    {renderKey("SELECT", "Select", ["select"])}
                </div>
            </div>
        </div>
    );
};

export default KeyboardGB;
