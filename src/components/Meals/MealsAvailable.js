import MealsAvailableStyles from './MealsAvailable.module.css'
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import {useEffect, useState} from "react";

const MealsAvailable = () => {
    const [meals, setMeals] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [httpError, setHttpError] = useState(null)
    useEffect(() => {
        let meals_array = []
        setIsLoading(true)
        fetch('https://react-http-test-8e21c-default-rtdb.firebaseio.com/meals.json').then((response) => {
            if (!response.ok) {
                throw Error('failed to fetch :3')
            }
            return  response.json().then(data => {
                for (let key of Object.keys(data)) {
                    meals_array.push({
                        id: key,
                        name: data[key].name,
                        description: data[key].description,
                        price: data[key].price
                    })
                }
                setMeals(meals_array)
                setIsLoading(false)
            })
        }).catch(error => {
            console.log('error: ', error.message)
            setIsLoading(false)
            setHttpError(error.message)
        })
    },[])

    if (isLoading) {
        return (
            <Card>
                <p style={{textAlign: 'center'}}>Loading More Meals...</p>
            </Card>)
    }

    else if(!isLoading && httpError !== null) {
        return (
            <Card>
                <p style={{'text-align': 'center'}}>{httpError}</p>
            </Card>
        )
    }


    const mealList = meals.map((meal)=>
        <MealItem
            key={meal.id}
            id={meal.id}
            price={meal.price}
            description={meal.description}
            name={meal.name}/>
    )
    return(
        <section className={MealsAvailableStyles.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>
    )
}

export default MealsAvailable