import React, { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/LoginContext';
import { trainHero } from '../server/HeroesManager';

const Card = (props) => {
    const { userData } = useContext(LoginContext)
    const [cardData, setCardData] = useState(props.cardData)
    const showAllHeroesState = props.showAllHeroesState
    const {
        heroID,
        name,
        ability,
        startedToTrain,
        startingPower,
        currentPower,
        suitColors,
        trainerId,
        dailyTraining
    } = cardData


    useEffect(() => {
        setCardData(props.cardData)
    }, [props.cardData, setCardData])


    const handlePressToTrain = async () => {
        if (dailyTraining.value < 5) {
            trainHero(userData.token, heroID).then((data) => {
                setCardData(data)
            })
        }
    }

    return (
        <div className="card-wrapper"
            style={{ backgroundImage: `linear-gradient(${suitColors[0]}, ${suitColors[1]}, ${suitColors[2]}, ${suitColors[3]}, ${suitColors[4]})` }}>

            <div className="card-content">

                <div>
                    Id: {heroID}
                </div>

                <div>
                    Name: {name}
                </div>

                <div>
                    Ability: {ability}
                </div>

                <div>
                    Current Power: {currentPower}
                </div>

                {
                    (!showAllHeroesState && trainerId === userData.user.id) &&
                    <div>
                        Starting Power: {startingPower}
                    </div>
                }

                {
                    (!showAllHeroesState && trainerId === userData.user.id) &&
                    <div>
                        Started to train: {startedToTrain}
                    </div>
                }

                {
                    (!showAllHeroesState && trainerId === userData.user.id) &&
                    <div>
                        Daily Trained: {dailyTraining.value + "/5"}
                    </div>
                }

            </div>

            {(!showAllHeroesState && trainerId === userData.user.id) &&
                <div className="button-container"
                    onClick={handlePressToTrain}
                >
                    Train
                </div>
            }
        </div>

    );
};

export default Card;