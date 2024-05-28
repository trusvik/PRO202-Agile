import React, { useEffect, useState } from 'react';
import './admin.css';

function Admin() {
    const [plays, setPlays] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlays = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/plays/get');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlays(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching plays:', error);
                setLoading(false);
            }
        };

        fetchPlays();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header id="containerHeader">
                <div id="flexContainerLeft">
                    <h1 id='logo'>Plays</h1>
                </div>
                <div id="flexContainerRight">
                    <p id='userName'>Admin</p>
                    <img alt="Admin" id='profilePicture'/>
                </div>
            </header>

            <section id='parent-margin'>
                <section id='containerSectionButton'>
                    <button id='createNewButton'>Create new</button>
                </section>

                <section id='containerSectionName'>
                    <div id='start'>
                        <div id='one'><p>Id</p></div>
                        <div id='two'><p>Name</p></div>
                        <div id='three'><p>Number of scenarios</p></div>
                    </div>
                    <div id='end'>
                        <p>Edit</p>
                    </div>
                </section>

                {plays.map(play => (
                    <section key={play._id} id='containerSectionName'>
                        <div id='start'>
                            <div id='one'><p>{play._id}</p></div>
                            <div id='two'><p>{play.play}</p></div>
                            <div id='three'><p>{play.scenarios}</p></div>
                        </div>
                        <div id='end'>
                            <button id='play'>Play</button>
                            <button id='edit'>Edit</button>
                            <button id='remove'>Remove</button>
                        </div>
                    </section>
                ))}
            </section>
        </>
    );
}

export default Admin;
