import React from "react"
import { Route, Switch } from "react-router-dom"
import { Homepage } from "./components/Homepage"
import { PlayGame } from "./components/PlayGame"
import { HowToPlay } from "./components/HowToPlay"


const Routes = () => {
  return(
  <div>
  <Switch>
    <Route exact path="/" component={Homepage} />
    <Route path="/playgame" component={PlayGame} />
    <Route path="/howtoplay" component={HowToPlay} />
    </Switch>
  </div>
)
}

export default Routes
