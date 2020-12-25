const ApiKey='TgkinwYXK3ADejeZnLfJTIb2JtUwKN5sfjV0IsdSKX8';
let count=5;
const ApiUrl=`https://api.unsplash.com/photos/random/?client_id=${ApiKey}&count=${count}`

const loader=document.getElementById('loader');
const imageContainer=document.getElementById('image-container');


const setAttributes=((element,attributes)=>{
     for(key in attributes){
         element.setAttribute(key,attributes[key])
     }
})



let photoArray=[];
let ready=false;
let imageLoad=0;
let totalImage=0;

const imageLoaded=()=>{
    imageLoad++;
    if(imageLoad===totalImage){
        ready=true;
        loader.hidden=true
        count=30;
    }
}

 const getPhoto=()=>{
     imageLoad=0;
     totalImage=photoArray.length;
        photoArray.forEach((photo)=>{
        const item=document.createElement('a');
        setAttributes(item,{
            'href':photo.links.html,
            'target':'_blank'
        })
        const img=document.createElement('img');
        setAttributes(img,{
            'src':photo.urls.regular,
            'alt':photo.alt_description,
            'title':photo.alt_description
        })
        img.addEventListener('load',imageLoaded);

        item.appendChild(img);
        imageContainer.appendChild(item);
 })
 
}
 
const getData=async()=>{
    try{
    const response=await fetch(ApiUrl);
    photoArray=await response.json();
    getPhoto()
    }catch(error){
        console.log(error);
    }
}

window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && ready){
        ready=false;
        getData();
    }
})
getData();