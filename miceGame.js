
const [holes = 4, shotsQuantity = 4, games = 100] = process.argv.slice(2)
const playGame = () => {
  let solutions = []
  let allPossibleShots = [[]]
  let shotsLeft = shotsQuantity
  const holeNumbers = Array.from({ length: holes }, (_, i) => i + 1)
  const collectShots = (shotsArray, holes) => {
    return shotsArray.reduce((acc, el) => {
      for (let num of holes) {
        acc.push([...el, num])
      }
      return acc
    }, [])
  }
  while (shotsLeft) {
    allPossibleShots = collectShots(allPossibleShots, holeNumbers)
    shotsLeft--
  }
  for (const shot of allPossibleShots) {
    let killCount = 0
    let gamesLeft = games
    const startShooting = (shots) => {
      const initHole = Math.floor(Math.random() * holes) + 1
      let miceHole = initHole
      for (let shootHole of shots) {
        if (miceHole === shootHole) {
          killCount++
          break
        }
        switch (miceHole) {
          case 1: miceHole = 2; break;
          case +holes: miceHole = holes - 1; break;
          default: miceHole = Math.random() > 0.5 ? miceHole - 1 : miceHole + 1
        }
      }
    }
    while (gamesLeft) {
      startShooting(shot)
      gamesLeft--
    }
    if (killCount === games) {
      solutions.push(shot)
    }
  }
  return solutions.length ? solutions : `No solution for ${holes} holes with only ${shotsQuantity} shots.`
}
console.log(playGame())