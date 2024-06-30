

// let parent = document.createElement('accordion-body');
// parent.setAttribute('class','carousel-inner');

document.querySelector('#accordionExample').addEventListener('click',(event)=>{
    console.log(event.target)
    //console.log(e.target)
    let id = event.target.id
    //get data based on the target button id
    if(id>0) getData(id);
})

function newElement(ele){
    let res = document.createElement(ele);
    return res;
}
//function to fetch get all 
async function getData(id){
    console.log('hello',id)
    let respo = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${magazines[parseInt(id)]}`);
    let data = await respo.json();
    let respoArr = data.items;

    console.log(respoArr,'ji')
    //console.log(respoArr)   
    //creating parent i.e carousel inner to store all carousel item
   let innerCarousel = document.getElementsByClassName(`carousel-inner ${id}`)[0];
    innerCarousel.innerHTML = '';
   //console.log(innerCaousel[0],'hello')

    //loop through response array to add data in carousel-item div
    let allItems = respoArr.map((ele,i)=>{
        let item = newElement('div');
        if(i==0){
            item.setAttribute('class','carousel-item active')
        }else{
            item.setAttribute('class','carousel-item');
        }
        
        let a = newElement('a');
        a.setAttribute('href',`${ele.link}`)

        //image
        let image = newElement('img');
        image.setAttribute('src',`${ele.enclosure.link}`)
        image.setAttribute('class','e-image')

        a.append(image);

        let date = new Date(ele.pubDate);
        let d = date.toLocaleDateString('en-In');
        let t = date.toLocaleTimeString('en-In');
        //body for description
        let descriBody = newElement('div');
        descriBody.setAttribute('class','c-body')
        descriBody.innerHTML = `<h4>${ele.title}</h4>
        <span>${d}</span> <span>${t}</span>
        <p>${ele.description}</p>`

        item.append(a,descriBody);
        return item; 
    })
    console.log(allItems);

    allItems.forEach(ele=>{
       innerCarousel.appendChild(ele);
    })
}

//to stop unnecessary call
function handler(e){
    console.log('stopped')
    e.stopPropogation();
}


document.addEventListener('DOMContentLoaded',()=>{
    getData('0');
})


