
import React, { useState } from 'react';
import memedata from './memedata.js';

export default function Gen() {
  // const [memeurl , newImg ] = useState("");
  const [memeobj , setmemeobj] = useState({topText : "",
bottomText : "", randomImg : "https://i.imgflip.com/1g8my4.jpg"})
  const [memeA , setMemeArr] = useState(memedata);

  function getImg(){
  const memeArr = memeA.data.memes;
  const randNum = Math.floor(Math.random() * memeArr.length);
  const url = memeArr[randNum].url;
  setmemeobj(pre => {
    return{
      ...pre,randomImg:url
    }
  })

}
console.log(memeobj);
function handle(event){
  const {name , value} = event.target;
  setmemeobj(prev => {
    return {
        ...prev,
        [name]:value
    }
  })
}

  return (
    <div className='container'>
        <div className='inputs'>
          <input 
          type="text" 
          placeholder='Top'
          name = "topText"
          onChange={handle}
          value = { memeobj.top} 
          />
          <input type="text" placeholder='Bottom' 
          name = "bottomText"
          onChange={handle}
          value = { memeobj.bottom} 
          />
        </div>
        <button className='btn' onClick={getImg}>Get a new meme image</button>
        <div className="meme">  
          <img src= {memeobj.randomImg} alt='memeImage' className='memeimage' width="500px" height= "300px" />
          <h2 className="meme--text top">{memeobj.topText}</h2>
          <h2 className="meme--text bottom">{memeobj.bottomText}</h2>
        </div>   
    </div>
  )
}
