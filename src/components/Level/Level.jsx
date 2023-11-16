import "./level.css"
import Stepper from "react-stepper-horizontal"
import { useState, useEffect } from "react"
import { useMediaQuery } from "react-responsive"

const Level = ({levelNames}) => {
    
    const [levels, setLevels] = useState([])
    const [isSmallScreen, seiIsSmallScreen] = useState(false)

    useEffect(() => {

        const levelsName = levelNames.map((levelName) => {
            const firstLetter = levelName[0].toUpperCase() + levelName.slice(1).toLowerCase()
            return {title: firstLetter}
        })
        setLevels(levelsName)

    },[levelNames])

    const mediaScreen = useMediaQuery({ query: "(max-width: 820px)"})

    useEffect(() => {
        if (mediaScreen) {
            seiIsSmallScreen(true)
            console.log("IF", isSmallScreen)

        } else {
            seiIsSmallScreen(false)
            console.log("ELSE", isSmallScreen)

        }
    },[mediaScreen])

    return (
        <div className = "level">
            {
                isSmallScreen ? (
                    <Stepper 
                    steps = { levels }
                    activeStep = { 1 }
                    size = { 60 }
                    circleFontSize = { 25 }
                    circleTop = { 10 }
                    activeColor = {"red"}
                    activeTitleColor = { "red" }
                    defaultColor = { `rgba(220, 211, 211,0.35)` }
                    defaultTitleColor = { "red" }
                    completeColor = { "green" }
                    completeTitleColor = { "green" }
                    titleFontSize = { 15 }
                    lineMarginOffset = { 25 }
                    defaultBarColor = { "#C0BABA" }
                    completeBarColor = { "#C0BABA" }
                        />
                ) : (
                    <Stepper 
                    steps = { levels }
                    activeStep = { 1 }
                    size = { 60 }
                    circleFontSize = { 25 }
                    circleTop = { 10 }
                    activeColor = {"red"}
                    activeTitleColor = { "red" }
                    defaultColor = { `rgba(220, 211, 211,0.35)` }
                    defaultTitleColor = { "red" }
                    completeColor = { "green" }
                    completeTitleColor = { "green" }
                    titleFontSize = { 25 }
                    lineMarginOffset = { 25 }
                    defaultBarColor = { "#C0BABA" }
                    completeBarColor = { "#C0BABA" }
                        />
                )}
        </div>
    );
};

export default Level;