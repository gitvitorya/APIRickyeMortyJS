const charsContainer = document.querySelector('.chars-container');
const searchInput = document.querySelector('#search');
const speciesFilter = document.querySelector('#species');
const genderFilter = document.querySelector('#gender');
const statusFilter = document.querySelector('#status');
const loadMore = document.querySelector('#load-more');

const API = 'https://rickandmortyapi.com/api'; // URL base corrigida


async function getCharacters({ name = '', species = '', gender = '', status = '', page = 1 } = {}) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const characters = await response.json();
    
    console.log(characters.results); 

    return characters.results;
}

const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
}

async function render({ characters }) {
    characters.forEach(character => { 
        charsContainer.innerHTML += `
        <div class="char">
            <img src="${character.image}" alt="${character.name}">
            <div class="char-info">
                <h3>${character.name}</h3>
                <span>${character.species}</span>
            </div>
        </div>`;
    });
}



function handleFilterChange(type, event){
    return async () => {
        defaultFilters[type] = event.target.value;

        charsContainer.innerHTML = '';
        
        const characters = await getCharacters(defaultFilters);

        render({characters});
    }

}





function addListeners (){

        //selecionar especie select
    speciesFilter.addEventListener('change', async (event) => { 
         
        handleFilterChange('species',event)();
    
    });


    genderFilter.addEventListener('change', async (event) => {

        handleFilterChange('gender',event)();

    });


    statusFilter.addEventListener('change', async (event) => {

        handleFilterChange('status',event)();

    });


    searchInput.addEventListener('keyup', async (event) => {
        handleFilterChange('name',event)();
    });



    loadMore.addEventListener('click', async (event) => {
        defaultFilters.page += 1
        const characters = await getCharacters(defaultFilters);
        render({characters}); render({characters});
    });






    
}



async function main() {
    try {
        const characters = await getCharacters(defaultFilters);
        await render({ characters });
        addListeners();
    } catch (error) {
        console.error('Error fetching or rendering characters:', error);
    }
}

main();
