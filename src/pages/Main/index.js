import { useState } from 'react';
import './style.css'

const Main = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <style>
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
            </style>

            <div
                style={{
                    height:'fit-content',
                    borderBottom:'1px solid #000',
                }}
            >
                <div
                    style={{
                        marginLeft:16,
                    }}
                >
                    <p
                        style={{
                            margin:0,
                            marginTop:2,
                            fontSize:45,
                            fontWeight:'bold',
                            fontFamily:'Open sans'
                        }}
                    >
                        Timescribe
                    </p>
                    <p
                        style={{
                            marginLeft:6,
                            marginTop:4,
                            marginBottom:10,
                            fontSize:20,
                            fontFamily:'Open sans'
                        }}
                    >
                        A tool for organization and workflow efficiency.
                    </p>
                </div>
            </div>

            <div
                style={{
                    width:'100%',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center',
                }}
            >
                <div
                    style={{
                        display:'block',
                        textAlign:'center',
                    }}
                >
                    <p
                        style={{
                            marginLeft:6,
                            marginTop:20,
                            marginBottom:20,
                            fontWeight:'bold',
                            fontSize:30,
                            fontFamily:'Open sans'
                        }}
                    >
                        You have no currently timescribed events or meetings.
                    </p>

                    <button
                        style={{
                            fontWeight:'bold',
                            fontSize:50,
                            fontFamily:'Open sans',
                            paddingLeft:64,
                            paddingRight:64,
                            paddingTop:8,
                            paddingBottom:8,
                            backgroundColor:isHovered?'#6ad4dd':'#0f6cbd',
                            cursor:isHovered?'pointer':'auto',
                            color:'#fff',
                            border:'none',
                            borderRadius:16,
                            transition:'all 0.25s ease-out',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        Start Scribing
                    </button>
                </div>
            </div>

            <div
                style={{
                    position:'fixed',
                    width:'100%',
                    bottom:0,
                    left:0,
                    backgroundColor:'#7aa2e3',
                    height:50,
                    padding:8,
                }}
            >
            </div>
        </>
    )
}

export default Main;