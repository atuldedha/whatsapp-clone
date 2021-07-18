import {Circle} from 'better-react-spinkit';

const Loading = () => {
    return (
        <center style = {{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1196px-WhatsApp.svg.png" 
                    alt="" 
                    style = {{marginBottom: 10}}
                    height = {200}
                />

                <Circle color = "#3CBC2B" size = {60} />
            </div>

        </center>
        
    )
}

export default Loading
