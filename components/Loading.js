import {Circle} from 'better-react-spinkit';
import Image from 'next/image'

const Loading = () => {
    return (
        <center style = {{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <Image 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1196px-WhatsApp.svg.png" 
                    alt="" 
                    width = {200}
                    height = {200}
                    layout = "fixed"
                    objectFit = "cover"
                />

                <Circle color = "#3CBC2B" size = {60} />
            </div>

        </center>
        
    )
}

export default Loading
