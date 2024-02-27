function Presentation() {
  const itemsPresentation = [
    {recipeName: "Simple Omelette Recipe"},
    {introRecipe: "An easy and quick dish, perfect for any meal. This classic omelette combines beaten eggs cooked to perfection, optionally filled with your choice of cheese, vegetables, or meats."},
  ]
  
  return(

    <div className="presentation my-5">
      {itemsPresentation.map((item) => (
        <>          
          <h1 className="fw-bold">{item.recipeName}</h1>
          <p className="">{item.introRecipe}</p>
        </>
      ))}
      </div>
  )
}
// ############################################################################################################################################################################
function PreparationTime() {
  const itemsPreparation = [
    {name: "Total", time: "10 minutes"},
    {name: "Preparation", time: "5 minutes"},
    {name: "Cooking", time: "5 minutes"}
  ]

  return(
    <div className="preparationTime">
            <div className="rounded-5 py-2 my-2" style={{ backgroundColor: "pink" }}>            
              <h5 className="fw-bold ms-3 my-3" style={{ color: "purple" }}>Preparation time</h5>
              <ul className="ms-4">
                {itemsPreparation.map((item) => (
                  <li className="mt-3" style={{color: "maroon"}}><strong>{item.name} </strong>: {item.time}</li>
                ))}                
              </ul>
            </div>
          </div>
  )
}
// ###########################################################################################################################################################################
function Ingredients() {

  const itemsIngredients = [
    {name: "2-3 large eggs"},
    {name: "Salt, to taste"},
    {name: "Pepper, to taste"},
    {name: "Olive oil, for frying"}
  ]

  return(
    <>
    <div className="ingredients my-5">
      <h2 style={{color: "maroon"}}><strong>Ingredients</strong></h2>
      <ul className="my-4">
        {itemsIngredients.map((item) => (
          <li className="mt-3">{item.name}</li>
        ))}
      </ul>
    </div>
    <div className="divider my-5">
    <hr />
    </div>
    </>
  )
}
// ###########################################################################################################################################################################
function Instructions() {

  const itemsInstructions = [
    {step: "Beat the eggs ", description: ": In a bowl, beat the eggs with a pinch of salt and pepper until they are well mixed. You can add a tablespoon of water or milk for a fluffier texture."},
    {step: "Heat the pan ", description: ": Place a non-stick frying pan over medium heat and add butter or oil."},
    {step: "Cook the omelette ", description: ": Once the butter is melted and bubbling, pour in the eggs. Tilt the pan to ensure the eggs evenly coat the surface."},
    {step: "Add fillings (optional) ", description: ": When the eggs begin to set at the edges but are still slightly runny in the middle, sprinkle your chosen fillings over one half of the omelette."},
    {step: "Fold and serve ", description: ": As the omelette continues to cook, carefully lift one edge and fold it over the fillings. Let it cook for another minute, then slide it onto a plate."},
    {step: "Enjoy ", description: ": Serve hot, with additional salt and pepper if needed."}
  ]

  return(
    <>
    <div className="instructions">
      <h2 style={{color: "maroon"}}><strong>Instructions</strong></h2>
      <ol className="fw-bold my-4">
        {itemsInstructions.map((item) => (
          <li className="mt-3"><p className="ms-3 fw-medium"><span className="bolder">{item.step}</span> {item.description}</p></li>
        ))}
      </ol>
    </div>
    <div className="divider my-5">
    <hr />
    </div>
    </>
  )  
}
// ###########################################################################################################################################################################
function Nutrition() {

  const itemsNutrition = [
    {name: "Calories", value: "277Kcal"},
    {name: "Carbs", value: "0g"},
    {name: "Protein", value: "20g"},
    {name: "Fat", value: "7g"}
  ]

  return(
    <>
    <div className="nutrition my-5">
      <h2 style={{color: "maroon"}}><strong>Nutrition</strong></h2>
      <p className="my-4">The table below shows nutritional values per serving without the additional fillings.</p>
      <ul className="my-4 p-0">
        {itemsNutrition.map((item) => (
          <>
          <div className="d-flex">
            <div className="w-50"><p className="titleNut ms-5">{item.name}</p></div>
            <div className="nbNutrition">{item.value}</div>
          </div><hr />
          </>
        ))}
      </ul>
    </div>
    </>
  )
}

// ###########################################################################################################################################################################
function App() {

  return (
    <>
      <div className="container-fluid py-5 px-5" style={{ width: "auto" }}>
        <div className="container rounded-5 py-5" style={{ backgroundColor: "white", width: "60rem" }}>
          <div className="container px-5">
          <img src="./src/assets/images/image-omelette.jpeg" className="img-fluid rounded-5" alt="" />
          {/* ############################################################################################################################################### */}
          <Presentation/>
          {/* ############################################################################################################################################### */}
          <PreparationTime/>
          {/* ############################################################################################################################################### */}
          <Ingredients/>
          {/* ############################################################################################################################################### */}
          <Instructions/>
          {/* ############################################################################################################################################### */}
          <Nutrition/>
          {/* ############################################################################################################################################### */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
