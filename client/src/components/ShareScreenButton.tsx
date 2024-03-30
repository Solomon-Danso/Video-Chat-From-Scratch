import { HiMiniComputerDesktop } from "react-icons/hi2";


export const ShareScreenButton: React.FC<{onClick: ()=>void}> = ({onClick})=>{

    return (<>
    <button onClick={onClick}><HiMiniComputerDesktop style={{fontSize:"3rem"}}/></button>
    </>);
}