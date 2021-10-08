import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import Phaser from "phaser"
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";
import TownLevelScene from "./TownLevelScene";
import BattleScene from "./BattleScene";
import GameDialog from "./plugins/GameDialog";
import "./index.css";

const width = window.innerWidth
const height = window.innerHeight


const App = () => {
  const parentRef = useRef(null);

  useEffect(() => {
    const game = new Phaser.Game({
      parent: parentRef.current,
      width,
      height,
      autoFocus: false,
      physics: {
        default: "matter",
        matter: {
          debug: true,
          gravity: { y: 0 }
        }
      },
      plugins: {
        scene: [
          { key: 'matterCollision', plugin: PhaserMatterCollisionPlugin, mapping: 'matterCollision' },
          { key: 'gameDialog', plugin: GameDialog, mapping: 'gameDialog' },
        ]
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: parentRef.current,
      },
      scene: [TownLevelScene, BattleScene]
    });

    return () => game.destroy();
  }, []);

  return <div ref={parentRef} />
}

ReactDOM.render(<App />, document.getElementById('root'))
