import { useState, useEffect } from "react"
import './App.css'
//ENPOINTS
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=white`
const CAT_IMAGE_URL = 'https://cataas.com/cat/'
export function App() {

    //set state to manage cat fact from first api
    const [fact, setFact] = useState()
    //state for image URL
    const [imageUrl, setImageUrl] = useState()
    //you can use usEffect to manage api calls, or fetch data
    useEffect(() => {
        //fecth data from first api
        //useEffect is estrictly synchronous, that's why we acnnot use await in
        //our api call, INSTEAD, we can wrap the call in another function

        //async form
        /* async function callToApi () {
           const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
           const resjson = await res.json()
           setFact(resjson.fact)
       } 
       callToApi()
       */

        //sync form

        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => {
                //TODO: HANDLE ERRORS, if we use async await, we must use try catch, but for sync call..
                if(!res.ok) throw new Error('Error fetching fact')
                return res.json()
            })
            .then(data => {
                const { fact } = data
                setFact(fact)
            })
            .catch((err) => {
                //catch error if there is error with response 
                //as api request
                console.log(err)
            })
    }, [])

    //its better use two or more useEffects in order to have more control on instructions and debug
    useEffect(() => {
        //prevent from null URL
        if (!fact) return
        const firstWord = fact.split(' ')[0]

                fetch(`https://cataas.com/cat/says/${firstWord}?fontSize=50&fontColor=white&json=true`)
                    .then(res => res.json())
                    .then(response => {
                        const {_id} = response
                        setImageUrl(`${_id}/says/${firstWord}?fontSize=50&fontColor=white`)
                    })
    },[fact])

    return (
        <main className="container">
            <h1>App de gatitos</h1>
            {fact && <p>{fact}</p>} {/* conmditional render */}
            {imageUrl && <img src={CAT_IMAGE_URL + imageUrl} alt="cat image with first word of fact" />}
        </main>

    )
}