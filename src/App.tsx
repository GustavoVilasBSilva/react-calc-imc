import { useState } from 'react';
import styles from './App.module.css';
import poweredImage from './assets/powered.png'
import leftArrowImage from './assets/leftarrow.png' 
import { levels, calculateImc, Level } from './helpers/imc';
import { GridItem } from './components/GridItem';


const App = () =>{
  const [heightField, setHeightField] = useState<number>(0);
  const [WeightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && WeightField) {
      setToShow(calculateImc(heightField, WeightField));
    } else {
      alert('Digite todos os campos')
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }
  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt="" width={150}/>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para Indice de Massa Copórea, parâmetro adotado pela Organização mundial de Saúde para calcular o peso ideal de cada pessoa.</p>
        
          <input type="number" disabled={toShow ? true : false} placeholder='Digite a sua altura. Ex: 1.5 (em métros)' value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))}/>
        
          <input type="number" disabled={toShow ? true : false}  placeholder='Digite o seu peso. Ex: 75.4 (em kg)' value={WeightField > 0 ? WeightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))}/>

          <button disabled={toShow ? true : false}  onClick={handleCalculateButton}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
          <div className={styles.grid}>
            {levels.map((item, key) => (
              <GridItem key={key} item={item}></GridItem>
              ))}
          </div>
          }
          {toShow &&
            <div className={styles.rightBig}> 
              <div className={styles.rightArrow}>
                <img src={leftArrowImage} alt="" width={25} onClick={handleBackButton}/>
              </div>
              <GridItem item={toShow} />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default App;