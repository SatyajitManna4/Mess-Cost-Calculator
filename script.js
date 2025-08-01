const membersContainer = document.getElementById("members");
const totalMembersInput = document.getElementById("totalMembers");

function renderMembers(memberCount) {
  membersContainer.innerHTML = "";
  for (let i = 1; i <= memberCount; i++) {
    membersContainer.innerHTML += `
      <fieldset style="margin-bottom: 15px;">
        <legend>Member ${i}</legend>
        <label>Name: <input type="text" id="name${i}" required></label>
        <label>Deposit: <input type="number" step="0.01" id="deposit${i}" required></label>
        <label>Veg Meals: <input type="number" step="0.01" id="veg${i}" required></label>
        <label>Meat Meals: <input type="number" step="0.01" id="meat${i}" required></label>
      </fieldset>
    `;
  }
}

// Initial render
renderMembers(parseInt(totalMembersInput.value));

totalMembersInput.removeAttribute("readonly");
totalMembersInput.addEventListener("change", () => {
  const newCount = parseInt(totalMembersInput.value);
  if (!isNaN(newCount) && newCount > 0) {
    renderMembers(newCount);
  }
});

document.getElementById("costForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const water = parseFloat(document.getElementById("waterCost").value);
  const meat = parseFloat(document.getElementById("meatCost").value);
  const veg = parseFloat(document.getElementById("vegCost").value);
  const est = parseFloat(document.getElementById("estCost").value);
  const totalVegMeals = parseFloat(document.getElementById("totalVegMeals").value);
  const totalMeatMeals = parseFloat(document.getElementById("totalMeatMeals").value);
  const totalMembers = parseInt(document.getElementById("totalMembers").value);

  const perEst = (water + est) / totalMembers;
  const vegMealCost = veg / totalVegMeals;
  const meatMealCost = meat / totalMeatMeals;

  let result = `<h3>Results</h3>`;
  result += `<p>Per Head Establishment Cost: ${perEst.toFixed(2)}</p>`;
  result += `<p>Per Veg Meal Cost: ${vegMealCost.toFixed(2)}</p>`;
  result += `<p>Per Meat Meal Cost: ${meatMealCost.toFixed(2)}</p>`;

  for (let i = 1; i <= totalMembers; i++) {
    const name = document.getElementById(`name${i}`).value;
    const deposit = parseFloat(document.getElementById(`deposit${i}`).value);
    const vegMeals = parseFloat(document.getElementById(`veg${i}`).value);
    const meatMeals = parseFloat(document.getElementById(`meat${i}`).value);

    const due = deposit - (perEst + (vegMealCost * vegMeals) + (meatMealCost * meatMeals));
    result += `<p>Final Amount of ${name}: ${due.toFixed(2)}</p>`;
  }

  document.getElementById("result").innerHTML = result;
});