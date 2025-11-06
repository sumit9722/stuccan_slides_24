import type { Stucca } from "../../App"
import styles from './ScrollContainer.module.scss';
import scrollImg from '../../assets/images/scroll/Scroll.png';
import something from '../../assets/images/scroll/something.png';
import scrollTexture from '../../assets/images/scroll/scrolltexture.jpg';

interface ScrollContainerProfs {
    stucca: Stucca;
    className?: string;
}

export default function ScrollContainer({ stucca, className = '' }: ScrollContainerProfs) {
    return (
        <div className={className}>
            <div className={styles.scrollContainer}>
                <div className={styles.scroll} style={{backgroundImage: `url(${scrollImg})`}} />
                <div className={styles.scrollPaper} style={{backgroundImage: `url(${scrollTexture})`}}>
                </div>
            </div>
        </div>
    )
}
