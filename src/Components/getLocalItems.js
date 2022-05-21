const getItems = () => {
    let list = localStorage.getItem('todo');
    // console.log(typeof list);
    if(list){
        return JSON.parse(localStorage.getItem('todo'))
    }else{
        return [];
    }    
}

export default getItems;