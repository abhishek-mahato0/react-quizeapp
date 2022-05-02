
import { useEffect, useState } from 'react';
import './App.css';
import data from './data';
import money from './money';

function App() {
  const[classlist,setClasslist]=useState("option");
  const [ques,setQues] = useState(0);
  const [ans,setAns] = useState(null);
  const[score,setScore]=useState(0);
  const[container,setContainer]= useState("container");
  const [prize,setPrize] = useState(0);
  const [earned,setEarned]= useState("none");
  const [moneyclass,setMoneyclass]= useState("prize");
  const [btns,setbtns]=useState("none");
  const next=()=>{
    setClasslist("option");
    setContainer("container");
    setMoneyclass("prize");
    setEarned("none");
    setbtns("none");
    setQues(0);
  }
  const checkanswers=(ele)=>{
    setAns(ele);
    setClasslist("option selected");
    setTimeout(() => {
      if(ele.correct===true){
        setClasslist("option correct");
        setScore(score+1);
        setTimeout(() => {
          if(data.length-1===ques){
            setContainer("none");
            setEarned("flex")
            setMoneyclass("none");
            setbtns("flex")
          }
          else{
            setQues(ques+1);
          }
        }, 1000);
      }
      else{
        setClasslist("option wrong");
        setTimeout(()=>{
          setContainer("none");
          setEarned("flex");
          setMoneyclass("none");
          setbtns("flex");
        },800)
      }
    },1000);
   
  }
  useEffect(()=>{
    setPrize(data[ques].id>1 ? money.find((m)=>m.id===data[ques].id-1).mon:0);
  },[ques])
  
  return (
    <div className="app">
      <div className="earned">
      <div className={earned}>
        <h1>You Earned:{prize}</h1>
      </div>
      <div className={btns}>
          <div className="next"><button onClick={next}>Play Again</button></div>
        </div>
      </div>
     <div className="smaller">
       <h1>Your Earning is Rs.{prize}</h1>
     </div>
      <div className={container}>
        <div className="ques">
          <h1>{data[ques].id}. {data[ques].ques}</h1>
        </div>
        <div className="options">
          {data[ques].options.map((ele)=>{
            return(
              <div className={ ans===ele ? classlist : "option"} onClick={()=>checkanswers(ele)}>
              {ele.option}
            </div>
            )
          })}
        </div>
      </div>
      <div className={moneyclass}>
          {
            money.map((elem)=>{
              return(
                  <h3 className={elem.id===data[ques].id ? "active" : "money"} >{elem.mon}</h3>
              )
            })
          }
      </div>
    </div>
  );
}

export default App;
