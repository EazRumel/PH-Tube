//1 - Fetch, Load and show categories on html
//create load categories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((response) => response.json())
  .then((data) => displayCategories(data.categories))
  .catch((error) => console.log(error))
}
 const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('categories')
  categories.forEach((item) => {
    console.log(item)
    //create a button
    const button = document.createElement('button');
    button.classList = 'btn';
    button.innerText = item.category
    categoryContainer.append(button);
  })
 }
 loadCategories()