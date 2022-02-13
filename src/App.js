import React, {useState, useEffect} from "react";
import ReactCardFlip from 'react-card-flip';
import './App.css';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const phonics = {
    1: ["sm", "sw", "gl", "sp", "sn", "wh", "bl", "cr", "sl", "squ", "cl", "sk", "v", "tw", "br", "z", "tr", "y", "pr", "thr", "gr", "dw", "st", "spr", "r", "shr", "str", "fl", "ch", "w", "fr", "spl", "h", "dr", "pl", "j", "s", "c", "qu", "k", "sc", "f", "l", "scr"],
    2: ["u", "o", "i", "e", "a"],
    3: ["d", "p", "sh", "n", "t", "x", "g", "m", "th", "b"]
}

function PhonicsFlipCard(props) {
    const [flipped, setFlipped] = useState(false);

    const [front, setFront] = useState(props.value);
    const [back, setBack] = useState(false);

    useEffect(() => {       
        if(flipped)
            setFront(previous => props.value) 
        else
            setBack(previous => props.value) 
        setFlipped(!flipped)
    }
    , [props.value])

    return (
        <ReactCardFlip isFlipped={flipped} flipDirection="vertical" containerStyle={{"height":"100%"}}>
            {[front, back].map((value, index)=>
                <Card key={index} style={{ height:"100%", fontSize:"15vw", fontWeight:"bold", backgroundColor: "#eeeee4"}}>
                    <Card.Body style={{display: "flex", alignItems: "center", justifyContent: "center", width:"100%", height:"100%", margin:"auto", boxShadow: "5px 10px 8px #21130d55"}}>
                        <span style={{color:"#21130d", fontFamily:"Quicksand"}}>{value}</span>
                    </Card.Body>
                </Card>
            )}
        </ReactCardFlip>
      );
}

function App() {

    const [firstCardValue, setFirstCardValue] = useState(false);
    const [secondCardValue, setSecondCardValue] = useState(false);
    const [thirdCardValue, setThirdCardValue] = useState(false);

    useEffect(() => {        
        const flip = () => {
            setTimeout(() => {
                setFirstCardValue(phonics["1"][Math.floor(Math.random()*phonics["1"].length)])
                setTimeout(() => {
                    setSecondCardValue(phonics["2"][Math.floor(Math.random()*phonics["2"].length)])
                    setTimeout(() => 
                        setThirdCardValue(phonics["3"][Math.floor(Math.random()*phonics["3"].length)]),
                    Math.random()*500)
                },
                Math.random()*500)
            },
            Math.random()*500)
        }

        flip()
        document.addEventListener("keydown", flip, false);            
        document.addEventListener("click", flip, false);            
    }, []);

  return (
    <div className="App" style={{"height":"100%", backgroundColor: "#abdbe3"}}>
        <div style={{"height":"100%", padding:"50px"}}>
            <Row style={{"height":"100%"}}>
                {[firstCardValue, secondCardValue, thirdCardValue].map((value, index)=>
                    <Col key={index}>
                        <PhonicsFlipCard value={value}/>
                    </Col>
                )}
            </Row>
        </div>
    </div>
  );
}

export default App;
