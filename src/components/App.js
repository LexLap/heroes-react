import { useContext, useEffect, useState } from "react";
import LoadingModal from "./LoadingModal";
import Card from "./Card";
import { getCards } from "../server/HeroesManager";
import { LoginContext } from "../context/LoginContext";
import { getUserFromCookie } from "../cookies/cookies";
import { useNavigate } from "react-router";

function App() {
  const { userData } = useContext(LoginContext)
  const [showAllHeroesState, setShowAllHeroesState] = useState(true)
  const [cardsData, setCardsData] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (showAllHeroesState) {
      getCards(userData.token)
        .then(data => {
          setCardsData(data)
        })
    }

    if (!getUserFromCookie()?.token) {
      navigate("/login")
    }
  }, [showAllHeroesState, userData.token, navigate]);


  const handleShowHeroesState = () => {
    setShowAllHeroesState(!showAllHeroesState)
  }


  let cardsContent = <LoadingModal />
  if (cardsData) {
    const cardsArray = showAllHeroesState ? cardsData.publicData : cardsData.privateData
    cardsContent =
      cardsArray.map((cardData, i) => {
        return <Card key={i} cardData={cardData} showAllHeroesState={showAllHeroesState} />
      })
  }


  return (
    <div className="app-container">

      <div className="button-container"
        onClick={handleShowHeroesState}
      >{showAllHeroesState ? "Show my heroes" : "Show all heroes"}
      </div>

      <div id='cards-container'>
        {cardsContent}
      </div>

    </div>
  );
}

export default App;
