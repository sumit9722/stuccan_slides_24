import { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
import { useAnimation } from "framer-motion";
// import styles from "./style.module.scss";
// import Door1Image from "/imgs/doors/Door1.png";
// import Door2Image from "/imgs/doors/Door2.png";
// import Door3Image from "/imgs/doors/Door3.png";
// import Door4Image from "/imgs/doors/Door4.png";
// import Preloader from "../../registration/components/Preloader/Preloader";
// import assetList from "../../../assetList";
//
// type Phase = "idle" | "closing" | "waiting" | "opening";
type Phase = "initial" | "active" | "closing";

interface Props {
  phase: Phase;
  onClosed?: () => void;
  onOpened?: () => void;
}

export default function DoorTransition({ phase, onClosed, onOpened }: Props) {
  const c1 = useAnimation();
  const c2 = useAnimation();
  const c3 = useAnimation();
  const c4 = useAnimation();

  const START = {
    outerLeft: "-200%",
    innerLeft: "-300%",
    innerRight: "300%",
    outerRight: "200%",
  };

  useEffect(() => {
    let cancelled = false;

    const runClosing = async () => {
      await Promise.all([
        c1.set({ "--dx": START.outerLeft }),
        c2.set({ "--dx": START.innerLeft }),
        c3.set({ "--dx": START.innerRight }),
        c4.set({ "--dx": START.outerRight }),
      ]);
      if (cancelled) return;

      await Promise.all([
        c1.start({
          "--dx": "0%",
          transition: { duration: 0.7, ease: "easeInOut" },
        }),
        c4.start({
          "--dx": "0%",
          transition: { duration: 0.7, ease: "easeInOut" },
        }),

        c2.start({
          "--dx": "0%",
          transition: { duration: 0.9, ease: "easeInOut" },
        }),
        c3.start({
          "--dx": "0%",
          transition: { duration: 0.9, ease: "easeInOut" },
        }),
      ]);
      // if (page ==="/register")
      // {
      //   const run = async () => {
      //  await Promise.all([<Preloader onEnter={()=>console.log("Hii")}/>])
      // }}
      if (cancelled) return;

      if (!cancelled) {
        runOpening();
        onClosed?.();
      }
    };

    const runOpening = async () => {
      setTimeout(async () => {
        // await Promise.all([ setTimeout(()=>{     console.log("Hi")},10000) ])
        await Promise.all([
          c2.start({
            "--dx": START.innerLeft,
            transition: { duration: 0.7, ease: "easeInOut" },
          }),
          c3.start({
            "--dx": START.innerRight,
            transition: { duration: 0.7, ease: "easeInOut" },
          }),

          c1.start({
            "--dx": START.outerLeft,
            transition: { duration: 0.9, ease: "easeInOut" },
          }),
          c4.start({
            "--dx": START.outerRight,
            transition: { duration: 0.9, ease: "easeInOut" },
          }),
        ]);

        if (!cancelled) onOpened?.();
      }, 500);
    };

    if (phase === "closing") runClosing();
    if (phase === "active") runOpening();

    return () => {
      cancelled = true;
    };
  }, [phase, c1, c2, c3, c4, onClosed, onOpened]);

  if (phase === "initial") return null;

  return <></>;
}
