import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import Card from "./components/Card";
import { BusType } from "./lib/types";

interface Props {}

const App: React.FC<Props> = () => {
  const [error, setError] = useState(false);
  const [buses, setBuses] = useState([]);
  const [todaysBuses, setTodaysBuses] = useState([]);

  const baseURL = "http://localhost:3000";

  const getBusTimes = async () => {
    axios
      .get(`${baseURL}/bus-times`)
      .then((response) => {
        setBuses(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const getRunningBuses = async () => {
    axios
      .get(`${baseURL}/todays-buses`)
      .then((response) => {
        setTodaysBuses(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // load the buses upon the component mounting, then update every 10 secs
  useEffect(() => {
    getBusTimes();
    getRunningBuses();
    const interval = setInterval(() => {
      getBusTimes();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ease: "easeIn",
            duration: 0.4,
            delay: 0.2,
          }}
          className="Header_Container"
        >
          <h1 className="Header">
            Live bus times for <b className="Bold_Header_Text">Park Road</b>
          </h1>
          <div className="Todays_Buses">
            <h2 className="Todays_Buses__Header">Services running today:</h2>
            {todaysBuses.map((bus: BusType) => {
              return (
                <div key={bus.id} className="Todays_Buses__Card">
                  <p className="Todays_Buses__Details">{bus.id}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            ease: "easeIn",
            duration: 0.4,
            delay: 0.2,
          }}
          className="Card_Container"
        >
          {error ? (
            <div className="Feedback_Card">
              <p className="Feedback_Card__Header">
                We&apos;re having trouble. Please try again later
              </p>
            </div>
          ) : buses && buses.length ? (
            buses.map((item: BusType) => (
              <Card
                id={item.id}
                busId={item.busId}
                destination={item.destination}
                minutesUntilArrival={item.minutesUntilArrival}
                key={item.id}
              />
            ))
          ) : (
            <div className="Feedback_Card">
              <p className="Feedback_Card__Header">There are no buses today</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default App;
