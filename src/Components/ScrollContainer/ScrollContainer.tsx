import type { Stucca } from "../../App"
import styles from './ScrollContainer.module.scss';

interface ScrollContainerProfs {
    stucca: Stucca;
    className?: string;
}

export default function ScrollContainer({ stucca, className = '' }: ScrollContainerProfs) {
    return (
        <div className={className}>
            
        </div>
    )
}
