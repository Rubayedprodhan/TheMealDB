document.getElementById("search-form").addEventListener("submit", (event) => {
    event.preventDefault(); 
    console.log("Button");
    searchbox();
});

const searchbox = () => {
    const inputitem = document.getElementById("search-box").value.trim();
    console.log(inputitem);
    searchitem(inputitem);
};

const searchitem = (item) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
        .then(res => res.json())
        .then((data) => {
            displyitem(data.meals);
        })
        .catch(error => console.error('Error:', error));
};

const displyitem = (meals) => {
    const productscontainer = document.getElementById("product-container");
    productscontainer.innerHTML = ''; 

    if (meals === null) {
        productscontainer.innerHTML = '<p>No results found</p>';wwwwwwwwww
        return;
    }

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img class="img-card" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <h3 class="t0ext"> ${meal.strMeal.slice(0, 50)}</h3>
            <button class="view-button">Details</button>
        `;

        const button = div.querySelector(".view-button");
        button.addEventListener("click", () => {
            buttonfunction(meal);
        });

        productscontainer.appendChild(div);
    });
};


const buttonfunction = (meal) => {
    const mealdetails = document.getElementById("meal-details");
    mealdetails.innerHTML = `
        <img class="img-card" src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <h3 class="text">${meal.strMeal}</h3>
        <h3> ${meal.strCategory}</h3>
      
        <ul>${fecheIngredents(meal)}</ul>
    `;
    document.getElementById("meal-details-section").style.display = "block";
};

const fecheIngredents = (meal) => {
    let Ingredentslist = "";
    for (let i = 1; i <= 20; i++) {
        const Ingredent = meal[`strIngredient${i}`];
        if (Ingredent) {
            const measure = meal[`strMeasure${i}`];
            Ingredentslist += `<li>${measure} ${Ingredent}</li>`;
        } else {
            break;
        }
    }
    return Ingredentslist;
};