import "./App.css";
import { useEffect, useRef, useState } from "react";

import dvm from "/imgs/Rahul.png";
import adp from "/imgs/Pranav.png";
import pcr from "/imgs/Ishita.png";
import controls from "/imgs/Ayushman.png";
import recnacc from "/imgs/Arshita.png";
import spons from "/imgs/Dhruv.png";
import gensec from "/imgs/Aditya.png";
import prez from "/imgs/Sajal.png";
import Preloader from "./preloader/Preloader";
import oasis from "/oasislogo.png";
import DoorTransition from "./page-transition/DoorTransition";

export default function App() {
  const listOfStucaa = [
    {
      name: "Rahul Gupta",
      depName: "Department of Visual Media",
      imgLink: dvm,
    },
    {
      name: "Pranav Deshpande",
      depName: "Department of Art, Design and Publicity",
      imgLink: adp,
    },
    {
      name: "Ishita Agrawal",
      depName: "Department of Publications and Correspondence",
      imgLink: pcr,
    },
    {
      name: "Ayushmaan Kumar",
      depName: "Department of Controls",
      imgLink: controls,
    },
    {
      name: "Arshita Mittal",
      depName: "Department of Reception and Accommodation",
      imgLink: recnacc,
    },
    {
      name: "Dhruv Maniar",
      depName: "Department of Sponsorship and Marketing",
      imgLink: spons,
    },
    {
      name: "Aditya Khandelwal",
      depName: "General Secretary Elect., Students' Union",
      imgLink: gensec,
    },
    {
      name: "Sajal Yadav",
      depName: "President, Students' Union",
      imgLink: prez,
    },
  ];

  const [currIndex, setCurrIndex] = useState(0);
  const [checker, setChecker] = useState(false);
  const [activeDoor, setActiveDoor] = useState(false);

  const currIndexRef = useRef(currIndex);
  const checkerRef = useRef(false);

  useEffect(() => {
    checkerRef.current = checker;
  }, [checker]);

  useEffect(() => {
    const preloadArray = [
      dvm,
      adp,
      pcr,
      controls,
      recnacc,
      spons,
      gensec,
      prez,
      oasis,
    ];

    // prevent interaction until assets are preloaded
    setChecker(false);

    (async () => {
      const promises = preloadArray.map(
        (src) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = src;
          })
      );

      await Promise.all(promises);

      // await new Promise<void>((resolve) => setTimeout(resolve, 5000000));
      setChecker(true);
    })();

    function changeData(e: KeyboardEvent) {
      if (!checkerRef.current) {
        return;
      }
      const number = Number(e.key);
      // Accept only valid indices based on the list length (1..list length)
      if (
        !isNaN(number) &&
        number >= 1 &&
        number <= listOfStucaa.length &&
        number !== currIndexRef.current
      ) {
        currIndexRef.current = number;
        setActiveDoor(true);
      }
    }

    window.addEventListener("keydown", changeData);

    return () => {
      window.removeEventListener("keydown", changeData);
    };
  }, []);

  return (
    <>
      {!checker ? (
        <div className="preloader-container">
          <Preloader size={64} color="#ffffff" ariaLabel="Loading content" />
        </div>
      ) : (
        <>
          {activeDoor && (
            <DoorTransition
              phase="closing"
              onClosed={() => {
                setCurrIndex(currIndexRef.current);
              }}
              onOpened={() => {
                // setCurrIndex(currIndexRef.current);
                setActiveDoor(false);
              }}
            />
          )}
          <div className="fullpagebody">
            <div className="logo">
              <img src={oasis} alt="osaislogo" className="oasislogo" />
            </div>
            <div className="names">
              {listOfStucaa.map((stucan, index) => (
                <div
                  key={index}
                  className={
                    currIndex === index + 1
                      ? "namesection active"
                      : "namesection"
                  }
                >
                  <div className="imgcontainer">
                    <img src={stucan.imgLink} alt={stucan.name} />
                  </div>
                  <div className="nametext">
                    <h2>{stucan.name}</h2>
                    <p>{stucan.depName}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
