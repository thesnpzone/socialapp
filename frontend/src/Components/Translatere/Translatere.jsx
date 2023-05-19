import { Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'


import './Translatere.css'
const Translatere = () => {

    const [options, setOptions] = useState([]);
    const [to, setTo] = useState('en');
    const [from, setFrom] = useState('en');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const translate = () => {

        const params = new URLSearchParams();
        params.append('q', input);
        params.append('source', from);
        params.append('target', to);
        params.append('api_key', 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');

        axios.post('https://libretranslate.com/translate', params, {
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            // console.log(res.data)
            setOutput(res.data.translatedText)
        })
    };

    useEffect(() => {
        axios
            .get('https://libretranslate.com/languages', {
                headers: { accept: 'application/json' },
            })
            .then((res) => {
                // console.log(res.data);
                setOptions(res.data);
            });
    }, []);

    return (
        <>



            <div class="container mt-5">

                <div class="row">

                    <div className="col-lg-12">

                            <Typography className='text-center' variant='h2'>Origen Translate</Typography>

                    </div>


                    <div className="col-lg-12 text-center mt-5">



                        <div class="row">

                            {/* Inout box  */}

                            <div className="col-lg-6">

                                <form >

                                    <div class="form-group">

                                        <select className='transleateselect'  onChange={(e) => setFrom(e.target.value)}>

                                            {options.map((opt) => (

                                                <option key={opt.code} value={opt.code}>

                                                    {opt.name}

                                                </option>

                                            ))}

                                        </select>



                                        <textarea placeholder='Type Here....' class="form-control transleterform mt-3" onInput={(e) => setInput(e.target.value)} id="" rows="8"></textarea>


                                    </div>


                                </form>






                            </div>

                            {/* output box  */}

                            <div className="col-lg-6">

                                <form action="">

                                    <div class="form-group">


                                        <select className='transleateselect' onChange={(e) => setTo(e.target.value)}>

                                            {options.map((opt) => (

                                                <option key={opt.code} value={opt.code}>

                                                    {opt.name}

                                                </option>

                                            ))}

                                        </select>

                                        <textarea class="form-control transleterform mt-3" value={output} rows="8" readonly="readonly"></textarea>

                                    </div>

                                </form>







                            </div>




                        </div>


                        <div>

                            <button className='btn' onClick={e => translate()}>Translate</button>

                        </div>

                    </div>


                </div>

            </div>


        </>
    )
}

export default Translatere