import { useEffect, useReducer, useState } from "react";
import "./style.css";
import stringSimilarity from "string-similarity";
import { GoogleAuth } from "../../googleAuth";

let boolIdx = new Array(1000).fill(true);

const Main = () => {
  const [count, setCount] = useState(0);
  const [isScribing, setIsScribing] = useState(false);
  const [isStartHovered, setIsStartHovered] = useState(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [eventsFound, setEventsFound] = useState([]);

  const addUniqueContexts = (newContexts) => {
    setEventsFound((prevEvents) => {
      let updatedEvents = [...prevEvents];
      newContexts.forEach((newContext) => {
        let isDuplicate = false;
        updatedEvents = updatedEvents.map((existingContext) => {
          const similarity = stringSimilarity.compareTwoStrings(
            existingContext,
            newContext
          );
          if (similarity > 0.45) {
            isDuplicate = true;
            return newContext.length > existingContext.length
              ? newContext
              : existingContext;
          }
          return existingContext;
        });
        if (!isDuplicate) {
          updatedEvents.push(newContext);
        }
      });
      return Array.from(new Set(updatedEvents));
    });
  };

  useEffect(() => {
    const fetchAndUpdate = async () => {
      try {
        const newContexts = await window.pywebview.api.findstuff();
        if (newContexts !== "bad read") {
          addUniqueContexts(newContexts);
        }
      } catch (error) {
        console.error("Error fetching contexts:", error);
      }
    };

    if (isScribing) {
      const intervalId = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
        fetchAndUpdate();
      }, 5000);

      return () => clearInterval(intervalId);
    }
  }, [isScribing, count]);

  const toggleScribing = () => {
    setIsScribing(!isScribing);
  };

  const resetScribing = () => {
    setEventsFound([]);
    setIsScribing(false);
  };

  return (
    <>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');
      </style>

      <div
        style={{
          height: "fit-content",
          borderBottom: "1px solid #000",
        }}
      >
        <div
          style={{
            marginLeft: 16,
          }}
        >
          <p
            style={{
              margin: 0,
              marginTop: 2,
              fontSize: 45,
              fontWeight: "bold",
              fontFamily: "Open sans",
            }}
          >
            Timescribe
          </p>
          <p
            style={{
              marginLeft: 6,
              marginTop: 4,
              marginBottom: 10,
              fontSize: 20,
              fontFamily: "Open sans",
            }}
          >
            A tool for organization and workflow efficiency.
          </p>
        </div>
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "block",
            textAlign: "center",
          }}
        >
          {isScribing || eventsFound.length ? (
            <>
              {eventsFound.length <= 0 ? (
                <>
                  <p
                    style={{
                      width: "90vw",
                      marginLeft: 6,
                      marginTop: 20,
                      marginBottom: 20,
                      fontWeight: "bold",
                      fontSize: 30,
                      fontFamily: "Open sans",
                    }}
                  >
                    Minimize this window whilst scribing is happening. This
                    checks for duplicates but it is recommended for extra
                    performance. Stop scribing by reopening the window and
                    pressing stop.
                  </p>
                </>
              ) : (
                <>
                  {eventsFound.map((eventF, idx) => (
                    <div
                      key={idx} // Added key for better list rendering
                      id="event_found"
                      style={{
                        width: "90vw",
                        borderRadius: 16,
                        border: "1px solid #000",
                        marginTop: 20,
                        marginBottom: 20,
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <textarea
                        style={{
                          margin: 16,
                          fontSize: 20,
                          color: "#000",
                          background: "#fff",
                          border: "none",
                          width: "100%",
                          whiteSpace: "normal",
                          fontFamily: "Open sans",
                        }}
                        placeholder={boolIdx[idx] ? `${eventF}` : ""}
                        disabled={boolIdx[idx]}
                      />
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          alignItems: "right",
                          justifyContent: "right",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            id="bottom_bar_button"
                            onClick={() => {
                              boolIdx[idx] = !boolIdx[idx];
                              forceUpdate();
                            }}
                            style={{
                              margin: 8,
                              backgroundColor: "transparent",
                              width: 30,
                              height: 30,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                            }}
                          >
                            <img
                              draggable={false}
                              src={
                                boolIdx[idx]
                                  ? "https://cdn1.iconfinder.com/data/icons/essential-21/128/Edit-512.png"
                                  : "https://cdn-icons-png.freepik.com/256/10057/10057635.png?semt=ais_hybrid"
                              }
                              width="30px"
                              height="30px"
                            />
                          </button>

                          <button
                            id="bottom_bar_button"
                            onClick={() => {
                              const copy = eventsFound;
                              copy.splice(idx, 1);
                              setEventsFound(copy);
                              forceUpdate();
                            }}
                            disabled={!boolIdx[idx]}
                            style={{
                              margin: 8,
                              backgroundColor: "transparent",
                              width: 30,
                              height: 30,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              border: "none",
                            }}
                          >
                            <img
                              draggable={false}
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgy6cH4pk8uBtQ-_MBHx5MtDO8ms62KxR0UQ&s"
                              width="30px"
                              height="30px"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h1>‎</h1>
                </>
              )}
            </>
          ) : (
            <>
              <p
                style={{
                  marginLeft: 6,
                  marginTop: 20,
                  marginBottom: 20,
                  fontWeight: "bold",
                  fontSize: 30,
                  fontFamily: "Open sans",
                }}
              >
                You have no currently timescribed events or meetings.
              </p>

              <button
                style={{
                  fontWeight: "bold",
                  fontSize: 50,
                  fontFamily: "Open sans",
                  paddingLeft: 64,
                  paddingRight: 64,
                  paddingTop: 8,
                  paddingBottom: 8,
                  backgroundColor: isStartHovered ? "#6ad4dd" : "#0f6cbd",
                  cursor: isStartHovered ? "pointer" : "auto",
                  color: "#fff",
                  border: "none",
                  borderRadius: 16,
                  transition: "all 0.25s ease-out",
                }}
                onMouseEnter={() => setIsStartHovered(true)}
                onMouseLeave={() => setIsStartHovered(false)}
                onClick={toggleScribing}
              >
                Start Scribing
              </button>
            </>
          )}
        </div>
      </div>

      <div
        style={{
          position: "fixed",
          width: "100%",
          bottom: 0,
          left: 0,
          backgroundColor: "#7aa2e3",
          height: 50,
          padding: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <button
            style={{
              fontSize: 25,
              fontWeight: "bold",
              height: 50,
              fontFamily: "Open sans",
              backgroundColor: isScribing ? "#ff0000" : "#7aa2e3",
              color: "#fff",
              border: "2px solid #fff",
              marginRight: "auto",
            }}
            id="bottom_bar_button"
            onClick={toggleScribing}
          >
            {isScribing ? "Stop" : "Start"}
          </button>
          <button
            style={{
              fontSize: 25,
              fontWeight: "bold",
              height: 50,
              fontFamily: "Open sans",
              backgroundColor: "#7aa2e3",
              color: "#fff",
              border: "2px solid #fff",
              marginRight: "auto",
              marginLeft: 8,
            }}
            id="bottom_bar_button"
            onClick={resetScribing}
          >
            Reset
          </button>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "right",
            justifyContent: "right",
            gap: 8,
            paddingRight: 16,
          }}
        >
          <button
            style={{
              fontSize: 20,
              fontWeight: "bold",
              height: 50,
              fontFamily: "Open sans",
              backgroundColor: "#fff",
              color: "#000",
              border: "1px solid #fff",
            }}
            id="bottom_bar_button"
          >
            Export to Google Calendar
          </button>
          <GoogleAuth />
        </div>
      </div>
    </>
  );
};

export default Main;
