import type { Phase, Stucca } from "../../App";
import styles from "./ScrollContainer.module.scss";
import scrollImg from "../../assets/images/scroll/Scroll.png";
import something from "../../assets/images/scroll/something.png";
import scrollTexture from "../../assets/images/scroll/scrolltexture.jpg";

interface ScrollContainerProfs {
    stucca: Stucca;
    phase: Phase;
    className?: string;
}

const phaseClass = {
    "initial": "",
    "active": styles.active,
    "closing": styles.closing,
}

export default function ScrollContainer({
    stucca,
    phase,
    className = "",

}: ScrollContainerProfs) {

    return (
        <div className={className}>
            <div className={`${styles.scrollContainer} ${phaseClass[phase]}`}>
                <div
                    className={styles.scroll}
                    style={{ backgroundImage: `url(${scrollImg})` }}
                />
                <div
                    className={styles.scrollPaper}
                    style={{ backgroundImage: `url(${scrollTexture})` }}
                >
                    <div className={styles.content}>
                        <div className={styles.somethingTop}>
                            <img src={something} alt="decorative element" />
                        </div>
                        <div className={styles.somethingBottom}>
                            <img src={something} alt="decorative element" />
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={stucca.imgLink} alt={stucca.name} />
                        </div>
                        <div className={styles.textContainer}>
                            <h2 className={styles.name}>{stucca.name}</h2>
                            <p className={styles.depName}>{stucca.depName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
