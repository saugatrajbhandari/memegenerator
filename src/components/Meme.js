import React, {useState, useEffect} from 'react'
import { fetchData } from '../utils/fetchData'

const Meme = () => {

    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [isLoading, setIsLoading] = useState(false);

    const [allMemeImages, setAllMemeImages] = useState([]);

    useEffect(()=>{
        const fetchMemeData = async() =>{
        const data = await fetchData('https://api.imgflip.com/get_memes');
        setAllMemeImages(data);
        }
        fetchMemeData();
        
    }, [])

    const getMemeImage = () => {
        setIsLoading(true);

        const randomNumber = Math.floor(Math.random() * allMemeImages.length)
        setMeme({...meme, randomImage:allMemeImages[randomNumber].url})
        setIsLoading(false);


    }

    const handleChange = (e) =>{
        e.preventDefault();
        const {name, value} = e.target;
        setMeme({...meme, [name]: value})
     }

    if(isLoading){
        return <h1>Loading...</h1>
    }
  return (
    <main>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button onClick={getMemeImage} 
                    className="form--button"
                >
                    Get a new meme image 
                </button>
            </div>
            <div className="meme">
            <center><img src={meme.randomImage} className="meme--image" alt="" /></center>
            <h2 className="meme--text top">{meme.topText}</h2>
            <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
               
        </main>
  )
}

export default Meme