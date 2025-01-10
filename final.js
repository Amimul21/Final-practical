function connect() {
    const searchTerm = document.getElementById("searchBox").value.trim();
    document.getElementById("searchBox").value = "";

    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (data.meals) {
                display(data);
            } else {
                document.getElementById("displayArea").innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        No meals found. Please try a different search term.
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("displayArea").innerHTML = `
                <div class="alert alert-warning" role="alert">
                    An error occurred while fetching meal data. Please try again later.
                </div>
            `;
        });
}

function display(data) {
    const allMeals = data.meals;
    const displayArea = document.getElementById("displayArea");
    const buttonArea = document.getElementById("buttonArea");

    displayArea.textContent = "";
    buttonArea.innerHTML = "";

    allMeals.slice(0, 5).forEach(meal => {
        displayMeal(meal);
    });

    if (allMeals.length > 5) {
        const showAllBtn = document.createElement("button");
        showAllBtn.textContent = "SHOW ALL";
        showAllBtn.id = "showAllBtn";
        showAllBtn.classList.add("btn", "btn-primary", "mt-3");
        showAllBtn.onclick = () => {
            displayAll(allMeals.slice(5));
            showAllBtn.remove();
        };
        buttonArea.appendChild(showAllBtn);
    }

    const searchAgainBtn = document.createElement("button");
    searchAgainBtn.textContent = "SEARCH AGAIN";
    searchAgainBtn.classList.add("btn", "btn-secondary", "mt-3", "ms-2");
    searchAgainBtn.onclick = () => {
        location.reload();
    };
    buttonArea.appendChild(searchAgainBtn);
}

function displayMeal(meal) {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal-card", "col-md-4", "mb-4");

    mealDiv.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
            </div>
        </div>
    `;

    document.getElementById("displayArea").appendChild(mealDiv);
}

function displayAll(meals) {
    meals.forEach(meal => {
        displayMeal(meal);
    });
}
