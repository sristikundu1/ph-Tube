
let fetchData;
let noFetchData;
const handleCategory = async () => {
    const response = await fetch(
        "https://openapi.programming-hero.com/api/videos/categories"
    );

    const data = await response.json();

    const tabContainer = document.getElementById('tab-container');

    data.data.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
     <a onclick="handleLoadData('${category.category_id}')" class="tab btn btn-md normal-case mx-1 hover:bg-color-primary">${category.category}</a> 
     `;
        tabContainer.appendChild(div);
    });

};



const handleLoadData = async (categoryId) => {
    const response = await fetch(
        `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await response.json();

    fetchData = data.data;
    noFetchData = data;
    //console.log(fetchData);
    
    displayData();
};
function displayData(){

    const noCardContainer = document.getElementById('no-card-container');
    noCardContainer.innerHTML = "";
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    
    if (noFetchData.status == false) {
        const div = document.createElement('div');
        div.innerHTML = `
        <img class="mb-8 pl-24 w-48" src="Icon.png" alt="">
        <h2 class="text-3xl font-bold">Oops!! Sorry, There is no <br>
            content here</h2>
        `;
        noCardContainer.appendChild(div);
    }
    else {
        fetchData.forEach(topic => {
            //console.log(topic);


            const div = document.createElement('div');
            // console.log(parseFloat(topic.others.views));
            div.innerHTML = `
                <div class="card card-compact w-72 bg-base-100  shadow-xl">
                <figure><img class="relative object-cover w-full h-52 " src=${topic.thumbnail}/></figure>
                
                ${topic.others.posted_date && `<button id="timeBtn" class=" btn normal-case bg-slate-950  border-slate-950 text-white absolute bottom-44 right-4">${topic.others.posted_date ? convertTime(topic.others.posted_date) : ''}</button>`}
                 
                <div class="card-body">
                    <div class="flex gap-2 items-center">
                        <div class="avatar">
                            <div class="w-14 rounded-full">
                            <img src=${topic.authors[0].profile_picture} />
                            </div>
                        </div>
                        <div>
                            <h2 class="card-title">${topic.title}</h2>
                        </div>
                    </div>
        
                    <div class="flex gap-3">
                        <div class="ml-16 text-base text-zinc-500">
                            <p>${topic.authors[0].profile_name}</p>
                        </div>
        
                       
                        <img class="w-6" src="${topic.authors[0].verified ? `checklist_10629607.png` : ''}"/>
                       
        
                    </div >
                    <p class="ml-16 text-base text-zinc-500">${topic.others.views} <span>views</span></p>
                </div >
            </div >

     `;
            cardContainer.appendChild(div);

        });

    }

}

function handleSortData(){
    document.getElementById('sortButton').addEventListener('click', function () {
      
        let sortValue = sort();
        console.log(sortValue);
        fetchData = sortValue;
        displayData();   
       
    });

};

function sort(){
    //let view = []; 
    const sortedData = fetchData.sort(function (a, b) { return  parseFloat(b.others.views) -  parseFloat(a.others.views) });
return sortedData;
  
}


handleCategory();
handleLoadData("1000");
handleSortData();

function convertTime(second) {
    const seconds = parseInt(second);
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    return `${hours} hrs ${minutes} min ago`
}


document.getElementById('blogButton').addEventListener('click', function () {
    window.location.href = 'blog.html'


});

