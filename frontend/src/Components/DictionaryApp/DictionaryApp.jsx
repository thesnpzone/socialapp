import { Container } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Definitions from './Definitions';
import Header from './Header';
import "./DictionaryApp.css"

const DictionaryApp = () => {

    const [word, setWord] = useState("");
    const [meanings, setMeanings] = useState([]);
    const [category, setCategory] = useState("en");
    const [LightTheme, setLightTheme] = useState(false);

    const dictionaryApi = async () => {
        try {
            const data = await axios.get(
                `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
            );
            setMeanings(data.data);
        } catch (error) {

        }
    };

    useEffect(() => {
        dictionaryApi();
        // eslint-disable-next-line
    }, [word, category]);





    return (
        <>


            <Container >

                <Header
                    setWord={setWord}
                    category={category}
                    setCategory={setCategory}
                    word={word}
                    setMeanings={setMeanings}
                    LightTheme={LightTheme}
                />
                {meanings && (
                    <Definitions
                        meanings={meanings}
                        word={word}
                        LightTheme={LightTheme}
                        category={category}
                    />
                )}
            </Container>



        </>
    )
}

export default DictionaryApp