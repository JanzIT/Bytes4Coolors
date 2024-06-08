import React, { useState } from 'react';
import colornames from '../styles/colornames.json';
import styles from "../styles/Palette.module.css";
import { FaLock } from "react-icons/fa";

export const Palette = () => {
    const [currentColors, setCurrentColors] = useState(Array.from({ length: 5 }, () => ({ color: null, locked: false })));

    const getRandomColor = () => {
        const keys = Object.keys(colornames);
        const updatedColors = currentColors.map(({ color, locked }) => {
            if (locked) return { color, locked }; // Keep the color if it's locked
            const randomIndex = Math.floor(Math.random() * keys.length);
            return { color: keys[randomIndex], locked }; // Otherwise, get a new random color
        });
        setCurrentColors(updatedColors);
    };

    const toggleLock = (index) => {
        const updatedColors = [...currentColors];
        updatedColors[index].locked = !updatedColors[index].locked;
        setCurrentColors(updatedColors);
    };

    return (
        <div className={styles["pallette-container"]} >
            <button style={{ height: "55px" }} onClick={getRandomColor}>Get Random Color</button>

            <div style={{ display: "flex" }}>
                {currentColors.map(({ color, locked }, index) => (
                    <div
                        key={index}
                        style={{ position: "relative", backgroundColor: color, width: '330px', height: '900px', cursor: "pointer" }}
                        onClick={() => toggleLock(index)} // Toggle lock on click
                    >
                        {locked
                            ? (<p onClick={() => navigator.clipboard.writeText(color)} style={{ position: "absolute", color: "black", left: "100px", top: "700px" }}>{color} <br /><FaLock /></p>)
                            : (<p onClick={() => navigator.clipboard.writeText(color)} style={{ position: "absolute", color: "black", left: "100px", top: "700px" }}>{color}</p>)}
                    </div>
                ))}
            </div>
        </div >
    );
};