import "./App.css";
import { useEffect, useRef, useState } from "react";

import dvm from "./assets/images/stuccan/Rahul.png";
import adp from "./assets/images/stuccan/Pranav.png";
import pcr from "./assets/images/stuccan/Ishita.png";
import controls from "./assets/images/stuccan/Ayushmaan.png";
import recnacc from "./assets/images/stuccan/Arshita.png";
import spons from "./assets/images/stuccan/Dhruv.png";
import gensec from "./assets/images/stuccan/Aditya.png";
import prez from "./assets/images/stuccan/Sajal.png";
import Preloader from "./preloader/Preloader";
import oasis from "/oasislogo.png";
import DoorTransition from "./page-transition/DoorTransition";
import ScrollContainer from "./Components/ScrollContainer/ScrollContainer";
import bg from "./assets/images/bg.png"

export interface Stucca {
  name: string,
  depName: string,
  imgLink: string
}

export default function App() {
  const listOfStucaa: Stucca[] = [
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
  const [phase, setPhase] = useState<
    "idle" | "closing" | "waiting" | "opening"
  >("closing");

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
    <div className="app" style={{backgroundImage: `url(${bg})`}}>
      {!checker ? (
        <div className="preloader-container">
          <Preloader size={64} color="#ffffff" ariaLabel="Loading content" />
        </div>
      ) : (
        <>
          {activeDoor && (
            <DoorTransition
              phase={phase}
              onClosed={() => {
                setPhase("opening");
                setCurrIndex(currIndexRef.current);
              }}
              onOpened={() => {
                setPhase("closing");
                setActiveDoor(false);
              }}
            />
          )}
          <div className="fullpagebody">
            <div className="logo">
              <img src={oasis} alt="osaislogo" className="oasislogo" />
            </div>
            <ScrollContainer
              stucca={listOfStucaa[currIndex]}
              className="scrollCont" />
          </div>
        </>
      )}
    </div>
  );
}
